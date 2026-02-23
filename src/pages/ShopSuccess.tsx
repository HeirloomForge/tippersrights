import { motion } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import SEO from '../components/shared/SEO'
import MagneticButton from '../components/shared/MagneticButton'

function ShopSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <SEO
        title="Order Confirmed"
        description="Your arsenal is being assembled."
        path="/shop/success"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mb-8"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-400"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          ORDER CONFIRMED
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-2">
          Your arsenal is being assembled. The revolution will be delivered.
        </p>
        <p className="text-slate-500 text-sm mb-8">
          A confirmation email is on its way to your inbox.
        </p>

        {sessionId && (
          <div className="mb-8 p-4 bg-slate-800/50 border border-white/10 rounded-xl">
            <p className="text-slate-400 text-xs mb-1">Order Reference</p>
            <p className="text-white font-mono text-sm break-all">{sessionId}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton variant="primary" href="/shop">
            Continue Shopping
          </MagneticButton>
          <MagneticButton variant="outline" href="/movement">
            Join the Movement
          </MagneticButton>
        </div>

        <Link
          to="/"
          className="mt-6 inline-block text-slate-500 hover:text-slate-300 text-sm transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default ShopSuccess
