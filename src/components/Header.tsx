import { NavLink } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { NAV_LINKS } from '../config'
import { cn } from '../lib/utils'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="app-header sticky top-0 z-40">
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-[13px] font-semibold transition',
                  isActive
                    ? 'bg-deep text-white dark:bg-tide'
                    : 'text-[var(--muted)] hover:bg-black/5 hover:text-[var(--text)] dark:hover:bg-white/10',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NavLink
            to="/admin"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-coral hover:text-coral"
            aria-label="Área administrativa"
            title="Área administrativa"
          >
            <LayoutDashboard className="h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </header>
  )
}
