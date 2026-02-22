import { motion } from 'framer-motion'
import MagneticButton from '../shared/MagneticButton'

const ctas = [
  {
    label: 'Join the Movement',
    href: '/movement',
    variant: 'primary' as const,
  },
  {
    label: 'Certify Your Business',
    href: '/certification',
    variant: 'secondary' as const,
  },
  {
    label: 'Find a Safe Business',
    href: '/directory',
    variant: 'outline' as const,
  },
]

export default function CTASection() {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-10">
        Take action
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        {ctas.map((cta, i) => (
          <motion.div
            key={cta.label}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            <MagneticButton
              variant={cta.variant}
              size="lg"
              href={cta.href}
            >
              {cta.label}
            </MagneticButton>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
