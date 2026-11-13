import { useState } from 'react'
import { BarChart3, ExternalLink, House, Info, Users } from 'lucide-react'
import {
  IBGE_AGE_GROUPS,
  IBGE_HOUSEHOLDS,
  IBGE_INSIGHTS,
  IBGE_POPULATION,
  IBGE_RACE,
  IBGE_SECONDARY,
  IBGE_SOURCES,
  IBGE_STATS,
} from '../data/ibge'
import { SectionHeading } from './SectionHeading'
import { cn } from '../lib/utils'

type Tab = 'populacao' | 'idade' | 'domicilios'

const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: 'populacao', label: 'População', icon: BarChart3 },
  { id: 'idade', label: 'Quem somos', icon: Users },
  { id: 'domicilios', label: 'Domicílios', icon: House },
]

const TOTAL = 14987

function format(value: number) {
  return value.toLocaleString('pt-BR')
}

function percent(value: number) {
  return ((value / TOTAL) * 100).toFixed(1).replace('.', ',')
}

export function IbgeDashboard() {
  const [tab, setTab] = useState<Tab>('populacao')
  const [activePopulation, setActivePopulation] = useState(3)
  const [activeAge, setActiveAge] = useState(0)
  const [activeService, setActiveService] = useState(2)

  const populationMax = Math.max(...IBGE_POPULATION.map((item) => item.value))
  const ageMax = Math.max(...IBGE_AGE_GROUPS.map((item) => item.value))
  const population = IBGE_POPULATION[activePopulation]
  const age = IBGE_AGE_GROUPS[activeAge]
  const service = IBGE_HOUSEHOLDS[activeService]

  return (
    <section id="ibge" className="border-y border-[var(--line)] bg-[var(--surface)]">
      <div className="container-wide py-16 sm:py-20">
        <SectionHeading
          eyebrow="IBGE · Censo 2022"
          title="Salinas em números"
          description="Quem vive, onde vive e como vive a cidade que você lê nas páginas desta revista. Passe o mouse ou toque nos gráficos para explorar os dados."
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {IBGE_STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
              <p className="display text-2xl font-bold text-tide sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {IBGE_SECONDARY.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--line)] px-4 py-3">
              <p className="text-sm font-bold text-[var(--text)]">{stat.value}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:flex" role="tablist" aria-label="Dados do IBGE">
          {tabs.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  'chip justify-center px-2 sm:justify-start sm:px-3.5',
                  tab === item.id && 'chip-active',
                )}
              >
                <Icon className="hidden h-4 w-4 sm:block" />
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="mt-5" role="tabpanel">
          {tab === 'populacao' ? (
            <div className="card p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="display text-2xl font-bold">Evolução da população</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Censos de 1991 a 2022 e estimativa para 2026.
                  </p>
                </div>
                <span className="rounded-full bg-tide/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-tide">
                  IBGE
                </span>
              </div>

              <div className="mt-7 flex h-56 items-end gap-2 sm:h-72 sm:gap-4">
                {IBGE_POPULATION.map((point, index) => {
                  const height = (point.value / populationMax) * 100
                  return (
                    <button
                      key={point.year}
                      type="button"
                      onMouseEnter={() => setActivePopulation(index)}
                      onFocus={() => setActivePopulation(index)}
                      onClick={() => setActivePopulation(index)}
                      aria-label={`${point.year}: ${format(point.value)} habitantes`}
                      className="group flex h-full flex-1 items-end rounded-t-lg outline-none focus-visible:ring-2 focus-visible:ring-tide"
                    >
                      <span
                        className={cn(
                          'chart-bar-y block w-full rounded-t-lg transition-colors',
                          activePopulation === index
                            ? 'bg-tide'
                            : 'bg-tide/35 group-hover:bg-tide/60',
                        )}
                        style={{ height: `${height}%`, animationDelay: `${index * 80}ms` }}
                      />
                    </button>
                  )
                })}
              </div>
              <div className="mt-2 flex gap-2 sm:gap-4">
                {IBGE_POPULATION.map((point) => (
                  <span
                    key={point.year}
                    className="flex-1 text-center text-[10px] font-semibold text-[var(--muted)] sm:text-xs"
                  >
                    {point.year}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-[var(--surface-2)] p-4">
                <p className="text-sm font-bold">
                  {population.year}: {format(population.value)} habitantes
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {population.kind === 'Censo' ? 'Censo demográfico' : 'Estimativa populacional'}.
                  Passe o mouse ou toque nas barras para comparar os anos.
                </p>
              </div>
            </div>
          ) : null}

          {tab === 'idade' ? (
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="card p-5 sm:p-7">
                <h3 className="display text-2xl font-bold">Distribuição por idade</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Pessoas por faixa de idade no Censo 2022.
                </p>
                <div className="mt-6 space-y-2.5">
                  {IBGE_AGE_GROUPS.map((group, index) => {
                    const width = (group.value / ageMax) * 100
                    return (
                      <button
                        key={group.label}
                        type="button"
                        onMouseEnter={() => setActiveAge(index)}
                        onFocus={() => setActiveAge(index)}
                        onClick={() => setActiveAge(index)}
                        aria-label={`${group.label}: ${format(group.value)} pessoas`}
                        className="group flex w-full items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-tide"
                      >
                        <span className="w-14 shrink-0 text-right text-[11px] font-semibold text-[var(--muted)]">
                          {group.label}
                        </span>
                        <span className="relative h-6 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                          <span
                            className={cn(
                              'chart-bar-x block h-full rounded-full transition-colors',
                              activeAge === index
                                ? 'bg-tide'
                                : 'bg-tide/40 group-hover:bg-tide/65',
                            )}
                            style={{ width: `${width}%`, animationDelay: `${index * 50}ms` }}
                          />
                        </span>
                        <span className="w-14 shrink-0 text-right text-[11px] font-semibold text-[var(--muted)]">
                          {format(group.value)}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-5 rounded-xl bg-[var(--surface-2)] p-4">
                  <p className="text-sm font-bold">
                    {age.label} anos: {format(age.value)} pessoas
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {percent(age.value)}% da população de Salinas em 2022.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="card p-5">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
                    Cor ou raça · 2022
                  </h3>
                  <div className="mt-4 space-y-3">
                    {IBGE_RACE.map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold">{item.label}</span>
                          <span className="text-[var(--muted)]">
                            {item.value.toFixed(1).replace('.', ',')}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
                          <div
                            className="chart-bar-x h-full rounded-full bg-coral"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[11px] leading-relaxed text-[var(--muted)]">
                    A maior parte da população se declara preta ou parda.
                  </p>
                </div>

                <div className="card p-5">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
                    Urbano e rural · 2022
                  </h3>
                  <div className="mt-4 flex h-3 overflow-hidden rounded-full">
                    <div className="bg-tide" style={{ width: '96.8%' }} />
                    <div className="bg-gold" style={{ width: '3.2%' }} />
                  </div>
                  <div className="mt-3 flex justify-between text-xs">
                    <span>
                      <strong className="text-tide">96,8%</strong> urbana
                      <span className="block text-[10px] text-[var(--muted)]">14.510 pessoas</span>
                    </span>
                    <span className="text-right">
                      <strong className="text-gold">3,2%</strong> rural
                      <span className="block text-[10px] text-[var(--muted)]">477 pessoas</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {tab === 'domicilios' ? (
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="card p-5 sm:p-7">
                <h3 className="display text-2xl font-bold">Serviços nos domicílios</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Percentual de domicílios com cada serviço no Censo 2022.
                </p>
                <div className="mt-6 space-y-5">
                  {IBGE_HOUSEHOLDS.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      onMouseEnter={() => setActiveService(index)}
                      onFocus={() => setActiveService(index)}
                      onClick={() => setActiveService(index)}
                      aria-label={`${item.label}: ${item.value}%`}
                      className="group block w-full rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-tide"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold">{item.label}</span>
                        <span className="text-sm font-bold text-tide">
                          {item.value.toFixed(1).replace('.', ',')}%
                        </span>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--surface-2)]">
                        <div
                          className={cn(
                            'chart-bar-x h-full rounded-full transition-colors',
                            index === 2
                              ? 'bg-coral'
                              : activeService === index
                                ? 'bg-tide'
                                : 'bg-tide/50 group-hover:bg-tide/70',
                          )}
                          style={{ width: `${item.value}%`, animationDelay: `${index * 90}ms` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-[var(--surface-2)] p-4">
                  <p className="text-sm font-bold">
                    {service.label}: {service.value.toFixed(1).replace('.', ',')}%
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{service.detail}.</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="card p-5">
                  <p className="display text-3xl font-bold text-tide">5.330</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">domicílios ocupados em 2022</p>
                </div>
                <div className="card p-5">
                  <p className="display text-3xl font-bold text-tide">2,8</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">moradores por domicílio</p>
                </div>
                <div className="card p-5">
                  <p className="display text-3xl font-bold text-coral">76,9%</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    dos domicílios ainda sem esgoto adequado
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <Info className="h-3.5 w-3.5" />
            Para ler a revista
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {IBGE_INSIGHTS.map((insight) => (
              <p key={insight} className="flex gap-2 text-sm leading-relaxed text-[var(--muted)]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                {insight}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[var(--muted)]">
          <span className="font-semibold">Fontes:</span>
          {IBGE_SOURCES.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-tide"
            >
              {source.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
