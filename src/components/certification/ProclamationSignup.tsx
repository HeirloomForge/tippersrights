import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '../shared/MagneticButton.tsx'
import { US_STATES } from '../../data/usStates'

interface FormData {
  businessName: string
  businessType: string
  address: string
  city: string
  state: string
  zipCode: string
  website: string
  contactEmail: string
  contactName: string
  livingWageCertified: boolean
  ethicalPosCertified: boolean
  signatureName: string
}

interface CertificationResult {
  id: number
  name: string
  certificationStatus: string
  certifiedAt: string
}

const initialForm: FormData = {
  businessName: '',
  businessType: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  website: '',
  contactEmail: '',
  contactName: '',
  livingWageCertified: false,
  ethicalPosCertified: false,
  signatureName: '',
}

const steps = ['Business Info', 'Wage Commitment', 'Sign', 'Welcome']

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

function FieldLabel({ children }: { children: string }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
      {children}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-shadow focus:border-emerald-500/50 focus:shadow-[0_0_16px_rgba(16,185,129,0.1)]"
    />
  )
}

export default function ProclamationSignup() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [certResult, setCertResult] = useState<CertificationResult | null>(null)

  function next() {
    if (step < 3) {
      setDirection(1)
      setStep(step + 1)
    }
  }

  function back() {
    if (step > 0) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm({ ...form, [key]: value })
    if (error) setError('')
  }

  async function handleSubmit() {
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/businesses/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.businessName.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          state: form.state,
          zipCode: form.zipCode.trim(),
          category: form.businessType,
          website: form.website.trim() || undefined,
          contactEmail: form.contactEmail.trim(),
          contactName: form.contactName.trim(),
          livingWageCertified: form.livingWageCertified,
          ethicalPosCertified: form.ethicalPosCertified,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setError('A business with this name already exists in this location.')
        } else if (response.status === 429) {
          setError('Too many requests. Please try again later.')
        } else if (result.details) {
          const firstError = Object.values(result.details)[0]
          setError(typeof firstError === 'string' ? firstError : 'Please check your input.')
        } else {
          setError(result.error || 'Something went wrong.')
        }
        return
      }

      setCertResult(result.data)
      setDirection(1)
      setStep(3) // Move to Welcome step
    } catch {
      setError('Unable to connect. Please check your connection.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleNext() {
    if (step === 2) {
      handleSubmit()
    } else {
      next()
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300',
                  i <= step
                    ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : 'border border-white/10 text-slate-600',
                ].join(' ')}
              >
                {i < step ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className="hidden text-[10px] text-slate-500 sm:block">
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-3 h-1 rounded-full bg-slate-800">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-emerald-500"
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Business Information</h3>
                <div>
                  <FieldLabel>Business Name</FieldLabel>
                  <TextInput
                    value={form.businessName}
                    onChange={(v) => update('businessName', v)}
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <FieldLabel>Business Type</FieldLabel>
                  <select
                    value={form.businessType}
                    onChange={(e) => update('businessType', e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white outline-none transition-shadow focus:border-emerald-500/50"
                  >
                    <option value="">Select type...</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Cafe</option>
                    <option value="retail">Retail</option>
                    <option value="service">Service</option>
                  </select>
                </div>
                <div>
                  <FieldLabel>Address</FieldLabel>
                  <TextInput
                    value={form.address}
                    onChange={(v) => update('address', v)}
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <FieldLabel>City</FieldLabel>
                    <TextInput
                      value={form.city}
                      onChange={(v) => update('city', v)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <FieldLabel>State</FieldLabel>
                    <select
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-white outline-none transition-shadow focus:border-emerald-500/50"
                    >
                      <option value="">State</option>
                      {US_STATES.map((s) => (
                        <option key={s.code} value={s.code}>{s.code}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <FieldLabel>Zip Code</FieldLabel>
                    <TextInput
                      value={form.zipCode}
                      onChange={(v) => update('zipCode', v)}
                      placeholder="12345"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Website (optional)</FieldLabel>
                  <TextInput
                    value={form.website}
                    onChange={(v) => update('website', v)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Wage Commitment & Contact</h3>
                <p className="text-sm text-slate-400">
                  Certification requires a commitment to paying all staff a living wage
                  and eliminating mandatory tipping.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Contact Name</FieldLabel>
                    <TextInput
                      value={form.contactName}
                      onChange={(v) => update('contactName', v)}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <FieldLabel>Contact Email</FieldLabel>
                    <TextInput
                      value={form.contactEmail}
                      onChange={(v) => update('contactEmail', v)}
                      placeholder="you@business.com"
                      type="email"
                    />
                  </div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.livingWageCertified}
                    onChange={(e) => update('livingWageCertified', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900 text-emerald-500 accent-emerald-500"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    I certify that my business pays all employees a living wage
                    ($15/hr or local equivalent minimum) and does not rely on tips to
                    supplement worker income.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.ethicalPosCertified}
                    onChange={(e) => update('ethicalPosCertified', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900 text-emerald-500 accent-emerald-500"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    I certify that my business does not use guilt-driven tipping prompts
                    at point of sale and provides transparent pricing.
                  </span>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Sign the Proclamation</h3>
                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <p className="font-serif text-sm italic leading-relaxed text-slate-300">
                    &ldquo;I certify that{' '}
                    <span className="text-emerald-400">
                      {form.businessName || '[Business Name]'}
                    </span>{' '}
                    upholds the principles of the Tipper&rsquo;s Bill of Rights. We commit
                    to paying fair wages, eliminating guilt-driven tipping, and providing
                    equal service to all customers regardless of gratuity. We believe the
                    price on the menu should be the real price.&rdquo;
                  </p>
                </div>
                <div>
                  <FieldLabel>Your Signature</FieldLabel>
                  <input
                    type="text"
                    value={form.signatureName}
                    onChange={(e) => update('signatureName', e.target.value)}
                    placeholder="Type your full name"
                    className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-3 font-serif text-lg italic text-emerald-400 placeholder-slate-600 outline-none transition-shadow focus:border-emerald-500/50 focus:shadow-[0_0_16px_rgba(16,185,129,0.1)]"
                  />
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
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center py-6 text-center">
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20"
                >
                  <motion.svg
                    className="h-10 w-10 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    />
                  </motion.svg>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-xl font-bold text-white"
                >
                  Welcome to the Movement
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-2 max-w-sm text-sm text-slate-400"
                >
                  {certResult?.name || form.businessName || 'Your business'} is now{' '}
                  <span className="text-emerald-400 font-semibold">
                    {certResult?.certificationStatus || 'certified'}
                  </span>{' '}
                  and part of the guilt-free directory. Your customers can browse, pay, and leave
                  without a moral dilemma.
                </motion.p>

                {/* Badge preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-8 w-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-left">
                      <p className="text-xs uppercase tracking-wider text-emerald-400/80">
                        Certified
                      </p>
                      <p className="font-bold text-white">
                        {certResult?.name || form.businessName || 'Your Business'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex justify-between">
        {step > 0 && step < 3 ? (
          <MagneticButton variant="outline" size="sm" onClick={back}>
            Back
          </MagneticButton>
        ) : (
          <div />
        )}
        {step < 3 && (
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={handleNext}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : step === 2 ? 'Submit' : 'Next'}
          </MagneticButton>
        )}
      </div>
    </div>
  )
}
