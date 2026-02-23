import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SEO
        title="Privacy Policy"
        description="How we handle your data."
        path="/privacy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <SectionHeading
          title="PRIVACY POLICY"
          subtitle="How we handle your data — with more respect than a 47% suggested tip."
        />
        <div className="mt-12 text-center text-slate-400">
          <p className="text-lg">Full privacy policy coming soon.</p>
        </div>
      </div>
    </div>
  )
}
