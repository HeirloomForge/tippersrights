import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface DataCardProps {
  value: string
  label: string
  description: string
  source: string
  sourceUrl?: string
  accentColor?: 'emerald' | 'red' | 'amber' | 'blue'
  delay?: number
}

const accentStyles = {
  emerald: {
    bar: 'bg-emerald-500',
    value: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  red: {
    bar: 'bg-red-500',
    value: 'text-red-400',
    glow: 'shadow-red-500/10',
  },
  amber: {
    bar: 'bg-amber-500',
    value: 'text-amber-400',
    glow: 'shadow-amber-500/10',
  },
  blue: {
    bar: 'bg-blue-500',
    value: 'text-blue-400',
    glow: 'shadow-blue-500/10',
  },
}

export default function DataCard({
  value,
  label,
  description,
  source,
  sourceUrl,
  accentColor = 'emerald',
  delay = 0,
}: DataCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const styles = accentStyles[accentColor]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden hover:border-white/20 transition-colors duration-300 shadow-lg ${styles.glow}`}
    >
      {/* Accent bar on left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.bar}`} />

      <div className="pl-4">
        {/* Animated value */}
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          className={`text-4xl md:text-5xl font-black tabular-nums ${styles.value}`}
        >
          {value}
        </motion.p>

        <p className="mt-2 text-white font-bold text-sm uppercase tracking-wider">
          {label}
        </p>

        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          {description}
        </p>

        <p className="mt-3 text-slate-600 text-xs italic">
          Source:{' '}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
            >
              {source}
            </a>
          ) : (
            source
          )}
        </p>
      </div>
    </motion.div>
  )
}
