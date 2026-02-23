/**
 * POST /api/shop/webhook — Stripe webhook handler.
 * Verifies the Stripe signature, then processes events:
 *   - checkout.session.completed: save order to D1, create Printful order
 *   - charge.refunded: update order status to 'refunded'
 *
 * CRITICAL: This endpoint does NOT use rate limiting (Stripe controls call frequency).
 * CRITICAL: Uses request.text() for raw body BEFORE any JSON parsing.
 */
import Stripe from 'stripe';
import type { Env } from '../../lib/env';
import { createPrintfulOrder } from '../../lib/printful';
import type { PrintfulRecipient, PrintfulItem } from '../../lib/printful';

interface ItemMeta {
  productId: string;
  variantId: number;
  name: string;
  quantity: number;
  size: string | null;
  unitPrice: number;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Get raw body FIRST — before any JSON parsing
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response(JSON.stringify({ error: 'Missing stripe-signature header' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
    apiVersion: '2025-04-30.basil',
  });

  const cryptoProvider = Stripe.createSubtleCryptoProvider();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Verification failed';
    return new Response(JSON.stringify({ error: `Webhook signature invalid: ${message}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Always return 200 to Stripe after signature verification — even on processing errors
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(stripe, env, event.data.object as Stripe.Checkout.Session);
        break;
      case 'charge.refunded':
        await handleChargeRefunded(env, event.data.object as Stripe.Charge);
        break;
    }
  } catch (err) {
    // Log but still return 200 — Stripe will retry otherwise
    console.error(`Webhook processing error for ${event.type}:`, err);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

async function handleCheckoutCompleted(
  stripe: Stripe,
  env: Env,
  session: Stripe.Checkout.Session
): Promise<void> {
  // Extract item metadata stored during checkout creation
  const itemsJson = session.metadata?.items;
  if (!itemsJson) {
    console.error('No items metadata on session', session.id);
    return;
  }

  const items: ItemMeta[] = JSON.parse(itemsJson);
  const ipHash = session.metadata?.ip_hash || 'unknown';

  // Get shipping details from the session
  const shipping = session.shipping_details;
  if (!shipping?.address) {
    console.error('No shipping details on session', session.id);
    return;
  }

  const customerEmail = session.customer_details?.email || 'unknown@unknown.com';
  const customerName = session.customer_details?.name || 'Unknown';

  // Save order to D1
  await env.DB.prepare(
    `INSERT INTO orders (
      stripe_session_id, stripe_payment_intent, customer_email, customer_name,
      shipping_name, shipping_address1, shipping_address2, shipping_city,
      shipping_state, shipping_zip, shipping_country, amount_total, currency,
      status, ip_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    session.id,
    typeof session.payment_intent === 'string' ? session.payment_intent : null,
    customerEmail,
    customerName,
    shipping.name || customerName,
    shipping.address.line1 || '',
    shipping.address.line2 || null,
    shipping.address.city || '',
    shipping.address.state || '',
    shipping.address.postal_code || '',
    shipping.address.country || 'US',
    session.amount_total || 0,
    session.currency || 'usd',
    'paid',
    ipHash
  ).run();

  // Get the inserted order ID
  const orderRow = await env.DB.prepare(
    'SELECT id FROM orders WHERE stripe_session_id = ?'
  ).bind(session.id).first<{ id: number }>();

  if (!orderRow) {
    console.error('Failed to retrieve order after insert', session.id);
    return;
  }

  const orderId = orderRow.id;

  // Insert order items
  for (const item of items) {
    await env.DB.prepare(
      `INSERT INTO order_items (order_id, product_id, product_name, printful_variant_id, quantity, unit_price, size)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      orderId,
      item.productId,
      item.name,
      item.variantId,
      item.quantity,
      item.unitPrice,
      item.size
    ).run();
  }

  // Create Printful order
  const recipient: PrintfulRecipient = {
    name: shipping.name || customerName,
    address1: shipping.address.line1 || '',
    address2: shipping.address.line2 || undefined,
    city: shipping.address.city || '',
    state_code: shipping.address.state || '',
    country_code: shipping.address.country || 'US',
    zip: shipping.address.postal_code || '',
  };

  const printfulItems: PrintfulItem[] = items.map((item) => ({
    variant_id: item.variantId,
    quantity: item.quantity,
    name: item.name,
  }));

  try {
    const printfulOrderId = await createPrintfulOrder(env.PRINTFUL_API_TOKEN, {
      recipient,
      items: printfulItems,
    });

    // Update order with Printful ID and status
    await env.DB.prepare(
      `UPDATE orders SET printful_order_id = ?, printful_status = 'pending', status = 'fulfilling', updated_at = datetime('now') WHERE id = ?`
    ).bind(String(printfulOrderId), orderId).run();
  } catch (err) {
    // Printful failed but payment succeeded — mark for manual resolution
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    await env.DB.prepare(
      `UPDATE orders SET printful_status = ?, updated_at = datetime('now') WHERE id = ?`
    ).bind(`error: ${errorMsg.slice(0, 200)}`, orderId).run();
    console.error('Printful order creation failed:', err);
  }
}

async function handleChargeRefunded(
  env: Env,
  charge: Stripe.Charge
): Promise<void> {
  // Find order by payment intent
  const paymentIntent = charge.payment_intent;
  if (!paymentIntent) return;

  const piId = typeof paymentIntent === 'string' ? paymentIntent : paymentIntent.id;

  await env.DB.prepare(
    `UPDATE orders SET status = 'refunded', updated_at = datetime('now') WHERE stripe_payment_intent = ?`
  ).bind(piId).run();
}
