import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: "Tipper's Bill of Rights",
  url: 'https://tippersbillofrights.com',
  description: 'A consumer advocacy movement fighting tipping fatigue and promoting fair-wage businesses.',
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </div>
  )
}
