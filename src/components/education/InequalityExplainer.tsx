import { motion } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

interface TimelineEvent {
  year: string
  title: string
  description: string
  sourceUrl?: string
}

const timeline: TimelineEvent[] = [
  {
    year: '1865',
    title: 'Roots in Racial Exploitation',
    description:
      'After the Civil War, tipping was adopted specifically to allow employers to hire formerly enslaved Black workers without paying them wages — a practice widely criticized at the time as un-American.',
    sourceUrl: 'https://time.com/5404475/history-tipping-american-restaurants-civil-war/',
  },
  {
    year: '1966',
    title: 'The Tipped Minimum is Born',
    description:
      'Congress created a "tip credit" system, allowing employers to pay tipped workers just 50% of the minimum wage in cash wages — codifying the idea that customers should subsidize service worker pay.',
    sourceUrl: 'https://www.dol.gov/agencies/whd/minimum-wage/history',
  },
  {
    year: '1991',
    title: 'Frozen in Time',
    description:
      'The federal tipped minimum wage was set to $2.13/hr. It has not increased in over 30 years, while the cost of living has more than doubled.',
    sourceUrl: 'https://www.dol.gov/agencies/whd/minimum-wage/history',
  },
  {
    year: 'Now',
    title: 'The Guilt Economy',
    description:
      'Digital tip screens have expanded tipping to counter-service, takeout, and even self-checkout — 72% of Americans say tipping is expected in more places than five years ago.',
    sourceUrl: 'https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/',
  },
]

export default function InequalityExplainer() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Bold header */}
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight text-center">
            WHY THIS ISN&rsquo;T JUST ABOUT
            <br />
            <span className="text-red-400">YOUR WALLET</span>
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-red-500 mx-auto" />
        </ScrollReveal>

        {/* Narrative */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>
              The tipping system doesn&rsquo;t just inconvenience you at
              checkout. It actively <strong className="text-white">harms the
              most vulnerable workers</strong> in the economy &mdash; and the
              data is damning.
            </p>
            <p>
              Moving away from tipping isn&rsquo;t selfish. It&rsquo;s how we{' '}
              <strong className="text-emerald-400">
                protect vulnerable classes
              </strong>{' '}
              from a system that was never designed to be fair.
            </p>
          </div>
        </ScrollReveal>

        {/* Pull quote */}
        <ScrollReveal delay={0.2}>
          <blockquote className="mt-12 pl-6 border-l-4 border-red-500/60 text-xl md:text-2xl text-slate-200 italic leading-relaxed">
            &ldquo;When your barista&rsquo;s rent depends on whether you
            &lsquo;like their vibe,&rsquo; that&rsquo;s not a system &mdash;
            it&rsquo;s discrimination with extra steps.&rdquo;
          </blockquote>
        </ScrollReveal>

        {/* Bias section */}
        <ScrollReveal delay={0.1}>
          <div className="mt-16 grid sm:grid-cols-2 gap-6">
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
              <p className="text-red-400 font-black text-sm uppercase tracking-wider mb-2">
                Gender Bias
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Two-thirds of tipped workers are women, yet they earn roughly 78
                cents on the male dollar. They also face sexual harassment at{' '}
                <strong className="text-white">twice the rate</strong> of
                non-tipped workers &mdash; often tolerating it to protect
                income.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <a href="https://www.epi.org/publication/waiting-for-change-tipped-minimum-wage/" target="_blank" rel="noopener noreferrer" className="text-red-400/50 hover:text-red-400 underline decoration-red-500/20 hover:decoration-red-400/50 transition-colors">EPI</a>
                <a href="https://nwlc.org/resource/one-fair-wage/" target="_blank" rel="noopener noreferrer" className="text-red-400/50 hover:text-red-400 underline decoration-red-500/20 hover:decoration-red-400/50 transition-colors">NWLC</a>
                <a href="https://rocunited.org/publications/" target="_blank" rel="noopener noreferrer" className="text-red-400/50 hover:text-red-400 underline decoration-red-500/20 hover:decoration-red-400/50 transition-colors">ROC United</a>
              </div>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
              <p className="text-red-400 font-black text-sm uppercase tracking-wider mb-2">
                Racial Bias
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Peer-reviewed research shows servers of color receive 15-20%
                less in tips for <strong className="text-white">identical
                service quality</strong>. The tipped wage system converts
                implicit bias directly into income inequality.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <a href="https://sha.cornell.edu/faculty-research/faculty/wml3/" target="_blank" rel="noopener noreferrer" className="text-red-400/50 hover:text-red-400 underline decoration-red-500/20 hover:decoration-red-400/50 transition-colors">Cornell SHA</a>
                <a href="https://ideas.repec.org/a/eee/soceco/v95y2021ics2214804321001269.html" target="_blank" rel="noopener noreferrer" className="text-red-400/50 hover:text-red-400 underline decoration-red-500/20 hover:decoration-red-400/50 transition-colors">J. Behavioral Economics</a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-10">
              A BRIEF HISTORY OF{' '}
              <span className="text-amber-400">EXPLOITATION</span>
            </h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[27px] top-0 bottom-0 w-px bg-slate-700" />

              <div className="space-y-10">
                {timeline.map((event, i) => (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="relative pl-16"
                  >
                    {/* Dot */}
                    <div className="absolute left-[20px] top-1 w-[15px] h-[15px] rounded-full bg-slate-900 border-2 border-amber-500" />

                    <p className="text-amber-400 font-black text-sm tracking-wider">
                      {event.year}
                    </p>
                    <h4 className="text-white font-bold text-lg mt-1">
                      {event.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed mt-1">
                      {event.description}
                      {event.sourceUrl && (
                        <>
                          {' '}
                          <a
                            href={event.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-500/60 hover:text-amber-400 underline decoration-amber-500/30 hover:decoration-amber-400/60 transition-colors text-xs"
                          >
                            [source]
                          </a>
                        </>
                      )}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
