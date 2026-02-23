import { useState, useMemo } from 'react'
import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading.tsx'
import RadarSweep from '../components/directory/RadarSweep.tsx'
import DirectorySearch from '../components/directory/DirectorySearch.tsx'
import DirectoryMap from '../components/directory/DirectoryMap.tsx'
import BusinessCard from '../components/directory/BusinessCard.tsx'
import BusinessSidePanel from '../components/directory/BusinessSidePanel.tsx'
import { mockBusinesses, type Business } from '../data/mockBusinesses.ts'

type Category = 'all' | 'restaurant' | 'cafe' | 'retail' | 'service'

function Directory() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)

  const filtered = useMemo(() => {
    return mockBusinesses.filter((biz) => {
      if (category !== 'all' && biz.category !== category) return false

      if (query) {
        const q = query.toLowerCase()
        const nameMatch = biz.name.toLowerCase().includes(q)
        const descMatch = biz.description.toLowerCase().includes(q)
        if (!nameMatch && !descMatch) return false
      }

      if (locationQuery) {
        const loc = locationQuery.toLowerCase()
        const cityMatch = biz.location.city.toLowerCase().includes(loc)
        const stateMatch = biz.location.state.toLowerCase().includes(loc)
        if (!cityMatch && !stateMatch) return false
      }

      return true
    })
  }, [query, category, locationQuery])

  return (
    <>
      <SEO
        title="Certified Business Directory"
        description="Find businesses that pay fair wages."
        path="/directory"
      />

      <RadarSweep />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* Header — no ScrollReveal here to prevent re-animation flash during search */}
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
            resultCount={filtered.length}
          />
        </div>

        {/* Map + List split */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[3fr_2fr]">
          {/* Map */}
          <DirectoryMap
            businesses={filtered}
            onSelectBusiness={setSelectedBusiness}
          />

          {/* Results list */}
          <div className="space-y-3 lg:max-h-[600px] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
            {filtered.length === 0 && (
              <div className="flex h-40 items-center justify-center text-sm text-slate-500">
                No businesses match your search. Try broadening your filters.
              </div>
            )}
            {filtered.map((biz) => (
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
