import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, ExternalLink, MapPin, Waves } from 'lucide-react'
import { DISTRICTS, DISTRICT_SOURCES } from '../data/districts'
import { cn, imageUrl } from '../lib/utils'

export function Districts() {
  return (
    <div>
      <section className="relative overflow-hidden bg-deep text-white">
        <img
          src={imageUrl('/images/vista.jpg')}
          alt="Vista da cidade e da baía de Salinas da Margarida"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-900 via-deep/85 to-deep/20" />
        <div className="container-wide relative py-16 sm:py-24">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            <MapPin className="h-4 w-4" />
            Território
          </p>
          <h1 className="display max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            Distritos e povoados
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Salinas da Margarida é formada pela sede, pelos distritos de Dendê (Porto da Telha),
            Encarnação, Conceição de Salinas e Cairu, e pelo povoado de Barra do Paraguaçu.
            Cada lugar tem seu próprio tempo, sua praia e suas festas.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/turismo" className="btn btn-primary">
              <Waves className="h-4 w-4" />
              Roteiro pela baía
            </Link>
            <Link
              to="/guia"
              className="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              Comércio local
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="container-wide py-10 sm:py-14">
        <div className="max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-5 text-sm leading-relaxed text-[var(--muted)] sm:p-6">
          <strong className="text-[var(--text)]">Como ler este mapa:</strong> os distritos são
          divisões político-administrativas; Barra do Paraguaçu é tratada como povoado. Mutá e
          Cações, embora próximos, pertencem a Jaguaripe. As praias e festas abaixo seguem
          registros da prefeitura, do inventário turístico da Bahia e de pesquisas locais.
        </div>

        <div className="mt-4">
          {DISTRICTS.map((district, index) => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${district.name}, Salinas da Margarida - BA`,
            )}`
            return (
              <section
                key={district.slug}
                id={district.slug}
                className="scroll-mt-24 border-t border-[var(--line)] py-10 first:border-t-0 sm:py-14"
              >
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div className={cn('overflow-hidden rounded-2xl', index % 2 === 1 && 'lg:order-2')}>
                    <img
                      src={imageUrl(district.image_url)}
                      alt={district.image_alt}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <p className="eyebrow mb-2">
                      {district.kind} · Salinas da Margarida
                    </p>
                    <h2 className="display text-3xl font-bold tracking-tight sm:text-4xl">
                      {district.name}
                    </h2>
                    <p className="mt-2 text-sm font-semibold text-tide">{district.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                      {district.description}
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
                          Destaques
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                          {district.highlights.map((item) => (
                            <li key={item} className="flex gap-2">
                              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
                          Festas e tradições
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                          {district.festivities.map((item) => (
                            <li key={item} className="flex gap-2">
                              <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tide" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-tide transition hover:gap-3"
                    >
                      Ver no mapa
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="container-wide py-10 sm:py-12">
          <p className="eyebrow mb-3">Fontes consultadas</p>
          <div className="grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
            {DISTRICT_SOURCES.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 transition hover:text-tide"
              >
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {source.label}
              </a>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-[var(--muted)]">
            Conteúdo editorial independente. Datas de festas podem mudar a cada ano; confirme
            com a organização local antes de viajar.
          </p>
        </div>
      </section>
    </div>
  )
}
