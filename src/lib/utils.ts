export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function imageUrl(path?: string | null) {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  if (path.startsWith(base)) return path
  return `${base}${path.replace(/^\/+/, '')}`
}

export function formatDate(value?: string | null, opts?: Intl.DateTimeFormatOptions) {
  if (!value) return ''
  const date = value.length === 10 ? new Date(`${value}T12:00:00`) : new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    ...opts,
  })
}

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function onlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

export function whatsappLink(number: string, message?: string) {
  const digits = onlyDigits(number)
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}

export function mapsSearch(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function tierLabel(tier: string) {
  if (tier === 'sponsor') return 'Patrocinador'
  if (tier === 'highlight') return 'Destaque'
  return 'Parceiro'
}

export function tierWeight(tier: string) {
  if (tier === 'sponsor') return 0
  if (tier === 'highlight') return 1
  return 2
}

export function truncate(value: string, max = 160) {
  if (value.length <= max) return value
  return `${value.slice(0, max - 1).trimEnd()}…`
}

export function parseLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function todayIso() {
  return new Date().toISOString()
}

export function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`
}
