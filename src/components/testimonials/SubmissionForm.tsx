import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlowCard from '../shared/GlowCard'
import MagneticButton from '../shared/MagneticButton'

const CATEGORY_OPTIONS = [
  'Coffee Shop',
  'Self-Service',
  'Counter Service',
  'Pre-Packaged Food',
  'Drive-Through',
  'Events & Festivals',
  'Pickup Orders',
  'Double Tipping',
  'Retail',
  'Airports',
  'Entertainment',
  'Laundry',
  'Hotels',
  'Transportation',
  'Healthcare',
  'Other',
]

interface FormData {
  story: string
  category: string
  tipAmount: string
  location: string
}

interface FormErrors {
  story?: string
  category?: string
  tipAmount?: string
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotate: number
}

const PARTICLE_COLORS = [
  '#10b981', '#3b82f6', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#06b6d4', '#f97316',
]

function generateParticles(): Particle[] {
  return Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 300 - 100,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    size: Math.random() * 8 + 4,
    rotate: Math.random() * 720 - 360,
  }))
}

const initialForm: FormData = {
  story: '',
  category: '',
  tipAmount: '',
  location: '',
}

export default function SubmissionForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  function validate(): boolean {
    const next: FormErrors = {}
    if (!form.story.trim() || form.story.trim().length < 20) {
      next.story = 'Tell us more! At least 20 characters.'
    }
    if (!form.category) {
      next.category = 'Pick a category.'
    }
    if (!form.tipAmount.trim()) {
      next.tipAmount = 'What was the absurd amount?'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit() {
    if (!validate()) return

    setParticles(generateParticles())
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setForm(initialForm)
      setErrors({})
      setParticles([])
    }, 2500)
  }

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const inputClasses =
    'w-full bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-colors'

  return (
    <GlowCard className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-12 relative"
          >
            {/* Confetti particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: 0,
                  scale: 0.5,
                  rotate: p.rotate,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute rounded-sm"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  top: '50%',
                  left: '50%',
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="text-5xl mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-emerald-400"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <p className="text-xl font-bold text-white">
              Story submitted to the Hall!
            </p>
            <p className="text-slate-400 mt-2">Your absurdity has been documented.</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="space-y-5">
              {/* Story textarea */}
              <div>
                <label htmlFor="story" className="block text-sm font-medium text-slate-300 mb-2">
                  Your Absurd Story
                </label>
                <textarea
                  id="story"
                  rows={4}
                  value={form.story}
                  onChange={(e) => updateField('story', e.target.value)}
                  placeholder="The iPad was flipped toward me at..."
                  className={`${inputClasses} resize-none`}
                />
                {errors.story && (
                  <p className="mt-1 text-sm text-red-400">{errors.story}</p>
                )}
              </div>

              {/* Category + Tip Amount row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className={`${inputClasses} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-400">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tipAmount" className="block text-sm font-medium text-slate-300 mb-2">
                    Tip Amount Requested
                  </label>
                  <input
                    id="tipAmount"
                    type="text"
                    value={form.tipAmount}
                    onChange={(e) => updateField('tipAmount', e.target.value)}
                    placeholder='e.g. 25%, $5 on a $3 coffee'
                    className={inputClasses}
                  />
                  {errors.tipAmount && (
                    <p className="mt-1 text-sm text-red-400">{errors.tipAmount}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
                  Location (optional)
                </label>
                <input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="City, State"
                  className={inputClasses}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <MagneticButton variant="primary" size="lg" onClick={handleSubmit}>
                  Submit to the Hall
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlowCard>
  )
}
