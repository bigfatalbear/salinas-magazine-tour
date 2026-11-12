import { useMemo, useState } from 'react'
import { Compass, MapPin, Palmtree, Sun, Waves } from 'lucide-react'
import { TOURISM_CATEGORIES } from '../config'
import { fetchTourismSpots } from '../lib/store'
import { useLoader } from '../hooks/useLoader'
import { cn, imageUrl } from '../lib/utils'
import { TourismCard } from '../components/TourismCard'
import { EmptyState, ErrorState, LoadingGrid } from '../components/EmptyState'

const itinerary = [
  {
    day: 'Dia 1',
    title: 'Sede, orla e pôr do sol',
    description:
      'Caminhe pelo cais da Praia da Ponte, conheça a orla e termine o dia vendo o sol descer sobre a Baía. À noite, procure um restaurante de frutos do mar na sede.',
    icon: Sun,
  },
  {
    day: 'Dia 2',
    title: 'Conceição e o mangue',
    description:
      'Visite Conceição de Salinas, converse com as marisqueiras e experimente a moqueca de chumbinho. À tarde, praia de mar calmo e, se possível, um passeio guiado pelo manguezal.',
    icon: Waves,
  },
  {
    day: 'Dia 3',
    title: 'Barra do Paraguaçu',
    description:
      'Siga até a foz do rio Paraguaçu. Faça um passeio de barco, banho de rio e mar, e conheça a vila. Se o roteiro incluir Cachoeira, vale visitar as ruínas do Convento de Santo Antônio.',
    icon: Compass,
  },
]

export function Tourism() {
  const { data, loading, error, reload } = useLoader(fetchTourismSpots, [])
  const [category, setCategory] = useState('Todos')

  const spots = useMemo(() => {
    return (data ?? []).filter((spot) => category === 'Todos' || spot.category === category)
  }, [data, category])

  return (
    <div>
      <section className="relative overflow-hidden bg-deep text-white">
        <img
          src={imageUrl('/images/praia.jpg')}
          alt="Praia de mar calmo em Salinas da Margarida"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-900 via-deep/80 to-deep/20" />
        <div className="container-wide relative py-16 sm:py-24">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <Palmtree className="h-4 w-4" />
            Guia turístico
          </p>
          <h1 className="display max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            A Baía é o roteiro
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Praias de água morna, manguezais, ilhas e comunidades pesqueiras. Salinas da
            Margarida é um convite a desacelerar.
          </p>
        </div>
      </section>

      <div className="container-wide py-10 sm:py-14">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {['Todos', ...TOURISM_CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn('chip shrink-0', category === item && 'chip-active')}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {loading ? (
            <LoadingGrid count={6} />
          ) : error ? (
            <ErrorState message={error} onRetry={reload} />
          ) : spots.length === 0 ? (
            <EmptyState
              title="Nenhum ponto turístico encontrado"
              description="Tente outra categoria."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {spots.map((spot) => (
                <TourismCard key={spot.id} spot={spot} />
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="container-wide py-14 sm:py-16">
          <p className="eyebrow mb-3">Roteiro sugerido</p>
          <h2 className="display text-3xl font-bold sm:text-4xl">Três dias entre o rio e o mar</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Um roteiro tranquilo para conhecer a sede, as comunidades pesqueiras e a foz do
            Paraguaçu. Ajuste o ritmo à maré e reserve tempo para conversar com quem vive ali.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {itinerary.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.day} className="card-flat p-5">
                  <div className="flex items-center gap-2 text-tide">
                    <Icon className="h-5 w-5" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      {step.day}
                    </span>
                  </div>
                  <h3 className="display mt-3 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 flex items-start gap-2 rounded-xl bg-[var(--surface-2)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
            <p>
              Contrate guias e barqueiros locais, leve água, protetor solar e respeite os
              horários da maré. Em áreas de manguezal, siga as orientações das comunidades.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
