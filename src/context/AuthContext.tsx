import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { DEMO_EMAIL, DEMO_PASSWORD, DEMO_SESSION_KEY } from '../config'
import { supabase } from '../lib/supabase'
import type { AdminUser, DemoSession } from '../types'

interface AuthContextValue {
  user: AdminUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function mapSession(session: Session | null): AdminUser | null {
  if (!session?.user) return null
  return {
    id: session.user.id,
    email: session.user.email ?? 'admin',
    demo: false,
  }
}

function readDemoSession(): AdminUser | null {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as DemoSession
    if (!parsed?.demo || !parsed.email) return null
    return { id: parsed.id, email: parsed.email, demo: true }
  } catch {
    return null
  }
}

function translateAuthError(message: string) {
  const normalized = message.toLowerCase()
  if (normalized.includes('invalid login credentials')) {
    return 'E-mail ou senha inválidos.'
  }
  if (normalized.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar.'
  }
  if (normalized.includes('rate limit')) {
    return 'Muitas tentativas. Aguarde alguns minutos.'
  }
  return message
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setUser(readDemoSession())
      setLoading(false)
      return
    }

    let active = true
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return
        setUser(mapSession(data.session))
        setLoading(false)
      })
      .catch(() => {
        if (active) setLoading(false)
      })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapSession(session))
      setLoading(false)
    })

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw new Error(translateAuthError(error.message))
      return
    }

    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      throw new Error('Credenciais de demonstração inválidas.')
    }
    const session: DemoSession = {
      email: DEMO_EMAIL,
      id: 'demo-admin',
      demo: true,
    }
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session))
    setUser({ email: session.email, id: session.id, demo: true })
  }, [])

  const signOut = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    localStorage.removeItem(DEMO_SESSION_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth precisa estar dentro de AuthProvider')
  return context
}
