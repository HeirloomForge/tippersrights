import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import StatCounter from '../shared/StatCounter'

const POLL_INTERVAL_MS = 30_000

export default function LiveCounter() {
  const [count, setCount] = useState(0)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true

    const controller = new AbortController()

    async function poll() {
      try {
        const res = await fetch('/api/petition/count', { signal: controller.signal })
        if (!res.ok || !mountedRef.current) return
        const json = await res.json()
        if (mountedRef.current) {
          setCount(json.data?.count ?? 0)
        }
      } catch {
        // API unreachable — keep current count
      }
    }

    // Initial fetch + polling interval
    poll()
    const id = setInterval(poll, POLL_INTERVAL_MS)

    return () => {
      mountedRef.current = false
      controller.abort()
      clearInterval(id)
    }
  }, [])

  return (
    <div className="text-center">
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <StatCounter
          value={count}
          className="text-6xl sm:text-7xl md:text-8xl font-black text-white"
          duration={1.5}
        />
      </motion.div>

      <p className="mt-4 text-lg md:text-xl text-slate-400 tracking-wide">
        {count === 0
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
