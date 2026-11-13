export interface District {
  slug: string
  name: string
  kind: 'Distrito' | 'Povoado'
  tagline: string
  description: string
  image_url: string
  image_alt: string
  highlights: string[]
  festivities: string[]
}

export const DISTRICTS: District[] = [
  {
    slug: 'dende-porto-da-telha',
    name: 'Dendê (Porto da Telha)',
    kind: 'Distrito',
    tagline: 'O porto onde o sal virou memória',
    description:
      'Também chamado de Porto da Telha, o distrito fica na ponta da Margarida, área ligada ao aldeamento que cresceu com as salinas inauguradas em 1881. A industrialização do sal atraiu trabalhadores e ajudou a formar o povoado que daria origem à cidade. Hoje, a vida gira em torno da pesca artesanal, da praia de mar calmo e das festas de pescador.',
    image_url: '/images/orla.jpg',
    image_alt: 'Orla e casas de Salinas da Margarida vistas da baía',
    highlights: [
      'Praia de Porto da Telha',
      'Memória salineira de 1881',
      'Pesca artesanal e canoas',
      'Pôr do sol na Baía de Todos-os-Santos',
    ],
    festivities: [
      'Festa dos Pescadores — 2 de janeiro',
      'Festejo de São Pedro — 29 de junho',
      'Levada do Caboclo — 1º de julho',
    ],
  },
  {
    slug: 'encarnacao',
    name: 'Encarnação',
    kind: 'Distrito',
    tagline: 'O marco mais antigo da colonização',
    description:
      'Um dos núcleos habitacionais mais antigos da região, anterior à criação das salinas. A Igreja de Nossa Senhora da Encarnação, erguida no século XVII — registros apontam 1620 —, é considerada o primeiro marco colonizador edificado na área. O distrito reúne praia, manguezal, vida de pescador e uma forte tradição religiosa.',
    image_url: '/images/vista.jpg',
    image_alt: 'Vista aérea da área urbana e do manguezal de Salinas da Margarida',
    highlights: [
      'Igreja de Nossa Senhora da Encarnação',
      'Praia da Encarnação',
      'Manguezal e pesca artesanal',
      'Micareta de Encarnação',
    ],
    festivities: [
      'Nossa Senhora da Encarnação — 25 de março',
      'Micareta de Encarnação — abril',
    ],
  },
  {
    slug: 'conceicao-de-salinas',
    name: 'Conceição de Salinas',
    kind: 'Distrito',
    tagline: 'O mangue, a maré e a mesa',
    description:
      'Comunidade tradicional e pesqueira, concentra grande parte das marisqueiras e pescadores do município. A Igreja de Nossa Senhora da Conceição, do fim do século XVII, é um dos patrimônios mais importantes da região. A economia se baseia na pesca artesanal, na mariscagem e no turismo de base comunitária. É lugar de moqueca de chumbinho, de conversa na beira da praia e de festas de santo.',
    image_url: '/images/marisqueira.jpg',
    image_alt: 'Marisqueira trabalhando no manguezal de Salinas da Margarida',
    highlights: [
      'Igreja de Nossa Senhora da Conceição',
      'Mariscagem no manguezal',
      'Moqueca de chumbinho',
      'Praia de mar calmo e orla pavimentada',
    ],
    festivities: [
      'Bordejo de canoas — 1º de janeiro',
      'Festa de Nossa Senhora de Conceição',
      'Penitência de São Roque',
      'Conceição Fest — último domingo de janeiro',
      'Arraiá da Maçambê — junho',
      'Festejo de São Pedro — 29 de junho',
    ],
  },
  {
    slug: 'cairu',
    name: 'Cairu',
    kind: 'Distrito',
    tagline: 'A vila de pescadores entre a praia e o rio',
    description:
      'Distrito pesqueiro na costa da baía, com orla urbanizada e trechos mais desertos. Na maré baixa, os barcos encalham na areia e um pequeno rio encontra o mar, criando uma paisagem típica. Cairu mantém o ritmo das comunidades de pesca e suas festas religiosas. Não confundir com o município de Cairu, na Ilha de Tinharé, onde fica Morro de São Paulo.',
    image_url: '/images/cairu.jpg',
    image_alt: 'Praia e vila de pescadores em Cairu, Salinas da Margarida',
    highlights: [
      'Praia de Cairu',
      'Barcos de pesca artesanal',
      'Foz do rio e trechos desertos',
      'Festa de Deus Menino',
    ],
    festivities: [
      'Festa de Deus Menino — segundo domingo de janeiro',
    ],
  },
  {
    slug: 'barra-do-paraguacu',
    name: 'Barra do Paraguaçu',
    kind: 'Povoado',
    tagline: 'Onde o rio Paraguaçu encontra a baía',
    description:
      'Povoado na foz do Paraguaçu, no extremo norte do município, na divisa com Maragogipe. Além da paisagem de rio e mar, guarda memória da Independência da Bahia: em abril de 1823, Maria Quitéria e um grupo de mulheres teriam impedido o desembarque de tropas portuguesas na localidade. O memorial e o farol são pontos de referência, e o passeio de barco revela a dimensão do encontro entre o rio e a Baía de Todos-os-Santos.',
    image_url: '/images/praia.jpg',
    image_alt: 'Praia de mar calmo na foz do rio Paraguaçu',
    highlights: [
      'Foz do rio Paraguaçu',
      'Praias da Barra e Pedra Mole',
      'Memorial a Maria Quitéria',
      'Farol e passeios de barco',
    ],
    festivities: [
      'Celebrações religiosas e festas de verão',
    ],
  },
]

export const DISTRICT_SOURCES = [
  {
    label: 'Prefeitura de Salinas da Margarida — Dados municipais',
    url: 'https://www.salinasdamargarida.ba.gov.br/site/dadosmunicipais',
  },
  {
    label: 'Prodetur Bahia — Inventário da Oferta Turística',
    url: 'http://www.prodeturbahia.turismo.ba.gov.br/wp-content/uploads/2020/08/FIBTS_PGMT_SALINAS_DA_MARGARIDA_VR2704_FINAL.pdf',
  },
  {
    label: 'IBGE — Salinas da Margarida',
    url: 'https://cidades.ibge.gov.br/brasil/ba/salinas-da-margarida',
  },
  {
    label: 'Wikipédia — Salinas da Margarida',
    url: 'https://pt.wikipedia.org/wiki/Salinas_da_Margarida',
  },
]
