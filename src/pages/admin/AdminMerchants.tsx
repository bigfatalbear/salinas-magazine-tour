import { MERCHANT_CATEGORIES, MERCHANT_TIERS } from '../../config'
import { fetchMerchants, saveMerchant } from '../../lib/store'
import { imageUrl, initials, tierLabel } from '../../lib/utils'
import type { Merchant } from '../../types'
import { CrudPage, type CrudField } from '../../components/CrudPage'

const tierOptions = MERCHANT_TIERS.map((tier) => ({ value: tier, label: tierLabel(tier) }))

const fields: CrudField<Merchant>[] = [
  { key: 'name', label: 'Nome', required: true, ai: 'improve' },
  {
    key: 'category',
    label: 'Categoria',
    type: 'select',
    options: MERCHANT_CATEGORIES,
    required: true,
  },
  { key: 'plan_tier', label: 'Plano', type: 'select', options: tierOptions, required: true },
  { key: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '5575999990000', required: true },
  { key: 'opening_hours', label: 'Horário de funcionamento', placeholder: 'Ter a dom, 11h às 21h' },
  { key: 'coupon_code', label: 'Cupom de desconto', placeholder: 'MARE10' },
  { key: 'maps_url', label: 'Link do Google Maps', type: 'url', full: true },
  { key: 'logo_url', label: 'URL do logo', type: 'url', full: true },
  {
    key: 'description',
    label: 'Descrição',
    type: 'textarea',
    rows: 6,
    ai: 'ad',
    required: true,
    full: true,
    help: 'Descreva o negócio, produtos e diferenciais. Use a IA para padronizar o anúncio.',
  },
]

export function AdminMerchants() {
  return (
    <CrudPage<Merchant>
      title="Comerciantes"
      description="Pousadas, restaurantes, passeios, transporte e serviços do guia comercial."
      table="merchants"
      loader={fetchMerchants}
      save={saveMerchant}
      create={() => ({
        id: crypto.randomUUID(),
        name: '',
        category: 'Gastronomia',
        description: '',
        whatsapp: '5575999990000',
        maps_url: '',
        opening_hours: '',
        coupon_code: '',
        logo_url: '',
        plan_tier: 'free',
      })}
      fields={fields}
      itemLabel={(item) => item.name}
      searchText={(item) => `${item.name} ${item.description} ${item.category}`}
      columns={[
        {
          key: 'name',
          label: 'Comerciante',
          render: (item) => (
            <div className="flex items-center gap-2.5">
              {item.logo_url ? (
                <img
                  src={imageUrl(item.logo_url)}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-deep text-[10px] font-bold text-white">
                  {initials(item.name || 'SM')}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate font-semibold">{item.name}</p>
                <p className="text-[11px] text-[var(--muted)]">{item.opening_hours || '—'}</p>
              </div>
            </div>
          ),
        },
        { key: 'category', label: 'Categoria' },
        {
          key: 'plan_tier',
          label: 'Plano',
          render: (item) => (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                item.plan_tier === 'sponsor'
                  ? 'bg-coral/10 text-coral'
                  : item.plan_tier === 'highlight'
                    ? 'bg-gold/20 text-[#8a6418] dark:text-gold'
                    : 'bg-[var(--surface-2)] text-[var(--muted)]'
              }`}
            >
              {tierLabel(item.plan_tier)}
            </span>
          ),
        },
        {
          key: 'coupon_code',
          label: 'Cupom',
          render: (item) =>
            item.coupon_code ? (
              <span className="font-mono text-xs font-semibold text-coral">
                {item.coupon_code}
              </span>
            ) : (
              <span className="text-[11px] text-[var(--muted)]">—</span>
            ),
        },
      ]}
    />
  )
}
