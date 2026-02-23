/**
 * Server-side product catalog for Workers endpoints.
 * Mirrors src/data/mockProducts.ts — source of truth for pricing and variant IDs.
 * Workers cannot import from src/ so this is a separate copy.
 */

export interface ServerProduct {
  id: string;
  name: string;
  price: number;
  category: 'cards' | 'decals' | 'badges' | 'apparel';
  printfulVariantId: number;
  sizes?: string[];
  inStock: boolean;
}

export const products: ServerProduct[] = [
  {
    id: 'prod-001',
    name: '"Do Better" Business Cards',
    price: 12.99,
    category: 'cards',
    printfulVariantId: 1001,
    inStock: true,
  },
  {
    id: 'prod-002',
    name: 'Certified Window Decal',
    price: 8.99,
    category: 'decals',
    printfulVariantId: 1002,
    inStock: true,
  },
  {
    id: 'prod-003',
    name: 'Certified Badge Pin',
    price: 5.99,
    category: 'badges',
    printfulVariantId: 1003,
    inStock: true,
  },
  {
    id: 'prod-004',
    name: 'Pocket Card - Know Your Rights',
    price: 3.99,
    category: 'cards',
    printfulVariantId: 1004,
    inStock: true,
  },
  {
    id: 'prod-005',
    name: 'Counter Stand Display',
    price: 14.99,
    category: 'decals',
    printfulVariantId: 1005,
    inStock: true,
  },
  {
    id: 'prod-006',
    name: '"No Guilt Zone" T-Shirt',
    price: 24.99,
    category: 'apparel',
    printfulVariantId: 1006,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
  },
  {
    id: 'prod-007',
    name: '"I Didn\'t Tip and I\'m Fine" Hoodie',
    price: 44.99,
    category: 'apparel',
    printfulVariantId: 1007,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
  },
  {
    id: 'prod-008',
    name: 'Bumper Sticker Pack',
    price: 7.99,
    category: 'decals',
    printfulVariantId: 1008,
    inStock: true,
  },
];

/** Lookup a product by ID. Returns undefined if not found. */
export function getProductById(id: string): ServerProduct | undefined {
  return products.find((p) => p.id === id);
}
