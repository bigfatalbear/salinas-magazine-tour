import { supabase } from './supabase'

export type AiAction = 'improve' | 'seo' | 'ad' | 'test'

interface AiResponse {
  text?: string
  error?: string
}

export async function runAiAssist(
  action: AiAction,
  text: string,
  context?: string,
): Promise<string> {
  if (!supabase) {
    throw new Error(
      'A IA precisa do Supabase configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY e publique a Edge Function ai-assist.',
    )
  }

  const { data, error } = await supabase.functions.invoke<AiResponse>('ai-assist', {
    body: { action, text, context },
  })

  if (error) {
    throw new Error(error.message || 'Falha ao chamar o assistente de IA.')
  }
  if (data?.error) throw new Error(data.error)
  const result = data?.text?.trim()
  if (!result) throw new Error('A IA não retornou texto.')
  return result
}
