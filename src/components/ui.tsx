import type { ComponentProps, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-plum-600 text-white hover:bg-plum-700 shadow-sm shadow-plum-900/10',
  secondary: 'bg-white text-plum-800 ring-1 ring-plum-200 hover:ring-plum-400 hover:bg-plum-50',
  ghost: 'text-plum-700 hover:text-plum-900 hover:bg-plum-50',
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<'a'> & { variant?: Variant }) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.98rem] font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

export function TextLink({ children, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className="group inline-flex items-center gap-1.5 font-semibold text-plum-700 underline decoration-plum-200 decoration-2 underline-offset-4 transition-colors hover:text-plum-900 hover:decoration-plum-500"
      {...props}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </a>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  id,
}: {
  eyebrow?: string
  title: string
  intro?: ReactNode
  action?: ReactNode
  id?: string
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="text-3xl sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/** Opens in a new tab and says so to screen readers. */
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const
export const NewTabNote = () => <span className="sr-only"> (opens in a new tab)</span>
