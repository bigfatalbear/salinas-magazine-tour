import { useState } from 'react'
import { Check, Copy, HeartHandshake } from 'lucide-react'
import { PIX_CODE, PIX_OWNER } from '../config'
import { useToast } from '../context/ToastContext'
import { Modal } from './Modal'

export function PixModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(PIX_CODE)
    } catch {
      const area = document.createElement('textarea')
      area.value = PIX_CODE
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(true)
    toast('Código PIX copiado. Obrigado pelo apoio!')
    window.setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Ajude o desenvolvedor"
      description="Este projeto é independente. Sua contribuição ajuda a manter a revista digital, o guia e a estrutura do aplicativo."
      size="sm"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-2)] p-4">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-coral text-white">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">PIX Copia e Cola</p>
            <p className="text-xs text-[var(--muted)]">Favorecido: {PIX_OWNER}</p>
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="pix-code">
            Código PIX
          </label>
          <textarea
            id="pix-code"
            readOnly
            value={PIX_CODE}
            rows={4}
            onFocus={(event) => event.currentTarget.select()}
            className="input font-mono text-[11px] leading-relaxed"
          />
        </div>

        <button
          type="button"
          onClick={() => void copyPix()}
          className={`btn w-full ${copied ? 'btn-tide' : 'btn-primary'}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Código copiado' : 'Copiar código PIX'}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-[var(--muted)]">
          Abra o aplicativo do seu banco, escolha PIX por copia e cola e cole o código acima.
          Qualquer valor é bem-vindo.
        </p>
      </div>
    </Modal>
  )
}
