import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Business } from '../../data/mockBusinesses.ts'

interface DirectoryMapProps {
  businesses: Business[]
  onSelectBusiness: (biz: Business) => void
}

function latLngToPercent(
  lat: number,
  lng: number,
): { x: number; y: number } {
  // Map US continental lat/lng range to 5-95% of the container
  const minLat = 25
  const maxLat = 48
  const minLng = -125
  const maxLng = -70
  const x = ((lng - minLng) / (maxLng - minLng)) * 90 + 5
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 90 + 5
  return { x, y }
}

export default function DirectoryMap({
  businesses,
  onSelectBusiness,
}: DirectoryMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950 lg:h-full lg:min-h-[500px]">
      {/* Grid street lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Diagonal accent lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(45deg, rgba(16,185,129,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* City label */}
      <div className="absolute left-3 top-3 text-[10px] uppercase tracking-widest text-slate-600">
        United States
      </div>

      {/* Business pins */}
      {businesses.map((biz) => {
        const pos = latLngToPercent(biz.location.lat, biz.location.lng)
        return (
          <div
            key={biz.id}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-emerald-500/20"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
            />
            {/* Pin dot */}
            <button
              type="button"
              className="relative z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-transform hover:scale-150 cursor-pointer"
              onMouseEnter={() => setHoveredId(biz.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectBusiness(biz)}
              aria-label={`View ${biz.name}`}
            />

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredId === biz.id && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-white shadow-xl border border-white/10"
                >
                  {biz.name}
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-800 border-r border-b border-white/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      {/* Empty state */}
      {businesses.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
          No businesses match your filters
        </div>
      )}
    </div>
  )
}
