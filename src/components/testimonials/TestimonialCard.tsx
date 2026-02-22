import { useState } from 'react'
import { motion } from 'framer-motion'
import GlowCard from '../shared/GlowCard'
import type { Testimonial } from '../../data/mockTestimonials'

const categoryColors: Record<string, string> = {
  'Coffee Shop': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Self-Service': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Counter Service': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Pre-Packaged Food': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Drive-Through': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Events & Festivals': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'Pickup Orders': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'Double Tipping': 'bg-red-500/20 text-red-300 border-red-500/30',
  Retail: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  Airports: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  Entertainment: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  Laundry: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  Hotels: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Transportation: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Healthcare: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [votes, setVotes] = useState(testimonial.upvotes)
  const [hasVoted, setHasVoted] = useState(false)

  const categoryStyle =
    categoryColors[testimonial.category] ||
    'bg-slate-500/20 text-slate-300 border-slate-500/30'

  function handleUpvote() {
    if (hasVoted) {
      setVotes((v) => v - 1)
      setHasVoted(false)
    } else {
      setVotes((v) => v + 1)
      setHasVoted(true)
    }
  }

  return (
    <GlowCard className="relative break-inside-avoid mb-4 md:mb-6">
      {/* Category badge */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${categoryStyle}`}
        >
          {testimonial.category}
        </span>
        <span className="text-xs text-slate-500">{formatDate(testimonial.date)}</span>
      </div>

      {/* Story text */}
      <blockquote className="text-slate-200 italic leading-relaxed mb-4">
        &ldquo;{testimonial.story}&rdquo;
      </blockquote>

      {/* Tip requested badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1.5 text-sm font-bold rounded-lg bg-red-500/15 text-red-400 border border-red-500/20">
          Asked: {testimonial.tipRequested}
        </span>
      </div>

      {/* Footer: location + upvote */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-xs text-slate-500">{testimonial.location}</span>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleUpvote}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            hasVoted
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
              clipRule="evenodd"
            />
          </svg>
          {votes.toLocaleString()}
        </motion.button>
      </div>
    </GlowCard>
  )
}
