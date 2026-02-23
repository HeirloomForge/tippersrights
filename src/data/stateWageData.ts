export type WageTier = 'federal_minimum' | 'no_tip_credit' | 'middle_ground'

export interface StateWageData {
  state: string
  abbrev: string
  tippedWage: number
  regularWage: number
  tier: WageTier
  notes?: string
}

export const SOURCE_URL =
  'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped'
export const DATA_EFFECTIVE_DATE = 'January 1, 2026'

export const stateWageData: StateWageData[] = [
  // TIER 1: Federal $2.13 tipped minimum
  { state: 'Alabama', abbrev: 'AL', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum', notes: 'No state minimum wage law' },
  { state: 'Georgia', abbrev: 'GA', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },
  { state: 'Indiana', abbrev: 'IN', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },
  { state: 'Kansas', abbrev: 'KS', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },
  { state: 'Kentucky', abbrev: 'KY', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },
  { state: 'Louisiana', abbrev: 'LA', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum', notes: 'No state minimum wage law' },
  { state: 'Mississippi', abbrev: 'MS', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum', notes: 'No state minimum wage law' },
  { state: 'Nebraska', abbrev: 'NE', tippedWage: 2.13, regularWage: 15.00, tier: 'federal_minimum', notes: '$2.13 tipped despite $15.00 regular minimum' },
  { state: 'North Carolina', abbrev: 'NC', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },
  { state: 'Oklahoma', abbrev: 'OK', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },
  { state: 'South Carolina', abbrev: 'SC', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum', notes: 'No state minimum wage law' },
  { state: 'Tennessee', abbrev: 'TN', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum', notes: 'No state minimum wage law' },
  { state: 'Texas', abbrev: 'TX', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },
  { state: 'Utah', abbrev: 'UT', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },
  { state: 'Virginia', abbrev: 'VA', tippedWage: 2.13, regularWage: 12.41, tier: 'federal_minimum', notes: '$2.13 tipped despite $12.41 regular minimum' },
  { state: 'Wyoming', abbrev: 'WY', tippedWage: 2.13, regularWage: 7.25, tier: 'federal_minimum' },

  // TIER 2: No tip credit — full minimum wage required
  { state: 'Alaska', abbrev: 'AK', tippedWage: 13.00, regularWage: 13.00, tier: 'no_tip_credit' },
  { state: 'California', abbrev: 'CA', tippedWage: 16.90, regularWage: 16.90, tier: 'no_tip_credit' },
  { state: 'Minnesota', abbrev: 'MN', tippedWage: 11.13, regularWage: 11.13, tier: 'no_tip_credit' },
  { state: 'Montana', abbrev: 'MT', tippedWage: 10.55, regularWage: 10.55, tier: 'no_tip_credit' },
  { state: 'Nevada', abbrev: 'NV', tippedWage: 12.00, regularWage: 12.00, tier: 'no_tip_credit' },
  { state: 'Oregon', abbrev: 'OR', tippedWage: 15.05, regularWage: 15.05, tier: 'no_tip_credit', notes: 'Portland metro $16.30' },
  { state: 'Washington', abbrev: 'WA', tippedWage: 17.13, regularWage: 17.13, tier: 'no_tip_credit', notes: 'Seattle $20.76' },

  // TIER 3: Own tipped minimum above $2.13 but below full minimum
  { state: 'Arizona', abbrev: 'AZ', tippedWage: 12.15, regularWage: 15.15, tier: 'middle_ground' },
  { state: 'Arkansas', abbrev: 'AR', tippedWage: 2.63, regularWage: 11.00, tier: 'middle_ground' },
  { state: 'Colorado', abbrev: 'CO', tippedWage: 12.14, regularWage: 15.16, tier: 'middle_ground' },
  { state: 'Connecticut', abbrev: 'CT', tippedWage: 6.38, regularWage: 16.94, tier: 'middle_ground' },
  { state: 'Delaware', abbrev: 'DE', tippedWage: 2.23, regularWage: 15.00, tier: 'middle_ground' },
  { state: 'District of Columbia', abbrev: 'DC', tippedWage: 10.00, regularWage: 17.95, tier: 'middle_ground' },
  { state: 'Florida', abbrev: 'FL', tippedWage: 10.98, regularWage: 14.00, tier: 'middle_ground' },
  { state: 'Hawaii', abbrev: 'HI', tippedWage: 14.75, regularWage: 16.00, tier: 'middle_ground' },
  { state: 'Idaho', abbrev: 'ID', tippedWage: 3.35, regularWage: 7.25, tier: 'middle_ground' },
  { state: 'Illinois', abbrev: 'IL', tippedWage: 9.00, regularWage: 15.00, tier: 'middle_ground' },
  { state: 'Iowa', abbrev: 'IA', tippedWage: 4.35, regularWage: 7.25, tier: 'middle_ground' },
  { state: 'Maine', abbrev: 'ME', tippedWage: 7.55, regularWage: 15.10, tier: 'middle_ground' },
  { state: 'Maryland', abbrev: 'MD', tippedWage: 3.63, regularWage: 15.00, tier: 'middle_ground' },
  { state: 'Massachusetts', abbrev: 'MA', tippedWage: 6.75, regularWage: 15.00, tier: 'middle_ground' },
  { state: 'Michigan', abbrev: 'MI', tippedWage: 5.49, regularWage: 13.73, tier: 'middle_ground' },
  { state: 'Missouri', abbrev: 'MO', tippedWage: 7.50, regularWage: 15.00, tier: 'middle_ground' },
  { state: 'New Hampshire', abbrev: 'NH', tippedWage: 3.27, regularWage: 7.25, tier: 'middle_ground' },
  { state: 'New Jersey', abbrev: 'NJ', tippedWage: 6.05, regularWage: 15.49, tier: 'middle_ground' },
  { state: 'New Mexico', abbrev: 'NM', tippedWage: 3.00, regularWage: 12.00, tier: 'middle_ground' },
  { state: 'New York', abbrev: 'NY', tippedWage: 10.70, regularWage: 16.00, tier: 'middle_ground', notes: 'NYC $14.15/$17.00' },
  { state: 'North Dakota', abbrev: 'ND', tippedWage: 4.86, regularWage: 7.25, tier: 'middle_ground' },
  { state: 'Ohio', abbrev: 'OH', tippedWage: 5.50, regularWage: 11.00, tier: 'middle_ground' },
  { state: 'Pennsylvania', abbrev: 'PA', tippedWage: 2.83, regularWage: 7.25, tier: 'middle_ground' },
  { state: 'Rhode Island', abbrev: 'RI', tippedWage: 3.89, regularWage: 16.00, tier: 'middle_ground' },
  { state: 'South Dakota', abbrev: 'SD', tippedWage: 5.92, regularWage: 11.85, tier: 'middle_ground' },
  { state: 'Vermont', abbrev: 'VT', tippedWage: 7.21, regularWage: 14.42, tier: 'middle_ground' },
  { state: 'West Virginia', abbrev: 'WV', tippedWage: 2.62, regularWage: 8.75, tier: 'middle_ground' },
  { state: 'Wisconsin', abbrev: 'WI', tippedWage: 2.33, regularWage: 7.25, tier: 'middle_ground' },
]
