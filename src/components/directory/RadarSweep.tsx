import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RadarSweep() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
        >
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Concentric rings */}
          <div className="relative h-80 w-80 md:h-[28rem] md:w-[28rem]">
            {[1, 0.75, 0.5, 0.25].map((scale) => (
              <div
                key={scale}
                className="absolute inset-0 rounded-full border border-emerald-500/20"
                style={{ transform: `scale(${scale})` }}
              />
            ))}

            {/* Center dot */}
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />

            {/* Sweep line */}
            <motion.div
              className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, ease: 'linear', repeat: 0 }}
            >
              <div
                className="h-full w-40 -translate-x-1/2"
                style={{
                  background:
                    'conic-gradient(from -10deg, transparent 0deg, rgba(16,185,129,0.4) 15deg, transparent 30deg)',
                }}
              />
              <div className="absolute bottom-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-t from-emerald-400 to-transparent" />
            </motion.div>

            {/* Blip dots that appear as the sweep passes */}
            {[
              { x: '30%', y: '25%', delay: 0.4 },
              { x: '65%', y: '40%', delay: 1.0 },
              { x: '45%', y: '70%', delay: 1.6 },
              { x: '75%', y: '60%', delay: 2.0 },
            ].map((blip, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-emerald-400"
                style={{ left: blip.x, top: blip.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.6], scale: [0, 1.5, 1] }}
                transition={{ delay: blip.delay, duration: 0.4 }}
              />
            ))}

            {/* Text */}
            <motion.p
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm tracking-[0.3em] text-emerald-400/80 uppercase whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Scanning for certified businesses...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
