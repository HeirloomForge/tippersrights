import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StatCounter from '../shared/StatCounter'

const BASE_COUNT = 1_247_893
const INCREMENT_INTERVAL_MS = 3_200

export default function LiveCounter() {
  const [count, setCount] = useState(BASE_COUNT)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, INCREMENT_INTERVAL_MS)
    return () => clearInterval(id)
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
        guilt-free transactions and counting
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
