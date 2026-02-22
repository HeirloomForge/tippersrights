import { motion } from 'framer-motion'
import type { Business } from '../../data/mockBusinesses.ts'

interface BusinessCardProps {
  business: Business
  onSelect: (biz: Business) => void
}

const categoryColors: Record<Business['category'], string> = {
  restaurant: 'bg-amber-500/20 text-amber-300',
  cafe: 'bg-blue-500/20 text-blue-300',
  retail: 'bg-purple-500/20 text-purple-300',
  service: 'bg-rose-500/20 text-rose-300',
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < Math.round(rating) ? 'text-amber-400' : 'text-slate-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-slate-500">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function BusinessCard({ business, onSelect }: BusinessCardProps) {
  const certDate = new Date(business.certifiedDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <motion.div
      whileHover={{
        y: -2,
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.12)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm cursor-pointer"
      onClick={() => onSelect(business)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-white">
            {business.name}
          </h3>
          <p className="text-xs text-slate-500">
            {business.location.city}, {business.location.state}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${categoryColors[business.category]}`}
        >
          {business.category}
        </span>
      </div>

      {/* Rating */}
      <div className="mt-2">
        <StarRating rating={business.rating} />
      </div>

      {/* Description */}
      <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">
        {business.description}
      </p>

      {/* Badges */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 shadow-[inset_0_0_8px_rgba(16,185,129,0.1)]">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Certified {certDate}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-400">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Fair Wage
        </span>
      </div>

      {/* View Details */}
      <button
        type="button"
        className="mt-3 text-xs font-medium text-emerald-400 transition-colors hover:text-emerald-300"
        onClick={(e) => {
          e.stopPropagation()
          onSelect(business)
        }}
      >
        View Details &rarr;
      </button>
    </motion.div>
  )
}
