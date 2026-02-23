import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products as allProducts, type Product } from '../../data/products'
import ProductCard from './ProductCard'

type Category = 'all' | Product['category']
type SortOrder = 'default' | 'price-asc' | 'price-desc'

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Cards', value: 'cards' },
  { label: 'Decals', value: 'decals' },
  { label: 'Badges', value: 'badges' },
  { label: 'Apparel', value: 'apparel' },
]

interface ProductGridProps {
  onAddToCart: (product: Product, size?: string) => void
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('default')

  const filteredProducts = useMemo(() => {
    const products =
      activeCategory === 'all'
        ? [...allProducts]
        : allProducts.filter((p) => p.category === activeCategory)

    if (sortOrder === 'price-asc') {
      products.sort((a, b) => a.basePrice - b.basePrice)
    } else if (sortOrder === 'price-desc') {
      products.sort((a, b) => b.basePrice - a.basePrice)
    }

    return products
  }, [activeCategory, sortOrder])

  return (
    <div>
      {/* Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Category Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={[
                'px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200',
                activeCategory === cat.value
                  ? 'text-emerald-400 bg-emerald-500/10 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5',
              ].join(' ')}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="bg-slate-800 text-slate-300 text-sm rounded-lg border border-white/10 px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                layout: { duration: 0.3 },
              }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
