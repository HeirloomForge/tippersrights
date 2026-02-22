import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQSource {
  label: string
  url: string
}

interface FAQItem {
  question: string
  answer: string
  sources?: FAQSource[]
}

interface AccordionFAQProps {
  items: FAQItem[]
  title?: string
  accentColor?: 'emerald' | 'amber'
}

const accents = {
  emerald: {
    icon: 'text-emerald-400',
    border: 'border-emerald-500/30',
    hover: 'hover:border-emerald-500/50',
    question: 'group-hover:text-emerald-400',
  },
  amber: {
    icon: 'text-amber-400',
    border: 'border-amber-500/30',
    hover: 'hover:border-amber-500/50',
    question: 'group-hover:text-amber-400',
  },
}

export default function AccordionFAQ({
  items,
  title,
  accentColor = 'emerald',
}: AccordionFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const colors = accents[accentColor]

  return (
    <div>
      {title && (
        <h3 className="text-2xl md:text-3xl font-black text-white mb-8">
          {title}
        </h3>
      )}

      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i

          return (
            <div
              key={i}
              className={`rounded-xl border ${
                isOpen ? colors.border : 'border-white/10'
              } ${colors.hover} bg-slate-900/40 backdrop-blur-sm transition-colors duration-300 overflow-hidden group`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
              >
                <span
                  className={`text-white font-semibold text-sm md:text-base ${colors.question} transition-colors duration-200`}
                >
                  {item.question}
                </span>

                {/* Plus/minus icon */}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`shrink-0 text-xl font-light ${colors.icon}`}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="px-5 pb-5">
                      <div className="h-px bg-white/5 mb-4" />
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                      {item.sources && item.sources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                          <span className="text-slate-600 text-xs italic">Sources:</span>
                          {item.sources.map((src, si) => (
                            <a
                              key={si}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs italic text-slate-600 underline decoration-slate-700 hover:text-slate-400 hover:decoration-slate-500 transition-colors"
                            >
                              {src.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
