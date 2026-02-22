import { Link } from 'react-router-dom'

const footerLinks = {
  'The Movement': [
    { to: '/billofrights', label: 'Bill of Rights' },
    { to: '/hall-of-absurdity', label: 'Hall of Absurdity' },
    { to: '/education', label: 'Reality Check' },
    { to: '/employee-safe-space', label: 'Employee Safe Space' },
  ],
  'For Businesses': [
    { to: '/certification', label: 'Get Certified' },
    { to: '/directory', label: 'Safe Zone Directory' },
    { to: '/payment-guidelines', label: 'Payment Guidelines' },
  ],
  Resources: [
    { to: '/education', label: 'Tipping History' },
    { to: '/payment-guidelines', label: 'Fair Payment Guide' },
  ],
  Shop: [
    { to: '/shop', label: 'The Arsenal' },
    { to: '/shop', label: 'Business Cards' },
    { to: '/shop', label: 'Window Decals' },
  ],
}

const socialIcons = [
  { label: 'Twitter', icon: 'X' },
  { label: 'Instagram', icon: 'IG' },
  { label: 'TikTok', icon: 'TT' },
  { label: 'Reddit', icon: 'R' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top: Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/5 pt-8 pb-8">
          <div className="max-w-md mx-auto text-center md:text-left md:mx-0 md:max-w-none md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-white">
                Join the Movement
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Get updates on the fight against tipping fatigue.
              </p>
            </div>
            <div className="flex gap-2 max-w-sm w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className={[
                  'flex-1 px-4 py-2.5 rounded-lg text-sm',
                  'bg-slate-900 border border-white/10 text-white placeholder:text-slate-500',
                  'focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25',
                ].join(' ')}
              />
              <button
                type="button"
                className={[
                  'px-5 py-2.5 rounded-lg text-sm font-semibold',
                  'bg-emerald-500 text-white hover:bg-emerald-400 transition-colors',
                  'whitespace-nowrap',
                ].join(' ')}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-sm font-bold text-slate-300 tracking-wide">
              Fighting Tipping Fatigue Since 2024
            </span>
            <span className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Tipper&apos;s Bill of Rights. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socialIcons.map((social) => (
              <span
                key={social.label}
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center',
                  'bg-slate-800 text-slate-400 text-xs font-bold',
                  'hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors cursor-pointer',
                ].join(' ')}
                title={social.label}
              >
                {social.icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
