// Salinas Magazine Tour — property 2dfce9de-de4b-57ae-a291-a170c20195cd
export const PROPERTY_UUID = '2dfce9de-de4b-57ae-a291-a170c20195cd' as const

export const APP_NAME = 'Salinas Magazine Tour'
export const APP_SHORT = 'Salinas Tour'
export const CITY = 'Salinas da Margarida'
export const STATE = 'BA'
export const TAGLINE = 'Entre o mar e o rio, a Bahia que respira sal.'

export const PIX_CODE =
  '00020126330014br.gov.bcb.pix0111015619225015204000053039865802BR5921FABIO SILVA DOS ANJOS6009Sao Paulo62290525REC6AF09CB01264A2203363336304C140'
export const PIX_OWNER = 'FABIO SILVA DOS ANJOS'

export const BRAND = {
  deep: '#0A3656',
  tide: '#008B9E',
  sand: '#F8F6F0',
  gold: '#E6C27A',
  coral: '#E05A47',
} as const

export const CONTACT = {
  whatsapp: '5575999990001',
  email: 'contato@salinasmagazinetour.com.br',
  instagram: 'https://www.instagram.com/',
} as const

export const OFFICIAL_LINKS = [
  { label: 'Prefeitura de Salinas da Margarida', url: 'https://www.salinasdamargarida.ba.gov.br/' },
  { label: 'Portal da Transparência', url: 'https://www.salinasdamargarida.ba.gov.br/Site/transparencia' },
  { label: 'Turismo na Bahia', url: 'https://www.bahiatursa.ba.gov.br/' },
  { label: 'IBGE — Salinas da Margarida', url: 'https://cidades.ibge.gov.br/brasil/ba/salinas-da-margarida' },
] as const

export const NAV_LINKS = [
  { label: 'Capa', to: '/' },
  { label: 'Matérias', to: '/materias' },
  { label: 'Turismo', to: '/turismo' },
  { label: 'Comércio', to: '/guia' },
  { label: 'Oportunidades', to: '/oportunidades' },
  { label: 'Contracapa', to: '/contracapa' },
] as const

export const ADMIN_NAV = [
  { label: 'Painel', to: '/admin', end: true },
  { label: 'Edições', to: '/admin/edicoes' },
  { label: 'Matérias', to: '/admin/materias' },
  { label: 'Comerciantes', to: '/admin/comerciantes' },
  { label: 'Turismo', to: '/admin/turismo' },
  { label: 'Oportunidades', to: '/admin/oportunidades' },
  { label: 'Configurações', to: '/admin/configuracoes' },
] as const

export const ARTICLE_CATEGORIES = ['Cultura', 'Gastronomia', 'História', 'Eventos'] as const
export const MERCHANT_CATEGORIES = [
  'Hospedagem',
  'Gastronomia',
  'Passeios',
  'Artesanato',
  'Transporte',
  'Serviços',
] as const
export const MERCHANT_TIERS = ['free', 'highlight', 'sponsor'] as const
export const TOURISM_CATEGORIES = ['Praia', 'Ilha', 'Patrimônio', 'Natureza', 'Cultura'] as const
export const OPPORTUNITY_TYPES = ['job', 'freelancer'] as const
export const OPPORTUNITY_STATUS = ['open', 'closed'] as const
export const AI_PROVIDERS = ['gemini', 'openai'] as const
export const DEPLOY_TARGETS = ['pwa', 'windows_exe'] as const

export const DEMO_EMAIL = 'admin@salinas.tour'
export const DEMO_PASSWORD = 'salinas123'
export const DEMO_SESSION_KEY = 'smt:demo-session'
export const LOCAL_DATA_KEY = 'smt:data:v1'
export const THEME_KEY = 'smt:theme'

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
export const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
