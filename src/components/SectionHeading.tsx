import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  action?: { label: string; to: string }
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  children,
}: SectionHeadingProps) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h2 className="display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          to={action.to}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-tide transition hover:gap-2.5"
        >
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
      {children}
    </div>
  )
}
