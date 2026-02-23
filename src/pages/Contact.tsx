import { Link } from 'react-router-dom'
import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'
import ScrollReveal from '../components/shared/ScrollReveal'
import GlowCard from '../components/shared/GlowCard'
import MagneticButton from '../components/shared/MagneticButton'

const contactChannels = [
  {
    title: 'General Inquiries',
    description: 'Media requests, partnership proposals, questions about the movement, or just want to say hello.',
    email: 'dave@tippersbillofrights.com',
    glowColor: 'emerald' as const,
  },
  {
    title: 'Support',
    description: 'Issues with certification, petition questions, merchandise orders, or technical problems.',
    email: 'dave@tippersbillofrights.com',
    glowColor: 'blue' as const,
  },
  {
    title: 'Media & Press',
    description: 'We welcome media inquiries. Interview requests, data requests, and commentary — we are happy to talk.',
    email: 'dave@tippersbillofrights.com',
    glowColor: 'amber' as const,
  },
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SEO
        title="Contact Us"
        description="Reach the team behind TBOR."
        path="/contact"
      />

      {/* Header */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="CONTACT US"
            subtitle="Reach the team behind the movement. No tip required."
          />
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactChannels.map((channel, i) => (
              <ScrollReveal key={channel.title} delay={i * 0.1}>
                <GlowCard glowColor={channel.glowColor} className="h-full flex flex-col">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                    {channel.description}
                  </p>
                  <a
                    href={`mailto:${channel.email}`}
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium underline underline-offset-4 transition-colors"
                  >
                    {channel.email}
                  </a>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business Certification CTA */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-500/20 p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                BUSINESS OWNER?
              </h2>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                Skip the inbox and go straight to certification. Show your customers
                you pay fair wages.
              </p>
              <Link to="/certification">
                <MagneticButton variant="primary" size="lg">
                  Get Certified
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Note */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-slate-500 text-sm">
              We aim to respond to all inquiries within 2 business days. For urgent
              certification or order issues, please include your reference number in the
              subject line.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
