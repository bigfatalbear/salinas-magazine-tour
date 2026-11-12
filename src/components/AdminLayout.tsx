import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Briefcase,
  ExternalLink,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Palmtree,
  Settings,
  Store,
  X,
} from 'lucide-react'
import { ADMIN_NAV } from '../config'
import { useAuth } from '../context/AuthContext'
import { cn } from '../lib/utils'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const icons = {
  Painel: LayoutDashboard,
  Edições: BookOpen,
  Matérias: Newspaper,
  Comerciantes: Store,
  Turismo: Palmtree,
  Oportunidades: Briefcase,
  Configurações: Settings,
} as const

export function AdminLayout() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  async function handleSignOut() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-dvh bg-[var(--bg)]">
      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[var(--line)] bg-[var(--surface)] transition-transform duration-300 md:w-64 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-[var(--line)] px-5">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-[var(--muted)] md:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Menu administrativo">
          {ADMIN_NAV.map((item) => {
            const Icon = icons[item.label as keyof typeof icons] ?? LayoutDashboard
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    isActive
                      ? 'bg-deep text-white dark:bg-tide'
                      : 'text-[var(--muted)] hover:bg-black/5 hover:text-[var(--text)] dark:hover:bg-white/10',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-[var(--line)] p-3">
          <Link
            to="/"
            className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-tide transition hover:bg-tide/10"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ver site público
          </Link>
          <div className="flex items-center gap-2 rounded-xl bg-[var(--surface-2)] p-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-deep text-[10px] font-bold uppercase text-white">
              {user?.email.slice(0, 2) ?? 'AD'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold">{user?.email}</p>
              <p className="text-[10px] text-[var(--muted)]">
                {user?.demo ? 'Demonstração' : 'Administrador'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-black/5 hover:text-coral dark:hover:bg-white/10"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="app-header sticky top-0 z-30">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-xl border border-[var(--line)] p-2 text-[var(--muted)] md:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Salinas Magazine Tour
                </p>
                <h1 className="display text-lg font-bold leading-tight">Painel editorial</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {user?.demo ? (
                <span className="hidden items-center gap-1 rounded-full bg-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8a6418] dark:text-gold sm:inline-flex">
                  <FlaskConical className="h-3 w-3" />
                  Demo local
                </span>
              ) : null}
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          {user?.demo ? (
            <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-xs text-[#7a5a16] dark:text-gold">
              <FlaskConical className="h-4 w-4 shrink-0" />
              <span>
                <strong>Modo demonstração:</strong> os dados são salvos apenas neste navegador.
                Configure o Supabase e a Edge Function de IA para produção.
              </span>
            </div>
          ) : null}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
