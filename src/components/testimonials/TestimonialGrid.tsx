import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'
import MagneticButton from '../shared/MagneticButton'
import TestimonialCard from './TestimonialCard'
import type { Testimonial } from '../../data/mockTestimonials'

const CATEGORIES = [
  'All',
  'Coffee Shop',
  'Self-Service',
  'Counter Service',
  'Retail',
  'Pickup Orders',
  'Drive-Through',
  'Airports',
  'Healthcare',
  'Hotels',
  'Entertainment',
  'Double Tipping',
  'Transportation',
] as const

const ITEMS_PER_BATCH = 6

interface TestimonialGridProps {
  testimonials: Testimonial[]
}

export default function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH)

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return testimonials
    return testimonials.filter((t) => t.category === activeCategory)
  }, [testimonials, activeCategory])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat)
    setVisibleCount(ITEMS_PER_BATCH)
  }

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Masonry grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6"
        >
          {visible.map((testimonial, i) => (
            <ScrollReveal
              key={testimonial.id}
              delay={Math.min(i * 0.08, 0.4)}
              variant="fadeUp"
            >
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {visible.length === 0 && (
        <p className="text-center text-slate-500 py-12">
          No stories in this category yet. Be the first!
        </p>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <MagneticButton
            variant="outline"
            onClick={() => setVisibleCount((c) => c + ITEMS_PER_BATCH)}
          >
            Load More Stories
          </MagneticButton>
        </div>
      )}
    </div>
  )
}
