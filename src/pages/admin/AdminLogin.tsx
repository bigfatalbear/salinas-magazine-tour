import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, FlaskConical, Loader2, Lock, LogIn, Mail } from 'lucide-react'
import { DEMO_EMAIL, DEMO_PASSWORD, isSupabaseConfigured } from '../../config'
import { useAuth } from '../../context/AuthContext'
import { imageUrl } from '../../lib/utils'
import { Logo } from '../../components/Logo'
import { ThemeToggle } from '../../components/ThemeToggle'

export function AdminLogin() {
  const { user, loading, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(isSupabaseConfigured ? '' : DEMO_EMAIL)
  const [password, setPassword] = useState(isSupabaseConfigured ? '' : DEMO_PASSWORD)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  if (!loading && user) return <Navigate to={from} replace />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await signIn(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao entrar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative hidden overflow-hidden bg-deep lg:block">
        <img
          src={imageUrl('/images/orla.jpg')}
          alt="Orla de Salinas da Margarida"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900 via-deep/70 to-deep/20" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <Logo />
          <div>
            <p className="eyebrow mb-3 text-gold">Painel editorial</p>
            <h1 className="display max-w-lg text-4xl font-bold leading-tight">
              A cidade vira revista. Você cuida da edição.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
              Publique matérias, edições, comércios, pontos turísticos e oportunidades do
              Salinas Magazine Tour.
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
            Salinas da Margarida · Bahia
          </p>
        </div>
      </div>

      <div className="flex flex-col bg-[var(--bg)]">
        <div className="flex items-center justify-between p-5 sm:p-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-tide"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao site
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-16 sm:px-8">
          <div className="w-full max-w-sm">
            <div className="mb-6 lg:hidden">
              <Logo />
            </div>
            <p className="eyebrow mb-2">Área restrita</p>
            <h2 className="display text-3xl font-bold tracking-tight">Entrar no painel</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Acesso protegido por Supabase Auth.
            </p>

            {!isSupabaseConfigured ? (
              <div className="mt-5 flex gap-2 rounded-xl border border-gold/50 bg-gold/10 px-3.5 py-3 text-[11px] leading-relaxed text-[#7a5a16] dark:text-gold">
                <FlaskConical className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <strong>Modo demonstração.</strong> Use {DEMO_EMAIL} / {DEMO_PASSWORD}. Os
                  dados ficam salvos neste navegador.
                </span>
              </div>
            ) : null}

            <form onSubmit={(event) => void handleSubmit(event)} className="mt-6 space-y-4">
              <div>
                <label className="field-label" htmlFor="email">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="input pl-9"
                    placeholder="voce@exemplo.com"
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="password">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="input pl-9"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error ? (
                <p className="rounded-lg bg-coral/10 px-3 py-2 text-xs font-semibold text-coral">
                  {error}
                </p>
              ) : null}

              <button type="submit" disabled={submitting} className="btn btn-primary w-full">
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                Entrar
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-[var(--muted)]">
              Acesso restrito à equipe editorial. O cadastro de novos usuários está desativado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
