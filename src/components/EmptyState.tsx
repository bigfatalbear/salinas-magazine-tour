import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="card-flat flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-[var(--surface-2)] text-tide">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="display text-lg font-bold">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-md text-sm text-[var(--muted)]">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

export function LoadingGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card-flat overflow-hidden">
          <div className="skeleton aspect-[4/3] rounded-none" />
          <div className="space-y-3 p-5">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-5 w-full" />
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="container-page flex min-h-[50vh] items-center justify-center py-20">
      <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-tide border-t-transparent" />
        Carregando…
      </div>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="card-flat px-6 py-10 text-center">
      <p className="text-sm font-semibold text-coral">{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="btn btn-ghost btn-sm mt-4">
          Tentar novamente
        </button>
      ) : null}
    </div>
  )
}
