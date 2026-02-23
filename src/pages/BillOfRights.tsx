import ScrollReveal from '../components/shared/ScrollReveal'
import SEO from '../components/shared/SEO'
import TypewriterText from '../components/bill/TypewriterText'
import RightsArticle from '../components/bill/RightsArticle'
import StickyActions from '../components/bill/StickyActions'

const ARTICLES = [
  {
    title: 'The Right to Decline',
    body: 'No consumer shall be compelled to add gratuity for counter service, self-service, or basic transactional exchanges.',
  },
  {
    title: 'The Right to Transparent Pricing',
    body: 'All businesses shall display final prices inclusive of labor costs. No hidden subsidies through tips.',
  },
  {
    title: 'The Right to Know',
    body: 'Consumers have the right to know whether staff receive a living wage before being asked to supplement their income.',
  },
  {
    title: 'The Right to Discretion',
    body: 'Tips shall be reserved for exceptional, personalized service that goes above and beyond the baseline transaction.',
  },
  {
    title: 'The Right to a Guilt-Free Checkout',
    body: 'No point-of-sale system shall employ manipulative design, social pressure, or default selections to coerce gratuity.',
  },
  {
    title: 'The Right to Equal Service',
    body: 'No consumer shall receive diminished service based on their tipping history, appearance, or perceived generosity.',
  },
  {
    title: 'The Right to Transparency',
    body: 'Consumers have the right to know exactly what percentage of their tip goes to the service provider vs. the business.',
  },
  {
    title: 'The Right to Advocate',
    body: 'Supporting businesses that pay fair wages and eliminate tip culture is a consumer right, not a radical act.',
  },
  {
    title: 'The Right to Refuse',
    body: 'Declining a tip prompt is not an act of cruelty. It is an act of principle.',
  },
  {
    title: 'The Right to a Better System',
    body: 'We affirm that a world where workers earn a fair wage without relying on the variable generosity of strangers is not just possible \u2014 it is overdue.',
  },
  {
    title: 'The Protection of the Vulnerable',
    body: 'We recognize that the tipping system disproportionately harms marginalized groups, subjecting their livelihood to the implicit biases of the public. A worker\u2019s rent should not depend on a stranger\u2019s mood. We advocate for the abolition of the sub-minimum wage and the establishment of equitable, predictable compensation for all workers.',
  },
]

const PREAMBLE =
  'We, the consumers of this nation, weary of manufactured guilt and digital coercion, do hereby establish these inalienable rights. Let it be known that the act of purchasing goods and services should not come bundled with moral judgment, algorithmic shame, or the silent expectation of subsidizing a broken labor system.'

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "The Tipper's Bill of Rights",
  description: 'Read the 11 articles that define your rights as a consumer.',
  author: {
    '@type': 'Organization',
    name: "Tipper's Bill of Rights",
  },
}

function BillOfRights() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <SEO
        title="The Tipper's Bill of Rights"
        description="Read the 11 articles that define your rights as a consumer."
        path="/billofrights"
        ogType="article"
        jsonLd={articleJsonLd}
      />

      {/* Parchment texture overlay via CSS gradients */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse at 20% 20%, rgba(180, 140, 80, 0.03) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 60%, rgba(180, 140, 80, 0.02) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 90%, rgba(120, 90, 50, 0.03) 0%, transparent 40%)',
          ].join(', '),
        }}
      />

      <article className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-32">
        {/* Header */}
        <ScrollReveal variant="fadeIn" duration={1}>
          <header className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-4">
              THE TIPPER&rsquo;S
              <br />
              <span className="text-amber-400">BILL OF RIGHTS</span>
            </h1>

            <p className="text-lg md:text-xl font-serif text-slate-400 italic mt-6">
              A Declaration of Consumer Independence
            </p>

            <p className="text-sm text-slate-600 mt-3 tracking-widest uppercase">
              Ratified by the People, {new Date().getFullYear()}
            </p>

            {/* Decorative rule */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
              <div className="w-2 h-2 rotate-45 border border-amber-400/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
            </div>
          </header>
        </ScrollReveal>

        {/* Preamble */}
        <section className="mb-20">
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <h2 className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-6 text-center">
              Preamble
            </h2>
          </ScrollReveal>
          <TypewriterText
            text={PREAMBLE}
            speed={60}
            className="text-lg md:text-xl font-serif text-slate-300 leading-relaxed text-center"
            as="p"
            showCursor={false}
          />
        </section>

        {/* Decorative separator */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* The Articles */}
        <section>
          <ScrollReveal variant="fadeUp">
            <h2 className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-10 text-center">
              The Articles
            </h2>
          </ScrollReveal>

          <div>
            {ARTICLES.map((article, i) => (
              <RightsArticle
                key={i}
                number={i + 1}
                title={article.title}
                body={article.body}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Closing */}
        <ScrollReveal variant="fadeIn" delay={0.3}>
          <footer className="mt-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
              <div className="w-2 h-2 rotate-45 border border-amber-400/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
            </div>

            <p className="text-2xl md:text-3xl font-serif italic text-white mb-2">
              Signed, The Movement
            </p>

            {/* Decorative flourish */}
            <svg
              className="mx-auto mt-6 text-amber-400/30"
              width="120"
              height="24"
              viewBox="0 0 120 24"
              fill="none"
            >
              <path
                d="M10 12 C 30 2, 40 22, 60 12 S 90 2, 110 12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="60" cy="12" r="2" fill="currentColor" />
            </svg>
          </footer>
        </ScrollReveal>
      </article>

      <StickyActions />
    </div>
  )
}

export default BillOfRights
