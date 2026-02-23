import ScrollReveal from '../components/shared/ScrollReveal'
import SEO from '../components/shared/SEO'
import HeroSection from '../components/hero/HeroSection'
import LiveCounter from '../components/hero/LiveCounter'
import FrictionlessBaseline from '../components/hero/FrictionlessBaseline'
import RealTalkSection from '../components/hero/RealTalkSection'
import CTASection from '../components/hero/CTASection'
import JoinMovement from '../components/movement/JoinMovement'

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: "Tipper's Bill of Rights",
  url: 'https://tippersbillofrights.com',
}

export default function Landing() {
  return (
    <div>
      <SEO
        title="Fight Tipping Fatigue"
        description="Join the movement against guilt-trip tipping. Sign the petition, find fair-wage businesses."
        path="/"
        jsonLd={websiteJsonLd}
      />

      {/* Hero with iPad scroll-away + headline reveal + comparison cards */}
      <HeroSection />

      {/* Live counter */}
      <section className="bg-slate-950 px-4 py-24 md:py-32">
        <ScrollReveal variant="scaleUp">
          <LiveCounter />
        </ScrollReveal>
      </section>

      {/* Mission: What We're Building */}
      <section className="bg-slate-950 px-4 py-20 md:py-32">
        <FrictionlessBaseline />
      </section>

      {/* Real Talk: the system is still broken, tip where it matters */}
      <section className="bg-slate-950 px-4 py-20 md:py-28">
        <RealTalkSection />
      </section>

      {/* Join the Movement */}
      <section className="bg-slate-950 px-4 py-20 md:py-28">
        <JoinMovement />
      </section>

      {/* Calls to action */}
      <section className="bg-slate-950 px-4 py-20 md:py-28">
        <ScrollReveal variant="fadeUp">
          <CTASection />
        </ScrollReveal>
      </section>
    </div>
  )
}
