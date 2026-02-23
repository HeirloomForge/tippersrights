import { motion } from 'framer-motion'
import GlowCard from '../shared/GlowCard'
import SectionHeading from '../shared/SectionHeading'

const pillars = [
  {
    icon: '\u{1F6E1}',
    title: 'For Consumers',
    color: 'emerald' as const,
    titleColor: 'text-emerald-400',
    body: 'Stop subsidizing broken business models. Know when a tip reflects real gratitude vs manufactured guilt. Find businesses that pay their people and skip the guilt machine.',
  },
  {
    icon: '\u{1F3E2}',
    title: 'For Businesses',
    color: 'blue' as const,
    titleColor: 'text-blue-400',
    body: "You took the risk. You pay a living wage. You don\u2019t flip an iPad at your customers. You deserve to advertise that. Get certified and stand out to consumers who respect what you\u2019re doing.",
  },
  {
    icon: '\u{270A}',
    title: 'For the Movement',
    color: 'amber' as const,
    titleColor: 'text-amber-400',
    body: "Tipping culture is broken. The system punishes businesses who do it right and rewards those who don\u2019t. We\u2019re building a coalition of consumers and businesses who agree it\u2019s time to change.",
  },
]

export default function FrictionlessBaseline() {
  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeading
        title="WHAT WE'RE BUILDING"
        subtitle="A world where fair pay is the standard — not the exception."
        useScatter
        align="center"
      />

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <GlowCard glowColor={pillar.color} className="p-8 h-full">
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <h3
                className={`text-xl font-black uppercase tracking-wide mb-4 ${pillar.titleColor}`}
              >
                {pillar.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {pillar.body}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
