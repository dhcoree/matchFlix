# TODO — Infraestrutura e Deploy do MatchFlix

## Contas a criar
- [ ] Vercel (deploy do frontend)
- [ ] Supabase (banco de dados / auth)
- [ ] Resend (envio de e-mails)
- [ ] Domínio na GoDaddy (ex: matchflix.com / .app)

## CLIs a instalar e autenticar
- [ ] Vercel CLI (`npm i -g vercel` + `vercel login`)
- [ ] Supabase CLI (`npm i -g supabase` + `supabase login`)
- [ ] Resend CLI / API key (Resend não tem CLI oficial, usar API key)
- [ ] GitHub CLI (`gh auth login`)

## Configuração
- [ ] Apontar DNS do domínio (GoDaddy) para Vercel
- [ ] Configurar domínio customizado no projeto Vercel
- [ ] Criar projeto no Supabase e copiar `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
- [ ] Configurar domínio de envio (DNS) no Resend
- [ ] Adicionar variáveis de ambiente no Vercel (TMDB, Supabase, Resend)
- [ ] Conectar repositório do GitHub ao Vercel para deploy automático

> Guia passo a passo em [`docs/SETUP_GUIDE.md`](docs/SETUP_GUIDE.md). Depois de criar as contas e o domínio, peça para o Claude Code configurar o restante via CLI (envs, deploy, DNS, etc).
