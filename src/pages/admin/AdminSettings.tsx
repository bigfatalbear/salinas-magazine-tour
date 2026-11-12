import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  Cpu,
  Database,
  Download,
  Eye,
  EyeOff,
  Globe2,
  HardDrive,
  KeyRound,
  Loader2,
  RefreshCw,
  Rocket,
  Save,
} from 'lucide-react'
import { AI_PROVIDERS, DEPLOY_TARGETS, PROPERTY_UUID, isSupabaseConfigured } from '../../config'
import { useSettings } from '../../context/SettingsContext'
import { useToast } from '../../context/ToastContext'
import { exportDatabase, resetLocalData } from '../../lib/store'
import type { AppSettings } from '../../types'
import { Modal } from '../../components/Modal'
import { ErrorState, PageLoader } from '../../components/EmptyState'

export function AdminSettings() {
  const { settings, loading, error, reload, save } = useSettings()
  const { toast } = useToast()
  const [draft, setDraft] = useState<AppSettings | null>(null)
  const [saving, setSaving] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    if (settings) setDraft(settings)
  }, [settings])

  function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setDraft((current) => (current ? { ...current, [key]: value } : current))
  }

  async function handleSave() {
    if (!draft) return
    setSaving(true)
    try {
      await save({ ...draft, updated_at: new Date().toISOString() })
      toast('Configurações salvas.')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Não foi possível salvar.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleExport() {
    setExporting(true)
    try {
      const json = await exportDatabase()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `salinas-magazine-tour-${new Date().toISOString().slice(0, 10)}.json`
      anchor.click()
      URL.revokeObjectURL(url)
      toast('Backup exportado.')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Falha ao exportar.', 'error')
    } finally {
      setExporting(false)
    }
  }

  async function handleReset() {
    setResetting(true)
    try {
      resetLocalData()
      await reload()
      setConfirmReset(false)
      toast('Dados locais restaurados para o conteúdo inicial.')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Falha ao restaurar.', 'error')
    } finally {
      setResetting(false)
    }
  }

  if (loading) return <PageLoader />
  if (error) return <ErrorState message={error} onRetry={() => void reload()} />
  if (!draft) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Sistema</p>
          <h2 className="display text-2xl font-bold tracking-tight sm:text-3xl">
            Configurações
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Distribuição, armazenamento, assistente de IA e backup dos dados.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="btn btn-primary btn-sm"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Salvar alterações
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="card-flat p-5 sm:p-6">
          <h3 className="display flex items-center gap-2 text-xl font-bold">
            <Rocket className="h-5 w-5 text-tide" />
            Distribuição
          </h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            O mesmo projeto gera o PWA e o aplicativo para Windows.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="field-label" htmlFor="deploy-target">
                Destino principal
              </label>
              <select
                id="deploy-target"
                value={draft.deploy_target}
                onChange={(event) =>
                  update('deploy_target', event.target.value as AppSettings['deploy_target'])
                }
                className="input"
              >
                {DEPLOY_TARGETS.map((target) => (
                  <option key={target} value={target}>
                    {target === 'pwa' ? 'PWA — GitHub Pages / Vercel' : 'Executável Windows'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="storage-path">
                Caminho de armazenamento local
              </label>
              <div className="relative">
                <HardDrive className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  id="storage-path"
                  value={draft.storage_path}
                  onChange={(event) => update('storage_path', event.target.value)}
                  className="input pl-9"
                  placeholder="C:\Users\...\salinas-magazine-tour"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-[var(--muted)]">
                Usado pelo app Windows para armazenar o banco local e os backups.
              </p>
            </div>
          </div>
        </section>

        <section className="card-flat p-5 sm:p-6">
          <h3 className="display flex items-center gap-2 text-xl font-bold">
            <Cpu className="h-5 w-5 text-tide" />
            Assistente de IA
          </h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Melhora textos, cria SEO e padroniza anúncios pelo painel.
          </p>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="ai-provider">
                  Provedor
                </label>
                <select
                  id="ai-provider"
                  value={draft.ai_provider}
                  onChange={(event) =>
                    update('ai_provider', event.target.value as AppSettings['ai_provider'])
                  }
                  className="input"
                >
                  {AI_PROVIDERS.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider === 'gemini' ? 'Google Gemini' : 'OpenAI'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="ai-model">
                  Modelo
                </label>
                <input
                  id="ai-model"
                  value={draft.ai_model}
                  onChange={(event) => update('ai_model', event.target.value)}
                  className="input"
                  placeholder="gemini-2.0-flash"
                />
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="ai-key">
                Chave de API
              </label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  id="ai-key"
                  type={showKey ? 'text' : 'password'}
                  value={draft.ai_api_key}
                  onChange={(event) => update('ai_api_key', event.target.value)}
                  className="input px-9"
                  placeholder="Configurada nos secrets da Edge Function"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((current) => !current)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[var(--muted)] hover:text-[var(--text)]"
                  aria-label={showKey ? 'Ocultar chave' : 'Mostrar chave'}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--muted)]">
                Em produção, prefira os secrets da Edge Function. Nunca exponha chaves no
                frontend.
              </p>
            </div>
          </div>
        </section>

        <section className="card-flat p-5 sm:p-6">
          <h3 className="display flex items-center gap-2 text-xl font-bold">
            <Database className="h-5 w-5 text-tide" />
            Banco de dados
          </h3>
          <dl className="mt-4 space-y-3 text-xs">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-2">
              <dt className="text-[var(--muted)]">Modo</dt>
              <dd className="font-semibold">
                {isSupabaseConfigured ? 'Supabase (nuvem)' : 'Demonstração local'}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-2">
              <dt className="text-[var(--muted)]">Property ID</dt>
              <dd className="break-all font-mono text-[10px]">{PROPERTY_UUID}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[var(--muted)]">Última atualização</dt>
              <dd className="font-semibold">
                {new Date(draft.updated_at).toLocaleString('pt-BR')}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => void handleExport()}
            disabled={exporting}
            className="btn btn-ghost btn-sm mt-5 w-full"
          >
            {exporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Exportar backup JSON
          </button>
        </section>

        <section className="card-flat p-5 sm:p-6">
          <h3 className="display flex items-center gap-2 text-xl font-bold">
            <Globe2 className="h-5 w-5 text-tide" />
            Publicação
          </h3>
          <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[var(--muted)]">
            <li>
              <strong className="text-[var(--text)]">PWA:</strong> gere com{' '}
              <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5">npm run build</code> e
              publique a pasta <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5">dist</code>.
            </li>
            <li>
              <strong className="text-[var(--text)]">GitHub Pages:</strong> defina{' '}
              <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5">VITE_BASE=/nome-do-repo/</code>.
            </li>
            <li>
              <strong className="text-[var(--text)]">Windows:</strong> empacote com{' '}
              <code className="rounded bg-[var(--surface-2)] px-1.5 py-0.5">
                npm run dist:win
              </code>.
            </li>
            <li>
              <strong className="text-[var(--text)]">IA:</strong> publique a Edge Function e
              configure os secrets no Supabase.
            </li>
          </ul>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm mt-5 w-full"
          >
            Abrir painel do Supabase
          </a>
        </section>
      </div>

      {!isSupabaseConfigured ? (
        <section className="rounded-2xl border border-coral/40 bg-coral/5 p-5 sm:p-6">
          <h3 className="display flex items-center gap-2 text-lg font-bold text-coral">
            <AlertTriangle className="h-5 w-5" />
            Zona de risco
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
            Restaura o conteúdo de demonstração e apaga as alterações feitas neste navegador.
          </p>
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="btn btn-sm mt-4 border border-coral/40 text-coral hover:bg-coral/10"
          >
            <RefreshCw className="h-4 w-4" />
            Restaurar dados locais
          </button>
        </section>
      ) : null}

      <Modal
        open={confirmReset}
        onClose={() => {
          if (!resetting) setConfirmReset(false)
        }}
        title="Restaurar dados locais"
        description="Todas as alterações feitas no modo de demonstração serão apagadas."
        size="sm"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              disabled={resetting}
              className="btn btn-ghost btn-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => void handleReset()}
              disabled={resetting}
              className="btn btn-sm bg-coral text-white hover:brightness-110"
            >
              {resetting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Restaurar
            </button>
          </div>
        }
      >
        <p className="text-sm text-[var(--muted)]">
          O conteúdo volta ao estado inicial do projeto. Deseja continuar?
        </p>
      </Modal>
    </div>
  )
}
