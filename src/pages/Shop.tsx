import { motion } from 'framer-motion'
import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'
import ProductGrid from '../components/shop/ProductGrid'
import CartPreview from '../components/shop/CartPreview'
import useCart from '../hooks/useCart'

function Shop() {
  const cart = useCart()

  return (
    <div className="min-h-screen px-6 py-24">
      <SEO
        title="The Arsenal"
        description="Satirical merch that makes a statement about tipping culture. Cards, decals, badges, and apparel."
        path="/shop"
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="THE ARSENAL"
          subtitle="Arm yourself for the revolution against guilt-driven gratuity"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12"
        >
          <ProductGrid onAddToCart={cart.addItem} />
        </motion.div>
      </div>

      <CartPreview cart={cart} />
    </div>
  )
}

export default Shop
