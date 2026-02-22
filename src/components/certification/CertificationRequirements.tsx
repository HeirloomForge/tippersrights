import { motion } from 'framer-motion'
import GlowCard from '../shared/GlowCard.tsx'
import ScrollReveal from '../shared/ScrollReveal.tsx'

const requirements = [
  {
    title: 'Pay Staff a Living Wage',
    description:
      'Minimum $15/hr or local equivalent. The price on the menu should include the cost of treating your people right.',
  },
  {
    title: 'Eliminate Mandatory Tip Expectations',
    description:
      'No guilt screens, no pre-selected percentages, no iPad flips. The transaction ends at the total.',
  },
  {
    title: 'Display Transparent, Tip-Inclusive Pricing',
    description:
      'The sticker price is the real price. No hidden expectations, no social math at checkout.',
  },
  {
    title: 'Reward Expertise Through Wages',
    description:
      'Employee skill earns raises and bonuses, not customer subsidies. Talent is paid by the business, not crowd-funded.',
  },
  {
    title: 'Provide Equal Service Regardless of Generosity',
    description:
      'Every customer gets the same quality experience. Service quality never depends on the tip line.',
  },
]

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
}

export default function CertificationRequirements() {
  return (
    <div className="space-y-4">
      {requirements.map((req, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <GlowCard glowColor="emerald" className="flex items-start gap-4">
            {/* Animated checkmark */}
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
              <motion.svg
                className="h-5 w-5 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  variants={checkVariants}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                />
              </motion.svg>
            </div>

            <div>
              <h3 className="font-bold text-white">
                <span className="mr-2 text-emerald-500">{i + 1}.</span>
                {req.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {req.description}
              </p>
            </div>
          </GlowCard>
        </ScrollReveal>
      ))}
    </div>
  )
}
