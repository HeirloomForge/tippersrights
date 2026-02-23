import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SEO
        title="Terms of Service"
        description="Terms governing your participation in the movement."
        path="/terms"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <SectionHeading
          title="TERMS OF SERVICE"
          subtitle="The rules of the revolution — read before you sign."
        />
        <div className="mt-12 text-center text-slate-400">
          <p className="text-lg">Full terms of service coming soon.</p>
        </div>
      </div>
    </div>
  )
}
