import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { fetchSettings, saveSettings as persistSettings } from '../lib/store'
import type { AppSettings } from '../types'

interface SettingsContextValue {
  settings: AppSettings | null
  loading: boolean
  error: string | null
  reload: () => Promise<void>
  save: (next: AppSettings) => Promise<void>
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setSettings(await fetchSettings())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar configurações.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const save = useCallback(async (next: AppSettings) => {
    await persistSettings(next)
    setSettings(next)
  }, [])

  const value = useMemo(
    () => ({ settings, loading, error, reload, save }),
    [settings, loading, error, reload, save],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings precisa estar dentro de SettingsProvider')
  return context
}
