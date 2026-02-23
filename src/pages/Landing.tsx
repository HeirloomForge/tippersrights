import ScrollReveal from '../components/shared/ScrollReveal'
import HeroSection from '../components/hero/HeroSection'
import LiveCounter from '../components/hero/LiveCounter'
import FrictionlessBaseline from '../components/hero/FrictionlessBaseline'
import RealTalkSection from '../components/hero/RealTalkSection'
import CTASection from '../components/hero/CTASection'
import JoinMovement from '../components/movement/JoinMovement'

export default function Landing() {
  return (
    <div>
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
