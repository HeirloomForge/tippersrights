/**
 * Printful Product Catalog Sync Script
 *
 * Fetches products from your Printful store and generates:
 *   - src/data/products.ts (frontend catalog — auto-generated)
 *   - functions/lib/products.ts (server-side catalog — auto-generated)
 *
 * Usage: npx tsx scripts/sync-products.ts
 *
 * Reads PRINTFUL_API_TOKEN from .env file.
 * Branding overrides (descriptions, gradients, categories) come from src/data/product-branding.ts.
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

// ---------- Types ----------

interface PrintfulSyncProduct {
  id: number
  name: string
  variants: number
  thumbnail_url: string
}

interface PrintfulSyncVariant {
  id: number
  variant_id: number
  name: string
  retail_price: string
  size: string
  color: string
  availability_status: string
  product: {
    variant_id: number
    product_id: number
    image: string
    name: string
  }
  files: Array<{
    type: string
    preview_url: string
    thumbnail_url: string
  }>
}

interface PrintfulProductDetailResponse {
  code: number
  result: {
    sync_product: PrintfulSyncProduct
    sync_variants: PrintfulSyncVariant[]
  }
}

interface PrintfulListResponse {
  code: number
  result: PrintfulSyncProduct[]
  paging: { total: number; limit: number; offset: number }
}

// ---------- Config ----------

const PRINTFUL_API_BASE = 'https://api.printful.com'
const ROOT = path.resolve(import.meta.dirname, '..')
const ENV_PATH = path.join(ROOT, '.env')
const BRANDING_PATH = path.join(ROOT, 'src/data/product-branding.ts')
const FRONTEND_OUT = path.join(ROOT, 'src/data/products.ts')
const SERVER_OUT = path.join(ROOT, 'functions/lib/products.ts')

// ---------- Helpers ----------

function loadEnv(): Record<string, string> {
  const env: Record<string, string> = {}
  if (!fs.existsSync(ENV_PATH)) return env
  const lines = fs.readFileSync(ENV_PATH, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    env[key] = val
  }
  return env
}

async function printfulGet<T>(endpoint: string, token: string): Promise<T> {
  const url = `${PRINTFUL_API_BASE}${endpoint}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    throw new Error(`Printful API ${res.status}: ${await res.text()}`)
  }
  return res.json() as Promise<T>
}

// ---------- Branding loader ----------

type BrandingMap = Record<
  string,
  {
    description?: string
    gradient?: string
    category?: string
    displayName?: string
  }
>

async function loadBranding(): Promise<BrandingMap> {
  if (!fs.existsSync(BRANDING_PATH)) {
    console.log('  No branding file found, using defaults')
    return {}
  }
  const mod = await import(BRANDING_PATH)
  return (mod.productBranding || {}) as BrandingMap
}

// ---------- Default gradients by color ----------

function gradientForColor(color: string): string {
  const c = color.toLowerCase()
  if (c.includes('black') || c.includes('carbon') || c.includes('charcoal'))
    return 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  if (c.includes('white') || c.includes('bone'))
    return 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)'
  if (c.includes('blue') || c.includes('sky'))
    return 'linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)'
  if (c.includes('green') || c.includes('forest'))
    return 'linear-gradient(135deg, #0f4c3a 0%, #059669 100%)'
  if (c.includes('red') || c.includes('cardinal'))
    return 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)'
  return 'linear-gradient(135deg, #334155 0%, #1e293b 100%)'
}

// ---------- Main ----------

async function main() {
  const env = loadEnv()
  const token = env.PRINTFUL_API_TOKEN
  if (!token) {
    console.error('Error: PRINTFUL_API_TOKEN not found in .env')
    process.exit(1)
  }

  console.log('Fetching Printful store products...')
  const listRes = await printfulGet<PrintfulListResponse>('/store/products', token)
  console.log(`  Found ${listRes.result.length} products`)

  if (listRes.result.length === 0) {
    console.log('  No products in your Printful store. Create some first!')
    process.exit(0)
  }

  const branding = await loadBranding()

  // Fetch full details for each product
  interface ProductData {
    id: string
    printfulProductId: number
    name: string
    description: string
    category: string
    gradient: string
    image: string
    thumbnailUrl: string
    basePrice: number
    inStock: boolean
    variants: Array<{
      syncVariantId: number
      printfulVariantId: number
      size: string
      color: string
      price: number
      inStock: boolean
    }>
    sizes: string[]
    colors: string[]
  }

  const products: ProductData[] = []

  for (const sp of listRes.result) {
    console.log(`  Fetching details: ${sp.name} (${sp.variants} variants)...`)
    const detail = await printfulGet<PrintfulProductDetailResponse>(
      `/store/products/${sp.id}`,
      token
    )

    const syncProduct = detail.result.sync_product
    const syncVariants = detail.result.sync_variants
    const productKey = `printful-${syncProduct.id}`
    const brand = branding[productKey] || {}

    // Extract unique sizes and colors (preserving order)
    const sizes: string[] = []
    const colors: string[] = []
    for (const v of syncVariants) {
      if (v.size && !sizes.includes(v.size)) sizes.push(v.size)
      if (v.color && !colors.includes(v.color)) colors.push(v.color)
    }

    // Get preview image from first variant
    const firstVariant = syncVariants[0]
    const previewFile = firstVariant?.files.find((f) => f.type === 'preview')
    const image = previewFile?.preview_url || syncProduct.thumbnail_url

    // Base price = minimum retail price across variants
    const prices = syncVariants.map((v) => parseFloat(v.retail_price))
    const basePrice = Math.min(...prices)

    // All variants active?
    const hasActiveVariant = syncVariants.some(
      (v) => v.availability_status === 'active'
    )

    // Default category: anything with sizes is apparel
    const defaultCategory = sizes.length > 0 ? 'apparel' : 'merchandise'

    products.push({
      id: productKey,
      printfulProductId: syncProduct.id,
      name: brand.displayName || syncProduct.name,
      description:
        brand.description ||
        `${syncProduct.name} — available in ${colors.join(', ')}`,
      category: brand.category || defaultCategory,
      gradient:
        brand.gradient || gradientForColor(colors[0] || ''),
      image,
      thumbnailUrl: syncProduct.thumbnail_url,
      basePrice,
      inStock: hasActiveVariant,
      variants: syncVariants.map((v) => ({
        syncVariantId: v.id,
        printfulVariantId: v.variant_id,
        size: v.size,
        color: v.color,
        price: parseFloat(v.retail_price),
        inStock: v.availability_status === 'active',
      })),
      sizes,
      colors,
    })
  }

  // ---------- Generate frontend catalog ----------

  console.log(`\nGenerating ${FRONTEND_OUT}...`)

  const frontendSrc = `/**
 * AUTO-GENERATED — Do not edit manually.
 * Run \`npm run sync-products\` to regenerate from Printful.
 * Last synced: ${new Date().toISOString()}
 */

export interface ProductVariant {
  syncVariantId: number
  printfulVariantId: number
  size: string
  color: string
  price: number
  inStock: boolean
}

export interface Product {
  id: string
  printfulProductId: number
  name: string
  description: string
  category: string
  gradient: string
  image: string
  thumbnailUrl: string
  basePrice: number
  inStock: boolean
  variants: ProductVariant[]
  sizes: string[]
  colors: string[]
}

export const products: Product[] = ${JSON.stringify(products, null, 2)}
`

  fs.writeFileSync(FRONTEND_OUT, frontendSrc, 'utf-8')
  console.log(`  Wrote ${products.length} products`)

  // ---------- Generate server-side catalog ----------

  console.log(`Generating ${SERVER_OUT}...`)

  const serverSrc = `/**
 * AUTO-GENERATED — Do not edit manually.
 * Run \`npm run sync-products\` to regenerate from Printful.
 * Last synced: ${new Date().toISOString()}
 *
 * Server-side product catalog for Workers endpoints.
 * Workers cannot import from src/ so this is a separate copy.
 */

export interface ServerProductVariant {
  syncVariantId: number;
  printfulVariantId: number;
  size: string;
  color: string;
  price: number;
  inStock: boolean;
}

export interface ServerProduct {
  id: string;
  printfulProductId: number;
  name: string;
  basePrice: number;
  category: string;
  inStock: boolean;
  variants: ServerProductVariant[];
  sizes: string[];
  colors: string[];
}

export const products: ServerProduct[] = ${JSON.stringify(
    products.map((p) => ({
      id: p.id,
      printfulProductId: p.printfulProductId,
      name: p.name,
      basePrice: p.basePrice,
      category: p.category,
      inStock: p.inStock,
      variants: p.variants,
      sizes: p.sizes,
      colors: p.colors,
    })),
    null,
    2
  )};

/** Lookup a product by ID. Returns undefined if not found. */
export function getProductById(id: string): ServerProduct | undefined {
  return products.find((p) => p.id === id);
}

/** Lookup the exact variant for a product + size + color combo. */
export function getVariant(
  product: ServerProduct,
  size?: string,
  color?: string
): ServerProductVariant | undefined {
  return product.variants.find(
    (v) =>
      (!size || v.size === size) &&
      (!color || v.color === color) &&
      v.inStock
  );
}
`

  fs.writeFileSync(SERVER_OUT, serverSrc, 'utf-8')
  console.log(`  Wrote ${products.length} server products`)

  console.log('\nSync complete!')
  console.log(`\nProducts synced:`)
  for (const p of products) {
    console.log(
      `  ${p.name} — $${p.basePrice.toFixed(2)} — ${p.variants.length} variants (${p.colors.join(', ')}) (${p.sizes.join(', ')})`
    )
  }
}

main().catch((err) => {
  console.error('Sync failed:', err)
  process.exit(1)
})
