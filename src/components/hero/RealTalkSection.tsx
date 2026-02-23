import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function RealTalkSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        {/* Section label */}
        <p className="text-center text-sm uppercase tracking-[0.3em] text-slate-500 mb-8">
          Real talk
        </p>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            But the system is{' '}
            <span className="text-amber-400">still broken.</span>
          </h2>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              Here&rsquo;s the uncomfortable truth: while we fight to change
              tipping culture, millions of workers in restaurants, bars, and
              service industries are paid a{' '}
              <strong className="text-white">sub-minimum wage</strong> &mdash;
              sometimes as low as $2.13/hour &mdash; because the law assumes
              tips will make up the difference.
            </p>

            <p>
              Until that changes,{' '}
              <strong className="text-white">
                not tipping these workers makes us the problem.
              </strong>{' '}
              They didn&rsquo;t design the system. They&rsquo;re surviving it.
              If you sit down at a restaurant that pays $2.13/hour and stiff
              your server, you&rsquo;re not making a statement &mdash;
              you&rsquo;re just not paying someone for their labor.
            </p>

            <p>
              The Bill of Rights isn&rsquo;t about refusing to tip. It&rsquo;s
              about knowing <em>when</em> tipping is subsidizing a broken model
              vs. when it&rsquo;s the only thing standing between a worker and
              an unpaid shift. In many states, those are two very different
              situations.
            </p>
          </div>

          {/* State wage CTA */}
          <div className="mt-8 p-6 rounded-xl bg-slate-900/60 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  Does your state still pay a tipped minimum wage?
                </h3>
                <p className="text-sm text-slate-400">
                  Some states pay servers as little as $2.13/hr. Others require
                  full minimum wage regardless. Know the law where you live
                  so you know when your tip is a kindness vs. a lifeline.
                </p>
              </div>
              <Link
                to="/education#state-wages"
                className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-amber-400 transition-colors"
              >
                Check Your State
              </Link>
            </div>
          </div>

          {/* Certified businesses CTA */}
          <div className="mt-4 p-6 rounded-xl bg-slate-900/60 border border-emerald-500/20">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  The real solution? Support businesses doing it right.
                </h3>
                <p className="text-sm text-slate-400">
                  Certified businesses pay fair wages and don&rsquo;t guilt-trip
                  you at checkout. Search for them in your area, support them
                  with your dollars, and let the market do the talking.
                </p>
              </div>
              <Link
                to="/directory"
                className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-emerald-500 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-emerald-400 transition-colors"
              >
                Find Certified
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
