export interface PopulationPoint {
  year: string
  value: number
  kind: 'Censo' | 'Estimativa'
}

export interface AgeGroup {
  label: string
  value: number
}

export interface ServicePoint {
  label: string
  value: number
  detail: string
}

export const IBGE_POPULATION: PopulationPoint[] = [
  { year: '1991', value: 8891, kind: 'Censo' },
  { year: '2000', value: 10377, kind: 'Censo' },
  { year: '2010', value: 13456, kind: 'Censo' },
  { year: '2022', value: 14987, kind: 'Censo' },
  { year: '2026', value: 15685, kind: 'Estimativa' },
]

export const IBGE_AGE_GROUPS: AgeGroup[] = [
  { label: '0 a 9', value: 1996 },
  { label: '10 a 19', value: 2403 },
  { label: '20 a 29', value: 1993 },
  { label: '30 a 39', value: 2169 },
  { label: '40 a 49', value: 2358 },
  { label: '50 a 59', value: 1768 },
  { label: '60 a 69', value: 1290 },
  { label: '70 a 79', value: 710 },
  { label: '80 a 89', value: 248 },
  { label: '90+', value: 52 },
]

export const IBGE_HOUSEHOLDS: ServicePoint[] = [
  {
    label: 'Água da rede geral',
    value: 98.2,
    detail: 'dos domicílios usam água da rede geral',
  },
  {
    label: 'Lixo coletado',
    value: 98.8,
    detail: 'dos domicílios têm o lixo coletado',
  },
  {
    label: 'Esgoto adequado',
    value: 23.1,
    detail: 'dos domicílios têm rede geral, pluvial ou fossa ligada à rede',
  },
]

export const IBGE_RACE = [
  { label: 'Preta', value: 47.1 },
  { label: 'Parda', value: 47.7 },
  { label: 'Branca', value: 5.0 },
  { label: 'Amarela e indígena', value: 0.2 },
]

export const IBGE_STATS = [
  { value: '14.987', label: 'pessoas no Censo 2022' },
  { value: '15.685', label: 'estimativa para 2026' },
  { value: '99,54', label: 'hab/km² em 2022' },
  { value: '150,569', label: 'km² de território' },
]

export const IBGE_SECONDARY = [
  { value: '0,617', label: 'IDHM (2010)' },
  { value: 'R$ 16.686,50', label: 'PIB per capita (2023)' },
  { value: '35,0 anos', label: 'idade mediana (2022)' },
  { value: '99,78%', label: 'escolarização de 6 a 14 anos (2022)' },
]

export const IBGE_INSIGHTS = [
  '96,8% da população vive na área urbana; o rural reúne 477 pessoas.',
  '23,1% dos domicílios têm esgoto adequado — 76,9% ainda não têm.',
  'A população cresceu 68,6% desde 1991, quando havia 8.891 moradores.',
  '21,2% dos moradores têm até 14 anos; 15,3% têm 60 anos ou mais.',
]

export const IBGE_SOURCES = [
  {
    label: 'IBGE Cidades — Salinas da Margarida',
    url: 'https://cidades.ibge.gov.br/brasil/ba/salinas-da-margarida',
  },
  {
    label: 'IBGE — Censo Demográfico 2022',
    url: 'https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html',
  },
  {
    label: 'IBGE — Estimativas de população',
    url: 'https://www.ibge.gov.br/estatisticas/sociais/populacao/9103-estimativas-de-populacao.html',
  },
]

