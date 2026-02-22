import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type GlowColor = 'emerald' | 'blue' | 'amber' | 'white'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: GlowColor
}

const glowShadows: Record<GlowColor, string> = {
  emerald: '0 0 30px rgba(16, 185, 129, 0.15), 0 0 60px rgba(16, 185, 129, 0.05)',
  blue: '0 0 30px rgba(59, 130, 246, 0.15), 0 0 60px rgba(59, 130, 246, 0.05)',
  amber: '0 0 30px rgba(245, 158, 11, 0.15), 0 0 60px rgba(245, 158, 11, 0.05)',
  white: '0 0 30px rgba(255, 255, 255, 0.1), 0 0 60px rgba(255, 255, 255, 0.03)',
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'emerald',
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: glowShadows[glowColor],
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={[
        'bg-slate-900/50 backdrop-blur-xl rounded-2xl',
        'border border-white/10 p-6',
        'transition-colors duration-300',
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}
