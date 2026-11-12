import { useCallback, useState } from 'react'
import { runAiAssist, type AiAction } from '../lib/ai'
import { useToast } from '../context/ToastContext'

export function useAiAssist() {
  const { toast } = useToast()
  const [pending, setPending] = useState<AiAction | null>(null)

  const run = useCallback(
    async (action: AiAction, text: string) => {
      if (action !== 'test' && !text.trim()) {
        toast('Escreva um texto antes de usar a IA.', 'info')
        return null
      }
      setPending(action)
      try {
        const result = await runAiAssist(action, text)
        toast(action === 'test' ? 'Conexão com a IA funcionando.' : 'Texto gerado pela IA.')
        return result
      } catch (err) {
        toast(err instanceof Error ? err.message : 'Falha na IA.', 'error')
        return null
      } finally {
        setPending(null)
      }
    },
    [toast],
  )

  return { pending, run }
}
