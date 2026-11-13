import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  MapPin,
  Sparkles,
  Waves,
} from 'lucide-react'
import {
  fetchArticles,
  fetchEditions,
  fetchMerchants,
  fetchOpportunities,
  fetchTourismSpots,
} from '../lib/store'
import { useLoader } from '../hooks/useLoader'
import { imageUrl, truncate } from '../lib/utils'
import { ArticleCard } from '../components/ArticleCard'
import { MerchantCard } from '../components/MerchantCard'
import { TourismCard } from '../components/TourismCard'
import { OpportunityCard } from '../components/OpportunityCard'
import { SectionHeading } from '../components/SectionHeading'
import { ErrorState } from '../components/EmptyState'
import { IbgeDashboard } from '../components/IbgeDashboard'
import { DISTRICTS } from '../data/districts'

const stats = [
  { value: '15,7 mil', label: 'habitantes (IBGE 2026)' },
  { value: '~10', label: 'praias de mar calmo' },
  { value: '5', label: 'distritos e povoados' },
  { value: '1881', label: 'as primeiras salinas' },
]

export function Home() {
  const { data, loading, error, reload } = useLoader(async () => {
    const [editions, articles, tourism, merchants, opportunities] = await Promise.all([
      fetchEditions(),
      fetchArticles(),
      fetchTourismSpots(),
      fetchMerchants(),
      fetchOpportunities(),
    ])
    return { editions, articles, tourism, merchants, opportunities }
  }, [])

  const [selectedId, setSelectedId] = useState<string>('')

  const edition = useMemo(() => {
    if (!data) return undefined
    return data.editions.find((item) => item.id === selectedId) ?? data.editions[0]
  }, [data, selectedId])

  if (loading) {
    return (
      <div className="container-wide py-6">
        <div className="skeleton h-[62svh] w-full rounded-3xl" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton h-72" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-page py-20">
        <ErrorState message={error} onRetry={reload} />
      </div>
    )
  }

  if (!data || !edition) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="display text-3xl font-bold">Nenhuma edição publicada ainda.</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Acesse o painel administrativo para publicar a primeira edição.
        </p>
        <Link to="/admin" className="btn btn-primary mt-6">
          Abrir painel
        </Link>
      </div>
    )
  }

  const editionArticles = data.articles.filter((article) => article.edition_id === edition.id)
  const pool = editionArticles.length >= 3 ? editionArticles : data.articles
  const featured = pool.filter((article) => article.is_featured)
  const ordered = (featured.length >= 3 ? featured : pool).slice(0, 5)
  const mainArticle = ordered[0]
  const secondary = ordered.slice(1, 3)
  const voicesArticle = pool.find((article) => article.category === 'Cultura') ?? mainArticle

  return (
    <div>
      <section className="relative overflow-hidden bg-deep text-white">
        <div className="absolute inset-0">
          <img
            src={imageUrl(edition.cover_image_url)}
            alt={`Capa da edição ${edition.edition_number} — Salinas da Margarida`}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-900 via-deep/80 to-deep/20 md:bg-gradient-to-r md:from-deep-900 md:via-deep/85 md:to-deep/10" />
        </div>

        <div className="container-wide relative flex min-h-[86svh] flex-col justify-between py-8 sm:py-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
              <span className="rounded-full border border-white/30 px-3 py-1">
                Edição nº {String(edition.edition_number).padStart(2, '0')}
              </span>
              <span>Salinas da Margarida · BA</span>
            </div>

            {data.editions.length > 1 ? (
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/80">
                Edição
                <select
                  value={edition.id}
                  onChange={(event) => setSelectedId(event.target.value)}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white outline-none backdrop-blur"
                >
                  {data.editions.map((item) => (
                    <option key={item.id} value={item.id} className="text-deep">
                      Nº {String(item.edition_number).padStart(2, '0')} — {item.title}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>

          <div className="grid gap-8 pb-10 pt-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pb-16">
            <div className="animate-fade-up">
              <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
                <Waves className="h-4 w-4" />
                A revista da maré
              </p>
              <h1 className="display max-w-3xl text-4xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
                {edition.cover_headline}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Cultura, gastronomia, turismo e a vida de quem nasceu entre a Baía de
                Todos-os-Santos e o rio Paraguaçu.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#nesta-edicao" className="btn btn-primary">
                  <BookOpen className="h-4 w-4" />
                  Ler a edição
                </a>
                <Link
                  to="/turismo"
                  className="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                >
                  <Compass className="h-4 w-4" />
                  Guia turístico
                </Link>
              </div>
            </div>

            <div className="animate-fade-up rounded-2xl border border-white/15 bg-deep-900/45 p-5 backdrop-blur-md sm:p-6">
              <p className="eyebrow mb-4 text-white/60">Nesta capa</p>
              <ol className="space-y-4">
                {edition.cover_highlights.map((highlight, index) => {
                  const target = ordered[index]
                  const content = (
                    <>
                      <span className="display text-lg font-bold text-gold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold leading-snug text-white">
                          {highlight.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-white/65">
                          {highlight.subtitle}
                        </span>
                      </span>
                    </>
                  )
                  return (
                    <li key={`${highlight.title}-${index}`}>
                      {target ? (
                        <Link
                          to={`/materias/${target.id}`}
                          className="group flex gap-3 border-l border-white/15 pl-4 transition hover:border-gold"
                        >
                          {content}
                        </Link>
                      ) : (
                        <div className="flex gap-3 border-l border-white/15 pl-4">
                          {content}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide relative z-10 -mt-8">
        <dl className="card grid grid-cols-2 gap-y-6 px-5 py-6 sm:px-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <dt className="display text-2xl font-bold text-tide sm:text-3xl">{stat.value}</dt>
              <dd className="mt-1 text-[11px] uppercase tracking-wide text-[var(--muted)]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section id="nesta-edicao" className="container-wide py-16 sm:py-20">
        <SectionHeading
          eyebrow="Reportagens"
          title="Nesta edição"
          description="Histórias que atravessam o mangue, a praia, a cozinha e a memória de Salinas da Margarida."
          action={{ label: 'Todas as matérias', to: '/materias' }}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {mainArticle ? <ArticleCard article={mainArticle} large /> : null}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {secondary.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <IbgeDashboard />

      <section className="border-y border-[var(--line)] bg-[var(--surface-2)]">
        <div className="container-wide grid items-center gap-8 py-14 md:grid-cols-[0.8fr_1.2fr] md:py-16">
          <div className="relative">
            <img
              src={imageUrl('/images/marisqueira.jpg')}
              alt="Marisqueira trabalhando no manguezal de Salinas da Margarida"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-editorial"
            />
            <span className="absolute -bottom-4 left-4 rounded-xl bg-coral px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white sm:left-6">
              Vozes da maré
            </span>
          </div>
          <div>
            <p className="eyebrow mb-3">Cultura</p>
            <blockquote className="display text-2xl font-bold leading-snug sm:text-4xl">
              “Morar em Salinas é viver com a salinidade, com a maritimidade e com o tempo da
              maré.”
            </blockquote>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
              A frase é de uma pesquisa sobre os saberes do mar no Recôncavo e resume o que
              torna a cidade única. Aqui, a maré não é paisagem: é calendário, trabalho e
              identidade.
            </p>
            {voicesArticle ? (
              <Link
                to={`/materias/${voicesArticle.id}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-tide transition hover:gap-3"
              >
                Ler a reportagem
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-20">
        <SectionHeading
          eyebrow="Guia turístico"
          title="A Baía é o roteiro"
          description="Praias de mar calmo, ilhas, manguezais e patrimônios que contam a história da cidade."
          action={{ label: 'Explorar tudo', to: '/turismo' }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.tourism.slice(0, 3).map((spot) => (
            <TourismCard key={spot.id} spot={spot} />
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-2)]">
        <div className="container-wide py-16 sm:py-20">
          <SectionHeading
            eyebrow="Território"
            title="Distritos e povoados"
            description="Da sede à foz do Paraguaçu, cinco lugares com praias, festas e modos de vida próprios."
            action={{ label: 'Conhecer cada um', to: '/distritos' }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DISTRICTS.map((district) => (
              <Link
                key={district.slug}
                to="/distritos"
                className="group card overflow-hidden"
              >
                <img
                  src={imageUrl(district.image_url)}
                  alt={district.image_alt}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="eyebrow text-[10px]">{district.kind}</p>
                  <h3 className="display mt-1 text-lg font-bold leading-snug transition group-hover:text-tide">
                    {district.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                    {district.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="container-wide py-16 sm:py-20">
          <SectionHeading
            eyebrow="Comércio e serviços"
            title="Quem faz a cidade acontecer"
            description="Pousadas, restaurantes, passeios e prestadores locais. Apoie quem é de Salinas."
            action={{ label: 'Abrir guia', to: '/guia' }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.merchants.slice(0, 3).map((merchant) => (
              <MerchantCard key={merchant.id} merchant={merchant} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-20">
        <SectionHeading
          eyebrow="Oportunidades"
          title="Trabalho que fica na maré"
          description="Vagas e serviços autônomos divulgados por comerciantes e moradores de Salinas."
          action={{ label: 'Ver mural', to: '/oportunidades' }}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {data.opportunities.slice(0, 2).map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="container-wide pb-20">
        <div className="card grid overflow-hidden md:grid-cols-2">
          <div className="relative min-h-64 overflow-hidden">
            <img
              src={imageUrl(edition.backcover_image_url)}
              alt={edition.backcover_title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-900/60 to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="eyebrow mb-3 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Contracapa · Gestão da cidade
            </p>
            <h2 className="display text-3xl font-bold tracking-tight sm:text-4xl">
              {edition.backcover_title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              {truncate(edition.backcover_content.replace(/\n/g, ' '), 240)}
            </p>
            <Link to="/contracapa" className="btn btn-dark mt-6 self-start">
              <Sparkles className="h-4 w-4" />
              Ler a contracapa
            </Link>
          </div>
        </div>
      </section>

      <div className="container-wide pb-10">
        <Link
          to="/sobre"
          className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] px-5 py-4 text-sm text-[var(--muted)] transition hover:border-tide hover:text-tide"
        >
          <span>
            Uma publicação independente feita para valorizar Salinas da Margarida.
          </span>
          <span className="inline-flex items-center gap-1 font-semibold">
            Sobre o projeto
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      </div>
    </div>
  )
}
