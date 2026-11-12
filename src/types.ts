export type ArticleCategory = 'Cultura' | 'Gastronomia' | 'História' | 'Eventos'
export type MerchantTier = 'free' | 'highlight' | 'sponsor'
export type OpportunityType = 'job' | 'freelancer'
export type OpportunityStatus = 'open' | 'closed'
export type AiProvider = 'gemini' | 'openai'
export type DeployTarget = 'pwa' | 'windows_exe'

export interface CoverHighlight {
  title: string
  subtitle: string
}

export interface CtaLink {
  label: string
  url: string
}

export interface Edition {
  id: string
  title: string
  edition_number: number
  published_at: string
  is_published: boolean
  cover_image_url: string
  cover_headline: string
  cover_highlights: CoverHighlight[]
  backcover_title: string
  backcover_image_url: string
  backcover_content: string
  backcover_cta_links: CtaLink[]
}

export interface Article {
  id: string
  edition_id: string
  title: string
  subtitle: string
  content: string
  category: ArticleCategory
  author: string
  image_url: string
  is_featured: boolean
}

export interface Merchant {
  id: string
  name: string
  category: string
  description: string
  whatsapp: string
  maps_url: string
  opening_hours: string
  coupon_code: string
  logo_url: string
  plan_tier: MerchantTier
}

export interface TourismSpot {
  id: string
  title: string
  category: string
  description: string
  history_text: string
  location_name: string
  maps_url: string
  image_url: string
}

export interface ServiceOpportunity {
  id: string
  type: OpportunityType
  title: string
  category: string
  description: string
  contact_whatsapp: string
  status: OpportunityStatus
  created_at: string
}

export interface AppSettings {
  id: number
  storage_path: string
  deploy_target: DeployTarget
  ai_provider: AiProvider
  ai_api_key: string
  ai_model: string
  updated_at: string
}

export type DataTable =
  | 'editions'
  | 'articles'
  | 'merchants'
  | 'tourism_spots'
  | 'service_opportunities'
  | 'app_settings'

export interface DemoSession {
  email: string
  id: string
  demo: true
}

export interface AdminUser {
  id: string
  email: string
  demo: boolean
}
