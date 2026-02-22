import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

const QUALITY_PERCENT = 4
const OTHER_PERCENT = 96

export default function ServiceQualityChart() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // SVG donut math: radius=80, circumference=2*PI*80=502.65
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const qualityStroke = (QUALITY_PERCENT / 100) * circumference
  const otherStroke = (OTHER_PERCENT / 100) * circumference

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              TIPPING DOESN&rsquo;T REWARD
              <br />
              <span className="text-amber-400">GOOD SERVICE</span>
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500 mx-auto" />
          </div>
        </ScrollReveal>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          {/* Donut chart */}
          <ScrollReveal>
            <div className="relative flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="w-64 h-64 md:w-72 md:h-72 mx-auto -rotate-90"
              >
                {/* Background ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="rgb(30 41 59 / 0.6)"
                  strokeWidth="24"
                />

                {/* "Other factors" arc — 96% */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="rgb(239 68 68 / 0.3)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeDasharray={`${otherStroke} ${circumference}`}
                  strokeDashoffset={0}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={
                    isInView
                      ? { strokeDasharray: `${otherStroke} ${circumference}` }
                      : {}
                  }
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* "Service quality" arc — 4% */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="rgb(16 185 129)"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeDasharray={`${qualityStroke} ${circumference}`}
                  strokeDashoffset={-otherStroke}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={
                    isInView
                      ? { strokeDasharray: `${qualityStroke} ${circumference}` }
                      : {}
                  }
                  transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                />
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6, type: 'spring' }}
                  className="text-5xl md:text-6xl font-black text-emerald-400"
                >
                  2-4%
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  className="text-slate-400 text-sm mt-1"
                >
                  service quality
                </motion.span>
              </div>
            </div>
          </ScrollReveal>

          {/* Explanation */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-lg">
                    Service quality: 2-4%
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Decades of peer-reviewed research found that actual service
                    quality explains only 2-4% of the variation in tip amounts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-4 h-4 rounded-full bg-red-500/40 mt-1 shrink-0" />
                <div>
                  <p className="text-white font-bold text-lg">
                    Everything else: 96-98%
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Tip amounts are overwhelmingly driven by customer mood, social
                    pressure, server appearance, race, gender, and weather &mdash;
                    factors that have nothing to do with quality of service.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 mt-6">
                <p className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-2">
                  The Bottom Line
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The entire justification for tipping &mdash; &ldquo;it motivates
                  better service&rdquo; &mdash; is empirically false. Tips are a
                  lottery, not a performance review.
                </p>
              </div>

              <p className="text-slate-600 text-xs italic">
                Source:{' '}
                <a
                  href="https://www.tippingresearch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
                >
                  Michael Lynn, Cornell University
                </a>
                {' | '}
                <a
                  href="https://ecommons.cornell.edu/server/api/core/bitstreams/7ba6be03-64b1-4d92-aedc-63243f028a52/content"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
                >
                  Cornell eCommons
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
