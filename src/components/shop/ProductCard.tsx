import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { Product } from '../../data/mockProducts'
import MagneticButton from '../shared/MagneticButton'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, size?: string) => void
}


function GlassReflection({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-xl"
      initial={false}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)',
        }}
        animate={{ x: isHovered ? '120%' : '-120%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

function TiltWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rotateY.set(((e.clientX - centerX) / (rect.width / 2)) * 8)
    rotateX.set(((centerY - e.clientY) / (rect.height / 2)) * 8)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: springX,
        rotateY: springY,
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[2] // Default to 'L' if apparel
  )

  const isApparel = product.category === 'apparel' && product.sizes
  const isOutOfStock = !product.inStock

  function handleAddToCart() {
    if (isOutOfStock) return
    if (isApparel && !selectedSize) return
    onAddToCart(product, selectedSize)
  }

  const imageArea = (
    <div
      className="relative h-48 rounded-xl overflow-hidden bg-slate-800"
    >
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      />
      {product.category === 'decals' && <GlassReflection isHovered={isHovered} />}

      {/* Out of stock overlay */}
      {isOutOfStock && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <span className="text-white/80 font-bold text-sm uppercase tracking-wider">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  )

  const cardContent = (
    <motion.div
      className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 flex flex-col h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={
        isOutOfStock
          ? undefined
          : product.category === 'badges'
            ? {
                scale: 1.02,
                boxShadow:
                  '0 0 25px rgba(59,130,246,0.3), 0 0 50px rgba(59,130,246,0.1)',
              }
            : product.category === 'apparel'
              ? { scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }
              : { scale: 1.02 }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {imageArea}

      <div className="mt-4 flex-1 flex flex-col">
        <h3 className="text-white font-bold text-lg leading-tight">
          {product.name}
        </h3>
        <p className="mt-2 text-slate-400 text-sm leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Size selector for apparel */}
        {isApparel && (
          <div className="mt-3 flex gap-1.5 flex-wrap">
            {product.sizes!.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                disabled={isOutOfStock}
                className={[
                  'px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200',
                  selectedSize === size
                    ? 'bg-emerald-500 text-white border border-emerald-400'
                    : 'bg-slate-800 text-slate-400 border border-white/10 hover:border-white/30 hover:text-white',
                  isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                ].join(' ')}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-white font-black text-xl">
            ${product.price.toFixed(2)}
          </span>
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to Arsenal'}
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  )

  if (product.category === 'cards' && !isOutOfStock) {
    return <TiltWrapper>{cardContent}</TiltWrapper>
  }

  return cardContent
}
