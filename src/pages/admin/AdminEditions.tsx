import { useMemo, useState, type FormEvent } from 'react'
import {
  BookOpen,
  CalendarDays,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { deleteRow, fetchAllEditions, fetchArticles, saveEdition } from '../../lib/store'
import { useLoader } from '../../hooks/useLoader'
import { formatDate, imageUrl } from '../../lib/utils'
import { useToast } from '../../context/ToastContext'
import type { CtaLink, CoverHighlight, Edition } from '../../types'
import { Modal } from '../../components/Modal'
import { EmptyState, ErrorState, PageLoader } from '../../components/EmptyState'

function emptyEdition(number: number): Edition {
  return {
    id: crypto.randomUUID(),
    title: '',
    edition_number: number,
    published_at: new Date().toISOString().slice(0, 10),
    is_published: false,
    cover_image_url: '/images/orla.jpg',
    cover_headline: '',
    cover_highlights: [{ title: '', subtitle: '' }],
    backcover_title: 'Expediente e transparência',
    backcover_image_url: '/images/vista.jpg',
    backcover_content: '',
    backcover_cta_links: [{ label: 'Prefeitura de Salinas da Margarida', url: 'https://www.salinasdamargarida.ba.gov.br/' }],
  }
}

export function AdminEditions() {
  const { data, loading, error, reload } = useLoader(fetchAllEditions, [])
  const { toast } = useToast()
  const [draft, setDraft] = useState<Edition | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<Edition | null>(null)
  const [removing, setRemoving] = useState(false)

  const nextNumber = useMemo(
    () => Math.max(0, ...(data ?? []).map((edition) => edition.edition_number)) + 1,
    [data],
  )

  function update<K extends keyof Edition>(key: K, value: Edition[K]) {
    setDraft((current) => (current ? { ...current, [key]: value } : current))
  }

  function updateHighlight(index: number, patch: Partial<CoverHighlight>) {
    setDraft((current) =>
      current
        ? {
            ...current,
            cover_highlights: current.cover_highlights.map((item, position) =>
              position === index ? { ...item, ...patch } : item,
            ),
          }
        : current,
    )
  }

  function updateLink(index: number, patch: Partial<CtaLink>) {
    setDraft((current) =>
      current
        ? {
            ...current,
            backcover_cta_links: current.backcover_cta_links.map((item, position) =>
              position === index ? { ...item, ...patch } : item,
            ),
          }
        : current,
    )
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    if (!draft) return
    if (!draft.title.trim() || !draft.cover_headline.trim()) {
      toast('Preencha o título da edição e a manchete de capa.', 'error')
      return
    }
    setSaving(true)
    try {
      await saveEdition({
        ...draft,
        title: draft.title.trim(),
        cover_headline: draft.cover_headline.trim(),
        cover_highlights: draft.cover_highlights.filter(
          (item) => item.title.trim() || item.subtitle.trim(),
        ),
        backcover_cta_links: draft.backcover_cta_links.filter(
          (item) => item.label.trim() && item.url.trim(),
        ),
      })
      toast('Edição salva com sucesso.')
      setDraft(null)
      reload()
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Não foi possível salvar.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleting) return
    setRemoving(true)
    try {
      const articles = await fetchArticles()
      const related = articles.filter((article) => article.edition_id === deleting.id)
      await Promise.all(related.map((article) => deleteRow('articles', article.id)))
      await deleteRow('editions', deleting.id)
      toast('Edição removida.')
      setDeleting(null)
      reload()
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Não foi possível remover.', 'error')
    } finally {
      setRemoving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Publicação</p>
          <h2 className="display text-2xl font-bold tracking-tight sm:text-3xl">Edições</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Cada edição define a capa, os destaques e a contracapa da revista.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDraft(emptyEdition(nextNumber))}
          className="btn btn-primary btn-sm"
        >
          <Plus className="h-4 w-4" />
          Nova edição
        </button>
      </div>

      {loading ? <PageLoader /> : null}
      {error ? <ErrorState message={error} onRetry={reload} /> : null}

      {!loading && !error && (data?.length ?? 0) === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nenhuma edição criada"
          description="Crie a primeira edição para publicar a capa e as matérias."
          action={
            <button
              type="button"
              onClick={() => setDraft(emptyEdition(nextNumber))}
              className="btn btn-primary btn-sm"
            >
              <Plus className="h-4 w-4" />
              Criar edição
            </button>
          }
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {(data ?? []).map((edition) => (
          <article key={edition.id} className="card flex overflow-hidden">
            <img
              src={imageUrl(edition.cover_image_url)}
              alt={`Capa da edição ${edition.edition_number}`}
              className="h-auto w-28 shrink-0 object-cover sm:w-36"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-tide">
                    Edição {String(edition.edition_number).padStart(2, '0')}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                      edition.is_published
                        ? 'bg-emerald-500/12 text-emerald-600'
                        : 'bg-[var(--surface-2)] text-[var(--muted)]'
                    }`}
                  >
                    {edition.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {edition.is_published ? 'Publicada' : 'Rascunho'}
                  </span>
                </div>
                <h3 className="display mt-1 line-clamp-2 text-lg font-bold">{edition.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
                  {edition.cover_headline}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-[var(--muted)]">
                  <CalendarDays className="h-3 w-3" />
                  {formatDate(edition.published_at)}
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setDraft(JSON.parse(JSON.stringify(edition)) as Edition)}
                  className="btn btn-ghost btn-sm"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => setDeleting(edition)}
                  className="btn btn-sm text-coral hover:bg-coral/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Excluir
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal
        open={Boolean(draft)}
        onClose={() => {
          if (!saving) setDraft(null)
        }}
        title={draft && data?.some((item) => item.id === draft.id) ? 'Editar edição' : 'Nova edição'}
        description="Capa, destaques e contracapa fazem parte da mesma publicação."
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDraft(null)}
              disabled={saving}
              className="btn btn-ghost btn-sm"
            >
              Cancelar
            </button>
            <button type="submit" form="edition-form" disabled={saving} className="btn btn-primary btn-sm">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Salvar edição
            </button>
          </div>
        }
      >
        {draft ? (
          <form id="edition-form" onSubmit={(event) => void handleSave(event)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-[2fr_0.7fr_1fr]">
              <div>
                <label className="field-label" htmlFor="edition-title">
                  Título da edição
                </label>
                <input
                  id="edition-title"
                  required
                  value={draft.title}
                  onChange={(event) => update('title', event.target.value)}
                  className="input"
                  placeholder="Edição de verão"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="edition-number">
                  Número
                </label>
                <input
                  id="edition-number"
                  type="number"
                  min={1}
                  required
                  value={draft.edition_number}
                  onChange={(event) => update('edition_number', Number(event.target.value))}
                  className="input"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="edition-date">
                  Publicação
                </label>
                <input
                  id="edition-date"
                  type="date"
                  required
                  value={draft.published_at.slice(0, 10)}
                  onChange={(event) => update('published_at', event.target.value)}
                  className="input"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={draft.is_published}
                onChange={(event) => update('is_published', event.target.checked)}
                className="h-4 w-4 rounded border-[var(--line)] accent-tide"
              />
              Publicar esta edição no site
            </label>

            <fieldset className="space-y-4 rounded-2xl border border-[var(--line)] p-4">
              <legend className="px-2 text-xs font-bold uppercase tracking-widest text-tide">
                Capa
              </legend>
              <div>
                <label className="field-label" htmlFor="cover-image">
                  Imagem de capa (URL)
                </label>
                <input
                  id="cover-image"
                  value={draft.cover_image_url}
                  onChange={(event) => update('cover_image_url', event.target.value)}
                  className="input"
                  placeholder="/images/orla.jpg"
                />
              </div>
              {draft.cover_image_url ? (
                <img
                  src={imageUrl(draft.cover_image_url)}
                  alt="Prévia da capa"
                  className="h-40 w-full rounded-xl object-cover"
                />
              ) : null}
              <div>
                <label className="field-label" htmlFor="cover-headline">
                  Manchete de capa
                </label>
                <input
                  id="cover-headline"
                  required
                  value={draft.cover_headline}
                  onChange={(event) => update('cover_headline', event.target.value)}
                  className="input"
                  placeholder="A força das marisqueiras de Salinas"
                />
              </div>
              <div className="space-y-2">
                <p className="field-label">Destaques da capa</p>
                {draft.cover_highlights.map((highlight, index) => (
                  <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1.3fr_auto]">
                    <input
                      value={highlight.title}
                      onChange={(event) => updateHighlight(index, { title: event.target.value })}
                      className="input"
                      placeholder="Título"
                      aria-label={`Título do destaque ${index + 1}`}
                    />
                    <input
                      value={highlight.subtitle}
                      onChange={(event) => updateHighlight(index, { subtitle: event.target.value })}
                      className="input"
                      placeholder="Complemento"
                      aria-label={`Subtítulo do destaque ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        update(
                          'cover_highlights',
                          draft.cover_highlights.filter((_, position) => position !== index),
                        )
                      }
                      className="btn btn-ghost btn-sm text-coral"
                      aria-label="Remover destaque"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    update('cover_highlights', [...draft.cover_highlights, { title: '', subtitle: '' }])
                  }
                  className="btn btn-ghost btn-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Adicionar destaque
                </button>
              </div>
            </fieldset>

            <fieldset className="space-y-4 rounded-2xl border border-[var(--line)] p-4">
              <legend className="px-2 text-xs font-bold uppercase tracking-widest text-tide">
                Contracapa
              </legend>
              <div>
                <label className="field-label" htmlFor="backcover-title">
                  Título
                </label>
                <input
                  id="backcover-title"
                  value={draft.backcover_title}
                  onChange={(event) => update('backcover_title', event.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="backcover-image">
                  Imagem (URL)
                </label>
                <input
                  id="backcover-image"
                  value={draft.backcover_image_url}
                  onChange={(event) => update('backcover_image_url', event.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="backcover-content">
                  Texto da contracapa
                </label>
                <textarea
                  id="backcover-content"
                  rows={6}
                  value={draft.backcover_content}
                  onChange={(event) => update('backcover_content', event.target.value)}
                  className="input"
                />
              </div>
              <div className="space-y-2">
                <p className="field-label">Links oficiais</p>
                {draft.backcover_cta_links.map((link, index) => (
                  <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
                    <input
                      value={link.label}
                      onChange={(event) => updateLink(index, { label: event.target.value })}
                      className="input"
                      placeholder="Nome do link"
                      aria-label={`Nome do link ${index + 1}`}
                    />
                    <input
                      value={link.url}
                      onChange={(event) => updateLink(index, { url: event.target.value })}
                      className="input"
                      placeholder="https://"
                      aria-label={`URL do link ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        update(
                          'backcover_cta_links',
                          draft.backcover_cta_links.filter((_, position) => position !== index),
                        )
                      }
                      className="btn btn-ghost btn-sm text-coral"
                      aria-label="Remover link"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    update('backcover_cta_links', [
                      ...draft.backcover_cta_links,
                      { label: '', url: '' },
                    ])
                  }
                  className="btn btn-ghost btn-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Adicionar link
                </button>
              </div>
            </fieldset>
          </form>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(deleting)}
        onClose={() => {
          if (!removing) setDeleting(null)
        }}
        title="Excluir edição"
        description="Esta ação também remove as matérias vinculadas. Não é possível desfazer."
        size="sm"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleting(null)}
              disabled={removing}
              className="btn btn-ghost btn-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={removing}
              className="btn btn-sm bg-coral text-white hover:brightness-110"
            >
              {removing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Excluir
            </button>
          </div>
        }
      >
        <p className="text-sm text-[var(--muted)]">
          Excluir a edição <strong className="text-[var(--text)]">{deleting?.title}</strong>?
        </p>
      </Modal>
    </div>
  )
}
