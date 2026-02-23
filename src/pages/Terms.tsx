import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'
import ScrollReveal from '../components/shared/ScrollReveal'

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SEO
        title="Terms of Service"
        description="Terms governing your participation in the movement."
        path="/terms"
      />

      {/* Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="TERMS OF SERVICE"
            subtitle="The rules of the revolution — read before you sign."
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
                We the People of the Tipper&rsquo;s Bill of Rights, in order to form a more perfect
                checkout experience, establish transparency, ensure domestic tranquility at the
                point of sale, provide for the common defense against guilt-driven prompts, promote
                the general welfare of both consumers and workers, and secure the blessings of fair
                wages to ourselves and our posterity, do ordain and establish these Terms of Service.
              </p>
            </div>
          </ScrollReveal>

          {/* Section 1: Acceptance */}
          <TermsSection title="ARTICLE I: ACCEPTANCE OF TERMS" id="acceptance">
            <p>
              By accessing or using tippersbillofrights.com (the &ldquo;Site&rdquo;), you agree to
              be bound by these Terms of Service. If you do not agree to these terms, you may
              exercise your inalienable right to close this browser tab. Unlike a POS terminal,
              we will not silently assume your consent.
            </p>
          </TermsSection>

          {/* Section 2: Petition */}
          <TermsSection title="ARTICLE II: THE PETITION" id="petition">
            <p>
              The Tipper&rsquo;s Bill of Rights petition is a <strong>symbolic expression of
              consumer sentiment</strong>. It is not a legal document, not a class action lawsuit,
              not a binding arbitration agreement, and not a contract of any kind. Signing the
              petition means you support the principles outlined in the Bill of Rights. It does
              not obligate you to anything, because unlike the modern checkout experience, we
              believe in informed, voluntary participation.
            </p>
            <p>
              Your petition signature (name, city, state, zip code) may be counted publicly
              in aggregate. Individual signatures are not displayed publicly unless you opt in
              to a &ldquo;Founding Signers&rdquo; feature in the future.
            </p>
          </TermsSection>

          {/* Section 3: UGC */}
          <TermsSection title="ARTICLE III: USER-SUBMITTED CONTENT" id="ugc">
            <p>
              When you submit a story to the Hall of Absurdity, you grant Tipper&rsquo;s Bill of
              Rights a <strong>perpetual, non-exclusive, royalty-free, worldwide license</strong>{' '}
              to display, modify, reproduce, and distribute your submission on the Site and
              through our social media channels.
            </p>
            <p>
              You retain ownership of your content. We do not claim it as our own. We may edit
              for length, clarity, or language, but we will preserve the spirit of your outrage.
            </p>
            <p>
              By submitting content, you represent and warrant that: (a) the story reflects your
              own genuine experience or observation, (b) you have the right to share it, and
              (c) the content does not defame any specific individual by name unless that
              information is a matter of public record.
            </p>
          </TermsSection>

          {/* Section 4: Business Certification */}
          <TermsSection title="ARTICLE IV: BUSINESS CERTIFICATION" id="certification">
            <p>
              This is the core of the movement, and these terms reflect that gravity.
            </p>

            <h3 className="text-white font-semibold mt-6 mb-2">4.1 Self-Certification</h3>
            <p>
              Phase 1 certification is <strong>self-reported</strong>. When a business applies for
              certification, it attests to its own employment and point-of-sale practices. TBOR does
              not independently verify all claims at the time of initial certification. Self-certification
              is based on the business owner&rsquo;s good-faith attestation.
            </p>

            <h3 className="text-white font-semibold mt-6 mb-2">4.2 Verification</h3>
            <p>
              TBOR reserves the right to conduct automated or manual verification of certification
              claims at any time. This may include customer feedback review, public records checks,
              and mystery shopping. We may request documentation to support certification claims.
            </p>

            <h3 className="text-white font-semibold mt-6 mb-2">4.3 Accuracy</h3>
            <p>
              Certified businesses agree to accurately represent their employment practices,
              compensation structure, and point-of-sale configurations. Misrepresentation of
              certification criteria is grounds for immediate revocation.
            </p>

            <h3 className="text-white font-semibold mt-6 mb-2">4.4 Revocation</h3>
            <p>
              TBOR reserves the right to revoke certification at any time, for any reason, including
              but not limited to: verified misrepresentation, material change in business practices,
              consumer complaints, or failure to maintain certification standards. Revocation will be
              communicated to the business with a reason and an opportunity to respond.
            </p>

            <h3 className="text-white font-semibold mt-6 mb-2">4.5 No Endorsement</h3>
            <p>
              Certification does not constitute an endorsement, warranty, guarantee, or recommendation
              by TBOR. It indicates that a business has self-attested to meeting certain criteria. The
              certification badge means &ldquo;this business says it does right by its workers&rdquo;
              &mdash; not &ldquo;we personally audited their payroll.&rdquo;
            </p>

            <h3 className="text-white font-semibold mt-6 mb-2">4.6 Directory Listing</h3>
            <p>
              By applying for certification, businesses grant TBOR the right to list their business
              name, address, category, and certification status in the public Safe Zone Directory.
              Businesses may request de-listing at any time by contacting{' '}
              <a
                href="mailto:support@tippersbillofrights.com"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                support@tippersbillofrights.com
              </a>
              .
            </p>
          </TermsSection>

          {/* Section 5: Merchandise */}
          <TermsSection title="ARTICLE V: MERCHANDISE & PURCHASES" id="merchandise">
            <p>
              All merchandise orders are fulfilled by <strong>Printful</strong>, a third-party
              print-on-demand service. Payment is processed by <strong>Stripe</strong>. By
              completing a purchase, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Printful&rsquo;s{' '}
                <a
                  href="https://www.printful.com/policies/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Terms of Service
                </a>
                {' '}for order fulfillment, shipping, returns, and refunds
              </li>
              <li>
                Stripe&rsquo;s{' '}
                <a
                  href="https://stripe.com/legal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Terms of Service
                </a>
                {' '}for payment processing
              </li>
            </ul>
            <p>
              Returns and refunds are handled per Printful&rsquo;s policies. Digital goods
              (e.g., downloadable certification badges) are non-refundable. We do not collect
              or store any payment information directly.
            </p>
          </TermsSection>

          {/* Section 6: IP */}
          <TermsSection title="ARTICLE VI: INTELLECTUAL PROPERTY" id="ip">
            <p>
              The Tipper&rsquo;s Bill of Rights name, logo, certification marks, Bill of Rights
              text, website design, and all original content are the property of Tipper&rsquo;s
              Bill of Rights. All rights reserved.
            </p>
            <p>
              Fair use is encouraged. You may quote, share, and reference our content for
              educational, editorial, or advocacy purposes with attribution. What you may not do
              is create counterfeit certification badges or misrepresent affiliation with TBOR.
              The revolution depends on trust.
            </p>
          </TermsSection>

          {/* Section 7: Liability */}
          <TermsSection title="ARTICLE VII: LIMITATION OF LIABILITY" id="liability">
            <p>
              Tipper&rsquo;s Bill of Rights is a <strong>satirical and educational</strong>{' '}
              platform. We are not lawyers, financial advisors, employment counselors, or certified
              public accountants. Nothing on this site constitutes legal advice, employment advice,
              or financial guidance.
            </p>
            <p>
              THE SITE AND ALL CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF
              ANY KIND, EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, TBOR SHALL
              NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES ARISING FROM YOUR USE OF THE SITE.
            </p>
            <p>
              In plain terms: we built a website about tipping. If you make a business decision
              based on our satirical commentary and it goes sideways, that is not on us.
            </p>
          </TermsSection>

          {/* Section 8: Indemnification */}
          <TermsSection title="ARTICLE VIII: INDEMNIFICATION" id="indemnification">
            <p>
              You agree to indemnify and hold harmless Tipper&rsquo;s Bill of Rights, its
              operators, and contributors from any claims, damages, losses, or expenses
              (including reasonable attorney fees) arising from: (a) your use of the Site,
              (b) your submitted content, (c) your violation of these Terms, or (d) your
              violation of any third-party rights.
            </p>
          </TermsSection>

          {/* Section 9: Dispute Resolution */}
          <TermsSection title="ARTICLE IX: DISPUTE RESOLUTION" id="disputes">
            <p>
              In the spirit of the movement, we prefer to resolve disputes informally. If you
              have a concern, contact us at{' '}
              <a
                href="mailto:support@tippersbillofrights.com"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                support@tippersbillofrights.com
              </a>
              {' '}and we will make a good-faith effort to resolve it within 30 days.
            </p>
            <p>
              If informal resolution fails, any dispute shall be resolved through binding
              arbitration on an individual basis. You waive any right to participate in a
              class action lawsuit or class-wide arbitration. We recognize the irony of
              including an arbitration clause on a consumer advocacy site, but our lawyers
              insisted.
            </p>
          </TermsSection>

          {/* Section 10: Governing Law */}
          <TermsSection title="ARTICLE X: GOVERNING LAW" id="governing-law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              the State of Oregon, United States, without regard to its conflict of law provisions.
            </p>
          </TermsSection>

          {/* Section 11: Severability */}
          <TermsSection title="ARTICLE XI: SEVERABILITY" id="severability">
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that
              provision shall be limited or eliminated to the minimum extent necessary, and the
              remaining provisions shall continue in full force and effect. Like the articles of
              the Bill of Rights itself, the whole is greater than any single clause.
            </p>
          </TermsSection>

          {/* Section 12: Modifications */}
          <TermsSection title="ARTICLE XII: AMENDMENTS" id="modifications">
            <p>
              TBOR reserves the right to modify these Terms at any time. When we do, we will
              update the &ldquo;Last Updated&rdquo; date at the top of this page. Your continued
              use of the Site after modifications constitutes acceptance of the revised Terms.
            </p>
            <p>
              We will not hide material changes in fine print. The revolution is built on
              transparency.
            </p>
          </TermsSection>

          {/* Section 13: Termination */}
          <TermsSection title="ARTICLE XIII: TERMINATION" id="termination">
            <p>
              TBOR may terminate or suspend your access to the Site at any time, without prior
              notice, for conduct that we believe violates these Terms, is harmful to other users,
              or is otherwise objectionable. You may terminate your relationship with TBOR at any
              time by simply ceasing to use the Site. No guilt trip required.
            </p>
          </TermsSection>

          {/* Section 14: Contact */}
          <TermsSection title="ARTICLE XIV: CONTACT" id="contact">
            <p>
              For questions about these Terms of Service, contact:
            </p>
            <p className="mt-4">
              <a
                href="mailto:support@tippersbillofrights.com"
                className="text-emerald-400 hover:text-emerald-300 underline text-lg"
              >
                support@tippersbillofrights.com
              </a>
            </p>
          </TermsSection>
        </div>
      </section>
    </div>
  )
}

function TermsSection({
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
