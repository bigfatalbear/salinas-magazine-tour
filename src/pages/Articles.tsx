import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { ARTICLE_CATEGORIES } from '../config'
import { fetchArticles } from '../lib/store'
import { useLoader } from '../hooks/useLoader'
import { ArticleCard } from '../components/ArticleCard'
import { EmptyState, ErrorState, LoadingGrid } from '../components/EmptyState'
import { cn } from '../lib/utils'

export function Articles() {
  const { data, loading, error, reload } = useLoader(fetchArticles, [])
  const [category, setCategory] = useState<string>('Todas')
  const [query, setQuery] = useState('')

  const articles = useMemo(() => {
    return (data ?? []).filter((article) => {
      const matchesCategory = category === 'Todas' || article.category === category
      const haystack = `${article.title} ${article.subtitle} ${article.author}`.toLowerCase()
      return matchesCategory && haystack.includes(query.trim().toLowerCase())
    })
  }, [data, category, query])

  return (
    <div className="container-wide py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow mb-3">Reportagens</p>
        <h1 className="display text-4xl font-bold tracking-tight sm:text-6xl">
          Histórias da maré
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Cultura, gastronomia, história e eventos de Salinas da Margarida. Leia com calma,
          como quem escuta o mar.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {['Todas', ...ARTICLE_CATEGORIES].map((item) => (
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
            placeholder="Buscar matéria…"
            aria-label="Buscar matéria"
          />
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <LoadingGrid count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : articles.length === 0 ? (
          <EmptyState
            title="Nenhuma matéria encontrada"
            description="Tente outra categoria ou termo de busca."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-14 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] px-6 py-8 text-center sm:px-10">
        <h2 className="display text-2xl font-bold">Tem uma história para contar?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--muted)]">
          A redação do Salinas Magazine Tour recebe sugestões de pautas, memórias e registros
          da cidade.
        </p>
        <Link to="/sobre" className="btn btn-dark mt-5">
          Falar com a redação
        </Link>
      </div>
    </div>
  )
}
