import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../shared/SectionHeading'
import GlowCard from '../shared/GlowCard'
import MagneticButton from '../shared/MagneticButton'
import StatCounter from '../shared/StatCounter'
import ScrollReveal from '../shared/ScrollReveal'
import { US_STATES } from '../../data/usStates'
import WritOfRatification from './WritOfRatification'
import CertificateActions from './CertificateActions'

interface PetitionFormData {
  firstName: string
  lastName: string
  email: string
  city: string
  state: string
  zipCode: string
}

interface PetitionSuccess {
  certificateId: string
  signerName: string
  signedAt: string
  totalSigners: number
}

const initialForm: PetitionFormData = {
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  state: '',
  zipCode: '',
}

const inputClasses =
  'w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-colors'

export default function JoinMovement() {
  const [formData, setFormData] = useState<PetitionFormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<PetitionSuccess | null>(null)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/petition/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim() || undefined,
          city: formData.city.trim(),
          state: formData.state,
          zipCode: formData.zipCode.trim(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setError('This email has already signed the petition.')
        } else if (response.status === 429) {
          setError('Too many requests. Please try again later.')
        } else if (result.details) {
          const firstError = Object.values(result.details)[0]
          setError(typeof firstError === 'string' ? firstError : 'Please check your input and try again.')
        } else {
          setError(result.error || 'Something went wrong. Please try again.')
        }
        return
      }

      setSuccess(result.data)
    } catch {
      setError('Unable to connect. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function update<K extends keyof PetitionFormData>(key: K, value: PetitionFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (error) setError('')
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
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-6"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-emerald-400"
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
                  <h3 className="text-xl font-bold text-white mb-1">
                    Your voice has been added, {success.signerName}.
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    You are now a Founding Signer of the Tipper's Bill of Rights.
                  </p>

                  {/* Certificate */}
                  <div className="overflow-x-auto">
                    <WritOfRatification
                      signerName={success.signerName}
                      certificateId={success.certificateId}
                      signedAt={success.signedAt}
                    />
                  </div>

                  {/* Download + Share buttons */}
                  <CertificateActions certificateId={success.certificateId} />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="movement-firstname"
                        className="block text-sm font-medium text-slate-300 mb-1.5"
                      >
                        First Name *
                      </label>
                      <input
                        id="movement-firstname"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        placeholder="First name"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="movement-lastname"
                        className="block text-sm font-medium text-slate-300 mb-1.5"
                      >
                        Last Name *
                      </label>
                      <input
                        id="movement-lastname"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        placeholder="Last name"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="movement-email"
                      className="block text-sm font-medium text-slate-300 mb-1.5"
                    >
                      Email (optional)
                    </label>
                    <input
                      id="movement-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                      className={inputClasses}
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Used only for petition verification — never marketing
                    </p>
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="movement-city"
                      className="block text-sm font-medium text-slate-300 mb-1.5"
                    >
                      City *
                    </label>
                    <input
                      id="movement-city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder="Your city"
                      className={inputClasses}
                    />
                  </div>

                  {/* State + Zip row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="movement-state"
                        className="block text-sm font-medium text-slate-300 mb-1.5"
                      >
                        State *
                      </label>
                      <select
                        id="movement-state"
                        required
                        value={formData.state}
                        onChange={(e) => update('state', e.target.value)}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="">Select state...</option>
                        {US_STATES.map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="movement-zip"
                        className="block text-sm font-medium text-slate-300 mb-1.5"
                      >
                        Zip Code *
                      </label>
                      <input
                        id="movement-zip"
                        type="text"
                        required
                        pattern="\d{5}"
                        maxLength={5}
                        value={formData.zipCode}
                        onChange={(e) => update('zipCode', e.target.value)}
                        placeholder="12345"
                        className={inputClasses}
                      />
                      <p className="mt-1 text-xs text-slate-500">
                        For mapping voter support by congressional district
                      </p>
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3"
                    >
                      <p className="text-sm text-red-400">{error}</p>
                    </motion.div>
                  )}

                  <div className="pt-2">
                    <MagneticButton
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={submitting}
                    >
                      {submitting ? 'Signing...' : 'Add My Voice'}
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Supporter count */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <StatCounter
                value={success?.totalSigners ?? 47293}
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
