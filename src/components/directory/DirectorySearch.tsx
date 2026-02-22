import { useState, useRef, useEffect } from 'react'

type Category = 'all' | 'restaurant' | 'cafe' | 'retail' | 'service'

interface DirectorySearchProps {
  query: string
  onQueryChange: (q: string) => void
  category: Category
  onCategoryChange: (c: Category) => void
  locationQuery: string
  onLocationChange: (l: string) => void
  resultCount: number
}

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'retail', label: 'Retail' },
  { value: 'service', label: 'Service' },
]

const mockCities = [
  'Portland, OR',
  'Austin, TX',
  'Denver, CO',
  'Brooklyn, NY',
  'Seattle, WA',
  'Chicago, IL',
  'Nashville, TN',
  'Atlanta, GA',
  'San Francisco, CA',
  'Los Angeles, CA',
  'San Diego, CA',
  'Miami, FL',
  'Philadelphia, PA',
]

export default function DirectorySearch({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  locationQuery,
  onLocationChange,
  resultCount,
}: DirectorySearchProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const locationRef = useRef<HTMLDivElement>(null)

  const filteredCities = locationQuery
    ? mockCities.filter((c) =>
        c.toLowerCase().includes(locationQuery.toLowerCase()),
      )
    : []

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="space-y-4">
      {/* Search row */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Main search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search businesses..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-900/70 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-shadow focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          />
        </div>

        {/* Location */}
        <div ref={locationRef} className="relative w-full sm:w-56">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="City or state..."
            value={locationQuery}
            onChange={(e) => {
              onLocationChange(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full rounded-lg border border-white/10 bg-slate-900/70 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-shadow focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          />
          {showSuggestions && filteredCities.length > 0 && (
            <div className="absolute top-full z-20 mt-1 w-full rounded-lg border border-white/10 bg-slate-900 shadow-xl">
              {filteredCities.slice(0, 5).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    onLocationChange(city)
                    setShowSuggestions(false)
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-emerald-500/10 hover:text-white"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => onCategoryChange(cat.value)}
            className={[
              'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
              category === cat.value
                ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'border border-white/10 bg-slate-900/50 text-slate-400 hover:border-white/25 hover:text-white',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-slate-500">
          {resultCount} business{resultCount !== 1 ? 'es' : ''} found
        </span>
      </div>
    </div>
  )
}
