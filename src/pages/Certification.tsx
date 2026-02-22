import { Link } from 'react-router-dom'
import SectionHeading from '../components/shared/SectionHeading.tsx'
import ScrollReveal from '../components/shared/ScrollReveal.tsx'
import MagneticButton from '../components/shared/MagneticButton.tsx'
import CertificationRequirements from '../components/certification/CertificationRequirements.tsx'
import ProclamationSignup from '../components/certification/ProclamationSignup.tsx'

function Certification() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Header */}
      <ScrollReveal>
        <SectionHeading
          title="THE CERTIFICATION"
          subtitle="For businesses ready to lead the change. Show your customers you value people over prompts."
          useScatter
        />
      </ScrollReveal>

      {/* Intro */}
      <ScrollReveal>
        <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-sm md:p-8">
          <h3 className="text-lg font-bold text-white">Why Certification Matters</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Consumers are exhausted by guilt-driven checkout screens. They want to support
            businesses that treat workers fairly without making every transaction a moral
            test. Certification tells your customers: we pay our people right, and the
            price you see is the price you pay.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Certified businesses appear in our Safe Zone Directory, earn the
            &ldquo;Guilt-Free&rdquo; badge for their storefront, and join a growing
            movement of businesses proving that fair wages and great service can coexist.
          </p>
        </div>
      </ScrollReveal>

      {/* Requirements */}
      <div className="mt-16">
        <ScrollReveal>
          <h3 className="mb-6 text-center text-2xl font-bold text-white">
            The Five Requirements
          </h3>
        </ScrollReveal>
        <CertificationRequirements />
      </div>

      {/* Divider */}
      <div className="my-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-widest text-slate-600">
          Ready to commit?
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Signup */}
      <ScrollReveal>
        <h3 className="mb-8 text-center text-2xl font-bold text-white">
          Sign the Proclamation
        </h3>
      </ScrollReveal>
      <ProclamationSignup />

      {/* CTA footer */}
      <ScrollReveal>
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500">
            Already certified? List your business in the directory.
          </p>
          <div className="mt-4">
            <Link to="/directory">
              <MagneticButton variant="outline" size="md">
                Go to the Safe Zone &rarr;
              </MagneticButton>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

export default Certification
