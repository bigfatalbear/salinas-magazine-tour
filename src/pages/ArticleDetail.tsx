import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Minus, Plus, Share2, User } from 'lucide-react'
import { fetchArticles } from '../lib/store'
import { useLoader } from '../hooks/useLoader'
import { useToast } from '../context/ToastContext'
import { imageUrl, readingTime } from '../lib/utils'
import { ArticleCard } from '../components/ArticleCard'
import { EmptyState, ErrorState, PageLoader } from '../components/EmptyState'
import { SectionHeading } from '../components/SectionHeading'

const FONT_KEY = 'smt:article-size'

function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      if (block.startsWith('## ')) {
        return <h2 key={index}>{block.slice(3)}</h2>
      }
      if (block.startsWith('> ')) {
        return <blockquote key={index}>{block.slice(2)}</blockquote>
      }
      return <p key={index}>{block}</p>
    })
}

export function ArticleDetail() {
  const { id } = useParams()
  const { data, loading, error, reload } = useLoader(fetchArticles, [])
  const { toast } = useToast()

  const [fontSize, setFontSize] = useState(() => {
    const stored = Number(localStorage.getItem(FONT_KEY))
    return stored >= 15 && stored <= 22 ? stored : 17
  })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    localStorage.setItem(FONT_KEY, String(fontSize))
  }, [fontSize])

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement
      const max = root.scrollHeight - root.clientHeight
      setProgress(max > 0 ? Math.min(100, (root.scrollTop / max) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const article = useMemo(() => data?.find((item) => item.id === id), [data, id])
  const related = useMemo(
    () => (data ?? []).filter((item) => item.id !== id).slice(0, 3),
    [data, id],
  )

  async function share() {
    if (!article) return
    const payload = {
      title: article.title,
      text: article.subtitle,
      url: window.location.href,
    }
    if (navigator.share) {
      try {
        await navigator.share(payload)
        return
      } catch {
        // cancelled by the user
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast('Link da matéria copiado.')
    } catch {
      toast('Não foi possível copiar o link.', 'error')
    }
  }

  if (loading) return <PageLoader />
  if (error) {
    return (
      <div className="container-page py-20">
        <ErrorState message={error} onRetry={reload} />
      </div>
    )
  }
  if (!article) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Matéria não encontrada"
          description="O conteúdo pode ter sido removido ou o link está incorreto."
          action={
            <Link to="/materias" className="btn btn-primary btn-sm">
              Voltar para as matérias
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <article>
      <div className="fixed inset-x-0 top-16 z-30 h-0.5 bg-transparent">
        <div className="h-full bg-coral transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <header className="container-page pt-10 sm:pt-14">
        <Link
          to="/materias"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-tide"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar para as matérias
        </Link>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <span className="chip chip-active border-transparent">{article.category}</span>
          <h1 className="display mt-5 text-3xl font-bold leading-[1.06] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
            {article.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readingTime(article.content)} min de leitura
            </span>
            {article.is_featured ? (
              <span className="font-semibold uppercase tracking-wide text-coral">Destaque</span>
            ) : null}
          </div>
        </div>
      </header>

      <figure className="container-wide mt-8 sm:mt-10">
        <img
          src={imageUrl(article.image_url)}
          alt={article.title}
          className="aspect-[16/9] w-full rounded-2xl object-cover shadow-editorial"
        />
        <figcaption className="mt-2 text-right text-[10px] text-[var(--muted)]">
          Salinas da Margarida · Edição digital
        </figcaption>
      </figure>

      <div className="container-page mt-10 flex flex-wrap items-center justify-between gap-3 border-y border-[var(--line)] py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
            Texto
          </span>
          <button
            type="button"
            onClick={() => setFontSize((value) => Math.max(15, value - 1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-tide hover:text-tide"
            aria-label="Diminuir fonte"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setFontSize((value) => Math.min(22, value + 1))}
            className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-tide hover:text-tide"
            aria-label="Aumentar fonte"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <button type="button" onClick={() => void share()} className="btn btn-ghost btn-sm">
          <Share2 className="h-4 w-4" />
          Compartilhar
        </button>
      </div>

      <div className="container-page py-8">
        <div
          className="article-body mx-auto max-w-2xl"
          style={{ '--article-size': `${fontSize}px` } as CSSProperties}
        >
          {renderContent(article.content)}
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-[var(--surface-2)] p-5 text-sm text-[var(--muted)]">
          <p>
            <strong className="text-[var(--text)]">Salinas Magazine Tour</strong> é uma
            publicação editorial independente sobre Salinas da Margarida, Bahia. Conteúdo
            produzido com base em fontes públicas e relatos locais.
          </p>
          <p className="mt-2 text-[11px]">
            Publicado na edição digital · Salinas da Margarida, BA
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="container-wide border-t border-[var(--line)] py-14">
          <SectionHeading eyebrow="Continue lendo" title="Outras histórias" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
