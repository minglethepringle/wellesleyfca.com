// The provider roster changes often. Add or remove people, or flip
// `acceptingNewPatients`, and the home page updates on the next build.
// Photos live in /public/images/providers/<slug>.jpg (square crops look best).

import { asset } from '../lib/asset'

export type Provider = {
  slug: string
  name: string
  credentials: string
  title?: string
  focus?: string
  acceptingNewPatients?: boolean
}

export const providers: Provider[] = [
  { slug: 'courtney-healy', name: 'Courtney Healy', credentials: 'FNP', acceptingNewPatients: true },
  { slug: 'justin-maher', name: 'Justin Maher', credentials: 'MD', acceptingNewPatients: true },
  { slug: 'lydia-rex', name: 'Lydia Rex', credentials: 'MD', acceptingNewPatients: true },
  { slug: 'john-wolfert', name: 'John Wolfert', credentials: 'PA-C', acceptingNewPatients: true },
  { slug: 'david-chodirker', name: 'David Chodirker', credentials: 'MD', title: 'Founding Doctor' },
  {
    slug: 'jonathan-snider',
    name: 'Jonathan Snider',
    credentials: 'MD',
    title: 'Chief Medical Officer',
  },
  {
    slug: 'jennifer-snider',
    name: 'Jennifer Snider',
    credentials: 'FNP',
    title: 'Chief Operating Officer & Lead NP',
  },
  { slug: 'kaitie-lipsky', name: 'Kaitie Lipsky', credentials: 'FNP' },
  { slug: 'kara-carew', name: 'Kara Carew', credentials: 'MD' },
  { slug: 'jessica-platt', name: 'Jessica Platt', credentials: 'MD', focus: "Women's Health" },
  { slug: 'nimmi-trapasso', name: 'Nimmi Trapasso', credentials: 'MD' },
  { slug: 'david-raymond', name: 'David Raymond', credentials: 'DNP' },
  { slug: 'colleen-levesque', name: 'Colleen Levesque', credentials: 'FNP' },
  { slug: 'katelyn-kenny', name: 'Katelyn Kenny', credentials: 'FNP' },
  { slug: 'maura-reidy', name: 'Maura Reidy', credentials: 'FNP' },
  { slug: 'wendy-beaumier', name: 'Wendy Beaumier', credentials: 'FNP' },
  { slug: 'nina-schussler', name: 'Nina Schussler', credentials: 'FNP' },
  { slug: 'kristin-behenna', name: 'Kristin Behenna', credentials: 'AGNP' },
  { slug: 'afrin-burney', name: 'Afrin Burney', credentials: 'MD' },
  { slug: 'laura-mancuso', name: 'Laura Mancuso', credentials: 'FNP' },
  { slug: 'jessica-santiccioli', name: 'Jessica Santiccioli', credentials: 'FNP' },
  { slug: 'jennifer-phan', name: 'Jennifer Phan', credentials: 'FNP' },
  { slug: 'jennifer-schwartz', name: 'Jennifer Schwartz', credentials: 'MD', focus: 'Sports Medicine' },
]

export const providerPhoto = (p: Provider) => asset(`/images/providers/${p.slug}.jpg`)
export const providerUrl = (p: Provider) => `https://wellesleyfca.com/about-us/meet-our-team/${p.slug}`

export const acceptingProviders = providers.filter((p) => p.acceptingNewPatients)

export const providerStats = {
  total: providers.length,
  physicians: providers.filter((p) => p.credentials === 'MD').length,
  advancedPractice: providers.filter((p) => p.credentials !== 'MD').length,
}
