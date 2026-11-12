import { Briefcase, CalendarDays, MessageCircle, Wrench } from 'lucide-react'
import type { ServiceOpportunity } from '../types'
import { formatDate, whatsappLink } from '../lib/utils'

export function OpportunityCard({ item }: { item: ServiceOpportunity }) {
  const isJob = item.type === 'job'
  const Icon = isJob ? Briefcase : Wrench
  const message = `Olá! Vi a oportunidade "${item.title}" no Salinas Magazine Tour e gostaria de saber mais.`

  return (
    <article className="card flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
              isJob ? 'bg-deep text-white' : 'bg-tide/15 text-tide'
            }`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              {isJob ? 'Vaga de emprego' : 'Serviço autônomo'}
            </span>
            <h3 className="display text-lg font-bold leading-tight">{item.title}</h3>
          </div>
        </div>
        <span className="chip py-1 text-[10px]">{item.category}</span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
        {item.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(item.created_at, { day: '2-digit', month: 'short' })}
        </span>
        <a
          href={whatsappLink(item.contact_whatsapp, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-tide btn-sm"
        >
          <MessageCircle className="h-4 w-4" />
          {isJob ? 'Candidatar-se' : 'Contatar'}
        </a>
      </div>
    </article>
  )
}
