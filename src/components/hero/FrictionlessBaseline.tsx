import { motion } from 'framer-motion'
import GlowCard from '../shared/GlowCard'
import SectionHeading from '../shared/SectionHeading'

const baselineItems = [
  'Processing a transaction at a register',
  'Handing over a product you already selected',
  'Pouring a pre-made drip coffee',
  'Calling out your name for a mobile order',
]

const premiumItems = [
  'Expert wine pairing for a five-course meal',
  'Personal shopping consultation with curated picks',
  'Custom tailoring advice with measurements',
  'Curated travel planning with insider knowledge',
]

export default function FrictionlessBaseline() {
  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeading
        title="THE FRICTIONLESS BASELINE"
        subtitle="Not all transactions are created equal. Know when a tip reflects genuine gratitude — and when it's manufactured guilt."
        useScatter
        align="center"
      />

      <div className="mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Baseline column */}
        <GlowCard glowColor="amber" className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-lg">
              &#128722;
            </div>
            <h3 className="text-xl font-black text-amber-400 uppercase tracking-wide">
              The Baseline
            </h3>
          </div>

          <p className="text-slate-400 text-sm mb-6">
            These are the minimum requirements of the job. No expertise,
            no discretion, no personalization.
          </p>

          <ul className="space-y-3">
            {baselineItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-slate-300 text-sm"
              >
                <span className="mt-1 text-amber-500 text-xs">&#10005;</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400/80">
              Verdict: Zero tip expected
            </p>
          </div>
        </GlowCard>

        {/* Premium column */}
        <GlowCard glowColor="emerald" className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg">
              &#11088;
            </div>
            <h3 className="text-xl font-black text-emerald-400 uppercase tracking-wide">
              The Premium
            </h3>
          </div>

          <p className="text-slate-400 text-sm mb-6">
            These involve expertise, personal attention, and genuine
            discretion. This is where gratitude belongs.
          </p>

          <ul className="space-y-3">
            {premiumItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-slate-300 text-sm"
              >
                <span className="mt-1 text-emerald-500 text-xs">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400/80">
              Verdict: Tip-worthy service
            </p>
          </div>
        </GlowCard>
      </div>

      {/* Flipped iPad herd mentality attack */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="mt-16 md:mt-20 text-center max-w-3xl mx-auto"
      >
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            The Flipped iPad{' '}
            <span className="text-emerald-400">Herd Mentality</span>
          </h3>

          <p className="text-slate-400 leading-relaxed mb-6">
            That tablet spinning toward you with pre-loaded 25% buttons
            isn&rsquo;t asking for your opinion &mdash; it&rsquo;s weaponizing
            social pressure. A line of customers behind you, an employee
            watching, and three generous options staring you down. The
            &ldquo;No Tip&rdquo; button? Buried at the bottom in
            the smallest text possible.
          </p>

          <p className="text-slate-400 leading-relaxed mb-8">
            This isn&rsquo;t generosity. It&rsquo;s a guilt-extraction
            machine built by POS companies that profit from every
            percentage point. You deserve the confidence to say
            &ldquo;no&rdquo; without shame.
          </p>

          <div className="inline-block px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest">
              Consumer confidence starts here
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
