import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ARTICLE_CATEGORIES } from '../../config'
import { fetchAllEditions, fetchArticles, saveArticle } from '../../lib/store'
import { useLoader } from '../../hooks/useLoader'
import { imageUrl } from '../../lib/utils'
import type { Article } from '../../types'
import { CrudPage, type CrudField } from '../../components/CrudPage'

export function AdminArticles() {
  const { data: editions } = useLoader(fetchAllEditions, [])

  const editionOptions = useMemo(
    () =>
      (editions ?? []).map((edition) => ({
        value: edition.id,
        label: `Nº ${String(edition.edition_number).padStart(2, '0')} — ${edition.title}`,
      })),
    [editions],
  )

  const fields = useMemo<CrudField<Article>[]>(
    () => [
      { key: 'title', label: 'Título', required: true, ai: 'improve', full: true },
      { key: 'subtitle', label: 'Subtítulo / resumo', ai: 'seo', full: true },
      {
        key: 'category',
        label: 'Categoria',
        type: 'select',
        options: ARTICLE_CATEGORIES,
        required: true,
      },
      { key: 'author', label: 'Autor', required: true },
      {
        key: 'edition_id',
        label: 'Edição',
        type: 'select',
        options: editionOptions,
        required: true,
      },
      { key: 'image_url', label: 'URL da imagem', type: 'url', placeholder: '/images/praia.jpg' },
      {
        key: 'is_featured',
        label: 'Destaque',
        type: 'checkbox',
        help: 'Exibir como matéria de destaque na capa',
      },
      {
        key: 'content',
        label: 'Conteúdo',
        type: 'textarea',
        rows: 14,
        ai: 'improve',
        required: true,
        full: true,
        help: 'Separe parágrafos com uma linha em branco. Use "## " para subtítulos e "> " para citações.',
      },
    ],
    [editionOptions],
  )

  return (
    <CrudPage<Article>
      title="Matérias"
      description="Reportagens, cultura, gastronomia, história e eventos da edição."
      table="articles"
      loader={fetchArticles}
      save={saveArticle}
      create={() => ({
        id: crypto.randomUUID(),
        edition_id: editions?.[0]?.id ?? '',
        title: '',
        subtitle: '',
        content: '',
        category: 'Cultura',
        author: 'Redação Salinas Magazine',
        image_url: '/images/praia.jpg',
        is_featured: false,
      })}
      fields={fields}
      itemLabel={(item) => item.title}
      searchText={(item) => `${item.title} ${item.subtitle} ${item.author} ${item.category}`}
      headerExtra={
        editionOptions.length === 0 ? (
          <Link to="/admin/edicoes" className="text-xs font-semibold text-coral">
            Crie uma edição primeiro
          </Link>
        ) : null
      }
      columns={[
        {
          key: 'title',
          label: 'Matéria',
          render: (item) => (
            <div className="flex items-center gap-2.5">
              {item.image_url ? (
                <img
                  src={imageUrl(item.image_url)}
                  alt=""
                  className="h-9 w-12 shrink-0 rounded-lg object-cover"
                />
              ) : null}
              <div className="min-w-0">
                <p className="line-clamp-2 max-w-xs font-semibold">{item.title}</p>
                <p className="text-[11px] text-[var(--muted)]">{item.author}</p>
              </div>
            </div>
          ),
        },
        { key: 'category', label: 'Categoria' },
        {
          key: 'is_featured',
          label: 'Destaque',
          render: (item) =>
            item.is_featured ? (
              <span className="rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-bold uppercase text-coral">
                Sim
              </span>
            ) : (
              <span className="text-[11px] text-[var(--muted)]">—</span>
            ),
        },
      ]}
    />
  )
}
