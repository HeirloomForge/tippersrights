import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface BarData {
  label: string
  value: number
  maxValue: number
  color?: 'red' | 'emerald' | 'amber' | 'blue' | 'slate'
  displayValue?: string
}

interface AnimatedBarChartProps {
  data: BarData[]
  title: string
  subtitle?: string
  source?: string
  sourceUrl?: string
  className?: string
}

const barColors = {
  red: 'bg-red-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  slate: 'bg-slate-500',
}

const valueColors = {
  red: 'text-red-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  blue: 'text-blue-400',
  slate: 'text-slate-400',
}

export default function AnimatedBarChart({
  data,
  title,
  subtitle,
  source,
  sourceUrl,
  className = '',
}: AnimatedBarChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className={`${className}`}>
      <h3 className="text-xl md:text-2xl font-black text-white mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-slate-500 text-sm mb-6">{subtitle}</p>
      )}

      <div className="space-y-5 mb-4">
        {data.map((bar, i) => {
          const color = bar.color ?? 'emerald'
          const pct = Math.min((bar.value / bar.maxValue) * 100, 100)

          return (
            <div key={bar.label}>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-slate-300 text-sm font-medium">
                  {bar.label}
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className={`text-sm font-bold tabular-nums ${valueColors[color]}`}
                >
                  {bar.displayValue ?? bar.value}
                </motion.span>
              </div>

              {/* Bar track */}
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${pct}%` } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`h-full rounded-full ${barColors[color]}`}
                />
              </div>
            </div>
          )
        })}
      </div>

      {source && (
        <p className="text-slate-600 text-xs italic">
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
      )}
    </div>
  )
}
