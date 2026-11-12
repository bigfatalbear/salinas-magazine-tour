import { fetchOpportunities, saveOpportunity } from '../../lib/store'
import { formatDate, todayIso } from '../../lib/utils'
import type { ServiceOpportunity } from '../../types'
import { CrudPage, type CrudField } from '../../components/CrudPage'

const fields: CrudField<ServiceOpportunity>[] = [
  {
    key: 'type',
    label: 'Tipo',
    type: 'select',
    required: true,
    options: [
      { value: 'job', label: 'Vaga de emprego' },
      { value: 'freelancer', label: 'Prestador de serviço' },
    ],
  },
  { key: 'title', label: 'Título', required: true, ai: 'improve', full: true },
  {
    key: 'category',
    label: 'Categoria / área',
    required: true,
    placeholder: 'Gastronomia, Construção, Turismo…',
  },
  {
    key: 'contact_whatsapp',
    label: 'WhatsApp de contato',
    type: 'tel',
    required: true,
    placeholder: '5575999990000',
  },
  {
    key: 'status',
    label: 'Situação',
    type: 'select',
    required: true,
    options: [
      { value: 'open', label: 'Aberta' },
      { value: 'closed', label: 'Encerrada' },
    ],
  },
  {
    key: 'description',
    label: 'Descrição',
    type: 'textarea',
    rows: 7,
    ai: 'ad',
    required: true,
    full: true,
    help: 'Explique a vaga, requisitos ou o serviço oferecido. A IA padroniza o texto do anúncio.',
  },
]

export function AdminOpportunities() {
  return (
    <CrudPage<ServiceOpportunity>
      title="Oportunidades"
      description="Vagas de emprego e prestadores de serviço de Salinas da Margarida."
      table="service_opportunities"
      loader={() => fetchOpportunities(true)}
      save={saveOpportunity}
      create={() => ({
        id: crypto.randomUUID(),
        type: 'job',
        title: '',
        category: '',
        description: '',
        contact_whatsapp: '5575999990000',
        status: 'open',
        created_at: todayIso(),
      })}
      fields={fields}
      itemLabel={(item) => item.title}
      searchText={(item) => `${item.title} ${item.category} ${item.description}`}
      columns={[
        {
          key: 'title',
          label: 'Oportunidade',
          render: (item) => (
            <div className="min-w-0">
              <p className="line-clamp-2 max-w-xs font-semibold">{item.title}</p>
              <p className="text-[11px] text-[var(--muted)]">{formatDate(item.created_at)}</p>
            </div>
          ),
        },
        {
          key: 'type',
          label: 'Tipo',
          render: (item) => (
            <span className="text-[11px] font-semibold">
              {item.type === 'job' ? 'Vaga' : 'Prestador'}
            </span>
          ),
        },
        { key: 'category', label: 'Área' },
        {
          key: 'status',
          label: 'Situação',
          render: (item) => (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                item.status === 'open'
                  ? 'bg-emerald-500/12 text-emerald-600'
                  : 'bg-[var(--surface-2)] text-[var(--muted)]'
              }`}
            >
              {item.status === 'open' ? 'Aberta' : 'Fechada'}
            </span>
          ),
        },
      ]}
    />
  )
}
