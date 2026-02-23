import { useMemo, useState, useEffect } from 'react'
import ScrollReveal from '../components/shared/ScrollReveal'
import SectionHeading from '../components/shared/SectionHeading'
import TestimonialGrid from '../components/testimonials/TestimonialGrid'
import SubmissionForm from '../components/testimonials/SubmissionForm'
import { supabase } from '../lib/supabase'
import { mockTestimonials, type Testimonial } from '../data/mockTestimonials'

function computeStats(testimonials: Testimonial[]) {
  const count = testimonials.length

  const tipNumbers = testimonials
    .map((t) => {
      const match = t.tipRequested.match(/(\d+)%/)
      return match ? parseInt(match[1], 10) : null
    })
    .filter((n): n is number => n !== null)

  const avgTip =
    tipNumbers.length > 0
      ? Math.round(tipNumbers.reduce((a, b) => a + b, 0) / tipNumbers.length)
      : 0

  const mostUpvoted = testimonials.reduce((best, t) =>
    t.upvotes > best.upvotes ? t : best,
  )

  return { count, avgTip, mostAbsurd: mostUpvoted.category }
}

export default function HallOfAbsurdity() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials)

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const live: Testimonial[] = data.map((row) => ({
            id: row.id,
            story: row.story,
            category: row.category,
            tipRequested: row.tip_requested,
            location: row.location ?? '',
            upvotes: row.upvotes ?? 0,
            date: row.created_at?.slice(0, 10) ?? '',
          }))
          setTestimonials([...live, ...mockTestimonials])
        }
      })
  }, [])

  const stats = useMemo(() => computeStats(testimonials), [testimonials])

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="THE HALL OF ABSURDITY"
            subtitle="Real stories. Real guilt trips. Real absurdity."
            useScatter
          />
        </div>
      </section>

      {/* Stats bar */}
      <ScrollReveal variant="fadeIn">
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-5 px-6 rounded-2xl bg-slate-900/60 border border-white/5">
              <StatItem label="Stories submitted" value={stats.count.toString()} />
              <Divider />
              <StatItem label="Avg tip requested" value={`${stats.avgTip}%`} />
              <Divider />
              <StatItem label="Most absurd" value={stats.mostAbsurd} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonial grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <TestimonialGrid testimonials={testimonials} />
        </div>
      </section>

      {/* Submission form */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal variant="fadeUp">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Add Your Story to the Hall
            </h3>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <SubmissionForm />
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
      <p className="text-xs md:text-sm text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

function Divider() {
  return <div className="hidden md:block w-px h-10 bg-white/10" />
}
