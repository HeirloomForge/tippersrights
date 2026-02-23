import { motion } from 'framer-motion'
import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'
import MagneticButton from '../components/shared/MagneticButton'

function Shop() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <SEO
        title="The Arsenal"
        description="Satirical merch that makes a statement about tipping culture."
        path="/shop"
      />

      <SectionHeading
        title="THE ARSENAL"
        subtitle="Arm yourself for the revolution against guilt-driven gratuity"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-12 max-w-lg mx-auto text-center"
      >
        {/* Construction icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <motion.div
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-7xl leading-none select-none"
          >
            🚧
          </motion.div>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
          COMING SOON
        </h3>
        <p className="text-slate-400 text-lg leading-relaxed mb-3">
          We&rsquo;re stocking the armory. Cards, decals, badges, and apparel
          designed to make a statement &mdash; arriving soon.
        </p>
        <p className="text-slate-500 text-sm mb-10">
          In the meantime, arm yourself with knowledge.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton variant="primary" href="/billofrights">
            Read the Bill of Rights
          </MagneticButton>
          <MagneticButton variant="outline" href="/hall">
            Visit the Hall of Absurdity
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  )
}

export default Shop
