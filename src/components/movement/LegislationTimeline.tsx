import { motion } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'
import { legislationTimeline, type LegislationItem } from '../../data/legislationTimeline'

const statusColors: Record<LegislationItem['status'], { dot: string; badge: string; label: string }> = {
  enacted: {
    dot: 'bg-emerald-500 shadow-emerald-500/50',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Enacted',
  },
  'passed-one-chamber': {
    dot: 'bg-blue-500 shadow-blue-500/50',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    label: 'Passed One Chamber',
  },
  proposed: {
    dot: 'bg-amber-500 shadow-amber-500/50',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    label: 'Proposed',
  },
  'ballot-measure': {
    dot: 'bg-purple-500 shadow-purple-500/50',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    label: 'Ballot Measure',
  },
  'state-action': {
    dot: 'bg-cyan-500 shadow-cyan-500/50',
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    label: 'State Action',
  },
}

function TimelineCard({
  item,
  colors,
}: {
  item: LegislationItem
  colors: { badge: string; label: string }
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-white/20 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="text-2xl md:text-3xl font-black text-white tabular-nums">
          {item.year}
        </span>
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-white/10">
          {item.jurisdiction}
        </span>
      </div>
      <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-snug">
        {item.title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-3">
        {item.description}
      </p>
      <span
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${colors.badge}`}
      >
        {colors.label}
      </span>
    </motion.div>
  )
}

function TimelineItem({ item, index }: { item: LegislationItem; index: number }) {
  const colors = statusColors[item.status]
  const isLeft = index % 2 === 0

  return (
    <div className="relative">
      {/* Desktop: alternating left/right */}
      <div className="hidden md:block">
        <ScrollReveal
          variant={isLeft ? 'slideLeft' : 'slideRight'}
          delay={0.05 * index}
          threshold={0.15}
        >
          <div className="grid grid-cols-[1fr_48px_1fr] items-start">
            {/* Left column */}
            <div className={isLeft ? 'pr-4' : ''}>
              {isLeft && <TimelineCard item={item} colors={colors} />}
            </div>

            {/* Center dot */}
            <div className="flex justify-center pt-2">
              <motion.div
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`w-4 h-4 rounded-full ${colors.dot} shadow-lg z-10 ring-4 ring-slate-950`}
              />
            </div>

            {/* Right column */}
            <div className={!isLeft ? 'pl-4' : ''}>
              {!isLeft && <TimelineCard item={item} colors={colors} />}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile: left-aligned */}
      <div className="md:hidden">
        <ScrollReveal variant="fadeUp" delay={0.05 * index} threshold={0.15}>
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center shrink-0">
              <motion.div
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`w-3.5 h-3.5 rounded-full ${colors.dot} shadow-lg z-10 ring-4 ring-slate-950`}
              />
            </div>
            <div className="flex-1 -mt-1 pb-8">
              <TimelineCard item={item} colors={colors} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default function LegislationTimeline() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Legend */}
      <ScrollReveal variant="fadeUp">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
          {Object.entries(statusColors).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${val.dot}`} />
              <span className="text-xs text-slate-400 font-medium">{val.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Timeline container */}
      <div className="relative">
        {/* Vertical line - mobile left, desktop center */}
        <div className="absolute top-0 bottom-0 left-[7px] md:left-1/2 md:-translate-x-px w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        {/* Items */}
        <div className="flex flex-col gap-2 md:gap-6">
          {legislationTimeline.map((item, i) => (
            <TimelineItem key={`${item.year}-${item.title}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
