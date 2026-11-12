import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'
import { PublicLayout } from './components/PublicLayout'
import { AdminLayout } from './components/AdminLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Articles } from './pages/Articles'
import { ArticleDetail } from './pages/ArticleDetail'
import { Guide } from './pages/Guide'
import { Tourism } from './pages/Tourism'
import { Opportunities } from './pages/Opportunities'
import { Backcover } from './pages/Backcover'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import { AdminLogin } from './pages/admin/AdminLogin'
import { Dashboard } from './pages/admin/Dashboard'
import { AdminEditions } from './pages/admin/AdminEditions'
import { AdminArticles } from './pages/admin/AdminArticles'
import { AdminMerchants } from './pages/admin/AdminMerchants'
import { AdminTourism } from './pages/admin/AdminTourism'
import { AdminOpportunities } from './pages/admin/AdminOpportunities'
import { AdminSettings } from './pages/admin/AdminSettings'

const rawBase = import.meta.env.BASE_URL
const basename = rawBase.startsWith('/')
  ? rawBase.replace(/\/$/, '') || undefined
  : undefined
const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:'
const Router = isFileProtocol ? HashRouter : BrowserRouter

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router basename={isFileProtocol ? undefined : basename}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="materias" element={<Articles />} />
                <Route path="materias/:id" element={<ArticleDetail />} />
                <Route path="guia" element={<Guide />} />
                <Route path="turismo" element={<Tourism />} />
                <Route path="oportunidades" element={<Opportunities />} />
                <Route path="contracapa" element={<Backcover />} />
                <Route path="sobre" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="admin/login" element={<AdminLogin />} />

              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <SettingsProvider>
                      <AdminLayout />
                    </SettingsProvider>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="edicoes" element={<AdminEditions />} />
                <Route path="materias" element={<AdminArticles />} />
                <Route path="comerciantes" element={<AdminMerchants />} />
                <Route path="turismo" element={<AdminTourism />} />
                <Route path="oportunidades" element={<AdminOpportunities />} />
                <Route path="configuracoes" element={<AdminSettings />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
