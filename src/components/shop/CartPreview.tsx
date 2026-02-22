import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CartActions } from '../../hooks/useCart'
import MagneticButton from '../shared/MagneticButton'

interface CartPreviewProps {
  cart: CartActions
}

export default function CartPreview({ cart }: CartPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Mini-cart Panel */}
      <AnimatePresence>
        {isOpen && cart.totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-80 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
          >
            <h3 className="text-white font-bold text-lg mb-4">Your Arsenal</h3>

            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {item.product.name}
                    </p>
                    <p className="text-slate-400 text-xs">
                      Qty: {item.quantity} &times; $
                      {item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => cart.removeItem(item.product.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors text-sm shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-sm">Subtotal</span>
                <span className="text-white font-bold text-lg">
                  ${cart.totalPrice.toFixed(2)}
                </span>
              </div>

              <MagneticButton variant="primary" size="sm" className="w-full">
                Checkout (Mock)
              </MagneticButton>

              <button
                onClick={cart.clearCart}
                className="mt-2 w-full text-center text-slate-500 hover:text-slate-300 text-xs transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center cursor-pointer border-none"
      >
        {/* Cart icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        {/* Item count badge */}
        {cart.totalItems > 0 && (
          <motion.span
            key={cart.totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-white text-emerald-600 text-xs font-bold rounded-full flex items-center justify-center"
          >
            {cart.totalItems}
          </motion.span>
        )}
      </motion.button>
    </div>
  )
}
