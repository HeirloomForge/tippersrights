import SEO from '../components/shared/SEO'
import SectionHeading from '../components/shared/SectionHeading'

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SEO
        title="Contact Us"
        description="Reach the team behind TBOR."
        path="/contact"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <SectionHeading
          title="CONTACT US"
          subtitle="Reach the team behind the movement."
        />
        <div className="mt-12 text-center text-slate-400">
          <p className="text-lg">Full contact page coming soon.</p>
        </div>
      </div>
    </div>
  )
}
