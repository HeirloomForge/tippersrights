import { motion } from 'framer-motion'
import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'
import MagneticButton from '../components/shared/MagneticButton'

const STORE_URL = 'https://tippersbillofrights.printful.me/'

function Shop() {
  return (
    <div className="min-h-screen px-6 py-24">
      <SEO
        title="Merch"
        description="Support the movement against guilt-driven gratuity. Every purchase funds outreach, awareness, and the fight for fair compensation."
        path="/shop"
      />

      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="SUPPORT THE MOVEMENT"
          subtitle="Every purchase directly funds our outreach efforts, raises awareness about tipping culture, and helps us fight for fair compensation nationwide."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          {/* Merch preview images */}
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="w-64 h-64 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl"
            >
              <img
                src="https://files.cdn.printful.com/files/405/4055b52b184dd6b77007c23b5637b010_preview.png"
                alt="TBOR Hoodie"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-64 h-64 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl"
            >
              <img
                src="https://files.cdn.printful.com/files/61b/61ba8f38446dddcaecd1c6ad33202f5f_preview.png"
                alt="TBOR Sweatshirt"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Support messaging */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-slate-300 text-lg leading-relaxed">
              Wear the movement. Every hoodie, every sweatshirt, every conversation
              it starts — that's one more person who knows the tipping system is broken
              and it's time to fix it.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <MagneticButton variant="primary" size="lg">
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Shop Merch
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </MagneticButton>
            <p className="text-slate-500 text-sm">
              Opens our official merch store — powered by Printful
            </p>
          </div>

          {/* Impact stats placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">100%</div>
              <div className="text-slate-400 text-sm mt-1">Profits fund outreach</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">Zero</div>
              <div className="text-slate-400 text-sm mt-1">Guilt required</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">One</div>
              <div className="text-slate-400 text-sm mt-1">Movement to join</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Shop
