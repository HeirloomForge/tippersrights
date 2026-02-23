import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface MagneticButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  onClick?: () => void
  className?: string
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const glowColors: Record<Variant, string> = {
  primary: '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.1)',
  secondary: '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.1)',
  outline: '0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.05)',
}

const baseStyles: Record<Variant, string> = {
  primary:
    'bg-emerald-500 text-white border border-emerald-400/50 hover:bg-emerald-400',
  secondary:
    'bg-blue-500 text-white border border-blue-400/50 hover:bg-blue-400',
  outline:
    'bg-transparent text-white border border-white/30 hover:border-white/60',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const MAGNETIC_STRENGTH = 0.3
const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 }

export default function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  href,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING_CONFIG)
  const springY = useSpring(y, SPRING_CONFIG)

  function handleMouseMove(e: MouseEvent) {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * MAGNETIC_STRENGTH)
    y.set((e.clientY - centerY) * MAGNETIC_STRENGTH)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const classes = [
    'relative inline-flex items-center justify-center rounded-lg font-semibold',
    'transition-colors duration-200 select-none',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    baseStyles[variant],
    sizeStyles[size],
    className,
  ].join(' ')

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={disabled ? undefined : { boxShadow: glowColors[variant] }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={classes}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </motion.div>
  )

  if (href && !disabled) {
    return (
      <Link to={href} className="inline-block">
        {content}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} className="inline-block bg-transparent border-none p-0">
      {content}
    </button>
  )
}
