/**
 * POST /api/shop/checkout — Create a Stripe Checkout Session.
 * Validates cart items against the static product catalog,
 * creates a Stripe session with price_data (not pre-created Price IDs),
 * and returns the hosted checkout URL for browser redirect.
 */
import Stripe from 'stripe';
import type { Env } from '../../lib/env';
import { jsonResponse, errorResponse, rateLimitResponse } from '../../lib/response';
import { hashIP } from '../../lib/security';
import { checkRateLimit, RATE_LIMIT_CONFIGS, rateLimitHeaders } from '../../lib/rate-limit';
import { getProductById, getVariant } from '../../lib/products';

interface CheckoutItem {
  productId: string;
  quantity: number;
  size?: string;
}

const SITE_URL = 'https://tippersbillofrights.com';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = await hashIP(clientIP);
  const rlConfig = RATE_LIMIT_CONFIGS['shop.checkout'];
  const rlResult = await checkRateLimit(env.RATE_LIMITS, ipHash, 'shop.checkout', rlConfig);

  if (!rlResult.allowed) {
    return rateLimitResponse(rlResult.resetAt - Math.floor(Date.now() / 1000));
  }

  // Parse request body
  let body: { items?: CheckoutItem[] };
  try {
    body = await request.json() as { items?: CheckoutItem[] };
  } catch {
    return errorResponse('Invalid JSON body', 'INVALID_JSON', 400);
  }

  const { items } = body;

  // Validate items array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return errorResponse('Cart is empty', 'EMPTY_CART', 400);
  }

  if (items.length > 20) {
    return errorResponse('Too many items (max 20)', 'TOO_MANY_ITEMS', 400);
  }

  // Validate each item against the product catalog
  const errors: Record<string, string> = {};
  const validatedItems: Array<{
    product: ReturnType<typeof getProductById> & {};
    variant: ReturnType<typeof getVariant> & {};
    quantity: number;
    size?: string;
  }> = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (!item.productId || typeof item.productId !== 'string') {
      errors[`items[${i}].productId`] = 'Product ID is required';
      continue;
    }

    const product = getProductById(item.productId);
    if (!product) {
      errors[`items[${i}].productId`] = `Unknown product: ${item.productId}`;
      continue;
    }

    if (!product.inStock) {
      errors[`items[${i}]`] = `${product.name} is out of stock`;
      continue;
    }

    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      errors[`items[${i}].quantity`] = 'Quantity must be 1-10';
      continue;
    }

    // Validate size for products with size variants
    if (product.sizes.length > 0) {
      if (!item.size) {
        errors[`items[${i}].size`] = `Size is required for ${product.name}`;
        continue;
      }
      if (!product.sizes.includes(item.size)) {
        errors[`items[${i}].size`] = `Invalid size "${item.size}" for ${product.name}`;
        continue;
      }
    }

    // Find the matching variant (by size, using first available color)
    const variant = getVariant(product, item.size);
    if (!variant) {
      errors[`items[${i}]`] = `No available variant for ${product.name} (${item.size || 'default'})`;
      continue;
    }

    validatedItems.push({ product, variant, quantity, size: item.size });
  }

  if (Object.keys(errors).length > 0) {
    return errorResponse('Validation failed', 'VALIDATION_ERROR', 400, errors);
  }

  // Build Stripe line items using price_data (variant price is source of truth)
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = validatedItems.map(
    ({ product, variant, quantity, size }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: size ? `${product.name} (${size})` : product.name,
        },
        unit_amount: Math.round(variant.price * 100),
      },
      quantity,
    })
  );

  // Build metadata for webhook to reconstruct items with variant IDs
  const itemsMeta = validatedItems.map(({ product, variant, quantity, size }) => ({
    productId: product.id,
    variantId: variant.printfulVariantId,
    syncVariantId: variant.syncVariantId,
    name: product.name,
    quantity,
    size: size || null,
    color: variant.color || null,
    unitPrice: Math.round(variant.price * 100),
  }));

  // Create Stripe Checkout Session
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
    apiVersion: '2025-04-30.basil',
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        items: JSON.stringify(itemsMeta),
        ip_hash: ipHash,
      },
      success_url: `${SITE_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/shop`,
    });

    const rlHeaders = rateLimitHeaders(rlConfig, rlResult);
    return jsonResponse({ checkoutUrl: session.url }, 200, rlHeaders);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return errorResponse(`Checkout failed: ${message}`, 'STRIPE_ERROR', 500);
  }
};
