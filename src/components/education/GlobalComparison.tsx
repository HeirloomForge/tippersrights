import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

interface Country {
  name: string
  flag: string
  tipNorm: string
  detail: string
  barWidth: number // percentage for visual bar (higher = more tipping)
  color: 'red' | 'amber' | 'emerald'
}

const countries: Country[] = [
  {
    name: 'United States',
    flag: 'US',
    tipNorm: '15-25%',
    detail: 'Expected on nearly everything; subsidizes worker wages',
    barWidth: 95,
    color: 'red',
  },
  {
    name: 'Canada',
    flag: 'CA',
    tipNorm: '15-20%',
    detail: 'Strong tipping culture, though workers earn full minimum wage',
    barWidth: 75,
    color: 'amber',
  },
  {
    name: 'United Kingdom',
    flag: 'UK',
    tipNorm: '10-12%',
    detail: 'Service charge often included; tipping optional and modest',
    barWidth: 45,
    color: 'amber',
  },
  {
    name: 'Germany',
    flag: 'DE',
    tipNorm: '5-10%',
    detail: 'Optional rounding up; no social pressure',
    barWidth: 30,
    color: 'emerald',
  },
  {
    name: 'France',
    flag: 'FR',
    tipNorm: 'Included',
    detail: '"Service compris" — service charge is built into all prices',
    barWidth: 15,
    color: 'emerald',
  },
  {
    name: 'Spain',
    flag: 'ES',
    tipNorm: '~11% tip',
    detail: 'Only 11% of customers leave anything; rounding up is common',
    barWidth: 12,
    color: 'emerald',
  },
  {
    name: 'Australia',
    flag: 'AU',
    tipNorm: 'Not expected',
    detail: 'Workers earn full minimum wage (~$23 AUD/hr); tips rare',
    barWidth: 8,
    color: 'emerald',
  },
  {
    name: 'Japan',
    flag: 'JP',
    tipNorm: 'Offensive',
    detail: 'Tipping is considered rude; excellent service is the default',
    barWidth: 2,
    color: 'emerald',
  },
]

const barColors = {
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
}

const textColors = {
  red: 'text-red-400',
  amber: 'text-amber-400',
  emerald: 'text-emerald-400',
}

export default function GlobalComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              THE GLOBAL
              <br />
              <span className="text-emerald-400">COMPARISON</span>
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-emerald-500 mx-auto" />
            <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
              The US is a tipping outlier. Most of the world has figured this out.
            </p>
          </div>
        </ScrollReveal>

        {/* Global fact callouts */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-14">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-black text-emerald-400">66</p>
              <p className="text-slate-400 text-sm mt-1">
                countries where a 10% tip is sufficient
              </p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-black text-emerald-400">88%</p>
              <p className="text-slate-400 text-sm mt-1">
                of countries where tips aren&rsquo;t added to taxi fares
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Country comparison bars */}
        <div className="space-y-4">
          {countries.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.07,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group"
            >
              <div className="flex items-center gap-3 md:gap-4">
                {/* Country info */}
                <div className="w-28 md:w-36 shrink-0">
                  <p className="text-white font-bold text-sm leading-tight">
                    {country.name}
                  </p>
                  <p className={`text-xs font-bold ${textColors[country.color]}`}>
                    {country.tipNorm}
                  </p>
                </div>

                {/* Bar */}
                <div className="flex-1 h-8 bg-slate-800/50 rounded-lg overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${country.barWidth}%` } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.3 + i * 0.08,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className={`h-full rounded-lg ${barColors[country.color]} opacity-60`}
                  />
                </div>
              </div>
              <p className="text-slate-600 text-xs mt-1 ml-28 md:ml-36 pl-3 md:pl-4 group-hover:text-slate-400 transition-colors">
                {country.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs italic text-slate-600">
            <span>Sources:</span>
            <a
              href="https://www.bbc.com/travel/article/20230606-how-to-tip-around-the-world"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
            >
              BBC Travel
            </a>
            <a
              href="https://vinepair.com/booze-news/tipping-etiquette-worldwide/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
            >
              VinePair
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
