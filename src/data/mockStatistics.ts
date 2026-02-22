export interface Statistic {
  id: string
  value: string
  label: string
  description: string
  source: string
  sourceUrl?: string
  category: 'gender' | 'race' | 'poverty' | 'general'
}

export const mockStatistics: Statistic[] = [
  {
    id: 'stat-001',
    value: '66%',
    label: 'Female Tipped Workforce',
    description:
      'Two-thirds of tipped workers in America are women, making them disproportionately affected by the sub-minimum tipped wage system.',
    source: 'Economic Policy Institute',
    sourceUrl:
      'https://www.epi.org/publication/waiting-for-change-tipped-minimum-wage/',
    category: 'gender',
  },
  {
    id: 'stat-002',
    value: '78¢',
    label: 'Gender Pay Gap in Tipped Work',
    description:
      'In states following the federal $2.13 tipped minimum, female tipped workers earn roughly 78 cents for every dollar earned by their male counterparts.',
    source: 'National Women\'s Law Center',
    sourceUrl: 'https://nwlc.org/resource/one-fair-wage/',
    category: 'gender',
  },
  {
    id: 'stat-003',
    value: '15-20%',
    label: 'Racial Tip Gap',
    description:
      'Peer-reviewed research found servers of color receive 15-20% less in tips than white servers for identical service quality, turning implicit bias into income inequality.',
    source: 'Cornell University Hospitality Research',
    sourceUrl:
      'https://sha.cornell.edu/faculty-research/faculty/wml3/',
    category: 'race',
  },
  {
    id: 'stat-004',
    value: '2.3x',
    label: 'Poverty Rate',
    description:
      'Tipped workers are 2.3 times more likely to live in poverty (11.3% vs 4.9%) — with the South hitting 12.7% poverty and 70% of Southern tipped workers being women.',
    source: 'EPI: Rooted in Racism',
    sourceUrl:
      'https://www.epi.org/publication/rooted-racism-tipping/',
    category: 'poverty',
  },
  {
    id: 'stat-005',
    value: '$2.13',
    label: 'Federal Tipped Minimum Wage',
    description:
      'The federal tipped minimum wage has been frozen at $2.13 per hour since 1991 — over 30 years without an increase.',
    source: 'U.S. Department of Labor',
    sourceUrl: 'https://www.dol.gov/agencies/whd/minimum-wage/history',
    category: 'general',
  },
  {
    id: 'stat-006',
    value: '43 states',
    label: 'Sub-Minimum Wage States',
    description:
      '43 states allow employers to pay tipped workers below the standard minimum wage, relying on customers to make up the difference.',
    source: 'U.S. Department of Labor',
    sourceUrl:
      'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped',
    category: 'general',
  },
  {
    id: 'stat-007',
    value: '2x',
    label: 'Sexual Harassment Rate',
    description:
      'Tipped workers experience sexual harassment at twice the rate of non-tipped workers, often tolerating it to protect their income.',
    source: 'Restaurant Opportunities Centers United',
    sourceUrl: 'https://rocunited.org/publications/',
    category: 'gender',
  },
  {
    id: 'stat-008',
    value: '72%',
    label: 'Tip Creep',
    description:
      '72% of Americans say tipping is expected in more places today than it was five years ago, with a majority feeling pressured by digital prompts at counter-service businesses.',
    source: 'Pew Research Center, 2023',
    sourceUrl:
      'https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/',
    category: 'general',
  },
  {
    id: 'stat-009',
    value: '$38B+',
    label: 'Annual Tips in America',
    description:
      'Americans report over $38 billion in tips annually on W-2s — and the IRS estimates a significant portion goes unreported, making the true figure far higher.',
    source: 'Congressional Research Service / IRS',
    sourceUrl: 'https://www.congress.gov/crs-product/IF13158',
    category: 'general',
  },
  {
    id: 'stat-010',
    value: '~6M',
    label: 'Tipped Workers in America',
    description:
      'Approximately 6 million American workers report tip income, the vast majority in food service and hospitality.',
    source: 'Congressional Research Service',
    sourceUrl: 'https://www.congress.gov/crs-product/IF13158',
    category: 'general',
  },
  {
    id: 'stat-011',
    value: '46%',
    label: 'Tipped Workers on Public Assistance',
    description:
      '46% of tipped workers and their families rely on at least one public-assistance program, including food stamps and Medicaid.',
    source: 'Economic Policy Institute',
    sourceUrl:
      'https://www.epi.org/publication/waiting-for-change-tipped-minimum-wage/',
    category: 'poverty',
  },
  {
    id: 'stat-012',
    value: '7 states',
    label: 'One Fair Wage Leaders',
    description:
      'Seven states require employers to pay the full state minimum wage before tips — Alaska, California, Minnesota, Montana, Nevada, Oregon, and Washington — and their restaurant industries are thriving.',
    source: 'U.S. Department of Labor',
    sourceUrl:
      'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped',
    category: 'general',
  },
]
