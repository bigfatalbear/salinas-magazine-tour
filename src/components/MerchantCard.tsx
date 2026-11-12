import { Clock, MapPin, MessageCircle, TicketPercent } from 'lucide-react'
import type { Merchant } from '../types'
import { imageUrl, initials, mapsSearch, tierLabel, whatsappLink } from '../lib/utils'

export function MerchantCard({ merchant }: { merchant: Merchant }) {
  const message = `Olá! Encontrei ${merchant.name} no Salinas Magazine Tour e gostaria de mais informações.`
  const mapsUrl =
    merchant.maps_url || mapsSearch(`${merchant.name} Salinas da Margarida BA`)

  return (
    <article className="card flex h-full flex-col p-5">
      <div className="flex items-start gap-3">
        {merchant.logo_url ? (
          <img
            src={imageUrl(merchant.logo_url)}
            alt={merchant.name}
            loading="lazy"
            className="h-12 w-12 rounded-xl object-cover"
          />
        ) : (
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-deep text-sm font-bold text-white">
            {initials(merchant.name)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-tide">
              {merchant.category}
            </span>
            {merchant.plan_tier !== 'free' ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  merchant.plan_tier === 'sponsor'
                    ? 'bg-coral text-white'
                    : 'bg-gold/25 text-[#8a6418] dark:text-gold'
                }`}
              >
                {tierLabel(merchant.plan_tier)}
              </span>
            ) : null}
          </div>
          <h3 className="display mt-1 text-lg font-bold leading-tight">{merchant.name}</h3>
          {merchant.opening_hours ? (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-[var(--muted)]">
              <Clock className="h-3 w-3" />
              {merchant.opening_hours}
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
        {merchant.description}
      </p>

      {merchant.coupon_code ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-coral/50 bg-coral/5 px-3 py-2">
          <TicketPercent className="h-4 w-4 shrink-0 text-coral" />
          <span className="text-xs text-[var(--muted)]">Cupom:</span>
          <strong className="text-sm font-bold tracking-wider text-coral">
            {merchant.coupon_code}
          </strong>
        </div>
      ) : null}

      <div className="mt-auto flex gap-2 pt-4">
        <a
          href={whatsappLink(merchant.whatsapp, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-tide btn-sm flex-1"
          aria-label={`Falar com ${merchant.name} no WhatsApp`}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm"
          aria-label={`Ver ${merchant.name} no mapa`}
        >
          <MapPin className="h-4 w-4" />
          Mapa
        </a>
      </div>
    </article>
  )
}
