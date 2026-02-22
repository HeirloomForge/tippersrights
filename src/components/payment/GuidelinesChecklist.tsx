import GlowCard from '../shared/GlowCard.tsx'
import ScrollReveal from '../shared/ScrollReveal.tsx'

const guidelines = [
  {
    title: 'No Pre-Selected Tip Amounts',
    description:
      'Default to no selection. Customers choose to tip, not un-choose a pre-picked percentage.',
  },
  {
    title: '"Skip" Must Be Equally Prominent',
    description:
      'The option to skip a tip must be the same size, color, and visual weight as the tip buttons. No hiding it.',
  },
  {
    title: 'Display Clear Totals',
    description:
      'Show the total before and after any optional tip. The customer should always know what they owe.',
  },
  {
    title: 'No Emotional or Guilt-Inducing Copy',
    description:
      'No "Your server worked hard today" or sad emoji faces. Keep it transactional, not emotional.',
  },
  {
    title: 'Allow Businesses to Disable Tip Prompts',
    description:
      'Give business owners a simple toggle to remove tip screens entirely from their checkout flow.',
  },
  {
    title: '"No Tip" as the First Option',
    description:
      'Present the opt-out first, not buried at the bottom. Respect the customer\'s right to decline.',
  },
  {
    title: 'No Tip Screens for Self-Service',
    description:
      'If the customer poured their own coffee or picked up their own food, there is no service to tip for.',
  },
  {
    title: 'Transparent Tip Reporting',
    description:
      'Report where tip money goes. Business owners and customers deserve to know tips reach the staff.',
  },
]

export default function GuidelinesChecklist() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {guidelines.map((g, i) => (
        <ScrollReveal key={i} delay={i * 0.08}>
          <GlowCard glowColor="blue" className="h-full">
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-400">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-white">{g.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {g.description}
                </p>
              </div>
            </div>
          </GlowCard>
        </ScrollReveal>
      ))}
    </div>
  )
}
