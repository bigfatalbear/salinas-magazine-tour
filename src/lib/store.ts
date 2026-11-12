import { LOCAL_DATA_KEY } from '../config'
import { seedDatabase } from '../data/seed'
import type {
  AppSettings,
  Article,
  DataTable,
  Edition,
  Merchant,
  ServiceOpportunity,
  TourismSpot,
} from '../types'
import { supabase } from './supabase'
import { tierWeight } from './utils'

export interface LocalDatabase {
  editions: Edition[]
  articles: Article[]
  merchants: Merchant[]
  tourism_spots: TourismSpot[]
  service_opportunities: ServiceOpportunity[]
  app_settings: AppSettings
}

function cloneSeed(): LocalDatabase {
  return JSON.parse(JSON.stringify(seedDatabase)) as LocalDatabase
}

function loadLocal(): LocalDatabase {
  try {
    const raw = localStorage.getItem(LOCAL_DATA_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LocalDatabase>
      const seed = cloneSeed()
      return {
        editions: parsed.editions ?? seed.editions,
        articles: parsed.articles ?? seed.articles,
        merchants: parsed.merchants ?? seed.merchants,
        tourism_spots: parsed.tourism_spots ?? seed.tourism_spots,
        service_opportunities:
          parsed.service_opportunities ?? seed.service_opportunities,
        app_settings: parsed.app_settings ?? seed.app_settings,
      }
    }
  } catch {
    // corrupted local data falls back to the seed
  }
  const fresh = cloneSeed()
  persistLocal(fresh)
  return fresh
}

function persistLocal(db: LocalDatabase) {
  try {
    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(db))
  } catch {
    // storage can be unavailable in private mode
  }
}

function upsertById<T extends { id: string }>(list: T[], item: T): T[] {
  const index = list.findIndex((entry) => entry.id === item.id)
  if (index === -1) return [item, ...list]
  const next = [...list]
  next[index] = item
  return next
}

function requireSupabase() {
  if (!supabase) throw new Error('Supabase não configurado.')
  return supabase
}

function sortEditions(list: Edition[]) {
  return [...list].sort((a, b) => b.edition_number - a.edition_number)
}

function sortArticles(list: Article[]) {
  return [...list].sort((a, b) => {
    if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
    return a.title.localeCompare(b.title, 'pt-BR')
  })
}

function sortMerchants(list: Merchant[]) {
  return [...list].sort((a, b) => {
    const tier = tierWeight(a.plan_tier) - tierWeight(b.plan_tier)
    if (tier !== 0) return tier
    return a.name.localeCompare(b.name, 'pt-BR')
  })
}

function sortOpportunities(list: ServiceOpportunity[]) {
  return [...list].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

export async function fetchEditions(): Promise<Edition[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .eq('is_published', true)
      .order('edition_number', { ascending: false })
    if (error) throw new Error(error.message)
    return sortEditions((data ?? []) as Edition[])
  }
  return sortEditions(loadLocal().editions.filter((edition) => edition.is_published))
}

export async function fetchAllEditions(): Promise<Edition[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .order('edition_number', { ascending: false })
    if (error) throw new Error(error.message)
    return sortEditions((data ?? []) as Edition[])
  }
  return sortEditions(loadLocal().editions)
}

export async function fetchArticles(): Promise<Article[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('title')
    if (error) throw new Error(error.message)
    return sortArticles((data ?? []) as Article[])
  }
  return sortArticles(loadLocal().articles)
}

export async function fetchMerchants(): Promise<Merchant[]> {
  if (supabase) {
    const { data, error } = await supabase.from('merchants').select('*').order('name')
    if (error) throw new Error(error.message)
    return sortMerchants((data ?? []) as Merchant[])
  }
  return sortMerchants(loadLocal().merchants)
}

export async function fetchTourismSpots(): Promise<TourismSpot[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('tourism_spots')
      .select('*')
      .order('title')
    if (error) throw new Error(error.message)
    return (data ?? []) as TourismSpot[]
  }
  return [...loadLocal().tourism_spots].sort((a, b) =>
    a.title.localeCompare(b.title, 'pt-BR'),
  )
}

export async function fetchOpportunities(
  includeClosed = false,
): Promise<ServiceOpportunity[]> {
  if (supabase) {
    let query = supabase
      .from('service_opportunities')
      .select('*')
      .order('created_at', { ascending: false })
    if (!includeClosed) query = query.eq('status', 'open')
    const { data, error } = await query
    if (error) throw new Error(error.message)
    return sortOpportunities((data ?? []) as ServiceOpportunity[])
  }
  const list = loadLocal().service_opportunities
  return sortOpportunities(
    includeClosed ? list : list.filter((item) => item.status === 'open'),
  )
}

export async function fetchSettings(): Promise<AppSettings> {
  if (supabase) {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .eq('id', 1)
      .single()
    if (error) throw new Error(error.message)
    return data as AppSettings
  }
  return loadLocal().app_settings
}

export async function saveEdition(item: Edition): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('editions').upsert(item)
    if (error) throw new Error(error.message)
    return
  }
  const db = loadLocal()
  db.editions = upsertById(db.editions, item)
  persistLocal(db)
}

export async function saveArticle(item: Article): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('articles').upsert(item)
    if (error) throw new Error(error.message)
    return
  }
  const db = loadLocal()
  db.articles = upsertById(db.articles, item)
  persistLocal(db)
}

export async function saveMerchant(item: Merchant): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('merchants').upsert(item)
    if (error) throw new Error(error.message)
    return
  }
  const db = loadLocal()
  db.merchants = upsertById(db.merchants, item)
  persistLocal(db)
}

export async function saveTourismSpot(item: TourismSpot): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('tourism_spots').upsert(item)
    if (error) throw new Error(error.message)
    return
  }
  const db = loadLocal()
  db.tourism_spots = upsertById(db.tourism_spots, item)
  persistLocal(db)
}

export async function saveOpportunity(item: ServiceOpportunity): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('service_opportunities').upsert(item)
    if (error) throw new Error(error.message)
    return
  }
  const db = loadLocal()
  db.service_opportunities = upsertById(db.service_opportunities, item)
  persistLocal(db)
}

export async function saveSettings(item: AppSettings): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('app_settings').upsert(item)
    if (error) throw new Error(error.message)
    return
  }
  const db = loadLocal()
  db.app_settings = item
  persistLocal(db)
}

export async function deleteRow(table: DataTable, id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw new Error(error.message)
    return
  }
  const db = loadLocal()
  if (table === 'editions') db.editions = db.editions.filter((item) => item.id !== id)
  if (table === 'articles') db.articles = db.articles.filter((item) => item.id !== id)
  if (table === 'merchants') db.merchants = db.merchants.filter((item) => item.id !== id)
  if (table === 'tourism_spots')
    db.tourism_spots = db.tourism_spots.filter((item) => item.id !== id)
  if (table === 'service_opportunities')
    db.service_opportunities = db.service_opportunities.filter((item) => item.id !== id)
  persistLocal(db)
}

export function resetLocalData() {
  localStorage.removeItem(LOCAL_DATA_KEY)
}

export async function exportDatabase(): Promise<string> {
  if (supabase) {
    const client = requireSupabase()
    const [editions, articles, merchants, tourism, opportunities, settings] =
      await Promise.all([
        client.from('editions').select('*'),
        client.from('articles').select('*'),
        client.from('merchants').select('*'),
        client.from('tourism_spots').select('*'),
        client.from('service_opportunities').select('*'),
        client.from('app_settings').select('*'),
      ])
    return JSON.stringify(
      {
        property_id: '2dfce9de-de4b-57ae-a291-a170c20195cd',
        exported_at: new Date().toISOString(),
        editions: editions.data ?? [],
        articles: articles.data ?? [],
        merchants: merchants.data ?? [],
        tourism_spots: tourism.data ?? [],
        service_opportunities: opportunities.data ?? [],
        app_settings: settings.data ?? [],
      },
      null,
      2,
    )
  }
  return JSON.stringify(
    {
      property_id: '2dfce9de-de4b-57ae-a291-a170c20195cd',
      exported_at: new Date().toISOString(),
      ...loadLocal(),
    },
    null,
    2,
  )
}
