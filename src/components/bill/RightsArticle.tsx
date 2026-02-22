import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface RightsArticleProps {
  number: number
  title: string
  body: string
  index: number
}

const ROMAN_NUMERALS = [
  'I', 'II', 'III', 'IV', 'V',
  'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII',
]

export default function RightsArticle({
  number,
  title,
  body,
  index,
}: RightsArticleProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const numeral = ROMAN_NUMERALS[number - 1] ?? String(number)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative py-10 border-b border-white/5 last:border-b-0"
    >
      <div className="flex gap-6 md:gap-10 items-start">
        {/* Roman numeral */}
        <div className="shrink-0 w-16 md:w-24">
          <span className="block font-serif text-4xl md:text-6xl font-bold text-amber-400/80 leading-none tracking-tight select-none">
            {numeral}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-base md:text-lg font-serif text-slate-300 leading-relaxed">
            {body}
          </p>
        </div>
      </div>

      {/* Subtle gold accent line on hover */}
      <div className="absolute left-0 top-0 h-full w-0.5 bg-amber-400/0 group-hover:bg-amber-400/40 transition-colors duration-300" />
    </motion.article>
  )
}
