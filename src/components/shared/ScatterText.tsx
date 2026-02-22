import { useRef, useMemo, type ElementType } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScatterTextProps {
  text: string
  className?: string
  as?: ElementType
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function ScatterText({
  text,
  className = '',
  as: Tag = 'h2',
}: ScatterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.3'],
  })

  const characters = useMemo(() => {
    return text.split('').map((char, i) => ({
      char,
      offsetX: (seededRandom(i * 7 + 1) - 0.5) * 200,
      offsetY: (seededRandom(i * 13 + 3) - 0.5) * 120,
      rotation: (seededRandom(i * 19 + 7) - 0.5) * 60,
    }))
  }, [text])

  return (
    <div ref={containerRef} className="relative">
      <Tag className={className} aria-label={text}>
        {characters.map((c, i) => (
          <ScatterChar
            key={i}
            char={c.char}
            offsetX={c.offsetX}
            offsetY={c.offsetY}
            rotation={c.rotation}
            progress={scrollYProgress}
          />
        ))}
      </Tag>
    </div>
  )
}

function ScatterChar({
  char,
  offsetX,
  offsetY,
  rotation,
  progress,
}: {
  char: string
  offsetX: number
  offsetY: number
  rotation: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const x = useTransform(progress, [0, 1], [offsetX, 0])
  const y = useTransform(progress, [0, 1], [offsetY, 0])
  const rotate = useTransform(progress, [0, 1], [rotation, 0])
  const opacity = useTransform(progress, [0, 0.3, 1], [0, 0.5, 1])

  if (char === ' ') {
    return <span>&nbsp;</span>
  }

  return (
    <motion.span
      style={{ x, y, rotate, opacity, display: 'inline-block' }}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  )
}
