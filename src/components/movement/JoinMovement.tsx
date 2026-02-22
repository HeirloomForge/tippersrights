import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../shared/SectionHeading'
import GlowCard from '../shared/GlowCard'
import MagneticButton from '../shared/MagneticButton'
import StatCounter from '../shared/StatCounter'
import ScrollReveal from '../shared/ScrollReveal'

export default function JoinMovement() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stateZip: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Mock submission — Supabase integration placeholder
    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ScrollReveal variant="fadeUp">
        <SectionHeading
          title="JOIN THE MOVEMENT"
          subtitle="This isn't about clicks. It's about political power."
        />
      </ScrollReveal>

      {/* Clarification banner */}
      <ScrollReveal variant="scaleUp" delay={0.1}>
        <div className="mt-12">
          <GlowCard glowColor="amber" className="!p-8">
            <div className="space-y-4 text-center">
              <p className="text-lg md:text-xl font-bold text-amber-400 uppercase tracking-wide">
                This is NOT a newsletter. We will NOT send you marketing emails.
              </p>
              <p className="text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
                This is a headcount. A documented count of Americans who believe
                tipping culture needs to change.
              </p>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                When the next bill hits the floor, legislators need to know how
                many voters stand behind it.{' '}
                <span className="text-white font-semibold">
                  Your signature is your voice.
                </span>
              </p>
            </div>
          </GlowCard>
        </div>
      </ScrollReveal>

      {/* Why it matters */}
      <ScrollReveal variant="fadeUp" delay={0.15}>
        <div className="mt-12 space-y-4 text-center">
          <p className="text-lg md:text-xl text-emerald-400 font-semibold">
            Every major legislative victory started with proof of public support.
          </p>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            When future bills are introduced to reform tipping practices —
            whether raising the tipped minimum wage, expanding no-tax-on-tips,
            or mandating transparent pricing — having a verified count of
            supporters gives legislators the confidence to push forward.
          </p>
          <p className="text-slate-300 font-medium text-base md:text-lg">
            Your name isn't going on a mailing list. It's going on a petition.
          </p>
        </div>
      </ScrollReveal>

      {/* Signup form */}
      <ScrollReveal variant="scaleUp" delay={0.2}>
        <div className="mt-12">
          <GlowCard glowColor="emerald" className="!p-8 md:!p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Your voice has been added.
                </h3>
                <p className="text-slate-400">
                  You're part of the movement now. We'll reach out only when
                  there's a bill that needs your support.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="movement-name"
                    className="block text-sm font-medium text-slate-300 mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="movement-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="movement-email"
                    className="block text-sm font-medium text-slate-300 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="movement-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Used only for petition verification — never marketing
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="movement-statezip"
                    className="block text-sm font-medium text-slate-300 mb-1.5"
                  >
                    State / Zip Code
                  </label>
                  <input
                    id="movement-statezip"
                    type="text"
                    required
                    value={formData.stateZip}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, stateZip: e.target.value }))
                    }
                    placeholder="e.g. MI 48104"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    For mapping voter support by congressional district
                  </p>
                </div>

                <div className="pt-2">
                  <MagneticButton variant="primary" size="lg" type="submit">
                    Add My Voice
                  </MagneticButton>
                </div>
              </form>
            )}

            {/* Supporter count */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <StatCounter
                value={47293}
                suffix=" Americans have joined"
                className="text-xl md:text-2xl font-bold text-emerald-400"
              />
            </div>
          </GlowCard>
        </div>
      </ScrollReveal>

      {/* Pull quote */}
      <ScrollReveal variant="fadeUp" delay={0.25}>
        <blockquote className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="h-px w-12 bg-emerald-500/40 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-slate-300 italic leading-relaxed">
              "We're not building an audience. We're building a movement. Every
              signature is ammunition for the next bill that hits the floor."
            </p>
            <div className="h-px w-12 bg-emerald-500/40 mx-auto mt-6" />
          </div>
        </blockquote>
      </ScrollReveal>
    </div>
  )
}
