import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

interface StatPill {
  value: string
  label: string
  sourceLabel: string
  sourceUrl: string
}

const headlineStats: StatPill[] = [
  {
    value: '70%+',
    label: 'of female restaurant workers have experienced sexual harassment on the job',
    sourceLabel: 'NPR / Notre Dame',
    sourceUrl:
      'https://www.npr.org/2021/07/22/1019017172/tips-and-service-with-a-smile-drive-sexual-harassment-in-restaurants-study-finds',
  },
  {
    value: '50%',
    label: 'of female restaurant workers experience harassment every single week',
    sourceLabel: 'NPR / Notre Dame',
    sourceUrl:
      'https://www.npr.org/2021/07/22/1019017172/tips-and-service-with-a-smile-drive-sexual-harassment-in-restaurants-study-finds',
  },
  {
    value: '7% / 14%',
    label:
      'Restaurant industry is 7% of workforce but files 14% of all EEOC sexual harassment claims',
    sourceLabel: 'Shriver Center on Poverty Law',
    sourceUrl:
      'https://www.povertylaw.org/article/how-working-for-tips-fosters-sexual-harassment/',
  },
]

interface ComparisonCard {
  title: string
  subtitle: string
  stats: { label: string; value: string; highlight?: boolean }[]
  color: 'red' | 'emerald'
}

const comparisonCards: ComparisonCard[] = [
  {
    title: 'Tip Credit States',
    subtitle: '$2.13/hr base wage',
    color: 'red',
    stats: [
      { label: 'Harassment rate', value: '2x higher', highlight: true },
      { label: 'Told to sexualize appearance', value: '3x more likely', highlight: true },
      { label: 'Workers tolerating abuse for tips', value: 'Widespread' },
    ],
  },
  {
    title: 'One Fair Wage States',
    subtitle: 'Full minimum wage before tips',
    color: 'emerald',
    stats: [
      { label: 'Harassment rate', value: 'Half', highlight: true },
      { label: 'Told to sexualize appearance', value: '3x less likely', highlight: true },
      { label: 'Worker power to refuse abuse', value: 'Significantly higher' },
    ],
  },
]

const colorMap = {
  red: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    title: 'text-red-400',
    value: 'text-red-300',
    highlight: 'bg-red-500/10',
  },
  emerald: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    title: 'text-emerald-400',
    value: 'text-emerald-300',
    highlight: 'bg-emerald-500/10',
  },
}

export default function HarassmentSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              THE HARASSMENT
              <br />
              <span className="text-red-400">ECONOMY</span>
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-red-500 mx-auto" />
            <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
              When your income depends on a customer&rsquo;s mood, saying
              &ldquo;no&rdquo; becomes a luxury you can&rsquo;t afford.
            </p>
          </div>
        </ScrollReveal>

        {/* Headline stat pills */}
        <div className="mt-12 grid sm:grid-cols-3 gap-5">
          {headlineStats.map((stat, i) => (
            <ScrollReveal key={stat.value} delay={i * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-red-500/20 p-6 h-full"
              >
                <p className="text-4xl md:text-5xl font-black text-red-400">
                  {stat.value}
                </p>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  {stat.label}
                </p>
                <p className="mt-3 text-slate-600 text-xs italic">
                  Source:{' '}
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
                  >
                    {stat.sourceLabel}
                  </a>
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Side-by-side comparison cards */}
        <div className="mt-16">
          <ScrollReveal>
            <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-10">
              THE POLICY{' '}
              <span className="text-amber-400">DIFFERENCE</span>
            </h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {comparisonCards.map((card, ci) => {
              const c = colorMap[card.color]
              return (
                <ScrollReveal key={card.title} delay={ci * 0.15}>
                  <div
                    className={`${c.bg} ${c.border} border rounded-2xl p-6 md:p-8 h-full`}
                  >
                    <p
                      className={`${c.title} font-black text-sm uppercase tracking-wider mb-1`}
                    >
                      {card.title}
                    </p>
                    <p className="text-slate-500 text-xs mb-6">
                      {card.subtitle}
                    </p>

                    <div className="space-y-4">
                      {card.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className={`flex items-center justify-between gap-4 rounded-lg px-4 py-3 ${
                            stat.highlight ? c.highlight : 'bg-slate-900/30'
                          }`}
                        >
                          <span className="text-slate-400 text-sm">
                            {stat.label}
                          </span>
                          <span
                            className={`${c.value} font-bold text-sm whitespace-nowrap`}
                          >
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs italic text-slate-600">
              <span>Sources:</span>
              <a
                href="https://www.povertylaw.org/article/how-working-for-tips-fosters-sexual-harassment/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
              >
                Shriver Center on Poverty Law
              </a>
              <a
                href="https://gap.hks.harvard.edu/does-tipping-facilitate-sexual-objectification-effect-tips-sexual-harassment-bar-and-restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
              >
                Harvard Kennedy School
              </a>
              <a
                href="https://www.youtube.com/watch?v=Eo2Du-B661M"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
              >
                Saru Jayaraman / One Fair Wage
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
