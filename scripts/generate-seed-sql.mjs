import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { seedDatabase } from '../src/data/seed.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const target = resolve(root, 'supabase/seed.sql')

function q(value) {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'object') return `${q(JSON.stringify(value))}::jsonb`
  return `'${String(value).replaceAll("'", "''")}'`
}

function insert(table, rows, columns, conflict = 'do nothing') {
  if (!rows.length) return ''
  const values = rows
    .map((row) => `  (${columns.map((column) => q(row[column])).join(', ')})`)
    .join(',\n')
  return `insert into ${table} (${columns.join(', ')}) values\n${values}\non conflict ${conflict};\n`
}

const chunks = [
  '-- Seed editorial do Salinas Magazine Tour',
  '-- property 2dfce9de-de4b-57ae-a291-a170c20195cd',
  '-- Gerado por scripts/generate-seed-sql.mjs a partir de src/data/seed.ts',
  '',
  insert(
    'editions',
    seedDatabase.editions,
    [
      'id',
      'title',
      'edition_number',
      'published_at',
      'is_published',
      'cover_image_url',
      'cover_headline',
      'cover_highlights',
      'backcover_title',
      'backcover_image_url',
      'backcover_content',
      'backcover_cta_links',
    ],
  ),
  insert('articles', seedDatabase.articles, [
    'id',
    'edition_id',
    'title',
    'subtitle',
    'content',
    'category',
    'author',
    'image_url',
    'is_featured',
  ]),
  insert('merchants', seedDatabase.merchants, [
    'id',
    'name',
    'category',
    'description',
    'whatsapp',
    'maps_url',
    'opening_hours',
    'coupon_code',
    'logo_url',
    'plan_tier',
  ]),
  insert('tourism_spots', seedDatabase.tourism_spots, [
    'id',
    'title',
    'category',
    'description',
    'history_text',
    'location_name',
    'maps_url',
    'image_url',
  ]),
  insert('service_opportunities', seedDatabase.service_opportunities, [
    'id',
    'type',
    'title',
    'category',
    'description',
    'contact_whatsapp',
    'status',
    'created_at',
  ]),
  insert(
    'app_settings',
    [seedDatabase.app_settings],
    [
      'id',
      'storage_path',
      'deploy_target',
      'ai_provider',
      'ai_api_key',
      'ai_model',
      'updated_at',
    ],
    '(id) do update set storage_path = excluded.storage_path, deploy_target = excluded.deploy_target, ai_provider = excluded.ai_provider, ai_model = excluded.ai_model, updated_at = excluded.updated_at',
  ),
]

mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, `${chunks.filter(Boolean).join('\n')}\n`, 'utf8')
console.log(`seed.sql gerado com ${seedDatabase.articles.length} matérias.`)
