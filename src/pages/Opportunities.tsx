import { useMemo, useState } from 'react'
import { Briefcase, PlusCircle, Wrench } from 'lucide-react'
import { CONTACT } from '../config'
import { fetchOpportunities } from '../lib/store'
import { useLoader } from '../hooks/useLoader'
import { cn, whatsappLink } from '../lib/utils'
import { OpportunityCard } from '../components/OpportunityCard'
import { EmptyState, ErrorState, LoadingGrid } from '../components/EmptyState'

export function Opportunities() {
  const { data, loading, error, reload } = useLoader(fetchOpportunities, [])
  const [tab, setTab] = useState<'job' | 'freelancer'>('job')

  const filtered = useMemo(
    () => (data ?? []).filter((item) => item.type === tab),
    [data, tab],
  )
  const jobCount = (data ?? []).filter((item) => item.type === 'job').length
  const freelanceCount = (data ?? []).filter((item) => item.type === 'freelancer').length

  return (
    <div className="container-wide py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow mb-3">Oportunidades</p>
        <h1 className="display text-4xl font-bold tracking-tight sm:text-6xl">
          Mural de Salinas
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Vagas de emprego e prestadores de serviços autônomos da cidade. Contato direto,
          sem intermediários.
        </p>
      </header>

      <div className="mt-8 inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
        <button
          type="button"
          onClick={() => setTab('job')}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
            tab === 'job' ? 'bg-deep text-white dark:bg-tide' : 'text-[var(--muted)]',
          )}
        >
          <Briefcase className="h-4 w-4" />
          Vagas
          <span className="rounded-full bg-white/20 px-1.5 text-[10px]">{jobCount}</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('freelancer')}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
            tab === 'freelancer' ? 'bg-deep text-white dark:bg-tide' : 'text-[var(--muted)]',
          )}
        >
          <Wrench className="h-4 w-4" />
          Prestadores
          <span className="rounded-full bg-white/20 px-1.5 text-[10px]">{freelanceCount}</span>
        </button>
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingGrid count={4} />
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={tab === 'job' ? Briefcase : Wrench}
            title={tab === 'job' ? 'Nenhuma vaga aberta' : 'Nenhum prestador cadastrado'}
            description="Novas oportunidades são publicadas periodicamente. Volte em breve."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((item) => (
              <OpportunityCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] px-6 py-6">
        <div>
          <h2 className="display text-xl font-bold">Quer divulgar uma vaga ou serviço?</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            O mural é gratuito para moradores e negócios de Salinas da Margarida.
          </p>
        </div>
        <a
          href={whatsappLink(
            CONTACT.whatsapp,
            'Olá! Quero divulgar uma vaga/serviço no mural do Salinas Magazine Tour.',
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <PlusCircle className="h-4 w-4" />
          Publicar no mural
        </a>
      </div>
    </div>
  )
}
