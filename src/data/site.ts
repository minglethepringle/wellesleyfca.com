// Practice-wide details. Edit here; every section of the site reads from this file.

// Pages that aren't rebuilt yet still live on the current site.
const legacy = (path: string) => `https://wellesleyfca.com${path}`

export const practice = {
  name: 'Wellesley Family Care Associates',
  shortName: 'Wellesley Family Care',
  phone: { display: '(781) 235-7900', href: 'tel:+17812357900' },
  billing: { display: '(781) 791-3308', href: 'tel:+17817913308' },
  fax: '(781) 237-9930',
  email: 'info@wellesleyfca.com',
  address: {
    line1: '145 Rosemary Street, Suite C',
    line2: 'Needham, MA 02494',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=145+Rosemary+Street+Suite+C+Needham+MA+02494',
  },
  social: {
    facebook: 'https://www.facebook.com/wellesleyfca',
    instagram: 'https://www.instagram.com/wellesleyfamilycareassociates/',
  },
}

export const links = {
  home: import.meta.env.BASE_URL,
  hours: `${import.meta.env.BASE_URL}#hours`,
  services: legacy('/services'),
  providers: legacy('/about-us/meet-our-team'),
  newPatients: legacy('/patients/new-patients'),
  currentPatients: legacy('/patients/current-patients'),
  patientLogin:
    'https://patientgateway.massgeneralbrigham.org/mychart-prd/Authentication/Login?',
  testimonials: legacy('/about-us/testimonials'),
  news: legacy('/about-us/newsletter'),
  careers: legacy('/careers'),
  contact: legacy('/contact'),
  privacy: legacy('/legal/privacy-policy'),
  noShow: legacy('/legal/no-show-policy'),
}

// Mirrors the current site's menu. An item with `children` becomes a dropdown.
export type NavItem = { label: string; href: string; description?: string; children?: NavItem[] }

export const nav: NavItem[] = [
  { label: 'Home', href: links.home },
  { label: 'Our Services', href: links.services },
  {
    label: 'For Patients',
    href: links.newPatients,
    children: [
      { label: 'New Patients', href: links.newPatients, description: 'Join the practice' },
      { label: 'Current Patients', href: links.currentPatients, description: 'Forms, portal & support' },
    ],
  },
  {
    label: 'About Us',
    href: links.providers,
    children: [
      { label: 'Testimonials', href: links.testimonials, description: 'Stories from our patients' },
      { label: 'Meet Our Team', href: links.providers, description: 'Our clinicians & staff' },
      { label: 'Latest News', href: links.news, description: 'Monthly newsletter' },
    ],
  },
  { label: 'Careers', href: links.careers },
  { label: 'Contact', href: links.contact },
]

// Day index follows JS Date: 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM".
type Window = { open: string; close: string } | null

export const officeHours: Record<number, Window> = {
  0: null,
  1: { open: '06:30', close: '19:00' },
  2: { open: '06:30', close: '19:00' },
  3: { open: '06:30', close: '19:00' },
  4: { open: '06:30', close: '19:00' },
  5: { open: '06:30', close: '17:30' },
  6: { open: '08:00', close: '14:00' },
}

export const hoursTable = [
  {
    title: 'Office',
    rows: [
      ['Mon – Thu', '6:30am – 7:00pm'],
      ['Friday', '6:30am – 5:30pm'],
      ['Saturday', '8:00am – 2:00pm'],
    ],
  },
  {
    title: 'Phone',
    rows: [
      ['Monday', '7:30am – 5:00pm'],
      ['Tue – Fri', '8:00am – 5:00pm'],
      ['Saturday', '8:00am – 12:00pm'],
    ],
  },
  {
    title: 'Lab',
    rows: [
      ['Mon – Fri', '7:00am – 5:30pm'],
      ['Saturday', '8:00am – 12:00pm'],
    ],
  },
]

export const primaryCare = [
  'Well visits & physicals for all ages',
  'Same or next-day sick visits',
  'Chronic condition management',
  'Mass General Brigham specialists when needed',
]

// Specialized services, shown as photo cards. Add a new one here as the practice grows.
export const specialties = [
  {
    title: 'Lactation Services',
    body: 'Personal breastfeeding support with our IBCLC nurse: latch, feeding, milk supply, and pumping.',
    photo: '/images/services/lactation.jpg',
    href: legacy('/services/lactation-services'),
    tint: 'sun',
  },
  {
    title: "Women's Health",
    body: 'Screenings, contraception and IUDs, menopause and hormone care, and preconception counseling.',
    photo: '/images/services/womens-health.jpg',
    href: legacy('/services/women’s-health'),
    tint: 'rose',
  },
  {
    title: 'Sports Medicine',
    body: 'Expert diagnosis and treatment for sprains, strains, and joint pain to keep you moving.',
    photo: '/images/services/sports-medicine.jpg',
    href: legacy('/services/chronic-disease-management'),
    tint: 'sky',
  },
  {
    title: 'Aesthetics',
    body: 'Medical aesthetic treatments from clinicians you already know and trust.',
    photo: '/images/services/aesthetics.jpg',
    href: legacy('/services/aesthetics-services'),
    tint: 'plum',
  },
] as const

export const testimonials = [
  {
    name: 'Carolyn M.',
    quote:
      'We see Nina and she is everything you could ever want in a PCP. She is kind and listens. … Our whole family sees her and we ALL adore her.',
  },
  {
    name: 'Bonnie S.',
    quote:
      "…even though she wasn't on call today (Saturday) the doctor on call reached out to her and she called me to resolve my problem. I appreciate the responsiveness and personal care.",
  },
  {
    name: 'Alyce M.',
    quote:
      'I have always felt I am in the best of care when I enter this office. … They always respond when you leave a phone or Gateway message.',
  },
]
