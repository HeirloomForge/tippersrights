import { motion } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

interface VideoResource {
  title: string
  source: string
  type: 'video' | 'podcast'
  url: string
  description: string
}

const videos: VideoResource[] = [
  {
    title: 'Adam Ruins Everything: Why Tipping Should Be Banned',
    source: 'truTV / YouTube',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=q_vivC7c_1k',
    description:
      'The viral segment that introduced millions to the racist history and broken economics of American tipping.',
  },
  {
    title: 'How Tipping Took Over the American Economy',
    source: 'Wall Street Journal',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=zqHKMovMWaQ',
    description:
      'WSJ investigates how digital payment systems and "tip creep" expanded tipping far beyond restaurants.',
  },
  {
    title: 'Why Does Tipping Still Exist?',
    source: 'Freakonomics Radio',
    type: 'podcast',
    url: 'https://www.youtube.com/watch?v=bCYGLn80Xb4',
    description:
      'Stephen Dubner explores the economic irrationality and deep cultural inertia that keeps the tipping system alive.',
  },
  {
    title: 'Tipping Culture Is Completely Broken (2025)',
    source: 'YouTube',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dqF09rRMQBg',
    description:
      'A 2025 deep-dive into how tipping fatigue, iPad guilt, and worker exploitation have reached a breaking point.',
  },
]

const typeIcons = {
  video: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
  ),
  podcast: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
}

const typeBadgeColors = {
  video: 'bg-purple-500/20 text-purple-400',
  podcast: 'bg-blue-500/20 text-blue-400',
}

export default function VideoResources() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              WATCH &amp;{' '}
              <span className="text-purple-400">LISTEN</span>
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-purple-500 mx-auto" />
            <p className="mt-4 text-slate-400 text-lg">
              Videos and podcasts that break down the tipping problem
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <ScrollReveal key={video.url} delay={i * 0.08}>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden h-full hover:border-purple-500/30 transition-colors duration-300"
                >
                  {/* Gradient header with play icon */}
                  <div className="relative h-28 bg-gradient-to-br from-purple-900/60 to-slate-900 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-purple-500/30 group-hover:border-purple-400/40 transition-colors duration-300"
                    >
                      {typeIcons[video.type]}
                    </motion.div>

                    {/* Type badge */}
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeBadgeColors[video.type]}`}
                    >
                      {video.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-base leading-snug group-hover:text-purple-400 transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1 font-medium">
                      {video.source}
                    </p>
                    <p className="mt-3 text-slate-400 text-sm leading-relaxed line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
