# Salinas Magazine Tour

Revista digital, guia turístico e mural de oportunidades de **Salinas da Margarida, Bahia**. O projeto é um PWA instalável, funciona offline depois da primeira visita e inclui um painel editorial com Supabase, assistente de IA e exportação de dados.

- Site: https://bigfatalbear.github.io/salinas-magazine-tour/
- Repositório: https://github.com/bigfatalbear/salinas-magazine-tour
- Property ID: `2dfce9de-de4b-57ae-a291-a170c20195cd`
- Stack: React 19, Vite 8, TypeScript, Tailwind CSS 4, React Router 7, Supabase, vite-plugin-pwa
- Extras: Electron para Windows, Edge Function de IA, PIX para apoio ao desenvolvedor

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Sem variáveis do Supabase, o app entra em **modo demonstração**:

- URL: `/admin/login`
- E-mail: `admin@salinas.tour`
- Senha: `salinas123`
- Dados: salvos em `localStorage` (`smt:data:v1`)

Para restaurar o conteúdo inicial, use **Configurações > Restaurar dados locais**.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
VITE_BASE=/
```

- `VITE_BASE=/` para Vercel ou domínio próprio.
- `VITE_BASE=/salinas-magazine-tour/` para GitHub Pages.
- Nunca use a service role key no frontend.

## Supabase local

Requer Docker e Supabase CLI.

```bash
npx supabase start
npx supabase db reset
npx supabase status
```

`db reset` aplica a migration `supabase/migrations/20261111000000_init.sql` e o seed `supabase/seed.sql`.

O seed SQL é gerado a partir de `src/data/seed.ts`:

```bash
npm run seed:sql
```

### Publicar no Supabase

```bash
npx supabase login
npx supabase link --project-ref SEU_PROJECT_REF
npx supabase db push --remote --include-seed
npx supabase functions deploy ai-assist --project-ref SEU_PROJECT_REF
npx supabase secrets set GEMINI_API_KEY=sua-chave --project-ref SEU_PROJECT_REF
```

Alternativa OpenAI:

```bash
npx supabase secrets set OPENAI_API_KEY=sua-chave --project-ref SEU_PROJECT_REF
```

Crie o usuário administrador em **Authentication > Users** no painel do Supabase. Qualquer usuário autenticado tem acesso editorial, então mantenha o cadastro fechado.

### IA

A função `ai-assist` exige sessão autenticada e valida o usuário antes de chamar o provedor. Ações disponíveis:

- `improve`: reescreve matérias e descrições
- `seo`: gera resumo com até 160 caracteres
- `ad`: cria anúncio comercial
- `test`: testa a conexão com o provedor

A chave do provedor fica nos secrets da Edge Function. O campo `ai_api_key` em `app_settings` existe apenas para compatibilidade e não é usado pela função.

## Painel editorial

Rotas em `/admin`:

- Painel com contadores e status do PWA
- Edições com capa, destaques e contracapa
- Matérias com destaque, categoria e edição
- Comerciantes com planos e cupom
- Turismo
- Oportunidades
- Configurações, backup JSON e exportação

O painel usa Supabase Auth em produção e sessão local no modo demonstração.

## Build e deploy

```bash
npm run build
npm run preview
```

O `postbuild` cria `dist/404.html` para fallback de rotas no GitHub Pages.

### GitHub Pages

O deploy usa a branch `gh-pages`:

```bash
npm run deploy:pages
```

O script compila com `VITE_BASE=/salinas-magazine-tour/` e publica `dist` na branch `gh-pages`. Em **Settings > Pages**, use **Deploy from a branch**, branch `gh-pages`, pasta `/ (root)`. O `postbuild` cria `404.html` e `.nojekyll`.

### Vercel

Importe o repositório. O `vercel.json` configura SPA fallback, cache de assets e do service worker.

## Aplicativo Windows

```bash
npm run build:electron
npm run dist:win
```

O instalador NSIS é gerado em `release/`. O Electron carrega `dist/index.html` e usa `HashRouter` quando aberto via `file://`.

Para testar com o servidor Vite:

```powershell
$env:ELECTRON_START_URL="http://localhost:5173"
npm run electron
```

## Estrutura

```text
src/
  components/      UI, layout público e painel
  context/         tema, autenticação, configurações, toasts
  data/seed.ts     conteúdo editorial inicial
  hooks/           loaders e integração com IA
  lib/             Supabase, store local/remoto, utilitários e IA
  pages/           páginas públicas
  pages/admin/     painel editorial
supabase/
  migrations/      schema, RLS, storage e triggers
  seed.sql         conteúdo inicial gerado
  functions/       Edge Function ai-assist
electron/          main e preload do app Windows
scripts/           ícones, seed SQL e pós-build
```

## Dados e privacidade

- Leitores anônimos só acessam edições publicadas, matérias publicadas, comércio, turismo e oportunidades abertas.
- Configurações e operações de escrita exigem autenticação.
- O backup JSON inclui o Property ID e todos os dados editoriais.
- O PIX apoia o desenvolvedor e não é cobrado pelo uso do site.

## Créditos

Imagens editoriais do Wikimedia Commons:

- Orla de Salinas da Margarida — Sitenl
- Marisqueira em Salinas da Margarida — Ricardo Guabiraba
- Distrito de Cairu — André Santos
- Salinas da Margarida — Tatiana Azeviche / Turismo Bahia
- Caranguejo de Salinas da Margarida — Digasalinas
- Vista parcial de Salinas da Margarida — Sérgio Araújo

Consulte a página original de cada arquivo no Wikimedia Commons para verificar a licença e a atribuição completa. A página `/sobre` repete os créditos no aplicativo.

Referências editoriais: Prefeitura de Salinas da Margarida, IBGE, Bahiatursa/Setur-BA e pesquisas públicas sobre o Recôncavo Baiano.

Conteúdo, marca e desenvolvimento: Salinas Magazine Tour.
