import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/billofrights', label: 'The Bill' },
  { to: '/movement', label: 'The Movement' },
  { to: '/hall-of-absurdity', label: 'Hall of Absurdity' },
  { to: '/directory', label: 'Safe Zone' },
  { to: '/education', label: 'Reality Check' },
  { to: '/shop', label: 'Arsenal' },
]

const menuVariants = {
  closed: {
    x: '100%',
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  open: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
}

const linkVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu on route change — intentional setState in effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (path: string) => location.pathname === path
  const isLanding = location.pathname === '/'

  return (
    <nav
      className={[
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled || mobileOpen || !isLanding
          ? 'bg-slate-950 backdrop-blur-lg border-b border-white/5 shadow-lg shadow-black/10'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-black uppercase tracking-widest">
            <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
              Tipper&apos;s
            </span>{' '}
            <span className="text-white">Bill of Rights</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={[
                'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive(link.to)
                  ? 'text-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-white/5',
              ].join(' ')}
            >
              {link.label}
              {isActive(link.to) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <Link
            to="/certification"
            className={[
              'ml-3 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200',
              'bg-emerald-500 text-white hover:bg-emerald-400',
              'shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30',
            ].join(' ')}
          >
            Get Certified
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-full h-0.5 bg-white origin-center"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-full h-0.5 bg-white"
              transition={{ duration: 0.15 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-full h-0.5 bg-white origin-center"
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={[
                'fixed top-0 right-0 h-full w-[280px] z-50 lg:hidden',
                'bg-slate-950 border-l border-white/10',
                'flex flex-col pt-20 px-6',
              ].join(' ')}
            >
              {navLinks.map((link, i) => (
                <motion.div key={link.to} custom={i} variants={linkVariants}>
                  <Link
                    to={link.to}
                    className={[
                      'block py-3 text-lg font-medium border-b border-white/5 transition-colors',
                      isActive(link.to) ? 'text-emerald-400' : 'text-slate-300',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                custom={navLinks.length}
                variants={linkVariants}
                className="mt-6"
              >
                <Link
                  to="/certification"
                  className={[
                    'block text-center py-3 rounded-lg font-semibold',
                    'bg-emerald-500 text-white hover:bg-emerald-400 transition-colors',
                  ].join(' ')}
                >
                  Get Certified
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
