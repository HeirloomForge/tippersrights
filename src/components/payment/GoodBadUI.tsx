import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type UIMode = 'bad' | 'good'

function Annotation({
  children,
  color,
}: {
  children: string
  color: 'red' | 'green'
}) {
  const cls =
    color === 'red'
      ? 'bg-red-500/10 text-red-400 border-red-500/30'
      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  return (
    <span className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium ${cls}`}>
      {children}
    </span>
  )
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      {/* Phone notch */}
      <div className="mx-auto h-6 w-32 rounded-b-2xl bg-slate-800 border-x border-b border-white/10" />
      {/* Screen */}
      <div className="rounded-3xl border-2 border-white/10 bg-slate-900 p-5">
        {children}
      </div>
      {/* Home bar */}
      <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-white/20" />
    </div>
  )
}

export default function GoodBadUI() {
  const [mode, setMode] = useState<UIMode>('bad')

  return (
    <div>
      {/* Toggle */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-lg border border-white/10 bg-slate-900/70 p-1">
          {(['bad', 'good'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={[
                'relative rounded-md px-6 py-2 text-sm font-semibold transition-colors',
                mode === m ? 'text-white' : 'text-slate-500 hover:text-slate-300',
              ].join(' ')}
            >
              {mode === m && (
                <motion.div
                  layoutId="tab-bg"
                  className={[
                    'absolute inset-0 rounded-md',
                    m === 'bad' ? 'bg-red-500/20' : 'bg-emerald-500/20',
                  ].join(' ')}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">{m === 'bad' ? 'Bad UX' : 'Good UX'}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'bad' ? (
          <motion.div
            key="bad"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25 }}
          >
            <PhoneFrame>
              <div className="text-center">
                <p className="text-xs text-slate-500">Brew & Bean Co.</p>
                <p className="mt-1 text-lg font-bold text-white">$5.75</p>
                <p className="text-[10px] text-slate-600">Iced Oat Latte</p>
              </div>

              <div className="my-4 h-px bg-white/10" />

              <p className="mb-1 text-center text-xs font-medium italic text-amber-300">
                Your barista worked hard today!
              </p>
              <Annotation color="red">Emotional manipulation</Annotation>

              <div className="mt-3 space-y-2">
                {/* Pre-selected 20% */}
                {[
                  { pct: '25%', amt: '$1.44', selected: false },
                  { pct: '20%', amt: '$1.15', selected: true },
                  { pct: '18%', amt: '$1.04', selected: false },
                ].map((opt) => (
                  <div
                    key={opt.pct}
                    className={[
                      'rounded-lg border px-4 py-2.5 text-center text-sm font-bold',
                      opt.selected
                        ? 'border-amber-400 bg-amber-500/20 text-amber-300 ring-2 ring-amber-400/30'
                        : 'border-white/10 text-white',
                    ].join(' ')}
                  >
                    {opt.pct} ({opt.amt})
                    {opt.selected && (
                      <span className="ml-2 text-[10px] font-normal text-amber-400/80">
                        selected
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between">
                <Annotation color="red">Pre-selected option</Annotation>
                <Annotation color="red">Large tip buttons</Annotation>
              </div>

              {/* Tiny no-tip */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-[10px] text-slate-600 underline decoration-dotted"
                >
                  No Tip
                </button>
              </div>
              <div className="mt-1">
                <Annotation color="red">Hidden &ldquo;No Tip&rdquo; option</Annotation>
              </div>
            </PhoneFrame>
          </motion.div>
        ) : (
          <motion.div
            key="good"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <PhoneFrame>
              <div className="text-center">
                <p className="text-xs text-slate-500">Brew & Bean Co.</p>
                <p className="mt-1 text-lg font-bold text-white">$5.75</p>
                <p className="text-[10px] text-slate-600">Iced Oat Latte</p>
              </div>

              <div className="my-4 h-px bg-white/10" />

              <p className="text-center text-xs text-slate-400">
                Would you like to add an optional tip?
              </p>
              <div className="mt-1">
                <Annotation color="green">Neutral language</Annotation>
              </div>

              <div className="mt-3 space-y-2">
                {[
                  { label: 'No Tip', amt: '$0.00' },
                  { label: '$1.00', amt: '' },
                  { label: '$2.00', amt: '' },
                  { label: 'Custom', amt: '' },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    className="rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:border-emerald-500/30"
                  >
                    {opt.label}
                    {opt.amt && (
                      <span className="ml-1 text-slate-500">{opt.amt}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                <Annotation color="green">Equal button sizes</Annotation>
                <Annotation color="green">No pre-selection</Annotation>
                <Annotation color="green">&ldquo;No Tip&rdquo; first</Annotation>
              </div>
            </PhoneFrame>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
