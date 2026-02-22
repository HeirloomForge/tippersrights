import { motion } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

interface TimelineStep {
  year: string
  title: string
  description: string
  icon: 'launch' | 'progress' | 'reversal'
}

const steps: TimelineStep[] = [
  {
    year: '2015',
    title: 'The Bold Move',
    icon: 'launch',
    description:
      'Danny Meyer, founder of Union Square Hospitality Group (Shake Shack, Gramercy Tavern, Union Square Cafe), announces the elimination of tipping across all 13 of his full-service restaurants. Prices rise ~21% under a "Hospitality Included" model.',
  },
  {
    year: '2016-2019',
    title: 'The Results',
    icon: 'progress',
    description:
      'The policy makes real strides: the front-of-house vs. back-of-house wage gap narrows significantly. Kitchen workers see meaningful raises. But customers increasingly perceive higher menu prices as inflation rather than fairness — and some staff leave for tipped jobs elsewhere.',
  },
  {
    year: '2020',
    title: 'The Reversal',
    icon: 'reversal',
    description:
      'Facing pandemic pressures and competitive market dynamics, Meyer returns to tipping. He publicly states the system is too deeply embedded in American culture for any single operator to change unilaterally. The experiment ends — not because it was wrong, but because the system won.',
  },
]

const iconColors = {
  launch: 'border-emerald-500 bg-emerald-500/20',
  progress: 'border-amber-500 bg-amber-500/20',
  reversal: 'border-red-500 bg-red-500/20',
}

const iconSymbols = {
  launch: (
    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  progress: (
    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  reversal: (
    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
}

export default function DannyMeyerCase() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              THE DANNY MEYER
              <br />
              <span className="text-amber-400">EXPERIMENT</span>
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500 mx-auto" />
            <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
              What happens when America&rsquo;s most influential restaurateur
              tries to kill tipping?
            </p>
          </div>
        </ScrollReveal>

        {/* Case study narrative */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-amber-500/20 overflow-hidden">
            {/* Header */}
            <div className="bg-amber-500/5 px-6 md:px-8 py-5 border-b border-amber-500/10">
              <p className="text-amber-400 font-black text-xs uppercase tracking-[0.2em]">
                Case Study
              </p>
              <p className="text-white font-bold text-lg mt-1">
                Union Square Hospitality Group &mdash; &ldquo;Hospitality Included&rdquo;
              </p>
            </div>

            {/* Timeline */}
            <div className="px-6 md:px-8 py-8">
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-700/50" />

                <div className="space-y-8">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.15,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="relative pl-12"
                    >
                      {/* Icon dot */}
                      <div
                        className={`absolute left-0 top-0 w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center ${iconColors[step.icon]}`}
                      >
                        {iconSymbols[step.icon]}
                      </div>

                      <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">
                        {step.year}
                      </p>
                      <h4 className="text-white font-bold text-lg mt-0.5">
                        {step.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed mt-2">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Takeaway */}
            <div className="bg-red-500/5 px-6 md:px-8 py-6 border-t border-red-500/10">
              <p className="text-red-400 font-bold text-sm uppercase tracking-wider mb-2">
                The Lesson
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Individual businesses cannot unilaterally fix a systemic problem.
                When one restaurant raises prices 21% while competitors keep
                theirs low (with hidden tip costs), customers perceive unfairness
                &mdash; even when the &ldquo;expensive&rdquo; restaurant is
                actually the fairer one. <strong className="text-white">
                This requires policy change, not individual heroism.</strong>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal delay={0.2}>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs italic text-slate-600">
            <span>Sources:</span>
            <a
              href="https://www.forbes.com/sites/micahsolomon/2015/10/14/danny-meyer-eliminates-tipping-if-youre-not-danny-meyer-what-should-you-do/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
            >
              Forbes
            </a>
            <a
              href="https://www.linkedin.com/pulse/return-tipping-let-them-shared-danny-meyer"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
            >
              Danny Meyer (LinkedIn)
            </a>
            <a
              href="https://www.youtube.com/watch?v=h3B2-_SLRBQ"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
            >
              CBS News
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
