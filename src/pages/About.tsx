import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookHeart,
  Camera,
  Database,
  HeartHandshake,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  WifiOff,
} from 'lucide-react'
import { CONTACT, PIX_OWNER, TAGLINE } from '../config'
import { imageUrl, whatsappLink } from '../lib/utils'
import { PixModal } from '../components/PixModal'

const credits = [
  {
    title: 'Orla de Salinas da Margarida',
    author: 'Sitenl',
    source: 'Wikimedia Commons',
  },
  {
    title: 'Marisqueira em Salinas da Margarida',
    author: 'Ricardo Guabiraba',
    source: 'Panoramio / Wikimedia Commons',
  },
  {
    title: 'Distrito de Cairu',
    author: 'André Santos',
    source: 'Wikimedia Commons',
  },
  {
    title: 'Salinas da Margarida',
    author: 'Tatiana Azeviche / Turismo Bahia',
    source: 'Flickr / Wikimedia Commons',
  },
  {
    title: 'Caranguejo de Salinas da Margarida',
    author: 'Digasalinas',
    source: 'Wikimedia Commons',
  },
  {
    title: 'Vista parcial de Salinas da Margarida',
    author: 'Sérgio Araújo',
    source: 'Wikimedia Commons',
  },
]

const references = [
  { label: 'Prefeitura de Salinas da Margarida', url: 'https://www.salinasdamargarida.ba.gov.br/' },
  { label: 'IBGE — Cidades', url: 'https://cidades.ibge.gov.br/brasil/ba/salinas-da-margarida' },
  {
    label: 'Prodetur Bahia — Plano de Gestão do Turismo',
    url: 'http://www.prodeturbahia.turismo.ba.gov.br/',
  },
]

export function About() {
  const [pixOpen, setPixOpen] = useState(false)

  return (
    <div>
      <section className="container-wide grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow mb-3">Sobre o projeto</p>
          <h1 className="display text-4xl font-bold leading-tight sm:text-6xl">
            Uma revista feita de maré, memória e gente
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">
            O <strong className="text-[var(--text)]">Salinas Magazine Tour</strong> é uma
            publicação digital independente sobre Salinas da Margarida, no Recôncavo Baiano.
            Reúne reportagens, guia turístico, comércio local e oportunidades em um aplicativo
            leve, acessível e disponível offline.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{TAGLINE}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => setPixOpen(true)} className="btn btn-primary">
              <HeartHandshake className="h-4 w-4" />
              Ajude o desenvolvedor
            </button>
            <a
              href={whatsappLink(CONTACT.whatsapp, 'Olá! Vim pelo Salinas Magazine Tour.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com a equipe
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src={imageUrl('/images/vista.jpg')}
            alt="Vista de Salinas da Margarida"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-editorial"
          />
          <div className="absolute -bottom-4 right-4 rounded-xl bg-deep px-4 py-3 text-white sm:right-6">
            <p className="text-[10px] uppercase tracking-widest text-gold">Recôncavo Baiano</p>
            <p className="display text-lg font-bold">Salinas da Margarida</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="container-wide grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookHeart,
              title: 'Editorial independente',
              text: 'Conteúdo produzido com base em fontes públicas, pesquisas e relatos locais.',
            },
            {
              icon: WifiOff,
              title: 'Funciona offline',
              text: 'Aplicativo PWA: depois da primeira visita, o conteúdo fica disponível mesmo sem internet.',
            },
            {
              icon: Database,
              title: 'Dados abertos',
              text: 'Estrutura preparada para Supabase, com gestão editorial e exportação de dados.',
            },
            {
              icon: Sparkles,
              title: 'IA editorial',
              text: 'Assistente para melhorar textos, criar resumos e padronizar anúncios com segurança.',
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="card-flat p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-tide/12 text-tide">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="display mt-3 text-lg font-bold">{item.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="container-wide py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2">
              <Camera className="h-3.5 w-3.5" />
              Créditos de imagem
            </p>
            <h2 className="display text-2xl font-bold">Fotografias</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {credits.map((credit) => (
                <li key={credit.title} className="border-b border-[var(--line)] pb-3">
                  <p className="font-semibold">{credit.title}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {credit.author} · {credit.source}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-[var(--muted)]">
              Imagens utilizadas com finalidade editorial e atribuição. Consulte a página
              original de cada arquivo no Wikimedia Commons para verificar a licença.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              Transparência editorial
            </p>
            <h2 className="display text-2xl font-bold">Fontes e referências</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {references.map((reference) => (
                <li key={reference.url}>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted)] transition hover:text-tide"
                  >
                    {reference.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-[var(--surface-2)] p-5 text-sm leading-relaxed text-[var(--muted)]">
              <p>
                Dados populacionais e econômicos podem variar conforme a fonte e o ano de
                referência. Informações sobre gestão pública devem ser confirmadas nos canais
                oficiais do município.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 rounded-2xl border border-[var(--line)] p-6 sm:p-8 md:grid-cols-[1.4fr_0.6fr] md:items-center">
          <div>
            <p className="eyebrow mb-2">Apoie este projeto</p>
            <h2 className="display text-2xl font-bold sm:text-3xl">
              Ajuda a manter a revista no ar
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
              O projeto é independente e sem fins comerciais. Sua contribuição via PIX ajuda a
              cobrir hospedagem, domínio e o tempo de produção editorial.
            </p>
            <p className="mt-2 text-[11px] text-[var(--muted)]">Favorecido: {PIX_OWNER}</p>
          </div>
          <button
            type="button"
            onClick={() => setPixOpen(true)}
            className="btn btn-primary md:justify-self-end"
          >
            <HeartHandshake className="h-4 w-4" />
            Copiar PIX
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-1.5 transition hover:text-tide"
            >
              <Mail className="h-4 w-4" />
              {CONTACT.email}
            </a>
            <a
              href={whatsappLink(CONTACT.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-tide"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <Link to="/admin" className="text-xs font-semibold text-tide hover:underline">
            Área administrativa
          </Link>
        </div>
      </section>

      <PixModal open={pixOpen} onClose={() => setPixOpen(false)} />
    </div>
  )
}
