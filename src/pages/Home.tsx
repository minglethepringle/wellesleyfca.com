import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Bike,
  Check,
  Flower2,
  HandHeart,
  HeartPulse,
  LogIn,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Sprout,
  Users,
} from 'lucide-react'
import {
  acceptingProviders,
  providerPhoto,
  providerStats,
  providerUrl,
  providers,
} from '../data/providers'
import { formatIssueMonth, newsletters } from '../data/newsletters'
import { hoursTable, links, practice, primaryCare, specialties, testimonials } from '../data/site'
import { getOpenStatus } from '../lib/hours'
import { HeartMark, Squiggle } from '../components/icons'
import { Button, NewTabNote, SectionHeading, TextLink, external } from '../components/ui'
import { asset } from '../lib/asset'

export function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <EveryStage />
      <Services />
      <Team />
      <Story />
      <Testimonials />
      <News />
      <Careers />
      <Visit />
    </>
  )
}

/* ─────────────────────────── shared bits ─────────────────────────── */

function useOpenStatus() {
  const [status, setStatus] = useState(getOpenStatus)
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000)
    return () => clearInterval(id)
  }, [])
  return status
}

function OpenBadge({ className = '' }: { className?: string }) {
  const status = useOpenStatus()
  return (
    <p className={`inline-flex items-center gap-2 text-sm font-semibold ${className}`}>
      <span
        className={`size-2.5 shrink-0 rounded-full ${status.open ? 'bg-emerald-500 ring-4 ring-emerald-500/15' : 'bg-plum-300'}`}
        aria-hidden
      />
      {status.label}
    </p>
  )
}

/** Three dots in the logo's colors, echoing the heads of the family in the WFCA mark. */
function FamilyDots({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden>
      <span className="size-2.5 rounded-full bg-navy" />
      <span className="size-2.5 rounded-full bg-plum-500" />
      <span className="size-2 rounded-full bg-sun" />
    </span>
  )
}

function AvatarStack() {
  return (
    <div className="flex -space-x-3">
      {acceptingProviders.map((p) => (
        <img
          key={p.slug}
          src={providerPhoto(p)}
          alt=""
          className="size-11 rounded-full object-cover ring-3 ring-white"
          loading="lazy"
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-plum-50 via-paper to-paper" />
        <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-plum-100/70 blur-3xl" />
        <div className="absolute top-40 right-[-8rem] size-[26rem] rounded-full bg-sky-100/80 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-sun-50 blur-3xl" />
      </div>

      <div className="container-page grid max-w-7xl items-center gap-16 pt-12 pb-20 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="relative z-10">
          <h1 id="hero-title" className="text-[3.1rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]">
            Welcome to the{' '}
            <span className="relative inline-block whitespace-nowrap">
              <em className="text-plum-600">Family!</em>
              <Squiggle className="absolute -bottom-2 left-0 h-3.5 w-full text-sun sm:-bottom-3 sm:h-4" />
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted sm:text-xl sm:leading-relaxed">
            From a newborn's first checkup to a grandparent's yearly physical, we're one medical home
            for everyone you love. Prevention, wellness, and ongoing support for every stage of life,
            from a team that knows you by name.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={links.newPatients} className="px-6 py-3.5 text-base">
              Become a patient
              <ArrowRight className="size-5" aria-hidden />
            </Button>
            <Button href={practice.phone.href} variant="secondary" className="px-6 py-3.5 text-base">
              <Phone className="size-5" aria-hidden />
              {practice.phone.display}
            </Button>
          </div>

          <a
            href={links.providers}
            className="group mt-10 inline-flex items-center gap-4 rounded-full py-1 pr-4 transition-colors hover:bg-white/70"
          >
            <AvatarStack />
            <span className="text-[0.95rem] leading-snug">
              <span className="block font-bold text-plum-900">
                {acceptingProviders.length} clinicians accepting new patients
              </span>
              <span className="text-muted group-hover:text-plum-700">Find the right fit for your family →</span>
            </span>
          </a>
        </div>

        <HeroCollage />
      </div>
    </section>
  )
}

function HeroCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem] lg:mr-0">
      <div className="absolute -top-6 left-2 size-24 rounded-full bg-sun/90 sm:size-32" aria-hidden />
      <div className="absolute right-0 -bottom-8 size-40 rounded-full bg-sky-200 sm:size-52" aria-hidden />
      <div className="absolute top-1/3 -left-6 hidden size-14 rounded-full bg-plum-300 sm:block" aria-hidden />

      <div className="relative grid grid-cols-[1.35fr_1fr] gap-4 sm:gap-5">
        <img
          src={asset('/images/services/lactation.jpg')}
          alt="A nurse smiling as she helps a new mother feed her baby"
          className="row-span-2 h-full w-full rounded-t-[999px] rounded-b-[2.5rem] object-cover object-[45%_center] shadow-xl shadow-plum-900/15"
          width={1100}
          height={733}
          fetchPriority="high"
        />
        <img
          src={asset('/images/hero.jpg')}
          alt="A physician talking with a patient in an exam room"
          className="mt-10 aspect-square w-full rounded-full object-cover object-[58%_center] shadow-lg shadow-plum-900/10 ring-6 ring-white"
          width={1400}
          height={1063}
        />
        <img
          src={asset('/images/services/sports-medicine.jpg')}
          alt="A sports medicine physician examining a patient's knee"
          className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lg shadow-plum-900/10"
          width={733}
          height={1100}
        />
      </div>

    </div>
  )
}

/* ─────────────────────────── Quick actions ─────────────────────────── */

function QuickActions() {
  const items = [
    {
      icon: Users,
      title: 'New patients',
      body: 'How to join the family',
      href: links.newPatients,
      tone: 'bg-sun-100 text-sun-600',
    },
    {
      icon: Phone,
      title: 'Call the office',
      body: practice.phone.display,
      href: practice.phone.href,
      tone: 'bg-sky-100 text-navy',
    },
    {
      icon: MapPin,
      title: 'Directions',
      body: '145 Rosemary St, Needham',
      href: practice.address.mapUrl,
      newTab: true,
      tone: 'bg-rose-100 text-plum-700',
    },
    {
      icon: LogIn,
      title: 'Patient Gateway',
      body: 'Messages, results & refills',
      href: links.patientLogin,
      newTab: true,
      tone: 'bg-plum-100 text-plum-700',
    },
  ]

  return (
    <section aria-label="Common tasks" className="relative z-10 -mt-4">
      <div className="container-page max-w-7xl">
        <ul className="grid gap-1 rounded-[2rem] bg-white p-3 shadow-xl shadow-plum-900/8 ring-1 ring-plum-100 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body, href, newTab, tone }) => (
            <li key={title}>
              <a
                href={href}
                {...(newTab ? external : {})}
                className="group flex h-full items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-plum-50"
              >
                <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-bold text-plum-900">
                    {title}
                    {newTab && <ArrowUpRight className="size-4 text-plum-400" aria-hidden />}
                  </span>
                  <span className="block text-[0.95rem] text-muted">{body}</span>
                  {newTab && <NewTabNote />}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ─────────────────────────── Every stage ─────────────────────────── */

const stages = [
  { icon: Baby, label: 'Newborns', tone: 'bg-sun-100 text-sun-600' },
  { icon: School, label: 'Kids & teens', tone: 'bg-sky-100 text-navy' },
  { icon: HandHeart, label: 'Growing families', tone: 'bg-rose-100 text-plum-700' },
  { icon: Bike, label: 'Active adults', tone: 'bg-plum-100 text-plum-700' },
  { icon: HeartPulse, label: 'Chronic care', tone: 'bg-sky-100 text-navy' },
  { icon: Flower2, label: 'Healthy aging', tone: 'bg-sun-100 text-sun-600' },
]

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Prevention',
    body: 'Checkups, screenings, and vaccines that catch things early and keep your family on track.',
    tone: 'bg-plum-600 text-white',
    heading: 'text-white',
    text: 'text-plum-100',
  },
  {
    icon: Sprout,
    title: 'Wellness',
    body: 'We look at lifestyle, habits, and environment to support both physical and mental health.',
    tone: 'bg-sky-100 text-navy',
    heading: 'text-plum-900',
    text: 'text-ink/75',
  },
  {
    icon: HandHeart,
    title: 'Ongoing support',
    body: 'A clinician who knows your history, answers your messages, and stays with you through every season.',
    tone: 'bg-sun-100 text-sun-600',
    heading: 'text-plum-900',
    text: 'text-ink/75',
  },
]

function EveryStage() {
  return (
    <section aria-labelledby="stages-title" className="py-20 md:py-28">
      <div className="container-page max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FamilyDots className="mb-5" />
          <h2 id="stages-title" className="text-4xl sm:text-5xl">
            Family-centered care for <em className="text-plum-600">every stage of life</em>
          </h2>
          <p className="mt-5 text-lg text-muted sm:text-xl">
            The best medicine is a collaboration. We get to know your whole family, so your care feels
            personal at every age.
          </p>
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-3">
          {stages.map(({ icon: Icon, label, tone }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 rounded-full bg-white py-2 pr-5 pl-2 font-semibold text-plum-900 shadow-sm ring-1 ring-plum-100"
            >
              <span className={`grid size-9 place-items-center rounded-full ${tone}`}>
                <Icon className="size-[1.1rem]" aria-hidden />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body, tone, heading, text }) => (
            <li key={title} className={`rounded-[2rem] p-8 sm:p-9 ${tone}`}>
              <Icon className="size-8" aria-hidden />
              <h3 className={`mt-5 text-3xl ${heading}`}>{title}</h3>
              <p className={`mt-3 text-[1.05rem] ${text}`}>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────────── Services ───────────────────────────── */

const tints = {
  sun: 'bg-sun-100 text-sun-600',
  rose: 'bg-rose-100 text-plum-700',
  sky: 'bg-sky-100 text-navy',
  plum: 'bg-plum-100 text-plum-700',
} as const

function Services() {
  return (
    <section aria-labelledby="services-title" className="bg-plum-50/70 py-20 md:py-28">
      <div className="container-page max-w-7xl">
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          title="More than a doctor's office"
          intro="Primary care is the heart of what we do. Around it, we're growing a suite of specialized services, so more of your family's care happens in one familiar place."
          action={<TextLink href={links.services}>Explore all services</TextLink>}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="relative flex flex-col overflow-hidden rounded-[2rem] bg-plum-700 p-8 text-white sm:p-10">
            <div className="absolute -right-16 -bottom-16 size-56 rounded-full bg-plum-600" aria-hidden />
            <div className="absolute right-12 bottom-28 size-10 rounded-full bg-sun" aria-hidden />
            <div className="absolute right-28 bottom-12 size-6 rounded-full bg-sky-200" aria-hidden />
            <p className="relative text-sm font-bold tracking-wide text-plum-200 uppercase">Where it all starts</p>
            <h3 className="relative mt-3 text-4xl text-white">Primary Care</h3>
            <p className="relative mt-4 text-lg text-plum-100">
              Relationship-based care for individuals and families, from newborn through every stage of
              life.
            </p>
            <ul className="relative mt-8 space-y-3">
              {primaryCare.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-white/15">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative mt-auto pt-10">
              <Button href={links.services} variant="secondary" className="!ring-0">
                About primary care
              </Button>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {specialties.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-plum-100 transition-shadow hover:shadow-xl hover:shadow-plum-900/8"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={asset(s.photo)}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className={`mb-3 w-fit rounded-full px-3 py-1 text-xs font-bold ${tints[s.tint]}`}>
                    Specialized care
                  </span>
                  <h3 className="text-2xl">{s.title}</h3>
                  <p className="mt-2 flex-1 text-[0.97rem] text-muted">{s.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-semibold text-plum-700 group-hover:text-plum-900">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────── Team ─────────────────────────────── */

function Team() {
  // Clinicians accepting new patients lead the grid.
  const ordered = [...providers].sort(
    (a, b) => Number(!!b.acceptingNewPatients) - Number(!!a.acceptingNewPatients),
  )
  const stats = [
    { value: providerStats.total, label: 'Clinicians' },
    { value: providerStats.physicians, label: 'Physicians' },
    { value: providerStats.advancedPractice, label: 'NPs & PAs' },
    { value: acceptingProviders.length, label: 'Accepting new', highlight: true },
  ]

  return (
    <section aria-labelledby="team-title" className="py-20 md:py-28">
      <div className="container-page max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div>
            <p className="eyebrow mb-3">Meet the family</p>
            <h2 id="team-title" className="text-4xl sm:text-5xl">
              A whole team of talent, <em className="text-plum-600">all in one place</em>
            </h2>
            <p className="mt-5 text-lg text-muted">
              Physicians, nurse practitioners, physician assistants, and nurses, with focused expertise
              from women's health to sports medicine. Each clinician cares for their own panel of
              patients, so you're seen by someone who truly knows you.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center rounded-3xl px-3 py-5 text-center ${s.highlight ? 'bg-sun-100' : 'bg-white ring-1 ring-plum-100'}`}
              >
                <dt className="order-2 mt-1.5 text-sm font-semibold whitespace-nowrap text-muted">{s.label}</dt>
                <dd className="order-1 font-serif text-4xl leading-none text-plum-700">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-14 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {ordered.map((p, i) => (
            <li key={p.slug} className={i >= 9 ? 'max-sm:hidden' : undefined}>
              <a href={providerUrl(p)} className="group block text-center">
                <span className="relative mx-auto block w-fit">
                  <img
                    src={providerPhoto(p)}
                    alt=""
                    loading="lazy"
                    className={`size-20 rounded-full object-cover transition-transform group-hover:scale-105 sm:size-24 ${
                      p.acceptingNewPatients
                        ? 'ring-4 ring-sun ring-offset-3 ring-offset-paper'
                        : 'ring-1 ring-plum-100'
                    }`}
                  />
                  {p.acceptingNewPatients && (
                    <span className="absolute -right-1 bottom-0 grid size-7 place-items-center rounded-full bg-sun text-white ring-3 ring-paper">
                      <Check className="size-4" strokeWidth={3} aria-hidden />
                    </span>
                  )}
                </span>
                <span className="mt-3 block text-[0.92rem] leading-tight font-semibold text-plum-900 group-hover:text-plum-600">
                  {p.name}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {p.credentials}
                  {p.focus && ` · ${p.focus}`}
                </span>
                {p.acceptingNewPatients && <span className="sr-only">, accepting new patients</span>}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-sun-50 px-6 py-5 sm:flex-row sm:items-center">
          <p className="flex items-center gap-3 text-[0.97rem] text-ink">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sun text-white">
              <Check className="size-4" strokeWidth={3} aria-hidden />
            </span>
            A gold ring means that clinician is accepting new patients.
          </p>
          <TextLink href={links.providers}>Meet our whole team</TextLink>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────── Story ─────────────────────────────── */

const values = ['Inclusion & compassion', 'Mutual trust & respect', 'Evidence-based care', 'Shared decision making']

function Story() {
  return (
    <section aria-labelledby="story-title" className="pb-20 md:pb-28">
      <div className="container-page max-w-7xl">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-sky-50 ring-1 ring-sky-100 lg:grid-cols-2">
          <img
            src={asset('/images/founders.jpg')}
            alt="Three members of the Wellesley Family Care team in front of the practice's family logo in Needham"
            className="h-full min-h-72 w-full object-cover"
            loading="lazy"
          />
          <div className="p-8 sm:p-12 lg:p-14">
            <FamilyDots className="mb-5" />
            <h2 id="story-title" className="text-4xl">
              A medical home built on trust
            </h2>
            <p className="mt-5 text-lg text-ink/80">
              We provide a compassionate, inclusive space where your voice is heard and your unique needs
              come first. By blending clinical excellence with a deeply personal approach, we work
              alongside you and make decisions together, for the whole family.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-2.5 font-semibold whitespace-nowrap text-plum-900">
                  <HeartMark className="size-4 shrink-0 text-plum-400" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Testimonials ─────────────────────────── */

const quoteStyles = [
  { card: 'bg-plum-600', quote: 'text-white', mark: 'text-plum-300', name: 'text-white', initial: 'bg-white/15 text-white' },
  { card: 'bg-white ring-1 ring-plum-100', quote: 'text-ink/85', mark: 'text-plum-200', name: 'text-plum-900', initial: 'bg-plum-100 text-plum-700' },
  { card: 'bg-sun-100', quote: 'text-ink/85', mark: 'text-sun', name: 'text-plum-900', initial: 'bg-white text-sun-600' },
]

function Testimonials() {
  return (
    <section aria-labelledby="voices-title" className="bg-plum-50/70 py-20 md:py-28">
      <div className="container-page max-w-7xl">
        <SectionHeading
          id="voices-title"
          title="What our patients say"
          action={<TextLink href={links.testimonials}>Read more stories</TextLink>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => {
            const s = quoteStyles[i % quoteStyles.length]
            return (
              <figure key={t.name} className={`flex flex-col rounded-[2rem] p-8 ${s.card}`}>
                <span className={`font-serif text-6xl leading-none ${s.mark}`} aria-hidden>
                  “
                </span>
                <blockquote className={`-mt-3 flex-1 text-lg leading-relaxed ${s.quote}`}>{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className={`grid size-10 place-items-center rounded-full font-serif text-lg ${s.initial}`} aria-hidden>
                    {t.name[0]}
                  </span>
                  <span className={`font-bold ${s.name}`}>{t.name}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────── News ─────────────────────────────── */

const newsTones = ['bg-sun', 'bg-plum-400', 'bg-sky-500']

function News() {
  const latest = newsletters.slice(0, 3)
  return (
    <section aria-labelledby="news-title" className="py-20 md:py-28">
      <div className="container-page max-w-7xl">
        <SectionHeading
          id="news-title"
          title="From our monthly newsletter"
          action={<TextLink href={links.news}>All issues</TextLink>}
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {latest.map((n, i) => (
            <li key={n.url}>
              <a
                href={n.url}
                {...external}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-plum-100 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-plum-900/8"
              >
                <span className={`h-2 ${newsTones[i % newsTones.length]}`} aria-hidden />
                <span className="flex flex-1 flex-col p-7">
                  <span className="flex items-center gap-2 text-sm font-bold text-plum-600">
                    {formatIssueMonth(n.month)}
                    {i === 0 && (
                      <span className="rounded-full bg-sun-100 px-2.5 py-0.5 text-xs text-sun-600">New</span>
                    )}
                  </span>
                  <span className="mt-3 font-serif text-2xl leading-snug text-plum-900">{n.title}</span>
                  <span className="mt-3 line-clamp-3 flex-1 text-[0.97rem] text-muted">{n.summary}</span>
                  <span className="mt-6 inline-flex items-center gap-1 font-semibold text-plum-700 group-hover:text-plum-900">
                    Read the newsletter
                    <ArrowUpRight className="size-4" aria-hidden />
                    <NewTabNote />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────────── Careers ───────────────────────────── */

function Careers() {
  return (
    <section aria-labelledby="careers-title" className="pb-20 md:pb-28">
      <div className="container-page max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-12 text-white sm:px-14 md:py-16">
          <div className="absolute -top-20 -right-10 size-64 rounded-full bg-plum-600/70" aria-hidden />
          <div className="absolute right-40 -bottom-14 size-36 rounded-full bg-sky-200/25" aria-hidden />
          <div className="absolute top-10 right-24 size-12 rounded-full bg-sun" aria-hidden />
          <div className="relative max-w-2xl">
            <p className="text-sm font-bold tracking-wide text-sky-200 uppercase">Careers</p>
            <h2 id="careers-title" className="mt-3 text-4xl text-white sm:text-5xl">
              Join the family
            </h2>
            <p className="mt-4 text-lg text-sky-100">
              A safe, fun, and supportive workplace with room to grow, for clinicians, nurses, medical
              assistants, and front-desk staff. Recent grads can apply to our pre-med medical assistant
              internship.
            </p>
            <Button href={links.careers} className="mt-8 !bg-sun !text-navy hover:!bg-sun-100">
              See open positions
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────── Visit ────────────────────────────── */

function Visit() {
  return (
    <section id="hours" aria-labelledby="visit-title" className="scroll-mt-24 bg-plum-50/70 py-20 md:py-24">
      <div className="container-page grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div>
          <h2 id="visit-title" className="text-4xl">
            We're here six days a week
          </h2>
          <OpenBadge className="mt-5 text-ink" />
          <address className="mt-8 space-y-4 not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-plum-500" aria-hidden />
              <span>
                {practice.address.line1}
                <br />
                {practice.address.line2}
                <br />
                <a
                  href={practice.address.mapUrl}
                  {...external}
                  className="font-semibold text-plum-700 underline decoration-plum-200 underline-offset-4 hover:decoration-plum-500"
                >
                  Get directions
                  <NewTabNote />
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-plum-500" aria-hidden />
              <span>
                <a href={practice.phone.href} className="font-semibold text-plum-900 hover:text-plum-600">
                  {practice.phone.display}
                </a>
                <span className="block text-sm text-muted">
                  Billing {practice.billing.display} · Fax {practice.fax}
                </span>
              </span>
            </p>
          </address>
        </div>

        <div className="grid divide-y divide-plum-100 rounded-[2rem] bg-white ring-1 ring-plum-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {hoursTable.map((group) => (
            <div key={group.title} className="p-6 sm:p-7">
              <h3 className="font-sans text-sm font-bold tracking-wide text-plum-600 uppercase">
                {group.title} hours
              </h3>
              <dl className="mt-4 space-y-3">
                {group.rows.map(([day, time]) => (
                  <div key={day}>
                    <dt className="text-sm text-muted">{day}</dt>
                    <dd className="font-semibold whitespace-nowrap text-ink">{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="rounded-2xl bg-white px-6 py-4 text-center text-[0.97rem] text-muted ring-1 ring-plum-100 lg:col-span-2">
          <strong className="text-ink">Medical emergency?</strong> Call 911 or go to the nearest emergency room.
        </p>
      </div>
    </section>
  )
}
