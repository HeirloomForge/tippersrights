import { useState, useEffect, useCallback, useRef } from 'react'
import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading.tsx'
import RadarSweep from '../components/directory/RadarSweep.tsx'
import DirectorySearch from '../components/directory/DirectorySearch.tsx'
import DirectoryMap from '../components/directory/DirectoryMap.tsx'
import BusinessCard from '../components/directory/BusinessCard.tsx'
import BusinessSidePanel from '../components/directory/BusinessSidePanel.tsx'
import { mockBusinesses, type Business } from '../data/mockBusinesses.ts'

type Category = 'all' | 'restaurant' | 'cafe' | 'retail' | 'service'

/** Minimal shape returned from the API search endpoint. */
interface ApiBusiness {
  id: number
  name: string
  city: string
  state: string
  zipCode: string
  category: 'restaurant' | 'cafe' | 'retail' | 'service'
  website: string | null
  livingWageCertified: boolean
  ethicalPosCertified: boolean
  certifiedAt: string
}

/** Convert API business to the frontend Business interface (fill gaps with defaults). */
function apiToFrontend(b: ApiBusiness): Business {
  return {
    id: `api-${b.id}`,
    name: b.name,
    category: b.category,
    location: { city: b.city, state: b.state, lat: 0, lng: 0 },
    rating: 0,
    certifiedDate: b.certifiedAt,
    description: b.livingWageCertified && b.ethicalPosCertified
      ? 'Certified fair-wage business with ethical point-of-sale practices.'
      : 'Certified business.',
    wagePractice: b.livingWageCertified ? 'Living wage certified' : '',
    reviews: [],
  }
}

function Directory() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)

  // Track whether user has actively searched (triggers API mode)
  const [hasSearched, setHasSearched] = useState(false)
  const [apiResults, setApiResults] = useState<Business[]>([])
  const [apiLoading, setApiLoading] = useState(false)
  const [apiTotal, setApiTotal] = useState(0)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Search API with debounce
  const searchApi = useCallback(async (q: string, loc: string, cat: Category) => {
    setApiLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (loc) {
        // Parse "City, ST" format from location
        const parts = loc.split(',').map((s) => s.trim())
        if (parts.length >= 2 && parts[1].length === 2) {
          params.set('city', parts[0])
          params.set('state', parts[1].toUpperCase())
        } else if (parts[0]) {
          params.set('q', params.get('q') ? `${params.get('q')} ${parts[0]}` : parts[0])
        }
      }
      if (cat !== 'all') params.set('category', cat)
      params.set('limit', '50')

      const res = await fetch(`/api/businesses/search?${params}`)
      if (!res.ok) throw new Error('API error')
      const json = await res.json()
      const businesses: ApiBusiness[] = json.data?.businesses ?? []
      setApiResults(businesses.map(apiToFrontend))
      setApiTotal(json.data?.pagination?.total ?? businesses.length)
    } catch {
      // On API error, fall back to empty (mock stays visible if no search active)
      setApiResults([])
      setApiTotal(0)
    } finally {
      setApiLoading(false)
    }
  }, [])

  // Trigger API search when filters change (with debounce for typing)
  useEffect(() => {
    const isActive = query.length > 0 || locationQuery.length > 0 || category !== 'all'

    if (!isActive) {
      setHasSearched(false)
      return
    }

    setHasSearched(true)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      searchApi(query, locationQuery, category)
    }, 300)

    return () => clearTimeout(debounceRef.current)
  }, [query, locationQuery, category, searchApi])

  // Show mock data when no search active, API results when searching
  const displayed = hasSearched ? apiResults : mockBusinesses
  const resultCount = hasSearched ? apiTotal : mockBusinesses.length

  return (
    <>
      <SEO
        title="Certified Business Directory"
        description="Find businesses that pay fair wages."
        path="/directory"
      />

      <RadarSweep />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          title="THE SAFE ZONE"
          subtitle="Find businesses that do it right. No guilt screens, no forced generosity — just fair prices and fair wages."
        />

        {/* Search */}
        <div className="mt-12">
          <DirectorySearch
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            locationQuery={locationQuery}
            onLocationChange={setLocationQuery}
            resultCount={resultCount}
          />
        </div>

        {/* Loading indicator */}
        {apiLoading && (
          <div className="mt-4 text-center text-sm text-slate-500">
            Searching certified businesses...
          </div>
        )}

        {/* Map + List split */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[3fr_2fr]">
          {/* Map */}
          <DirectoryMap
            businesses={displayed}
            onSelectBusiness={setSelectedBusiness}
          />

          {/* Results list */}
          <div className="space-y-3 lg:max-h-[600px] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
            {displayed.length === 0 && !apiLoading && (
              <div className="flex flex-col h-40 items-center justify-center text-sm text-slate-500">
                <p>No certified businesses found.</p>
                {hasSearched && (
                  <p className="mt-2 text-xs text-slate-600">
                    Know a business that should be listed?{' '}
                    <a href="/certification" className="text-emerald-400 hover:underline">
                      Encourage them to get certified.
                    </a>
                  </p>
                )}
              </div>
            )}
            {displayed.map((biz) => (
              <BusinessCard
                key={biz.id}
                business={biz}
                onSelect={setSelectedBusiness}
              />
            ))}
          </div>
        </div>

        {/* Side panel */}
        <BusinessSidePanel
          business={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      </div>
    </>
  )
}

export default Directory
