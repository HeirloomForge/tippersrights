import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'
import {
  stateWageData,
  SOURCE_URL,
  DATA_EFFECTIVE_DATE,
  type StateWageData,
  type WageTier,
} from '../../data/stateWageData'

const tierConfig: Record<
  WageTier,
  { label: string; color: string; bg: string; border: string; desc: string }
> = {
  federal_minimum: {
    label: '$2.13/hr',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    desc: 'These states pay tipped workers the federal minimum of $2.13/hr \u2014 a rate frozen since 1991. Your tip isn\u2019t a bonus here. It\u2019s their paycheck.',
  },
  middle_ground: {
    label: 'In Between',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    desc: 'These states set their own tipped wage above $2.13 but still below the regular minimum. Tips are still subsidizing employer labor costs.',
  },
  no_tip_credit: {
    label: 'Full Wage',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    desc: 'These 7 states require employers to pay tipped workers the full minimum wage before tips. Tips here are actual gratuities \u2014 not wage replacement.',
  },
}

const tierOrder: WageTier[] = [
  'federal_minimum',
  'middle_ground',
  'no_tip_credit',
]

const tierTitles: Record<WageTier, string> = {
  federal_minimum: 'THE $2.13 CLUB',
  middle_ground: 'SOMEWHERE IN BETWEEN',
  no_tip_credit: 'DOING IT RIGHT',
}

function StateRow({ s }: { s: StateWageData }) {
  const cfg = tierConfig[s.tier]
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm font-bold text-white shrink-0">
          {s.abbrev}
        </span>
        <span className="text-sm text-slate-400 truncate">{s.state}</span>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className={`text-sm font-bold ${cfg.color}`}>
          ${s.tippedWage.toFixed(2)}
        </span>
        <span className="text-xs text-slate-500">
          / ${s.regularWage.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default function StateWageMap() {
  const [activeTier, setActiveTier] = useState<WageTier | 'all'>('all')

  const grouped = tierOrder.map((tier) => ({
    tier,
    states: stateWageData
      .filter((s) => s.tier === tier)
      .sort((a, b) => a.tippedWage - b.tippedWage),
  }))

  const visibleGroups =
    activeTier === 'all'
      ? grouped
      : grouped.filter((g) => g.tier === activeTier)

  return (
    <section id="state-wages" className="pb-16 md:pb-24 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              WHAT DOES YOUR STATE PAY?
            </h2>
            <div className="h-1 w-16 bg-emerald-500 mx-auto rounded-full" />
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Only 7 states require full minimum wage for tipped workers. The
              other 43 let employers shift the wage burden to you. Find your
              state.
            </p>
          </div>
        </ScrollReveal>

        {/* Tier filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { key: 'all' as const, label: 'All States', count: stateWageData.length },
            { key: 'federal_minimum' as const, label: '$2.13 Club', count: grouped[0].states.length },
            { key: 'middle_ground' as const, label: 'In Between', count: grouped[1].states.length },
            { key: 'no_tip_credit' as const, label: 'Full Wage', count: grouped[2].states.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTier(tab.key)}
              className={[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTier === tab.key
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              {tab.label}{' '}
              <span className="opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* State groups */}
        <div className="space-y-8">
          {visibleGroups.map(({ tier, states }) => {
            const cfg = tierConfig[tier]
            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-6`}
              >
                <div className="mb-4">
                  <h3
                    className={`text-lg font-black uppercase tracking-wide ${cfg.color}`}
                  >
                    {tierTitles[tier]}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">{cfg.desc}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6">
                  <div className="hidden sm:flex items-center justify-between px-3 pb-1 border-b border-white/5 mb-1">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      State
                    </span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Tipped / Regular
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center justify-between px-3 pb-1 border-b border-white/5 mb-1">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      State
                    </span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Tipped / Regular
                    </span>
                  </div>
                  {states.map((s) => (
                    <StateRow key={s.abbrev} s={s} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Source attribution */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Data effective {DATA_EFFECTIVE_DATE}.{' '}
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-400 underline"
          >
            U.S. Department of Labor
          </a>
        </p>
      </div>
    </section>
  )
}
