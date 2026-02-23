/**
 * TBOR Product Branding Overrides
 *
 * Maps Printful product IDs to TBOR-specific display properties.
 * The sync script reads this file to enrich auto-generated product data
 * with satirical descriptions, custom gradients, and categories.
 *
 * Key format: 'printful-{printfulProductId}'
 *
 * To find your product IDs, run: npm run sync-products
 * It will print each product with its Printful ID.
 */

export const productBranding: Record<
  string,
  {
    displayName?: string
    description?: string
    gradient?: string
    category?: string
  }
> = {
  // --- Unisex Hoodie (Printful ID: 420973599) ---
  'printful-420973599': {
    displayName: '"I Didn\'t Tip and I\'m Fine" Hoodie',
    description:
      'Heavyweight hoodie for those cold mornings at the drive-through. No tip required to wear it.',
    gradient: `linear-gradient(135deg, #334155 0%, #1e293b 100%)`,
    category: 'apparel',
  },

  // --- Unisex organic sweatshirt (Printful ID: 420973298) ---
  'printful-420973298': {
    displayName: '"No Guilt Zone" Sweatshirt',
    description:
      'Organic cotton sweatshirt for guilt-free lounging. The revolution is comfortable.',
    gradient: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
    category: 'apparel',
  },
}
