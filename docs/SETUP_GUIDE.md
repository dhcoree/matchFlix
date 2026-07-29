# Guia de Configuração — MatchFlix

Este guia cobre o que **você precisa fazer manualmente** (criar contas, comprar domínio,
gerar chaves) e o que pode ser feito **via CLI com a ajuda do Claude Code** depois.

---

## 1. Contas a criar (manual, no navegador)

| Serviço  | Link                                  | Para que serve                              |
|----------|---------------------------------------|----------------------------------------------|
| Vercel   | https://vercel.com/signup             | Hospedagem/deploy do frontend (Vite/React)   |
| Supabase | https://supabase.com/dashboard         | Banco de dados, auth (Google/GitHub login)   |
| Resend   | https://resend.com/signup             | Envio de e-mails (convites, notificações)    |
| GoDaddy  | https://www.godaddy.com                | Compra do domínio (ex: matchflix.com)        |

Dica: crie todas as contas com o mesmo e-mail para facilitar.

Depois de criado o projeto Supabase, anote:
- `Project URL` (ex: `https://xxxx.supabase.co`)
- `anon public key`
(estão em Project Settings → API)

---

## 2. Comprar e configurar o domínio (GoDaddy)

1. Compre o domínio na GoDaddy (ex: `matchflix.com.br`, `matchflix.app`).
2. **Não precisa configurar DNS manualmente agora** — depois de criar o projeto no
   Vercel, o Claude pode te dar os registros exatos (CNAME/A) para colar no painel de
   DNS da GoDaddy (GoDaddy → "Meus Produtos" → domínio → "DNS" → "Gerenciar").
3. Se for usar o Resend para enviar e-mails com o seu domínio, ele também vai pedir
   registros DNS (SPF, DKIM, DMARC) — mesma lógica: copiar do Resend para a GoDaddy.

---

## 3. Instalar e autenticar as CLIs

Rode estes comandos no terminal (PowerShell). Após o login, o Claude Code consegue
usar essas CLIs para configurar o resto do projeto.

```powershell
# Vercel CLI
npm install -g vercel
vercel login

# Supabase CLI
npm install -g supabase
supabase login

# GitHub CLI
winget install --id GitHub.cli
gh auth login
```

> Resend não tem CLI oficial. Em vez disso, gere uma **API Key** em
> https://resend.com/api-keys e guarde — o Claude vai usar essa key para configurar
> o domínio de envio e adicionar a variável de ambiente no Vercel.

---

## 4. O que o Claude pode fazer depois (via CLI)

Quando as contas/CLIs acima estiverem prontas, peça ao Claude Code para:

1. **Linkar o projeto ao Vercel** (`vercel link`) e fazer o primeiro deploy
   (`vercel --prod`).
2. **Adicionar as variáveis de ambiente** no Vercel a partir do `.env`:
   - `VITE_TMDB_API_KEY`, `VITE_TMDB_BASE_URL`, `VITE_TMDB_IMAGE_BASE_URL`
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY` (se for usado em alguma função/backend)
3. **Configurar o domínio customizado** no Vercel (`vercel domains add seudominio.com`)
   e te passar os registros DNS exatos para colar na GoDaddy.
4. **Configurar o Supabase** via `supabase link` / `supabase db push` (migrations,
   se o projeto tiver), e ativar os providers de login (Google/GitHub) no painel
   ou via API.
5. **Configurar o domínio no Resend** (`resend domains` via API) e te passar os
   registros DNS de SPF/DKIM/DMARC para a GoDaddy.
6. **Conectar o repositório do GitHub ao Vercel** para deploy automático em cada push
   (`vercel git connect` ou via dashboard).

---

## 5. Checklist resumido

- [ ] Criar contas: Vercel, Supabase, Resend, GoDaddy
- [ ] Comprar domínio na GoDaddy
- [ ] Instalar e logar nas CLIs: `vercel`, `supabase`, `gh`
- [ ] Gerar API key do Resend
- [ ] Copiar `Project URL` e `anon key` do Supabase
- [ ] Pedir ao Claude para: linkar Vercel, configurar envs, apontar domínio (DNS),
      configurar Supabase e Resend, conectar GitHub → Vercel
