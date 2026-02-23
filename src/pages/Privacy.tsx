import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'
import ScrollReveal from '../components/shared/ScrollReveal'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SEO
        title="Privacy Policy"
        description="How we handle your data."
        path="/privacy"
      />

      {/* Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="PRIVACY POLICY"
            subtitle="How we handle your data — with more respect than a 47% suggested tip."
          />
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-sm text-slate-500 mb-12 text-center tracking-wide">
              Last Updated: February 23, 2026
            </p>
          </ScrollReveal>

          {/* Preamble */}
          <ScrollReveal>
            <div className="mb-12">
              <p className="text-slate-300 leading-relaxed font-serif italic text-lg">
                We, the stewards of the Tipper&rsquo;s Bill of Rights, hold these truths to be self-evident:
                that your personal data is yours, that no checkout screen shall extract more information than
                the transaction requires, and that the right to privacy is as fundamental as the right to
                decline a 35% pre-selected tip on a cup of drip coffee.
              </p>
            </div>
          </ScrollReveal>

          {/* Section 1: What We Collect */}
          <PolicySection title="ARTICLE I: INTELLIGENCE WE GATHER" id="data-collection">
            <p>
              When you affix your name to our sacred petition, we collect certain intelligence &mdash;
              your <strong>first name</strong>, <strong>last name</strong>, <strong>city</strong>,{' '}
              <strong>state</strong>, <strong>zip code</strong>, and optionally your{' '}
              <strong>email address</strong>. This is not surveillance. This is solidarity.
            </p>
            <p>
              When you submit your tale of tipping woe to the <strong>Hall of Absurdity</strong>, we
              collect your <strong>story text</strong>, <strong>category</strong>, and optionally your{' '}
              <strong>name</strong> and <strong>location</strong>. Your pain deserves a platform, and
              we handle it with care.
            </p>
            <p>
              When a business applies for <strong>certification</strong>, we collect the{' '}
              <strong>business name</strong>, <strong>address</strong>, <strong>city</strong>,{' '}
              <strong>state</strong>, <strong>zip code</strong>, <strong>category</strong>,{' '}
              <strong>website</strong>, <strong>contact name</strong>, <strong>contact email</strong>,
              and <strong>self-certification claims</strong> regarding their employment and
              point-of-sale practices.
            </p>
            <p>
              On the technical front, your <strong>IP address</strong> is SHA-256 hashed before storage
              for rate limiting purposes. The raw address is never stored. We do not log browsing
              behavior, install tracking pixels, or run any form of behavioral analytics.
            </p>
          </PolicySection>

          {/* Section 2: What We Do NOT Collect */}
          <PolicySection title="ARTICLE II: WHAT WE REFUSE TO TOUCH" id="data-not-collected">
            <p>
              We do not handle your coin. Not a single piece of copper passes through our hands. Your
              financial transactions are conducted entirely through the fortified vaults of{' '}
              <strong>Stripe, Inc.</strong>, a payment processor of considerable repute. We never see
              your card number. We never see your billing address. We never want to.
            </p>
            <p>
              We do not collect social media credentials, install advertising cookies, run Google
              Analytics, deploy tracking pixels, or engage in any form of behavioral profiling. We
              believe your browsing habits are your own affair, and frankly, we have better things
              to do.
            </p>
          </PolicySection>

          {/* Section 3: How Data is Used */}
          <PolicySection title="ARTICLE III: PURPOSE OF THE INTELLIGENCE" id="data-usage">
            <p>Your data serves the movement, not a marketing algorithm:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Petition data</strong> &mdash; counted toward our signature total,
                mapped to congressional districts for legislative advocacy, and used to demonstrate
                the breadth of this movement
              </li>
              <li>
                <strong>Business certification data</strong> &mdash; displayed in our public
                Safe Zone Directory so consumers can find businesses that do right by their workers
              </li>
              <li>
                <strong>Hall of Absurdity stories</strong> &mdash; displayed publicly (with or without
                attribution per your choice) to document the absurdity of modern tipping culture
              </li>
              <li>
                <strong>Aggregate trend analysis</strong> &mdash; understanding where tipping fatigue
                is most acute, which business categories are leading change, and where legislative
                energy should focus
              </li>
            </ul>
            <p>
              Your data is never sold, never shared with advertisers, and never used to build a
              marketing profile. Period.
            </p>
          </PolicySection>

          {/* Section 4: How Data is Stored */}
          <PolicySection title="ARTICLE IV: THE VAULT" id="data-storage">
            <p>
              All data is stored in <strong>Cloudflare D1</strong>, a SQLite-based database
              operating at Cloudflare&rsquo;s edge network. Data is encrypted at rest and
              processed at US-based Cloudflare data centers. IP addresses are SHA-256 hashed
              before storage &mdash; we do not retain raw IP addresses in any system.
            </p>
          </PolicySection>

          {/* Section 5: Third Parties */}
          <PolicySection title="ARTICLE V: OUR ALLIES" id="third-parties">
            <p>We share data with exactly three third-party services, and only as necessary:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Stripe</strong> &mdash; processes all payments for merchandise purchases.
                Stripe&rsquo;s handling of your payment data is governed by the{' '}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Stripe Privacy Policy
                </a>
                . We never receive or store your card details.
              </li>
              <li>
                <strong>Printful</strong> &mdash; fulfills merchandise orders. When you purchase
                merch, your shipping name and address are shared with Printful solely for order
                fulfillment. See the{' '}
                <a
                  href="https://www.printful.com/policies/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Printful Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Cloudflare</strong> &mdash; hosts and serves this website. All data
                processed at Cloudflare&rsquo;s edge locations per their{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Privacy Policy
                </a>
                .
              </li>
            </ul>
          </PolicySection>

          {/* Section 6: Data Retention */}
          <PolicySection title="ARTICLE VI: HOW LONG WE REMEMBER" id="data-retention">
            <p>
              Petition signatures are retained indefinitely &mdash; they are the lifeblood of the
              movement. Business certification data is retained as long as the certification remains
              active. Hall of Absurdity stories are retained as long as they remain published.
              Hashed IP addresses used for rate limiting are retained for 24 hours, then purged.
            </p>
            <p>
              If you request deletion (see Article VIII below), we will remove your data within
              30 days.
            </p>
          </PolicySection>

          {/* Section 7: Cookies */}
          <PolicySection title="ARTICLE VII: ON THE MATTER OF COOKIES" id="cookies">
            <p>
              We use only essential, functional cookies required for the site to operate. We deploy
              no advertising cookies, no tracking cookies, no analytics cookies, and no third-party
              cookies of any kind. The only cookies you&rsquo;ll encounter here are the ones that
              keep the site running &mdash; not the ones that follow you across the internet like
              a guilt-driven tip prompt.
            </p>
          </PolicySection>

          {/* Section 8: CCPA Rights */}
          <PolicySection title="ARTICLE VIII: CALIFORNIA RESIDENTS — YOUR RIGHTS" id="ccpa">
            <p>
              If you are a resident of the great State of California, the California Consumer
              Privacy Act (CCPA) grants you the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Right to Know</strong> &mdash; You may request a full accounting of what
                personal data we hold about you.
              </li>
              <li>
                <strong>Right to Delete</strong> &mdash; You may request deletion of your personal
                data. We shall strike your name from the ledger within 30 days, no questions asked,
                no guilt-inducing pop-up deployed.
              </li>
              <li>
                <strong>Right to Opt-Out of Sale</strong> &mdash; We do not sell personal data. Not
                now. Not ever. There is nothing to opt out of, but we felt you should know.
              </li>
            </ul>
            <p>
              To exercise any of these rights, send word to{' '}
              <a
                href="mailto:dave@tippersbillofrights.com"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                dave@tippersbillofrights.com
              </a>
              .
            </p>
          </PolicySection>

          {/* Section 9: Children */}
          <PolicySection title="ARTICLE IX: THE YOUNG AMONG US" id="children">
            <p>
              We do not knowingly collect personal information from individuals under the age
              of 13. If you believe a child has provided us with personal data, contact us
              immediately and we will remove it. The revolution requires informed consent.
            </p>
          </PolicySection>

          {/* Section 10: Security */}
          <PolicySection title="ARTICLE X: OUR DEFENSES" id="security">
            <p>
              We employ reasonable security measures to protect your data, including encryption
              at rest, hashed IP addresses (never raw), HTTPS-only transport, and Cloudflare&rsquo;s
              DDoS protection and Web Application Firewall. No system is impervious, but we take
              your data security more seriously than most restaurants take their &ldquo;suggested
              gratuity&rdquo; math.
            </p>
          </PolicySection>

          {/* Section 11: Changes */}
          <PolicySection title="ARTICLE XI: AMENDMENTS" id="changes">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the
              &ldquo;Last Updated&rdquo; date at the top of this page. Continued use of the site
              after changes constitutes acceptance of the revised policy. Unlike a POS system,
              we will never silently change the terms and hope you don&rsquo;t notice.
            </p>
          </PolicySection>

          {/* Section 12: Contact */}
          <PolicySection title="ARTICLE XII: PETITIONS, GRIEVANCES & GENERAL CORRESPONDENCE" id="contact">
            <p>
              For all privacy-related inquiries, data deletion requests, or general concerns
              about how we handle your information, contact us at:
            </p>
            <p className="mt-4">
              <a
                href="mailto:dave@tippersbillofrights.com"
                className="text-emerald-400 hover:text-emerald-300 underline text-lg"
              >
                dave@tippersbillofrights.com
              </a>
            </p>
          </PolicySection>
        </div>
      </section>
    </div>
  )
}

function PolicySection({
  title,
  id,
  children,
}: {
  title: string
  id: string
  children: React.ReactNode
}) {
  return (
    <ScrollReveal>
      <section id={id} className="mb-12">
        <h2 className="text-lg font-bold text-white tracking-wide mb-4 uppercase">
          {title}
        </h2>
        <div className="text-slate-400 leading-relaxed space-y-4 text-[15px]">
          {children}
        </div>
      </section>
    </ScrollReveal>
  )
}
