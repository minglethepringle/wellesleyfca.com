import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { links, nav, practice, type NavItem } from '../data/site'
import { FacebookIcon, InstagramIcon } from './icons'
import { NewTabNote, external } from './ui'
import { asset } from '../lib/asset'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Utility bar — same placement as the current site: social left, phone right */}
      <div className="bg-plum-700 text-white">
        <div className="container-page flex h-10 max-w-7xl items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <a
              href={practice.social.facebook}
              {...external}
              className="grid size-8 place-items-center rounded-full text-plum-100 hover:bg-white/10 hover:text-white"
              aria-label="Facebook (opens in a new tab)"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={practice.social.instagram}
              {...external}
              className="grid size-8 place-items-center rounded-full text-plum-100 hover:bg-white/10 hover:text-white"
              aria-label="Instagram (opens in a new tab)"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
          <a href={practice.phone.href} className="flex items-center gap-2 font-semibold hover:text-plum-100">
            <Phone className="size-4" aria-hidden />
            {practice.phone.display}
          </a>
        </div>
      </div>

      {/* Main bar stays pinned while scrolling */}
      <header className="sticky top-0 z-40 border-b border-plum-100 bg-white/95 backdrop-blur-md">
        <div className="container-page flex h-20 max-w-7xl items-center justify-between gap-6 lg:h-24">
          <a href={links.home} className="shrink-0" aria-label={`${practice.name}, home`}>
            <img src={asset('/images/logo.webp')} alt="" className="h-14 w-auto lg:h-17" width={768} height={492} />
          </a>

          <DesktopNav />

          <div className="flex items-center gap-2">
            <a
              href={links.patientLogin}
              {...external}
              className="group inline-flex items-center gap-2 rounded-full bg-plum-600 px-5 py-2.5 font-semibold whitespace-nowrap text-white shadow-sm shadow-plum-900/15 transition-colors hover:bg-plum-700 max-sm:hidden"
            >
              Patient Login
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              <NewTabNote />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full text-plum-800 hover:bg-plum-50 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
            </button>
          </div>
        </div>
        {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
      </header>
    </>
  )
}

const linkBase =
  'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.97rem] font-semibold whitespace-nowrap transition-colors'

function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!openLabel) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenLabel(null)
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenLabel(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [openLabel])

  const openNow = (label: string) => {
    window.clearTimeout(closeTimer.current)
    setOpenLabel(label)
  }
  const closeSoon = () => {
    closeTimer.current = window.setTimeout(() => setOpenLabel(null), 150)
  }

  return (
    <nav ref={navRef} aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {nav.map((item) =>
          item.children ? (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => openNow(item.label)}
              onMouseLeave={closeSoon}
            >
              <button
                type="button"
                className={`${linkBase} ${openLabel === item.label ? 'bg-plum-50 text-plum-800' : 'text-ink/80 hover:text-plum-800'}`}
                aria-expanded={openLabel === item.label}
                onClick={() => setOpenLabel((v) => (v === item.label ? null : item.label))}
              >
                {item.label}
                <ChevronDown
                  className={`size-4 transition-transform ${openLabel === item.label ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {openLabel === item.label && <Dropdown items={item.children} />}
            </li>
          ) : (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={item.href === links.home ? 'page' : undefined}
                className={`${linkBase} text-ink/80 hover:bg-plum-50 hover:text-plum-800 aria-[current=page]:text-plum-700`}
              >
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}

function Dropdown({ items }: { items: NavItem[] }) {
  return (
    <div className="absolute top-full left-1/2 z-50 w-64 -translate-x-1/2 pt-3">
      <ul className="overflow-hidden rounded-2xl bg-white p-2 shadow-xl shadow-plum-900/12 ring-1 ring-plum-100">
        {items.map((child) => (
          <li key={child.label}>
            <a href={child.href} className="block rounded-xl px-4 py-3 transition-colors hover:bg-plum-50">
              <span className="block font-semibold text-plum-900">{child.label}</span>
              {child.description && <span className="block text-sm text-muted">{child.description}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onNavigate()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onNavigate])

  return (
    <nav
      id="mobile-nav"
      aria-label="Main"
      className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-plum-100 lg:hidden"
    >
      <ul className="container-page flex flex-col py-3">
        {nav.map((item) =>
          item.children ? (
            <li key={item.label}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-lg font-semibold text-ink hover:bg-plum-50"
                aria-expanded={expanded === item.label}
                onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
              >
                {item.label}
                <ChevronDown
                  className={`size-5 text-plum-500 transition-transform ${expanded === item.label ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {expanded === item.label && (
                <ul className="mb-2 ml-3 border-l-2 border-plum-100 pl-3">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <a
                        href={child.href}
                        onClick={onNavigate}
                        className="block rounded-xl px-3 py-2.5 text-ink/85 hover:bg-plum-50"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={onNavigate}
                className="block rounded-xl px-3 py-3 text-lg font-semibold text-ink hover:bg-plum-50"
              >
                {item.label}
              </a>
            </li>
          ),
        )}
        <li className="mt-3 border-t border-plum-100 pt-4 sm:hidden">
          <a
            href={links.patientLogin}
            {...external}
            className="flex items-center justify-center gap-2 rounded-full bg-plum-600 px-5 py-3 font-semibold text-white"
          >
            Patient Login
            <ArrowRight className="size-4" aria-hidden />
            <NewTabNote />
          </a>
        </li>
      </ul>
    </nav>
  )
}
