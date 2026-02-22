import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

function FormattedNumber({ motionVal }: { motionVal: ReturnType<typeof useSpring> }) {
  const ref = useRef<HTMLSpanElement>(null)
  const display = useTransform(motionVal, (v: number) =>
    Math.round(v).toLocaleString('en-US')
  )

  useEffect(() => {
    const unsubscribe = display.on('change', (latest) => {
      if (ref.current) ref.current.textContent = latest
    })
    return unsubscribe
  }, [display])

  return <span ref={ref}>0</span>
}

export default function StatCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
}: StatCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.5 })

  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000,
  })

  useEffect(() => {
    if (isInView) {
      motionVal.set(value)
    }
  }, [isInView, motionVal, value])

  return (
    <motion.div
      ref={containerRef}
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      <FormattedNumber motionVal={springVal} />
      {suffix}
    </motion.div>
  )
}
