import { mockProducts } from '../data/mockProducts'
import useCart from '../hooks/useCart'
import SectionHeading from '../components/shared/SectionHeading'
import ScrollReveal from '../components/shared/ScrollReveal'
import GlowCard from '../components/shared/GlowCard'
import MagneticButton from '../components/shared/MagneticButton'
import ProductGrid from '../components/shop/ProductGrid'
import CartPreview from '../components/shop/CartPreview'

const flagshipProduct = mockProducts[0]

const steps = [
  {
    num: '01',
    title: 'Choose Your Weapon',
    desc: 'Browse the arsenal. Cards, decals, badges, and apparel designed to make a statement.',
  },
  {
    num: '02',
    title: 'Deploy with Confidence',
    desc: 'Hand out cards, display decals, wear the gear. Every interaction becomes a conversation.',
  },
  {
    num: '03',
    title: 'Spread the Movement',
    desc: 'Every card handed out, every decal displayed is a small act of revolution against guilt-tipping.',
  },
]

function Shop() {
  const cart = useCart()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <SectionHeading
          title="THE ARSENAL"
          subtitle="Arm yourself for the revolution against guilt-driven gratuity"
          useScatter
        />
      </section>

      {/* Featured Product Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-12"
            style={{
              background:
                'linear-gradient(135deg, rgba(5,150,105,0.15) 0%, rgba(15,23,42,0.9) 50%, rgba(5,150,105,0.1) 100%)',
            }}
          >
            <div className="absolute top-4 left-6 text-emerald-400 text-xs font-mono uppercase tracking-widest">
              Featured
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
              {/* Product Visual */}
              <div
                className="w-full md:w-1/3 h-56 rounded-2xl overflow-hidden shrink-0"
                style={{ background: flagshipProduct.gradient }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(5,150,105,0.15) 10px, rgba(5,150,105,0.15) 20px)',
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                  {flagshipProduct.name}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-2">
                  {flagshipProduct.description}
                </p>
                <p className="text-slate-300 italic mb-6">
                  Hand these to any business that flips the iPad at you.
                  Polite. Principled. Devastating.
                </p>
                <div className="flex items-center gap-6 justify-center md:justify-start">
                  <span className="text-white font-black text-3xl">
                    ${flagshipProduct.price.toFixed(2)}
                  </span>
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    onClick={() => cart.addItem(flagshipProduct)}
                  >
                    Add to Arsenal
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <ScrollReveal>
          <ProductGrid onAddToCart={cart.addItem} />
        </ScrollReveal>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <ScrollReveal>
          <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-12">
            How It Works
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <GlowCard className="text-center h-full">
                <div className="text-emerald-400 font-mono text-4xl font-black mb-4">
                  {step.num}
                </div>
                <h4 className="text-white font-bold text-lg mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Bottom CTAs */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <ScrollReveal>
          <div className="text-center space-y-4">
            <p className="text-slate-400 text-lg">
              Want to go digital? Share the Bill of Rights instead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton variant="outline" href="/billofrights">
                Read the Bill of Rights
              </MagneticButton>
              <MagneticButton variant="secondary" href="/certification">
                Business Owner? Get Certified
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Floating Cart */}
      <CartPreview cart={cart} />
    </div>
  )
}

export default Shop
