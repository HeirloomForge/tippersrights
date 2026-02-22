import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

interface SentimentBar {
  label: string
  value: number
  displayValue: string
  color: 'red' | 'amber' | 'emerald' | 'blue' | 'slate'
  sourceLabel: string
  sourceUrl: string
}

const barColors: Record<SentimentBar['color'], string> = {
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  slate: 'bg-slate-500',
}

const textColors: Record<SentimentBar['color'], string> = {
  red: 'text-red-400',
  amber: 'text-amber-400',
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  slate: 'text-slate-400',
}

const sentimentData: SentimentBar[] = [
  {
    label: 'Say tipping is expected in more places than 5 years ago',
    value: 72,
    displayValue: '72%',
    color: 'red',
    sourceLabel: 'Pew Research, 2023',
    sourceUrl:
      'https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/',
  },
  {
    label: 'Oppose automatic service charges',
    value: 72,
    displayValue: '72%',
    color: 'red',
    sourceLabel: 'Pew Research, 2023',
    sourceUrl:
      'https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/',
  },
  {
    label: 'Oppose businesses suggesting tip amounts',
    value: 40,
    displayValue: '40%',
    color: 'amber',
    sourceLabel: 'Pew Research, 2023',
    sourceUrl:
      'https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/',
  },
  {
    label: 'Say tipping is "out of control"',
    value: 41,
    displayValue: '41%',
    color: 'amber',
    sourceLabel: 'HBR / Bankrate',
    sourceUrl:
      'https://hbr.org/2026/01/when-tipping-becomes-a-customer-experience-problem',
  },
  {
    label: 'Would tip 15% or less for an average meal',
    value: 57,
    displayValue: '57%',
    color: 'amber',
    sourceLabel: 'Pew Research, 2023',
    sourceUrl:
      'https://www.pewresearch.org/2023/11/09/services-americans-do-and-dont-tip-for-and-how-much/',
  },
]

interface TippingRateItem {
  context: string
  rate: number
  displayRate: string
}

const tippingRates: TippingRateItem[] = [
  { context: 'Sit-down restaurant', rate: 92, displayRate: '92%' },
  { context: 'Hair salon / barber', rate: 66, displayRate: '66%' },
  { context: 'Food delivery', rate: 59, displayRate: '59%' },
  { context: 'Coffee shop', rate: 25, displayRate: '25%' },
  { context: 'Fast casual counter', rate: 12, displayRate: '12%' },
]

export default function TipCreepChart() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              THE iPAD
              <br />
              <span className="text-blue-400">GUILT TRIP</span>
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-blue-500 mx-auto" />
            <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
              Americans are fed up &mdash; and the data proves it.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Consumer sentiment bars */}
          <ScrollReveal>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1">
                CONSUMER SENTIMENT
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                What Americans actually think about tipping culture
              </p>

              <div className="space-y-5">
                {sentimentData.map((bar, i) => {
                  const pct = Math.min(bar.value, 100)
                  return (
                    <div key={bar.label}>
                      <div className="flex justify-between items-baseline mb-1.5 gap-3">
                        <span className="text-slate-300 text-sm leading-snug">
                          {bar.label}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                          className={`text-sm font-bold tabular-nums shrink-0 ${textColors[bar.color]}`}
                        >
                          {bar.displayValue}
                        </motion.span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${pct}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: 0.2 + i * 0.1,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className={`h-full rounded-full ${barColors[bar.color]}`}
                        />
                      </div>
                      <p className="text-slate-700 text-[10px] mt-1 italic">
                        <a
                          href={bar.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-slate-500 transition-colors"
                        >
                          {bar.sourceLabel}
                        </a>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Who actually tips and where */}
          <ScrollReveal delay={0.15}>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-1">
                WHO TIPS WHERE?
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                Percentage who &ldquo;always or often&rdquo; tip
              </p>

              <div className="space-y-4">
                {tippingRates.map((item, i) => (
                  <div
                    key={item.context}
                    className="flex items-center gap-4"
                  >
                    <span className="text-slate-400 text-sm w-40 shrink-0">
                      {item.context}
                    </span>
                    <div className="flex-1 h-8 bg-slate-800/50 rounded-lg overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.rate}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.3 + i * 0.12,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className={`h-full rounded-lg ${
                          item.rate >= 60
                            ? 'bg-emerald-500/60'
                            : item.rate >= 30
                              ? 'bg-amber-500/60'
                              : 'bg-red-500/60'
                        }`}
                      />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
                        className="absolute inset-y-0 right-3 flex items-center text-sm font-bold text-white tabular-nums"
                      >
                        {item.displayRate}
                      </motion.span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-slate-600 text-xs italic">
                Source:{' '}
                <a
                  href="https://www.pewresearch.org/2023/11/09/services-americans-do-and-dont-tip-for-and-how-much/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
                >
                  Pew Research Center, 2023
                </a>
              </p>

              {/* Temple University callout */}
              <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
                <p className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">
                  The Science of Guilt
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Research from Temple University found that pre-service tipping
                  (before you even receive service) triggers <strong className="text-white">
                  negative emotions</strong> &mdash; discomfort, uncertainty, and
                  social pressure &mdash; fundamentally different from rewarding
                  good service after the fact.
                </p>
                <p className="mt-3 text-slate-600 text-xs italic">
                  Source:{' '}
                  <a
                    href="https://research.temple.edu/news/2025/08/reward-requirement-new-tipping-culture"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
                  >
                    Temple University, 2025
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
