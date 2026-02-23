import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import StatCounter from '../shared/StatCounter'

const POLL_INTERVAL_MS = 30_000 // refresh every 30s
const FALLBACK_COUNT = 0 // show 0 if API unreachable (no fake numbers)

export default function LiveCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch('/api/petition/count')
      if (!res.ok) return
      const json = await res.json()
      setCount(json.data?.count ?? FALLBACK_COUNT)
      setLoaded(true)
    } catch {
      // API unreachable — keep current count or show fallback
      if (!loaded) {
        setCount(FALLBACK_COUNT)
        setLoaded(true)
      }
    }
  }, [loaded])

  useEffect(() => {
    fetchCount()
    const id = setInterval(fetchCount, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [fetchCount])

  const displayCount = count ?? FALLBACK_COUNT

  return (
    <div className="text-center">
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <StatCounter
          value={displayCount}
          className="text-6xl sm:text-7xl md:text-8xl font-black text-white"
          duration={1.5}
        />
      </motion.div>

      <p className="mt-4 text-lg md:text-xl text-slate-400 tracking-wide">
        {displayCount === 0
          ? 'be the first to sign the petition'
          : 'guilt-free transactions and counting'}
      </p>

      <div className="mt-6 flex justify-center gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  )
}
