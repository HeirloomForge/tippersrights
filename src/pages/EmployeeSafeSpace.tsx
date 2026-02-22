import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/shared/ScrollReveal'
import GlowCard from '../components/shared/GlowCard'
import MagneticButton from '../components/shared/MagneticButton'
import AccordionFAQ from '../components/education/AccordionFAQ'

interface TipCard {
  title: string
  description: string
}

const supportTips: TipCard[] = [
  {
    title: 'Know Your Rights',
    description:
      'Federal law requires employers to make up the difference if tips don\'t bring you to minimum wage. Document your hours and tips. If your employer isn\'t complying, that\'s wage theft.',
  },
  {
    title: 'Talk to Coworkers Privately',
    description:
      'You\'re legally protected when discussing wages with coworkers. Start quiet conversations. You\'ll likely find most people share your frustrations but feel alone.',
  },
  {
    title: 'Support Fair-Wage Businesses',
    description:
      'When you eat out or shop, choose businesses that pay fair wages. Every dollar spent at a tip-free establishment is a vote for the system you deserve.',
  },
  {
    title: 'Share Your Story Anonymously',
    description:
      'Your experience matters. Anonymous stories from real workers are one of the most powerful tools for changing public opinion. We protect your identity.',
  },
  {
    title: 'Connect With Organizations',
    description:
      'Groups like One Fair Wage and ROC United are fighting for your rights at the policy level. Even signing a petition or sharing their work helps build momentum.',
  },
  {
    title: 'Don\'t Blame Yourself',
    description:
      'This system existed long before you entered it. Working within it doesn\'t make you a hypocrite. You\'re surviving a broken system while helping to fix it.',
  },
]

const peerPressureScenarios = [
  {
    question: 'What if coworkers judge me for supporting the movement?',
    answer:
      'Most service workers privately agree the system is broken. You don\'t have to announce anything publicly. Supporting fair wages doesn\'t mean you\'re anti-tip right now -- it means you want a future where your income doesn\'t depend on customer mood. That\'s a position most reasonable people respect.',
  },
  {
    question: 'What if my manager pushes tip culture and guilt-tripping customers?',
    answer:
      'Document everything. Managers who pressure workers to guilt customers into tipping are often covering for below-minimum-wage violations. You can report wage violations to your state\'s Department of Labor anonymously. Your manager benefits from the current system -- you don\'t have to.',
  },
  {
    question: 'Am I a hypocrite if I work for tips but support the movement?',
    answer:
      'Absolutely not. You didn\'t create this system. You need to eat and pay rent within the reality that exists today. Supporting change while surviving the current system isn\'t hypocrisy -- it\'s pragmatism. Every movement in history was built by people living within the systems they sought to change.',
  },
  {
    question: 'What if customers treat me worse because of the movement?',
    answer:
      'The movement explicitly states that while the tipping system is broken, workers should never be punished. Anyone using this movement as an excuse to stiff a server has fundamentally misunderstood it. We actively educate consumers that until the system changes, workers depend on tips.',
  },
  {
    question: 'How do I handle a slow night when I barely make anything?',
    answer:
      'Track every shift. If your tips + base wage ever fall below minimum wage for a pay period, your employer is legally required to cover the gap. Many don\'t. Keeping records protects you and builds evidence for the systemic problem.',
  },
]

const workerFAQ = [
  {
    question: 'Does this movement want to eliminate my tips right now?',
    answer:
      'No. The movement advocates for systemic change: fair base wages paid by employers. Until that happens, we actively encourage consumers to tip service workers. The goal is a future where your income doesn\'t depend on customer generosity, not to take money out of your pocket today.',
  },
  {
    question: 'What does a post-tipping world actually look like for me?',
    answer:
      'You\'d receive a predictable, livable wage from your employer -- like workers in virtually every other industry. Your income wouldn\'t fluctuate based on weather, day of the week, or whether a customer liked your haircut. Studies show workers in tip-free restaurants report higher job satisfaction.',
  },
  {
    question: 'Can I get fired for supporting fair wage advocacy?',
    answer:
      'Federal labor law protects your right to engage in "concerted activity" for mutual aid. Discussing wages with coworkers and advocating for fair pay are legally protected activities. If you face retaliation, organizations like the NLRB can help. Document everything.',
  },
  {
    question: 'What about the good nights when I make great tips?',
    answer:
      'We hear you. Some shifts can be lucrative. But average it out over a year -- the slow Tuesdays, the stiffed checks, the double shifts with nothing to show. Most tipped workers\' annual income tells a very different story than their best Saturday night.',
  },
]

const resources = [
  {
    name: 'One Fair Wage',
    description: 'National advocacy for fair wages in tipped industries',
    url: '#',
  },
  {
    name: 'ROC United',
    description: 'Restaurant Opportunities Centers - worker organizing',
    url: '#',
  },
  {
    name: 'Dept. of Labor Wage Finder',
    description: 'Look up minimum wage laws in your state',
    url: '#',
  },
  {
    name: 'NLRB Worker Rights',
    description: 'Your federal rights as an employee',
    url: '#',
  },
  {
    name: 'Tip Wage Calculator',
    description: 'Calculate your real hourly rate including tips',
    url: '#',
  },
]

function EmployeeSafeSpace() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero - softer tone */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Warm amber glow instead of cool emerald */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
              THE EMPLOYEE{' '}
              <span className="text-amber-400">SAFE SPACE</span>
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-amber-500 mx-auto" />
            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              You serve others. This space serves you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* "We See You" Section */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-amber-500/10 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                We See You.
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  You didn&rsquo;t break the tipping system. You&rsquo;re just
                  trying to pay rent inside of it.
                </p>
                <p>
                  You smile through the awkward iPad flip. You absorb the
                  guilt of customers who feel pressured. You weather the slow
                  shifts, the no-tip tables, the impossible math of making
                  $2.13/hr work.
                </p>
                <p className="text-amber-300 font-medium">
                  This movement isn&rsquo;t against you. It&rsquo;s{' '}
                  <em>for</em> you. Every part of it.
                </p>
                <p>
                  The goal has never been to take money out of your pocket
                  today. It&rsquo;s to build a world where your landlord
                  doesn&rsquo;t care whether it was a good tip night.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How to Support as a Worker */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 text-center">
              HOW TO SUPPORT THE MOVEMENT
            </h2>
            <p className="text-slate-500 text-center mb-10">
              As a worker &mdash; on your terms, at your pace
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportTips.map((tip, i) => (
              <ScrollReveal key={tip.title} delay={i * 0.08}>
                <GlowCard glowColor="amber" className="h-full">
                  <h3 className="text-white font-bold text-base mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Handling Peer Pressure */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              HANDLING{' '}
              <span className="text-amber-400">PEER PRESSURE</span>
            </h2>
            <p className="text-slate-500 mb-10">
              Real scenarios. Honest answers.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <AccordionFAQ items={peerPressureScenarios} accentColor="amber" />
          </ScrollReveal>
        </div>
      </section>

      {/* Resources */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              RESOURCES
            </h2>
            <p className="text-slate-500 mb-8">
              Organizations, tools, and information for service workers
            </p>
          </ScrollReveal>

          <div className="space-y-3">
            {resources.map((resource, i) => (
              <ScrollReveal key={resource.name} delay={i * 0.06}>
                <motion.a
                  href={resource.url}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-colors duration-300 group"
                >
                  <div>
                    <p className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors duration-200">
                      {resource.name}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {resource.description}
                    </p>
                  </div>
                  <span className="text-slate-600 group-hover:text-amber-400 transition-colors duration-200">
                    &rarr;
                  </span>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Worker FAQ */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <AccordionFAQ
              title="WORKER FAQ"
              items={workerFAQ}
              accentColor="amber"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Warm CTA */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <motion.div
              className="bg-gradient-to-br from-amber-500/10 to-slate-900 rounded-3xl border border-amber-500/15 p-10 md:p-14"
              whileHover={{
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.08)',
              }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                YOU DESERVE BETTER.
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                Read the principles driving this movement &mdash; written with
                you in mind.
              </p>
              <Link to="/billofrights">
                <MagneticButton>
                  <span className="relative z-10 px-8 py-4 bg-amber-500 text-slate-950 font-bold rounded-xl text-lg inline-block hover:bg-amber-400 transition-colors duration-200">
                    Read the Bill of Rights
                  </span>
                </MagneticButton>
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

export default EmployeeSafeSpace
