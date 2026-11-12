import { useState } from 'react'
import { ChevronDown, MapPin, Navigation } from 'lucide-react'
import type { TourismSpot } from '../types'
import { cn, imageUrl, mapsSearch } from '../lib/utils'

export function TourismCard({ spot }: { spot: TourismSpot }) {
  const [open, setOpen] = useState(false)
  const mapsUrl = spot.maps_url || mapsSearch(`${spot.title} Salinas da Margarida BA`)

  return (
    <article className="card group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-2)]">
        <img
          src={imageUrl(spot.image_url)}
          alt={spot.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-deep shadow-sm">
          {spot.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="display text-xl font-bold leading-tight">{spot.title}</h3>
        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-[var(--muted)]">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {spot.location_name}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{spot.description}</p>

        {spot.history_text ? (
          <>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-tide"
              aria-expanded={open}
            >
              {open ? 'Recolher história' : 'Conhecer a história'}
              <ChevronDown className={cn('h-3.5 w-3.5 transition', open && 'rotate-180')} />
            </button>
            {open ? (
              <p className="mt-2 border-l-2 border-gold pl-3 text-sm leading-relaxed text-[var(--muted)]">
                {spot.history_text}
              </p>
            ) : null}
          </>
        ) : null}

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm mt-4 w-full"
        >
          <Navigation className="h-4 w-4" />
          Como chegar
        </a>
      </div>
    </article>
  )
}
