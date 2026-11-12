import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Article } from '../types'
import { cn, imageUrl, readingTime } from '../lib/utils'

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <Link
      to={`/materias/${article.id}`}
      className={cn(
        'group card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(6,35,56,0.45)]',
        large && 'sm:grid sm:grid-cols-2',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-[var(--surface-2)]',
          large ? 'aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-72' : 'aspect-[4/3]',
        )}
      >
        <img
          src={imageUrl(article.image_url)}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-deep shadow-sm">
          {article.category}
        </span>
        {article.is_featured ? (
          <span className="absolute right-3 top-3 rounded-full bg-coral px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Destaque
          </span>
        ) : null}
      </div>
      <div className={cn('flex flex-col p-5', large && 'sm:justify-center sm:p-8')}>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
          <span>{article.author}</span>
          <span aria-hidden>•</span>
          <span>{readingTime(article.content)} min de leitura</span>
        </div>
        <h3
          className={cn(
            'display mt-2 font-bold leading-[1.12] transition group-hover:text-tide',
            large ? 'text-2xl sm:text-3xl' : 'text-xl',
          )}
        >
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {article.subtitle}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-coral">
          Ler matéria
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
