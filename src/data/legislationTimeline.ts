export interface LegislationItem {
  year: string;
  title: string;
  description: string;
  status: 'enacted' | 'passed-one-chamber' | 'proposed' | 'ballot-measure' | 'state-action';
  jurisdiction: string;
}

export const legislationTimeline: LegislationItem[] = [
  {
    year: '1966',
    title: 'FLSA Tip Credit Amendment',
    description: 'Congress amended the Fair Labor Standards Act to create a "tip credit" allowing employers to pay tipped workers a subminimum wage — the beginning of a two-tiered system.',
    status: 'enacted',
    jurisdiction: 'Federal',
  },
  {
    year: '1991',
    title: 'Federal Tipped Minimum Frozen at $2.13/hr',
    description: 'The federal tipped minimum wage was last raised to $2.13 per hour. It has not moved since — over 30 years of stagnation while the regular minimum wage has risen.',
    status: 'enacted',
    jurisdiction: 'Federal',
  },
  {
    year: '2017',
    title: 'Raise the Wage Act (First Introduction)',
    description: 'First version of the Raise the Wage Act introduced in Congress, proposing to gradually eliminate the subminimum wage for tipped workers and raise the federal minimum to $15/hr.',
    status: 'proposed',
    jurisdiction: 'Federal',
  },
  {
    year: '2018',
    title: 'Michigan Ballot Initiative',
    description: 'Michigan voters supported raising the minimum wage and phasing out the tipped subminimum wage. State legislators adopted but then gutted the measure — later ruled unconstitutional by the Michigan Supreme Court in 2024.',
    status: 'ballot-measure',
    jurisdiction: 'Michigan',
  },
  {
    year: '2019',
    title: 'Raise the Wage Act Passes the House',
    description: 'The House of Representatives passed the Raise the Wage Act — the first time since Emancipation that either chamber voted to end the subminimum wage for tipped workers.',
    status: 'passed-one-chamber',
    jurisdiction: 'Federal',
  },
  {
    year: '2021',
    title: 'Raise the Wage Act (Biden COVID Relief)',
    description: 'President Biden included the Raise the Wage Act in his first COVID Relief Package, proposing $15/hr minimum and elimination of the tipped subminimum wage. Passed the House again but stalled in the Senate.',
    status: 'passed-one-chamber',
    jurisdiction: 'Federal',
  },
  {
    year: '2022',
    title: 'Washington D.C. Votes for One Fair Wage',
    description: 'D.C. voters passed Initiative 82, phasing out the tipped subminimum wage. After a decade-long fight, tipped workers in the capital will earn the full minimum wage ($17/hr) by 2027.',
    status: 'ballot-measure',
    jurisdiction: 'Washington D.C.',
  },
  {
    year: '2023',
    title: 'Raise the Wage Act of 2023 / TIPS Act',
    description: 'New version introduced proposing $17/hr federal minimum by 2028 and eliminating tipped subminimum wages. Rep. Horsford introduced the TIPS Act to eliminate subminimum wages AND remove taxes on tips.',
    status: 'proposed',
    jurisdiction: 'Federal',
  },
  {
    year: '2024',
    title: 'Both Presidential Candidates Support No Tax on Tips',
    description: 'In a historic first, both major party presidential candidates campaigned on eliminating federal taxes on tips — a sign that tipping reform has become a mainstream political issue.',
    status: 'proposed',
    jurisdiction: 'Federal',
  },
  {
    year: '2024',
    title: 'Michigan Supreme Court Restores Ballot Initiative',
    description: 'The Michigan Supreme Court ruled that legislators who adopted and then gutted the 2018 ballot initiative violated the state constitution, reinstating the original law to phase out the tipped subminimum wage.',
    status: 'state-action',
    jurisdiction: 'Michigan',
  },
  {
    year: '2025',
    title: 'No Tax on Tips Act — Senate Passes Unanimously',
    description: 'The Senate passed the No Tax on Tips Act by unanimous consent in May 2025, creating a tax deduction of up to $25,000 for tips. Bipartisan support from Sen. Cruz (R-TX) and Sen. Rosen (D-NV).',
    status: 'passed-one-chamber',
    jurisdiction: 'Federal',
  },
  {
    year: '2025',
    title: 'One Big Beautiful Bill Act — Signed into Law',
    description: 'President Trump signed the OBBB Act on July 4, 2025, making tips tax-free (up to $25,000/yr) through 2028. A major victory, but critics note it doesn\'t address the $2.13/hr tipped minimum wage itself.',
    status: 'enacted',
    jurisdiction: 'Federal',
  },
  {
    year: '2026',
    title: 'Flagstaff, AZ Eliminates Tip Credit',
    description: 'Starting January 1, 2026, Flagstaff no longer permits employers to use tips as credit toward minimum wage obligations. Tipped workers now receive the full $18.35/hr minimum with tips on top.',
    status: 'state-action',
    jurisdiction: 'Flagstaff, AZ',
  },
]
