import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  HardDrive,
  Newspaper,
  Rocket,
  Settings,
  Smartphone,
  Sparkles,
  Store,
} from 'lucide-react'
import {
  fetchAllEditions,
  fetchArticles,
  fetchMerchants,
  fetchOpportunities,
} from '../../lib/store'
import { useLoader } from '../../hooks/useLoader'
import { useSettings } from '../../context/SettingsContext'
import { formatDate, truncate } from '../../lib/utils'
import { ErrorState, PageLoader } from '../../components/EmptyState'

export function Dashboard() {
  const { data, loading, error, reload } = useLoader(async () => {
    const [editions, articles, merchants, opportunities] = await Promise.all([
      fetchAllEditions(),
      fetchArticles(),
      fetchMerchants(),
      fetchOpportunities(true),
    ])
    return { editions, articles, merchants, opportunities }
  }, [])

  const { settings } = useSettings()
  const [pwaReady, setPwaReady] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setPwaReady(Boolean(navigator.serviceWorker.controller))
      })
    }
  }, [])

  if (loading) return <PageLoader />
  if (error) return <ErrorState message={error} onRetry={reload} />
  if (!data) return null

  const openOpportunities = data.opportunities.filter((item) => item.status === 'open').length
  const published = data.editions.filter((edition) => edition.is_published).length

  const cards = [
    {
      label: 'Edições',
      value: data.editions.length,
      hint: `${published} publicada${published === 1 ? '' : 's'}`,
      to: '/admin/edicoes',
      icon: BookOpen,
      tone: 'bg-tide/12 text-tide',
    },
    {
      label: 'Matérias',
      value: data.articles.length,
      hint: `${data.articles.filter((item) => item.is_featured).length} em destaque`,
      to: '/admin/materias',
      icon: Newspaper,
      tone: 'bg-coral/12 text-coral',
    },
    {
      label: 'Comerciantes',
      value: data.merchants.length,
      hint: `${data.merchants.filter((item) => item.plan_tier !== 'free').length} parceiros`,
      to: '/admin/comerciantes',
      icon: Store,
      tone: 'bg-gold/20 text-[#8a6418] dark:text-gold',
    },
    {
      label: 'Oportunidades',
      value: openOpportunities,
      hint: `${data.opportunities.length} no total`,
      to: '/admin/oportunidades',
      icon: Briefcase,
      tone: 'bg-deep/10 text-deep dark:bg-white/10 dark:text-white',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Visão geral</p>
          <h2 className="display text-2xl font-bold tracking-tight sm:text-3xl">
            Bem-vindo ao painel
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Acompanhe a edição, o guia comercial e as oportunidades da cidade.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/materias" className="btn btn-primary btn-sm">
            <Newspaper className="h-4 w-4" />
            Nova matéria
          </Link>
          <Link to="/admin/edicoes" className="btn btn-ghost btn-sm">
            <BookOpen className="h-4 w-4" />
            Nova edição
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              to={card.to}
              className="card group p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${card.tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-tide" />
              </div>
              <p className="display mt-4 text-3xl font-bold">{card.value}</p>
              <p className="text-sm font-semibold">{card.label}</p>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">{card.hint}</p>
            </Link>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="card-flat p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="display text-xl font-bold">Últimas matérias</h3>
            <Link to="/admin/materias" className="text-xs font-semibold text-tide">
              Ver todas
            </Link>
          </div>
          <ul className="divide-y divide-[var(--line)]">
            {data.articles.slice(0, 5).map((article) => (
              <li key={article.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{article.title}</p>
                  <p className="text-[11px] text-[var(--muted)]">
                    {article.category} · {article.author}
                  </p>
                </div>
                <Link
                  to="/admin/materias"
                  className="shrink-0 text-[11px] font-semibold text-tide hover:underline"
                >
                  Editar
                </Link>
              </li>
            ))}
            {data.articles.length === 0 ? (
              <li className="py-6 text-center text-sm text-[var(--muted)]">
                Nenhuma matéria cadastrada.
              </li>
            ) : null}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="card-flat p-5">
            <h3 className="display text-xl font-bold">Status do PWA</h3>
            <div className="mt-4 flex items-center gap-3">
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${
                  pwaReady ? 'bg-emerald-500/12 text-emerald-600' : 'bg-gold/20 text-[#8a6418] dark:text-gold'
                }`}
              >
                {pwaReady ? <CheckCircle2 className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
              </span>
              <div>
                <p className="text-sm font-semibold">
                  {pwaReady ? 'Pronto para uso offline' : 'Service worker inicializando'}
                </p>
                <p className="text-[11px] text-[var(--muted)]">
                  Instalável como aplicativo no celular e no desktop.
                </p>
              </div>
            </div>
          </div>

          <div className="card-flat p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="display text-xl font-bold">Sistema</h3>
              <Link
                to="/admin/configuracoes"
                className="inline-flex items-center gap-1 text-xs font-semibold text-tide"
              >
                <Settings className="h-3.5 w-3.5" />
                Ajustar
              </Link>
            </div>
            <dl className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
                <div>
                  <dt className="font-semibold">Distribuição</dt>
                  <dd className="text-[var(--muted)]">
                    {settings?.deploy_target === 'windows_exe'
                      ? 'Executável Windows'
                      : 'PWA (GitHub Pages / Vercel)'}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
                <div>
                  <dt className="font-semibold">Assistente de IA</dt>
                  <dd className="text-[var(--muted)]">
                    {settings?.ai_provider === 'openai' ? 'OpenAI' : 'Gemini'} ·{' '}
                    {settings?.ai_model || 'modelo não definido'}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <HardDrive className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
                <div className="min-w-0">
                  <dt className="font-semibold">Armazenamento</dt>
                  <dd className="break-all text-[var(--muted)]">
                    {settings?.storage_path || 'Não configurado'}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="card-flat p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="display text-xl font-bold">Oportunidades recentes</h3>
          <Link to="/admin/oportunidades" className="text-xs font-semibold text-tide">
            Gerenciar
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.opportunities.slice(0, 4).map((item) => (
            <div key={item.id} className="rounded-xl border border-[var(--line)] p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-tide">
                  {item.type === 'job' ? 'Vaga' : 'Prestador'}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                    item.status === 'open'
                      ? 'bg-emerald-500/12 text-emerald-600'
                      : 'bg-[var(--surface-2)] text-[var(--muted)]'
                  }`}
                >
                  {item.status === 'open' ? 'Aberta' : 'Fechada'}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-semibold">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                {item.category} · {formatDate(item.created_at)}
              </p>
            </div>
          ))}
          {data.opportunities.length === 0 ? (
            <p className="py-4 text-sm text-[var(--muted)]">Nenhuma oportunidade cadastrada.</p>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl bg-deep p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gold">Dica</p>
            <h3 className="display mt-1 text-2xl font-bold">
              A contracapa também faz parte da edição
            </h3>
            <p className="mt-1.5 max-w-xl text-sm text-white/75">
              {truncate(
                'Mantenha o texto institucional e os links oficiais atualizados. É o espaço de prestação de contas e transparência da cidade.',
                160,
              )}
            </p>
          </div>
          <Link to="/admin/edicoes" className="btn bg-gold text-deep hover:brightness-105">
            Editar contracapa
          </Link>
        </div>
      </div>
    </div>
  )
}
