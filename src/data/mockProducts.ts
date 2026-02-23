export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'cards' | 'decals' | 'badges' | 'apparel'
  gradient: string
  image: string
  printfulVariantId: number
  sizes?: string[]
  inStock: boolean
}

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: '"Do Better" Business Cards',
    description: 'Pack of 50 premium cards to leave at businesses with aggressive tip prompts. Includes QR code linking to the Bill of Rights.',
    price: 12.99,
    category: 'cards',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #059669 100%)',
    image: '/images/do_better_cards.png',
    printfulVariantId: 1001,
    inStock: true
  },
  {
    id: 'prod-002',
    name: 'Certified Window Decal',
    description: 'Official "Tipper\'s Bill of Rights Certified" window decal for businesses. UV-resistant, professional-grade vinyl.',
    price: 8.99,
    category: 'decals',
    gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    image: '/images/we_pay_fairly_decal.png',
    printfulVariantId: 1002,
    inStock: true
  },
  {
    id: 'prod-003',
    name: 'Certified Badge Pin',
    description: 'Enamel pin for employees of certified businesses. Wear it proud, you earned it.',
    price: 5.99,
    category: 'badges',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
    image: '/images/cert_badge.png',
    printfulVariantId: 1003,
    inStock: true
  },
  {
    id: 'prod-004',
    name: 'Pocket Card - Know Your Rights',
    description: 'Wallet-sized card with the full Bill of Rights. Pull it out when the iPad flips. Laminated.',
    price: 3.99,
    category: 'cards',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    image: '/images/pocket_bill_of_rights.png',
    printfulVariantId: 1004,
    inStock: true
  },
  {
    id: 'prod-005',
    name: 'Counter Stand Display',
    description: 'Acrylic counter stand for certified businesses. Let customers know they are in a guilt-free zone.',
    price: 14.99,
    category: 'decals',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #059669 100%)',
    image: '/images/counter_stand_display.png',
    printfulVariantId: 1005,
    inStock: true
  },
  {
    id: 'prod-006',
    name: '"No Guilt Zone" T-Shirt',
    description: 'Premium cotton tee with the movement logo. Available in black, charcoal, and forest green.',
    price: 24.99,
    category: 'apparel',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    image: '/images/no_gravity_tee.png',
    printfulVariantId: 1006,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true
  },
  {
    id: 'prod-007',
    name: '"I Didn\'t Tip and I\'m Fine" Hoodie',
    description: 'Heavyweight hoodie for those cold mornings at the drive-through. No tip required to wear it.',
    price: 44.99,
    category: 'apparel',
    gradient: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
    image: '/images/no_guilt_hoodie.png',
    printfulVariantId: 1007,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true
  },
  {
    id: 'prod-008',
    name: 'Bumper Sticker Pack',
    description: 'Set of 5 vinyl bumper stickers. Includes "Honk if you\'re tired of tipping" and "My car doesn\'t have a tip screen."',
    price: 7.99,
    category: 'decals',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
    image: '/images/frictionless_bumper.png',
    printfulVariantId: 1008,
    inStock: true
  },
]
