import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

interface Article {
  title: string
  excerpt: string
  category: 'History' | 'Psychology' | 'Economics' | 'Policy'
  readTime: string
  gradient: string
  href: string
}

const articles: Article[] = [
  {
    title: 'The Racist Roots of American Tipping Culture',
    excerpt:
      'How post-Civil War employers weaponized a European custom to avoid paying freed Black workers a living wage.',
    category: 'History',
    readTime: '8 min',
    gradient: 'from-red-900/80 to-slate-900',
    href: 'https://time.com/5404475/history-tipping-american-restaurants-civil-war/',
  },
  {
    title: 'The Psychology of the Flipped iPad',
    excerpt:
      'Why that spinning screen triggers guilt, social pressure, and tips far larger than you intended.',
    category: 'Psychology',
    readTime: '5 min',
    gradient: 'from-purple-900/80 to-slate-900',
    href: 'https://ideas.repec.org/a/eee/soceco/v95y2021ics2214804321001269.html',
  },
  {
    title: 'Tipping Culture in America: A Changed Landscape',
    excerpt:
      'Americans overwhelmingly say tipping is expected in more places, with sharp divides on when and how much to tip.',
    category: 'Economics',
    readTime: '7 min',
    gradient: 'from-amber-900/80 to-slate-900',
    href: 'https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/',
  },
  {
    title: 'Twenty-Three Years and Still Waiting for Change',
    excerpt:
      'The EPI\'s definitive analysis of why the $2.13 tipped minimum wage keeps millions in poverty.',
    category: 'Policy',
    readTime: '12 min',
    gradient: 'from-blue-900/80 to-slate-900',
    href: 'https://www.epi.org/publication/waiting-for-change-tipped-minimum-wage/',
  },
  {
    title: 'Sexual Harassment in the Restaurant Industry',
    excerpt:
      'ROC United\'s landmark report on how tip-dependency forces workers to tolerate abuse to protect their income.',
    category: 'Policy',
    readTime: '10 min',
    gradient: 'from-emerald-900/80 to-slate-900',
    href: 'https://rocunited.org/publications/',
  },
  {
    title: 'State Minimum Wages for Tipped Employees',
    excerpt:
      'See which states still allow the $2.13 federal tipped minimum and which require a full wage — the DOL\'s complete state-by-state breakdown.',
    category: 'Policy',
    readTime: '5 min',
    gradient: 'from-cyan-900/80 to-slate-900',
    href: 'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped',
  },
]

const categoryColors: Record<Article['category'], string> = {
  History: 'bg-red-500/20 text-red-400',
  Psychology: 'bg-purple-500/20 text-purple-400',
  Economics: 'bg-amber-500/20 text-amber-400',
  Policy: 'bg-blue-500/20 text-blue-400',
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <ScrollReveal delay={index * 0.08}>
      <a href={article.href} target="_blank" rel="noopener noreferrer" className="block">
      <motion.article
        ref={cardRef}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-colors duration-300"
      >
        {/* Image area with parallax */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <motion.div
            style={{ y: imageY }}
            className={`absolute inset-[-10%] bg-gradient-to-br ${article.gradient}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[article.category]}`}
            >
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-bold text-lg leading-snug group-hover:text-emerald-400 transition-colors duration-300">
            {article.title}
          </h3>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-slate-600 text-xs">{article.readTime} read</span>
            <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Read Source &nearr;
            </span>
          </div>
        </div>
      </motion.article>
      </a>
    </ScrollReveal>
  )
}

export default function ArticleGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              GO DEEPER
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-emerald-500 mx-auto" />
            <p className="mt-4 text-slate-400 text-lg">
              The research, history, and psychology behind tipping culture
            </p>
          </div>
        </ScrollReveal>

        {/* Masonry-style grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.title} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
