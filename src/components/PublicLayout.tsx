import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { WifiOff } from 'lucide-react'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileNav } from './MobileNav'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function OfflineBanner() {
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  if (online) return null

  return (
    <div className="flex items-center justify-center gap-2 bg-gold px-4 py-2 text-center text-xs font-semibold text-deep">
      <WifiOff className="h-3.5 w-3.5" />
      Você está offline. O conteúdo já visitado continua disponível em cache.
    </div>
  )
}

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Header />
      <OfflineBanner />
      <main className="flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
