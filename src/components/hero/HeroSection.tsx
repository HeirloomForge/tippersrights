import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

const tipOptions = [
  { pct: '20%', amount: '$1.20', highlighted: false },
  { pct: '25%', amount: '$1.50', highlighted: true },
  { pct: '30%', amount: '$1.80', highlighted: false },
  { pct: 'Custom', amount: '', highlighted: false },
]

function InteractivePOS() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState(1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  const rotateX = useTransform(springProgress, [0, 0.5, 1], [15, 0, -15])
  const rotateY = useTransform(springProgress, [0, 0.5, 1], [-10, 0, 10])
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-sm"
      >
        {/* iPad frame */}
        <div
          className="rounded-[2.5rem] bg-gradient-to-b from-slate-700 to-slate-800 p-4 shadow-2xl border border-white/10"
          style={{
            boxShadow:
              '0 0 50px rgba(16, 185, 129, 0.15), 0 0 100px rgba(16, 185, 129, 0.05), 0 30px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Screen glare */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10" />

          {/* Screen */}
          <div className="rounded-[1.5rem] bg-white overflow-hidden relative">
            {/* POS Header */}
            <div className="bg-slate-800 px-6 py-5 text-center">
              <h3 className="font-bold text-xl uppercase tracking-wider text-white">
                Add a Tip?
              </h3>
              <p className="text-white/50 text-sm mt-1">
                For handing you a muffin.
              </p>
            </div>

            {/* Tip options */}
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {tipOptions.map((tip, i) => (
                  <button
                    key={tip.pct}
                    onClick={() => setSelected(i)}
                    className={`p-4 rounded-xl text-center transition-all duration-200 ${
                      selected === i
                        ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                        : 'bg-white border-2 border-slate-100 text-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    <span
                      className={`block font-bold text-2xl ${
                        selected === i ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {tip.pct}
                    </span>
                    {tip.amount && (
                      <span
                        className={`text-sm ${
                          selected === i ? 'text-white/80' : 'text-slate-400'
                        }`}
                      >
                        {tip.amount}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <button className="text-slate-400 font-medium hover:text-slate-600 transition-colors mt-2">
                No Tip
              </button>
            </div>

            {/* Glitch overlay */}
            <div className="absolute inset-0 bg-emerald-500/5 mix-blend-color-burn pointer-events-none animate-pulse" />
          </div>
        </div>

        {/* Home indicator */}
        <div className="mt-2 mx-auto w-24 h-1 rounded-full bg-slate-600" />
      </motion.div>
    </div>
  )
}

function ComparisonCard({
  side,
  title,
  icon,
  items,
}: {
  side: 'left' | 'right'
  title: string
  icon: string
  items: string[]
}) {
  const borderColor =
    side === 'left' ? 'border-amber-500/30' : 'border-emerald-500/30'
  const titleColor =
    side === 'left' ? 'text-amber-400' : 'text-emerald-400'
  const bgGlow =
    side === 'left'
      ? 'bg-amber-500/5 hover:bg-amber-500/10'
      : 'bg-emerald-500/5 hover:bg-emerald-500/10'
  const bulletColor =
    side === 'left' ? 'bg-amber-500' : 'bg-emerald-500'
  const verdict =
    side === 'left' ? 'ZERO tip expected' : 'Tip-worthy service'
  const verdictBg =
    side === 'left'
      ? 'bg-amber-500/20 text-amber-300'
      : 'bg-emerald-500/20 text-emerald-300'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: side === 'left' ? 0 : 0.15 }}
      className={`rounded-2xl border ${borderColor} ${bgGlow} backdrop-blur-sm p-6 md:p-8 transition-colors duration-300`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className={`text-xl md:text-2xl font-black mb-4 ${titleColor}`}>
        {title}
      </h3>
      <ul className="space-y-3 mb-6">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-slate-300 text-sm md:text-base"
          >
            <span
              className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${bulletColor}`}
            />
            {item}
          </li>
        ))}
      </ul>
      <div
        className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${verdictBg}`}
      >
        {verdict}
      </div>
    </motion.div>
  )
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <>
      {/* Hero — side-by-side layout */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col lg:flex-row items-center px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
      >
        {/* Background blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Text content */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="w-full lg:w-1/2 z-10 pt-24 lg:pt-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] tracking-tight">
              THE{' '}
              <span className="text-emerald-400 block mt-2">FRICTIONLESS</span>{' '}
              BASELINE.
            </h1>
            <div className="h-1 w-24 bg-emerald-500 mb-8 mt-6" />
            <p className="text-xl md:text-2xl text-slate-300 font-serif italic max-w-lg leading-relaxed mb-10">
              Processing a transaction warrants zero tip. Expert consultation
              warrants a premium. End the flipped iPad herd mentality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/billofrights"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-bold uppercase tracking-widest overflow-hidden rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Read the Bill
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                to="/certification"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold uppercase tracking-widest rounded-xl hover:border-emerald-400 hover:text-emerald-400 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Certify Business
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Interactive POS mockup */}
        <div className="w-full lg:w-1/2 z-10 mt-16 lg:mt-0">
          <InteractivePOS />
        </div>
      </section>

      {/* Comparison section */}
      <div className="relative z-20 bg-slate-950 px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm uppercase tracking-[0.3em] text-slate-500 mb-12"
          >
            Know the difference
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ComparisonCard
              side="left"
              title="Bare Minimum"
              icon="&#9749;"
              items={[
                'Pouring a pre-made drip coffee',
                'Handing you a bag over a counter',
                'Ringing up a purchase at a register',
                'Swiping your card through a reader',
              ]}
            />
            <ComparisonCard
              side="right"
              title="Above & Beyond"
              icon="&#127942;"
              items={[
                'Sommelier curating a wine pairing',
                'Personal stylist pulling a full look',
                'Barber giving a precision fade & hot towel',
                'Concierge planning your entire itinerary',
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
