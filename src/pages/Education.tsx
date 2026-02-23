import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../components/shared/SectionHeading'
import ScrollReveal from '../components/shared/ScrollReveal'
import MagneticButton from '../components/shared/MagneticButton'
import SEO from '../components/shared/SEO'
import DataCard from '../components/education/DataCard'
import AnimatedBarChart from '../components/education/AnimatedBarChart'
import InequalityExplainer from '../components/education/InequalityExplainer'
import ServiceQualityChart from '../components/education/ServiceQualityChart'
import HarassmentSection from '../components/education/HarassmentSection'
import TipCreepChart from '../components/education/TipCreepChart'
import GlobalComparison from '../components/education/GlobalComparison'
import DannyMeyerCase from '../components/education/DannyMeyerCase'
import TopicArticleGrid from '../components/education/TopicArticleGrid'
import VideoResources from '../components/education/VideoResources'
import AccordionFAQ from '../components/education/AccordionFAQ'
import StateWageMap from '../components/education/StateWageMap'
import { mockStatistics } from '../data/mockStatistics'

const keyStats = mockStatistics.filter((s) =>
  ['stat-001', 'stat-002', 'stat-003', 'stat-004'].includes(s.id)
)

const statAccentColors: Record<string, 'red' | 'amber' | 'emerald' | 'blue'> = {
  'stat-001': 'red',
  'stat-002': 'red',
  'stat-003': 'amber',
  'stat-004': 'red',
}

const wageComparisonData = [
  { label: 'Federal minimum wage', value: 7.25, maxValue: 22, color: 'emerald' as const, displayValue: '$7.25/hr' },
  { label: 'Tipped minimum (federal)', value: 2.13, maxValue: 22, color: 'red' as const, displayValue: '$2.13/hr' },
  { label: 'Avg. server hourly (w/ tips)', value: 15.36, maxValue: 22, color: 'amber' as const, displayValue: '$15.36/hr' },
  { label: 'Living wage (single adult)', value: 18.67, maxValue: 22, color: 'blue' as const, displayValue: '$18.67/hr' },
]

const povertyComparisonData = [
  { label: 'Tipped workers in poverty', value: 11.3, maxValue: 50, color: 'red' as const, displayValue: '11.3%' },
  { label: 'Tipped workers on public aid', value: 46, maxValue: 50, color: 'red' as const, displayValue: '46%' },
  { label: 'General workforce poverty', value: 4.9, maxValue: 50, color: 'emerald' as const, displayValue: '4.9%' },
  { label: 'General workforce on aid', value: 35.5, maxValue: 50, color: 'emerald' as const, displayValue: '35.5%' },
]

const educationFAQ = [
  {
    question: 'Is it true that tipping started as a way to avoid paying Black workers?',
    answer:
      'Yes. After the Civil War, the tipping system was adopted specifically to allow employers to hire formerly enslaved people without paying them wages. The practice was widely criticized at the time as un-American and anti-democratic, but restaurant industry lobbying ensured it stayed.',
    sources: [
      { label: 'Time', url: 'https://time.com/5404475/history-tipping-american-restaurants-civil-war/' },
      { label: 'EPI: Rooted in Racism', url: 'https://www.epi.org/publication/rooted-racism-tipping/' },
    ],
  },
  {
    question: 'Do tipped workers really only make $2.13/hr?',
    answer:
      'The federal tipped minimum wage is $2.13/hr and hasn\'t changed since 1991. Employers are legally required to make up the difference if tips don\'t bring workers to regular minimum wage, but enforcement is inconsistent and violations are widespread.',
    sources: [
      { label: 'Dept. of Labor', url: 'https://www.dol.gov/agencies/whd/minimum-wage/history' },
      { label: 'State Tipped Wages', url: 'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped' },
    ],
  },
  {
    question: 'Does tipping actually improve service?',
    answer:
      'No. Decades of peer-reviewed research by Michael Lynn at Cornell University found that actual service quality explains only 2-4% of the variation in tip amounts. The other 96-98% is driven by factors like customer mood, social pressure, server appearance, race, and gender.',
    sources: [
      { label: 'TippingResearch.com (Michael Lynn)', url: 'https://www.tippingresearch.com' },
      { label: 'Cornell eCommons', url: 'https://ecommons.cornell.edu/server/api/core/bitstreams/7ba6be03-64b1-4d92-aedc-63243f028a52/content' },
    ],
  },
  {
    question: 'Don\'t some servers make great money from tips?',
    answer:
      'A small percentage of servers at high-end establishments can earn well. But the median tipped worker earns around $15/hr including tips, and the system creates extreme income volatility based on shift timing, location, and \u2014 studies show \u2014 the worker\'s race and gender.',
    sources: [
      { label: 'BLS Occupational Data', url: 'https://www.bls.gov/ooh/food-preparation-and-serving/waiters-and-waitresses.htm' },
      { label: 'Cornell Hospitality Research', url: 'https://sha.cornell.edu/faculty-research/faculty/wml3/' },
    ],
  },
  {
    question: 'What is the "iPad guilt trip" effect?',
    answer:
      'Research from Temple University found that pre-service tipping \u2014 being asked to tip before you even receive service \u2014 triggers negative emotions including discomfort, uncertainty, and social pressure. It is fundamentally different from voluntarily rewarding service after the fact, and is one reason consumers increasingly feel tipping is "out of control."',
    sources: [
      { label: 'Temple University, 2025', url: 'https://research.temple.edu/news/2025/08/reward-requirement-new-tipping-culture' },
      { label: 'HBR / Bankrate', url: 'https://hbr.org/2026/01/when-tipping-becomes-a-customer-experience-problem' },
    ],
  },
  {
    question: 'What happened when Danny Meyer tried to eliminate tipping?',
    answer:
      'In 2015, Danny Meyer eliminated tipping across all 13 of his restaurants (Union Square Hospitality Group), raising prices ~21% under a "Hospitality Included" model. It narrowed the front-of-house / back-of-house wage gap, but customers saw higher prices as inflation, not fairness. He reversed the policy in 2020, concluding that the system is too deeply embedded for any single operator to change unilaterally.',
    sources: [
      { label: 'Forbes', url: 'https://www.forbes.com/sites/micahsolomon/2015/10/14/danny-meyer-eliminates-tipping-if-youre-not-danny-meyer-what-should-you-do/' },
      { label: 'Danny Meyer (LinkedIn)', url: 'https://www.linkedin.com/pulse/return-tipping-let-them-shared-danny-meyer' },
    ],
  },
  {
    question: 'Why do 19 states still allow $2.13/hr?',
    answer:
      'The FLSA tip credit provision allows employers to count customer tips toward the minimum wage obligation. The National Restaurant Association (sometimes called "the other NRA") has spent decades lobbying to keep the tipped minimum wage frozen at $2.13, successfully blocking every federal attempt to raise it since 1991. 19 states still use this federal floor.',
    sources: [
      { label: 'Dept. of Labor: Tipped Wages', url: 'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped' },
      { label: 'EPI Minimum Wage Tracker', url: 'https://www.epi.org/minimum-wage-tracker/' },
    ],
  },
  {
    question: 'What would happen if we eliminated tipping?',
    answer:
      'Studies of restaurants that moved to service-included pricing found: more stable income for workers, reduced turnover, smaller racial and gender pay gaps, and customers who reported equal or higher satisfaction with service.',
    sources: [
      { label: 'J. Behavioral Economics', url: 'https://ideas.repec.org/a/eee/soceco/v95y2021ics2214804321001269.html' },
    ],
  },
  {
    question: 'How does the US compare to other countries on tipping?',
    answer:
      'The US is a global outlier. In 66 countries, a 10% tip is considered sufficient. Japan considers tipping offensive. France includes service in the price. Australia pays service workers a full minimum wage (~$23 AUD/hr) with no tipping expectation. In 88% of countries, tips are not added to taxi fares.',
    sources: [
      { label: 'BBC Travel', url: 'https://www.bbc.com/travel/article/20230606-how-to-tip-around-the-world' },
      { label: 'VinePair', url: 'https://vinepair.com/booze-news/tipping-etiquette-worldwide/' },
    ],
  },
  {
    question: 'Are there legal challenges to the tipping system?',
    answer:
      'Several legal challenges have been attempted but largely unsuccessful. In Brown v. Meyer, a case challenging tipping practices, the suit was dismissed. The DOL tip credit provision has been upheld repeatedly. The strongest path to change appears to be state-level legislation \u2014 7 states now require full minimum wage before tips (Alaska, California, Minnesota, Montana, Nevada, Oregon, Washington).',
    sources: [
      { label: 'Dept. of Labor: Tipped Wages', url: 'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped' },
      { label: 'One Fair Wage / Food Tank', url: 'https://foodtank.com/news/2024/01/one-fair-wages-fight-to-end-subminimum-wages-is-gaining-momentum/' },
    ],
  },
]

const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: educationFAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

function Education() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300)
      }
    }
  }, [hash])

  return (
    <div className="min-h-screen bg-slate-950">
      <SEO
        title="Tipping Education Center"
        description="Learn the truth about tipping culture in America."
        path="/education"
        jsonLd={faqPageJsonLd}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeading
            title="THE UGLY TRUTH"
            subtitle="The data behind the guilt trip"
            useScatter
          />
        </div>
      </section>

      {/* Key Statistics Grid */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-center text-sm uppercase tracking-[0.3em] text-slate-500 mb-10">
              By the numbers
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {keyStats.map((stat, i) => (
              <DataCard
                key={stat.id}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                source={stat.source}
                sourceUrl={stat.sourceUrl}
                accentColor={statAccentColors[stat.id] ?? 'red'}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bar Charts */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <ScrollReveal>
              <AnimatedBarChart
                data={wageComparisonData}
                title="THE WAGE GAP"
                subtitle="Federal tipped minimum vs. reality"
                source="BLS Occupational Employment Statistics, 2023"
                sourceUrl="https://www.bls.gov/ooh/food-preparation-and-serving/waiters-and-waitresses.htm"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <AnimatedBarChart
                data={povertyComparisonData}
                title="POVERTY & PUBLIC AID"
                subtitle="Tipped workers vs. general workforce"
                source="EPI: Rooted in Racism"
                sourceUrl="https://www.epi.org/publication/rooted-racism-tipping/"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* State-by-state tipped wage data */}
      <StateWageMap />

      {/* Service Quality — the 2-4% stat */}
      <ServiceQualityChart />

      {/* Inequality Explainer (timeline + bias cards) */}
      <InequalityExplainer />

      {/* Sexual Harassment section */}
      <HarassmentSection />

      {/* Tip Creep / iPad guilt trip */}
      <TipCreepChart />

      {/* Global Comparison */}
      <GlobalComparison />

      {/* Danny Meyer case study */}
      <DannyMeyerCase />

      {/* Topic-organized article grid (replaces old ArticleGrid) */}
      <TopicArticleGrid />

      {/* Watch & Listen */}
      <VideoResources />

      {/* FAQ */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <AccordionFAQ
              title="FREQUENTLY ASKED QUESTIONS"
              items={educationFAQ}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <motion.div
              className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-3xl border border-emerald-500/20 p-10 md:p-14"
              whileHover={{
                boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)',
              }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                READY TO TAKE ACTION?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
                The facts speak for themselves. Now read the principles
                that&rsquo;ll change how you think about every transaction.
              </p>
              <Link to="/billofrights">
                <MagneticButton>
                  <span className="relative z-10 px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl text-lg inline-block hover:bg-emerald-400 transition-colors duration-200">
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

export default Education
