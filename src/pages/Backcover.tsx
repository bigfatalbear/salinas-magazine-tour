import { Link } from 'react-router-dom'
import {
  BookOpenCheck,
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  MapPin,
} from 'lucide-react'
import { OFFICIAL_LINKS } from '../config'
import { fetchEditions } from '../lib/store'
import { useLoader } from '../hooks/useLoader'
import { formatDate, imageUrl } from '../lib/utils'
import { EmptyState, ErrorState, PageLoader } from '../components/EmptyState'

const pillars = [
  {
    icon: Landmark,
    title: 'Infraestrutura',
    description:
      'Obras, orla, mobilidade e serviços urbanos. Acompanhe o andamento nos canais oficiais da prefeitura.',
  },
  {
    icon: Leaf,
    title: 'Turismo sustentável',
    description:
      'Valorização da Baía, do manguezal e do turismo de base comunitária, com respeito ao tempo da maré.',
  },
  {
    icon: HeartPulse,
    title: 'Saúde',
    description:
      'Atendimento, campanhas e unidades de saúde do município. Informações atualizadas nos canais oficiais.',
  },
  {
    icon: GraduationCap,
    title: 'Educação',
    description:
      'Escolas, programas de formação e qualificação profissional para jovens e trabalhadores locais.',
  },
]

export function Backcover() {
  const { data, loading, error, reload } = useLoader(fetchEditions, [])
  const edition = data?.[0]

  if (loading) return <PageLoader />
  if (error) {
    return (
      <div className="container-page py-20">
        <ErrorState message={error} onRetry={reload} />
      </div>
    )
  }
  if (!edition) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Contracapa ainda não publicada"
          description="A próxima edição trará o balanço de gestão e os canais oficiais do município."
          action={
            <Link to="/" className="btn btn-primary btn-sm">
              Voltar para a capa
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-deep text-white">
        <img
          src={imageUrl(edition.backcover_image_url)}
          alt={edition.backcover_title}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-900 via-deep/85 to-deep/25" />
        <div className="container-wide relative py-16 sm:py-24">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <Landmark className="h-4 w-4" />
            Contracapa · Gestão da cidade
          </p>
          <h1 className="display max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            {edition.backcover_title}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-xs text-white/70">
            <MapPin className="h-3.5 w-3.5" />
            Salinas da Margarida · Bahia · Edição nº{' '}
            {String(edition.edition_number).padStart(2, '0')} ·{' '}
            {formatDate(edition.published_at)}
          </p>
        </div>
      </section>

      <div className="container-wide grid gap-10 py-12 lg:grid-cols-[1.5fr_0.5fr] lg:py-16">
        <div>
          <div className="article-body max-w-3xl">
            {edition.backcover_content
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div key={pillar.title} className="card-flat p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-tide/12 text-tide">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="display mt-3 text-xl font-bold">{pillar.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                    {pillar.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5">
            <h2 className="display text-xl font-bold">Acompanhe e participe</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
              Esta contracapa é um espaço editorial independente. Dados oficiais, obras e
              serviços devem ser confirmados diretamente nos canais da Prefeitura de Salinas
              da Margarida e no Portal da Transparência.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {edition.backcover_cta_links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card-flat p-5">
            <p className="eyebrow mb-3 flex items-center gap-2">
              <BookOpenCheck className="h-3.5 w-3.5" />
              Canais oficiais
            </p>
            <ul className="space-y-3 text-sm">
              {OFFICIAL_LINKS.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-2 text-[var(--muted)] transition hover:text-tide"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-deep p-5 text-white">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
              Transparência
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Consulte receitas, despesas, licitações e contratos no Portal da Transparência
              do município.
            </p>
            <a
              href="https://www.salinasdamargarida.ba.gov.br/Site/transparencia"
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-4 w-full bg-gold text-deep hover:brightness-105"
            >
              Acessar portal
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
