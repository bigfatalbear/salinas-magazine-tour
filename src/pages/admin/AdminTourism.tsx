import { TOURISM_CATEGORIES } from '../../config'
import { fetchTourismSpots, saveTourismSpot } from '../../lib/store'
import { imageUrl } from '../../lib/utils'
import type { TourismSpot } from '../../types'
import { CrudPage, type CrudField } from '../../components/CrudPage'

const fields: CrudField<TourismSpot>[] = [
  { key: 'title', label: 'Nome do ponto', required: true, ai: 'improve' },
  {
    key: 'category',
    label: 'Categoria',
    type: 'select',
    options: TOURISM_CATEGORIES,
    required: true,
  },
  { key: 'location_name', label: 'Localização', required: true, full: true },
  { key: 'image_url', label: 'URL da imagem', type: 'url', full: true },
  {
    key: 'description',
    label: 'Descrição',
    type: 'textarea',
    rows: 5,
    ai: 'improve',
    required: true,
    full: true,
  },
  {
    key: 'history_text',
    label: 'História / contexto',
    type: 'textarea',
    rows: 6,
    ai: 'improve',
    full: true,
  },
  { key: 'maps_url', label: 'Link do Google Maps', type: 'url', full: true },
]

export function AdminTourism() {
  return (
    <CrudPage<TourismSpot>
      title="Turismo"
      description="Praias, ilhas, patrimônios e naturezas que formam o roteiro de Salinas."
      table="tourism_spots"
      loader={fetchTourismSpots}
      save={saveTourismSpot}
      create={() => ({
        id: crypto.randomUUID(),
        title: '',
        category: 'Praia',
        description: '',
        history_text: '',
        location_name: 'Salinas da Margarida - BA',
        maps_url: '',
        image_url: '/images/praia.jpg',
      })}
      fields={fields}
      itemLabel={(item) => item.title}
      searchText={(item) => `${item.title} ${item.description} ${item.category} ${item.location_name}`}
      columns={[
        {
          key: 'title',
          label: 'Ponto turístico',
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
                <p className="truncate font-semibold">{item.title}</p>
                <p className="truncate text-[11px] text-[var(--muted)]">{item.location_name}</p>
              </div>
            </div>
          ),
        },
        { key: 'category', label: 'Categoria' },
        {
          key: 'description',
          label: 'Descrição',
          render: (item) => (
            <span className="line-clamp-2 block max-w-sm text-[11px] text-[var(--muted)]">
              {item.description}
            </span>
          ),
        },
      ]}
    />
  )
}
