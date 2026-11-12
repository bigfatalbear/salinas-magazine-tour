import { useMemo, useState } from 'react'
import { Search, Store } from 'lucide-react'
import { CONTACT, MERCHANT_CATEGORIES } from '../config'
import { fetchMerchants } from '../lib/store'
import { useLoader } from '../hooks/useLoader'
import { cn, whatsappLink } from '../lib/utils'
import { MerchantCard } from '../components/MerchantCard'
import { EmptyState, ErrorState, LoadingGrid } from '../components/EmptyState'

export function Guide() {
  const { data, loading, error, reload } = useLoader(fetchMerchants, [])
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')

  const merchants = useMemo(() => {
    return (data ?? []).filter((merchant) => {
      const matchesCategory = category === 'Todos' || merchant.category === category
      const haystack =
        `${merchant.name} ${merchant.description} ${merchant.category}`.toLowerCase()
      return matchesCategory && haystack.includes(query.trim().toLowerCase())
    })
  }, [data, category, query])

  return (
    <div className="container-wide py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow mb-3">Comércio e serviços</p>
        <h1 className="display text-4xl font-bold tracking-tight sm:text-6xl">
          Guia de Salinas
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Pousadas, restaurantes, passeios, transporte e artesanato. Negócios locais que
          fazem a cidade girar — com contato direto no WhatsApp.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {['Todos', ...MERCHANT_CATEGORIES].map((item) => (
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
        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="input pl-9"
            placeholder="Buscar comércio…"
            aria-label="Buscar comércio"
          />
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingGrid count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : merchants.length === 0 ? (
          <EmptyState
            icon={Store}
            title="Nenhum comércio encontrado"
            description="Tente outra categoria ou termo de busca."
          />
        ) : (
          <>
            <p className="mb-4 text-xs text-[var(--muted)]">
              {merchants.length} {merchants.length === 1 ? 'resultado' : 'resultados'}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {merchants.map((merchant) => (
                <MerchantCard key={merchant.id} merchant={merchant} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-14 grid gap-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-6 sm:p-10 md:grid-cols-[1.4fr_0.6fr] md:items-center">
        <div>
          <p className="eyebrow mb-2">Anuncie no guia</p>
          <h2 className="display text-2xl font-bold sm:text-3xl">
            Seu negócio na próxima edição
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
            Comerciantes e prestadores de Salinas podem aparecer no guia digital, com
            WhatsApp, mapa e cupom de desconto.
          </p>
        </div>
        <a
          href={whatsappLink(
            CONTACT.whatsapp,
            'Olá! Quero anunciar meu negócio no Salinas Magazine Tour.',
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary md:justify-self-end"
        >
          Falar com a equipe
        </a>
      </div>
    </div>
  )
}
