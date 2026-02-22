import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../shared/ScrollReveal'

interface ArticleLink {
  title: string
  source: string
  url: string
}

interface TopicGroup {
  id: string
  tab: string
  headline: string
  color: string
  activeColor: string
  borderColor: string
  articles: ArticleLink[]
}

const topics: TopicGroup[] = [
  {
    id: 'discriminatory',
    tab: 'Discriminatory',
    headline: 'The System Is Discriminatory',
    color: 'text-red-400',
    activeColor: 'bg-red-500',
    borderColor: 'border-red-500/30',
    articles: [
      {
        title: 'Racial Discrimination in Restaurant Tipping',
        source: 'Cornell University',
        url: 'https://ecommons.cornell.edu/server/api/core/bitstreams/bde97497-3441-4fc6-b511-2257e1a714eb/content',
      },
      {
        title: 'Rooted in Racism: Tipping and the Legacy of Slavery',
        source: 'Economic Policy Institute',
        url: 'https://www.epi.org/publication/rooted-racism-tipping/',
      },
      {
        title: 'Does Tipping Facilitate Sexual Objectification?',
        source: 'Harvard Kennedy School',
        url: 'https://gap.hks.harvard.edu/does-tipping-facilitate-sexual-objectification-effect-tips-sexual-harassment-bar-and-restaurant',
      },
      {
        title: 'The Racist History of Tipping',
        source: 'Politico',
        url: 'https://www.politico.com/magazine/story/2019/07/17/william-barber-tipping-racist-past-227361',
      },
      {
        title: 'American Tipping Is Rooted in Slavery',
        source: 'Ford Foundation',
        url: 'https://www.fordfoundation.org/news-and-stories/stories/american-tipping-is-rooted-in-slavery-and-it-still-hurts-workers-today/',
      },
    ],
  },
  {
    id: 'broken',
    tab: "Doesn't Work",
    headline: "The System Doesn't Work",
    color: 'text-amber-400',
    activeColor: 'bg-amber-500',
    borderColor: 'border-amber-500/30',
    articles: [
      {
        title: 'Only 2-4% of Tip Variance Is Explained by Service Quality',
        source: 'Michael Lynn, Cornell',
        url: 'https://www.tippingresearch.com',
      },
      {
        title: 'Why Does Tipping Still Exist?',
        source: 'Freakonomics',
        url: 'https://freakonomics.com/podcast/why-does-tipping-still-exist-ep-396/',
      },
      {
        title: 'Social Norms and Economic Behavior in Tipping',
        source: 'J. Behavioral Economics',
        url: 'https://ideas.repec.org/a/eee/soceco/v95y2021ics2214804321001269.html',
      },
      {
        title: 'From Reward to Requirement: The New Tipping Culture',
        source: 'Temple University',
        url: 'https://research.temple.edu/news/2025/08/reward-requirement-new-tipping-culture',
      },
    ],
  },
  {
    id: 'hated',
    tab: 'People Hate It',
    headline: 'People Hate It',
    color: 'text-blue-400',
    activeColor: 'bg-blue-500',
    borderColor: 'border-blue-500/30',
    articles: [
      {
        title: 'Tipping Culture in America: A Changed Landscape',
        source: 'Pew Research Center, 2023',
        url: 'https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/',
      },
      {
        title: 'When Tipping Becomes a Customer Experience Problem',
        source: 'Harvard Business Review / Bankrate',
        url: 'https://hbr.org/2026/01/when-tipping-becomes-a-customer-experience-problem',
      },
      {
        title: 'Some Economics of Tipping',
        source: 'Conversable Economist',
        url: 'https://conversableeconomist.com/2024/04/30/some-economics-of-tipping-2/',
      },
    ],
  },
  {
    id: 'exploitation',
    tab: 'Exploitation',
    headline: 'It Enables Exploitation',
    color: 'text-red-400',
    activeColor: 'bg-red-500',
    borderColor: 'border-red-500/30',
    articles: [
      {
        title: 'Tips and "Service With a Smile" Drive Sexual Harassment',
        source: 'NPR / Notre Dame',
        url: 'https://www.npr.org/2021/07/22/1019017172/tips-and-service-with-a-smile-drive-sexual-harassment-in-restaurants-study-finds',
      },
      {
        title: 'How Working for Tips Fosters Sexual Harassment',
        source: 'Shriver Center on Poverty Law',
        url: 'https://www.povertylaw.org/article/how-working-for-tips-fosters-sexual-harassment/',
      },
      {
        title: 'The Racist History Behind America\'s Tipping Culture',
        source: 'Poverty Law Center',
        url: 'https://www.povertylaw.org/article/the-racist-history-behind-americas-tipping-culture/',
      },
    ],
  },
  {
    id: 'change',
    tab: 'Change Is Possible',
    headline: 'Change Is Possible',
    color: 'text-emerald-400',
    activeColor: 'bg-emerald-500',
    borderColor: 'border-emerald-500/30',
    articles: [
      {
        title: 'State Minimum Wages for Tipped Employees',
        source: 'U.S. Department of Labor',
        url: 'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped',
      },
      {
        title: 'Minimum Wage Tracker',
        source: 'Economic Policy Institute',
        url: 'https://www.epi.org/minimum-wage-tracker/',
      },
      {
        title: "One Fair Wage's Fight to End Subminimum Wages",
        source: 'Food Tank',
        url: 'https://foodtank.com/news/2024/01/one-fair-wages-fight-to-end-subminimum-wages-is-gaining-momentum/',
      },
      {
        title: 'Raises From Coast to Coast in 2025',
        source: 'NELP',
        url: 'https://www.nelp.org/insights-research/raises-from-coast-to-coast-in-2025/',
      },
    ],
  },
]

export default function TopicArticleGrid() {
  const [activeTab, setActiveTab] = useState(topics[0].id)
  const activeTopic = topics.find((t) => t.id === activeTab) ?? topics[0]

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              GO DEEPER
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-emerald-500 mx-auto" />
            <p className="mt-4 text-slate-400 text-lg">
              Research and reporting organized by theme
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {topics.map((topic) => {
              const isActive = activeTab === topic.id
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? `${topic.activeColor} text-white`
                      : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {topic.tab}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Article list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTopic.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <h3
              className={`text-2xl md:text-3xl font-black mb-6 ${activeTopic.color}`}
            >
              {activeTopic.headline}
            </h3>

            <div className="space-y-3">
              {activeTopic.articles.map((article, i) => (
                <motion.a
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`group flex items-start gap-4 bg-slate-900/40 backdrop-blur-sm rounded-xl border ${activeTopic.borderColor} p-5 hover:bg-slate-900/70 transition-colors duration-200 block`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm md:text-base group-hover:text-emerald-400 transition-colors duration-200 leading-snug">
                      {article.title}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {article.source}
                    </p>
                  </div>
                  <span className="text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 text-lg mt-0.5">
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
