import { Clock } from 'lucide-react'
import { links, practice } from '../data/site'
import { NewTabNote, external } from './ui'

const YEAR = new Date().getFullYear()

const columns = [
  {
    title: 'Patients',
    items: [
      { label: 'New patients', href: links.newPatients },
      { label: 'Current patients', href: links.currentPatients },
      { label: 'Testimonials', href: links.testimonials },
      { label: 'Patient Gateway', href: links.patientLogin, newTab: true },
    ],
  },
  {
    title: 'Practice',
    items: [
      { label: 'Services', href: links.services },
      { label: 'Our providers', href: links.providers },
      { label: 'Newsletter', href: links.news },
      { label: 'Careers', href: links.careers },
      { label: 'Contact', href: links.contact },
    ],
  },
  {
    title: 'Follow',
    items: [
      { label: 'Facebook', href: practice.social.facebook, newTab: true },
      { label: 'Instagram', href: practice.social.instagram, newTab: true },
      { label: 'Email', href: `mailto:${practice.email}` },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-plum-900 text-plum-100">
      <div className="container-page grid max-w-7xl gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="font-serif text-2xl text-white">{practice.name}</p>
          <p className="mt-3 text-[0.95rem] text-plum-200">
            Family-centered primary care in Needham, MA, for every stage of life.
          </p>
          <a
            href={links.hours}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.95rem] font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
          >
            <Clock className="size-4" aria-hidden />
            Hours &amp; Location
          </a>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-sans text-sm font-bold tracking-wide text-plum-300 uppercase">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.newTab ? external : {})}
                    className="text-[0.95rem] text-plum-100 hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                    {item.newTab && <NewTabNote />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex max-w-7xl flex-col gap-2 py-6 text-sm text-plum-300 sm:flex-row sm:justify-between">
          <p>
            © {YEAR} {practice.name}
            <span className="mx-2 text-plum-400 max-sm:hidden" aria-hidden>
              ·
            </span>
            <span className="block sm:inline">
              Designed by{' '}
              <a
                href="https://mingletechsolutions.com/"
                {...external}
                className="text-plum-200 underline decoration-plum-500 underline-offset-4 hover:text-white"
              >
                Mingle Tech Solutions
                <NewTabNote />
              </a>
            </span>
          </p>
          <p className="flex gap-5">
            <a href={links.privacy} className="hover:text-white">
              Privacy Policy
            </a>
            <a href={links.noShow} className="hover:text-white">
              No-Show Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
