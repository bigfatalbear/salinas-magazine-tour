import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, HeartHandshake, Mail, MessageCircle } from 'lucide-react'
import { CONTACT, NAV_LINKS, OFFICIAL_LINKS, PROPERTY_UUID, TAGLINE } from '../config'
import { whatsappLink } from '../lib/utils'
import { Logo } from './Logo'
import { PixModal } from './PixModal'

const YEAR = new Date().getFullYear()

export function Footer() {
  const [pixOpen, setPixOpen] = useState(false)

  return (
    <footer
      className="mt-20 border-t border-[var(--line)] bg-[var(--surface)]"
      data-property-id={PROPERTY_UUID}
    >
      <div className="container-wide grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            {TAGLINE} Uma publicação digital independente sobre cultura, turismo, gastronomia e
            a vida de Salinas da Margarida, no Recôncavo Baiano.
          </p>
          <button
            type="button"
            onClick={() => setPixOpen(true)}
            className="btn btn-primary mt-5"
          >
            <HeartHandshake className="h-4 w-4" />
            Ajude o desenvolvedor
          </button>
        </div>

        <div>
          <h3 className="eyebrow mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-tide">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/sobre" className="transition hover:text-tide">
                Sobre e créditos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-3">Canais oficiais</h3>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            {OFFICIAL_LINKS.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-tide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="eyebrow mb-3 mt-6">Contato</h3>
          <div className="flex gap-2">
            <a
              href={whatsappLink(CONTACT.whatsapp, 'Olá! Vim pelo Salinas Magazine Tour.')}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-tide hover:text-tide"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-tide hover:text-tide"
              aria-label="E-mail"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-tide hover:text-tide"
              aria-label="Instagram"
            >
              <Camera className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="container-wide flex flex-col gap-2 py-5 text-[11px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} Salinas Magazine Tour. Conteúdo editorial independente.
          </p>
          <p>
            Fotos: Turismo Bahia / Tatiana Azeviche, Ricardo Guabiraba e acervo Wikimedia Commons.
          </p>
        </div>
      </div>

      <PixModal open={pixOpen} onClose={() => setPixOpen(false)} />
    </footer>
  )
}
