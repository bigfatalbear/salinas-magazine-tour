import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

type AiAction = 'improve' | 'seo' | 'ad' | 'test'

const prompts: Record<AiAction, string> = {
  improve:
    'Você é editor de uma revista sobre Salinas da Margarida, Bahia. Reescreva o texto mantendo os fatos e o sentido, com português brasileiro claro, envolvente e editorial. Preserve parágrafos e subtítulos em Markdown. Responda somente com o texto final, sem comentários.',
  seo:
    'Crie um resumo otimizado para SEO sobre o texto recebido. O resultado deve ter no máximo 160 caracteres, tom jornalístico, mencionar Salinas da Margarida quando fizer sentido e ser uma única frase. Responda somente com a frase final.',
  ad:
    'Transforme as informações recebidas em um anúncio comercial curto para um guia de Salinas da Margarida. Use português brasileiro, tom acolhedor, no máximo 600 caracteres, com chamada para ação pelo WhatsApp. Responda somente com o anúncio final.',
  test:
    'Responda somente com a frase: Assistente editorial online.',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function callGemini(apiKey: string, model: string, prompt: string, text: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${prompt}\n\n---\n\n${text}` }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    },
  )

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const message =
      payload?.error?.message ?? `Falha na API Gemini (${response.status}).`
    throw new Error(message)
  }

  const output = payload?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? '')
    .join('')
    .trim()

  if (!output) throw new Error('A IA não retornou conteúdo.')
  return output as string
}

async function callOpenAI(apiKey: string, model: string, prompt: string, text: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      max_tokens: 2048,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text },
      ],
    }),
  })

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const message =
      payload?.error?.message ?? `Falha na API OpenAI (${response.status}).`
    throw new Error(message)
  }

  const output = payload?.choices?.[0]?.message?.content?.trim()
  if (!output) throw new Error('A IA não retornou conteúdo.')
  return output as string
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (request.method !== 'POST') {
    return json({ error: 'Método não permitido.' }, 405)
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const authorization = request.headers.get('Authorization') ?? ''

    if (!supabaseUrl || !anonKey) {
      return json({ error: 'Supabase não configurado na função.' }, 500)
    }
    if (!authorization) {
      return json({ error: 'Faça login para usar o assistente.' }, 401)
    }

    const client = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
    })
    const { data: auth, error: authError } = await client.auth.getUser()
    if (authError || !auth.user) {
      return json({ error: 'Sessão inválida ou expirada.' }, 401)
    }

    const body = await request.json().catch(() => null)
    const action = body?.action as AiAction
    const text = String(body?.text ?? '').trim()
    const context = String(body?.context ?? '').trim().slice(0, 2000)

    if (!['improve', 'seo', 'ad', 'test'].includes(action)) {
      return json({ error: 'Ação inválida.' }, 400)
    }
    if (action !== 'test' && !text) {
      return json({ error: 'Envie um texto para a IA.' }, 400)
    }
    if (text.length > 12000) {
      return json({ error: 'Texto muito longo. Limite de 12.000 caracteres.' }, 400)
    }

    const { data: settings } = await client
      .from('app_settings')
      .select('ai_provider, ai_model')
      .eq('id', 1)
      .maybeSingle()

    const provider =
      settings?.ai_provider ?? Deno.env.get('AI_PROVIDER') ?? 'gemini'
    const model =
      settings?.ai_model ||
      Deno.env.get('AI_MODEL') ||
      (provider === 'openai' ? 'gpt-4o-mini' : 'gemini-2.5-flash')

    const prompt = prompts[action]
    const composed = [text, context ? `Contexto adicional: ${context}` : '']
      .filter(Boolean)
      .join('\n\n')

    const apiKey =
      provider === 'openai'
        ? Deno.env.get('OPENAI_API_KEY')
        : Deno.env.get('GEMINI_API_KEY')

    if (!apiKey) {
      return json(
        {
          error: `Configure o secret ${provider === 'openai' ? 'OPENAI_API_KEY' : 'GEMINI_API_KEY'} na Edge Function.`,
        },
        503,
      )
    }

    const output =
      provider === 'openai'
        ? await callOpenAI(apiKey, model, prompt, composed)
        : await callGemini(apiKey, model, prompt, composed)

    return json({ text: output, provider, model })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro inesperado.'
    return json({ error: message }, 500)
  }
})
