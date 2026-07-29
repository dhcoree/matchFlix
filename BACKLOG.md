# Backlog — Ideias de Produto

## Recomendações inteligentes (descobrir / swipe)

- **Não repetir filmes já decididos**: ao montar a fila do `Discover`
  (`src/pages/Discover/index.tsx`, hoje usa `usePopular()` direto), filtrar fora
  os filmes que já estão na watchlist (`useWatchlistStore`) e os que já foram
  "rejeitados" (precisa guardar um histórico de IDs vistos/rejeitados, hoje não existe).

- **Mix por gênero e ano**: em vez de só `usePopular()`, gerar a fila combinando
  vários `discover` da TMDB (`useMovies.ts` já tem `movieKeys.discover`) com
  filtros de `with_genres` e `primary_release_year`, intercalando resultados para
  variar gênero/década a cada poucos cards.

- **Manter "Novidades" e "Tendências" como estão**: as seções de `usePopular`/
  `useTrending` (Home/RecommendationRail) continuam mostrando o que é novo/em
  alta na TMDB, sem aplicar o filtro de personalização — só o `Discover` (modo
  swipe) recebe o mix personalizado.

- **Recomendação por afinidade (estilo Tinder)**: depois que o usuário curte
  vários filmes, usar os gêneros/keywords dos filmes curtidos (via
  `getMovieDetails` / `similar` endpoint da TMDB) para puxar filmes "parecidos"
  e priorizá-los na fila do `Discover` — útil para o casal achar pontos em comum
  de gosto.

## Autenticação e grupos (não só "casal")

- **Login com Google**: `authService.signInWithGoogle()` em
  `src/services/supabase/index.ts` já chama `supabase.auth.signInWithOAuth`, mas
  precisa habilitar o provider Google no painel do Supabase (Authentication →
  Providers) e configurar o OAuth client no Google Cloud Console (redirect URI
  do Supabase).

- **Repensar "Couple" → "Grupos"**: o modelo atual (`Couple` em
  `src/types/couple.ts`, `useCoupleStore`) assume só 2 pessoas (`couple` + `partner`).
  Trocar por um conceito de **Grupo** (`Group`), onde o usuário pode pertencer a
  vários grupos ao mesmo tempo:
  - Grupo com a namorada/ficante (2 pessoas)
  - Grupo com os amigos (N pessoas)
  - Grupo da casa/família (N pessoas)

  Cada grupo tem: `id`, `name`, `invite_code`, `max_members` (limite configurável,
  ex: 2 para casal, maior para amigos/família), lista de membros.

- **Convites via código**: cada grupo gera um `invite_code` (já existe esse campo
  em `Couple`, reaproveitar a lógica) que outros usuários usam para entrar —
  validar limite `max_members` antes de aceitar o convite.

- **Likes globais, matches por grupo**: os likes/swipes do usuário (`Discover`)
  continuam sendo um histórico único por usuário (não duplicado por grupo). Um
  "match" dentro de um grupo acontece quando **todos os membros daquele grupo**
  curtiram o mesmo filme — comparar o histórico de likes do usuário contra o
  histórico dos outros membros de cada grupo que ele participa, gerando uma lista
  de matches por grupo (ex: matches do "grupo casal", matches do "grupo amigos",
  matches do "grupo família"), cada um na sua respectiva tela/aba.
