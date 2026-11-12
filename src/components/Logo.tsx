import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5', className)}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-deep text-white shadow-md">
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-coral" />
        <span className="absolute inset-x-0 bottom-1.5 h-2 rounded-full bg-tide/80" />
        <span className="absolute inset-x-1 bottom-0.5 h-1 rounded-full bg-gold/90" />
        <span className="display relative z-10 text-[13px] font-bold tracking-tight">SM</span>
      </span>
      {!compact ? (
        <span className="leading-none">
          <span className="display block text-[19px] font-bold tracking-tight">Salinas</span>
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Magazine Tour
          </span>
        </span>
      ) : null}
    </Link>
  )
}
