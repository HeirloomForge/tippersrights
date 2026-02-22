import { type ElementType } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  as?: ElementType
  showCursor?: boolean
}

export default function TypewriterText({
  text,
  speed = 40,
  className = '',
  as: Tag = 'p',
  showCursor = true,
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const charDelay = 1 / speed
  const totalDuration = text.length * charDelay

  return (
    <div ref={containerRef}>
      <Tag className={className} aria-label={text}>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.02,
              delay: i * charDelay,
              ease: 'linear',
            }}
            aria-hidden="true"
          >
            {char}
          </motion.span>
        ))}
        {showCursor && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: [0, 1, 1, 0],
                    transition: {
                      delay: totalDuration,
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'loop',
                      times: [0, 0.1, 0.5, 0.6],
                    },
                  }
                : { opacity: 0 }
            }
            className="inline-block text-amber-400"
            aria-hidden="true"
          >
            |
          </motion.span>
        )}
      </Tag>
    </div>
  )
}
