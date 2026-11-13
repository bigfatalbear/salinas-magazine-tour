import { NavLink } from 'react-router-dom'
import { Briefcase, Home, Map, Newspaper, Palmtree, Store } from 'lucide-react'
import { cn } from '../lib/utils'

const items = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/materias', label: 'Matérias', icon: Newspaper },
  { to: '/turismo', label: 'Turismo', icon: Palmtree },
  { to: '/distritos', label: 'Distritos', icon: Map },
  { to: '/guia', label: 'Guia', icon: Store },
  { to: '/oportunidades', label: 'Vagas', icon: Briefcase },
]

export function MobileNav() {
  return (
    <nav
      className="mobile-nav fixed inset-x-0 bottom-0 z-40 lg:hidden"
      aria-label="Navegação rápida"
    >
      <div className="grid grid-cols-6">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition',
                  isActive ? 'text-tide' : 'text-[var(--muted)]',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'grid h-8 w-12 place-items-center rounded-full transition',
                      isActive && 'bg-tide/12',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
