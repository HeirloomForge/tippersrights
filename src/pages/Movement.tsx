import ScrollReveal from '../components/shared/ScrollReveal'
import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'
import MagneticButton from '../components/shared/MagneticButton'
import JoinMovement from '../components/movement/JoinMovement'
import LegislationTimeline from '../components/movement/LegislationTimeline'

export default function Movement() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <SEO
        title="Join the Movement"
        description="Sign the petition and become a Founding Signer."
        path="/movement"
      />

      {/* Join the Movement signup section */}
      <section className="px-4 pt-32 pb-20 md:pt-40 md:pb-28">
        <JoinMovement />
      </section>

      {/* Legislation Timeline */}
      <section className="px-4 py-20 md:py-28">
        <ScrollReveal variant="fadeUp">
          <SectionHeading
            title="THE LEGISLATIVE RECORD"
            subtitle="Decades of momentum. The fight for fair wages is accelerating."
          />
        </ScrollReveal>

        <div className="mt-12 md:mt-16">
          <LegislationTimeline />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 py-20 md:py-28">
        <ScrollReveal variant="scaleUp">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              The next bill needs{' '}
              <span className="text-emerald-400">YOUR</span> name behind it.
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Scroll back up and add your voice, or share this page so someone
              else can add theirs.
            </p>
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Add My Voice
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
