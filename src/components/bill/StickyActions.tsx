import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useRef } from 'react'
import MagneticButton from '../shared/MagneticButton'

export default function StickyActions() {
  const [visible, setVisible] = useState(false)
  const hasPassedThreshold = useRef(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const threshold = 400
    if (latest > threshold && !hasPassedThreshold.current) {
      hasPassedThreshold.current = true
      setVisible(true)
    } else if (latest <= threshold && hasPassedThreshold.current) {
      hasPassedThreshold.current = false
      setVisible(false)
    }
  })

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={
        visible
          ? { y: 0, opacity: 1 }
          : { y: 100, opacity: 0 }
      }
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
      className="fixed bottom-6 right-6 z-50 max-w-xs"
    >
      <div className="bg-slate-900/70 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl shadow-black/40">
        <MagneticButton variant="primary" size="md" className="w-full mb-3">
          <PrinterIcon />
          <span className="ml-2">Print the Pocket Card</span>
        </MagneticButton>

        <div className="flex items-center justify-center gap-3">
          <ShareButton label="Share on X">
            <XIcon />
          </ShareButton>
          <ShareButton label="Share on Facebook">
            <FacebookIcon />
          </ShareButton>
          <ShareButton label="Copy Link">
            <LinkIcon />
          </ShareButton>
        </div>
      </div>
    </motion.div>
  )
}

function ShareButton({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex items-center justify-center w-9 h-9 rounded-full
        bg-white/5 border border-white/10 text-slate-400
        hover:text-white hover:bg-white/10 hover:border-white/20
        transition-colors duration-200 cursor-pointer"
    >
      {children}
    </button>
  )
}

function PrinterIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  )
}
