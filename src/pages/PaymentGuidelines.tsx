import { Link } from 'react-router-dom'
import SectionHeading from '../components/shared/SectionHeading.tsx'
import ScrollReveal from '../components/shared/ScrollReveal.tsx'
import MagneticButton from '../components/shared/MagneticButton.tsx'
import GoodBadUI from '../components/payment/GoodBadUI.tsx'
import GuidelinesChecklist from '../components/payment/GuidelinesChecklist.tsx'

function PaymentGuidelines() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Header */}
      <ScrollReveal>
        <SectionHeading
          title="PAYMENT PROVIDER GUIDELINES"
          subtitle="Build checkout screens, not guilt trips. A call to action for Square, Toast, Clover, and every POS platform."
          useScatter
        />
      </ScrollReveal>

      {/* Intro */}
      <ScrollReveal>
        <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-sm md:p-8">
          <h3 className="text-lg font-bold text-white">
            An Open Letter to Payment Platforms
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            You build the checkout screens that millions of customers interact with every
            day. Your design decisions shape social norms around tipping. Pre-selected
            percentages, emotional copy, and hidden skip buttons are dark patterns that
            erode consumer trust. You have the power to change this.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Below are guidelines for building ethical checkout flows. Adopt them and earn
            the platform certification badge for your marketing materials.
          </p>
        </div>
      </ScrollReveal>

      {/* Good vs Bad UI */}
      <div className="mt-16">
        <ScrollReveal>
          <h3 className="mb-8 text-center text-2xl font-bold text-white">
            The Checkout Experience
          </h3>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm text-slate-500">
            Toggle between a guilt-driven checkout and an ethical one. Spot the dark
            patterns, then see how easy it is to do it right.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <GoodBadUI />
        </ScrollReveal>
      </div>

      {/* Divider */}
      <div className="my-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-widest text-slate-600">
          The Standards
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Guidelines */}
      <ScrollReveal>
        <h3 className="mb-8 text-center text-2xl font-bold text-white">
          8 Guidelines for Ethical Checkout
        </h3>
      </ScrollReveal>
      <GuidelinesChecklist />

      {/* CTA */}
      <ScrollReveal>
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500">
            Ready to adopt these guidelines? Get your platform certified.
          </p>
          <div className="mt-4">
            <Link to="/certification">
              <MagneticButton variant="primary" size="lg">
                Get Certified &rarr;
              </MagneticButton>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

export default PaymentGuidelines
