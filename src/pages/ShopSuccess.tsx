import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import SEO from '../components/shared/SEO'
import MagneticButton from '../components/shared/MagneticButton'

interface OrderItem {
  name: string
  quantity: number
  price: number
  size: string | null
}

interface OrderData {
  orderId: number
  status: string
  printfulStatus: string | null
  items: OrderItem[]
  total: number
  createdAt: string
}

type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: OrderData }
  | { status: 'not-found' }
  | { status: 'error'; message: string }

function ShopSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [state, setState] = useState<FetchState>({ status: 'idle' })
  const fetchedRef = useRef(false)

  const fetchOrder = useCallback(async (sid: string) => {
    setState({ status: 'loading' })
    try {
      const res = await fetch(`/api/shop/order/${encodeURIComponent(sid)}`)
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 404) {
          setState({ status: 'not-found' })
          return
        }
        throw new Error(data.error || 'Failed to load order')
      }
      setState({ status: 'success', data: data.data })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load order'
      setState({ status: 'error', message })
    }
  }, [])

  useEffect(() => {
    if (!sessionId || fetchedRef.current) return
    fetchedRef.current = true
    fetchOrder(sessionId)
  }, [sessionId, fetchOrder])

  const statusLabel: Record<string, string> = {
    pending: 'Processing',
    paid: 'Payment Received',
    fulfilling: 'Being Assembled',
    shipped: 'Shipped',
    delivered: 'Delivered',
    failed: 'Issue Detected',
    refunded: 'Refunded',
  }

  const order = state.status === 'success' ? state.data : null

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

        {/* Loading spinner */}
        {state.status === 'loading' && (
          <div className="mb-8 flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* Error message */}
        {state.status === 'error' && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm">{state.message}</p>
          </div>
        )}

        {/* Order details */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-left bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden"
          >
            {/* Order header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Order #{order.orderId}</p>
                <p className="text-white font-semibold text-sm">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                {statusLabel[order.status] || order.status}
              </span>
            </div>

            {/* Order items */}
            <div className="p-4 space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {item.size && <span className="text-emerald-400">{item.size} &middot; </span>}
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-white text-sm font-semibold ml-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Order total */}
            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-slate-400 text-sm">Total</span>
              <span className="text-white font-bold text-lg">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </motion.div>
        )}

        {/* Session reference when no order data yet (webhook may still be processing) */}
        {!order && state.status !== 'loading' && sessionId && (
          <div className="mb-8 p-4 bg-slate-800/50 border border-white/10 rounded-xl">
            <p className="text-slate-400 text-xs mb-1">Order Reference</p>
            <p className="text-white font-mono text-sm break-all">{sessionId}</p>
            <p className="text-slate-500 text-xs mt-2">
              Your order details will appear here shortly.
            </p>
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
