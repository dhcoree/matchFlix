import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, Calendar, Plus, Check, ExternalLink } from 'lucide-react'
import { useMovieDetails } from '@/hooks/useMovies'
import { useWatchlist } from '@/hooks/useWatchlist'
import { tmdbImage } from '@/constants/tmdb'
import { formatYear, formatRating, formatRuntime, formatVoteCount } from '@/utils/formatters'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Spinner } from '@/components/atoms/Spinner'
import { RatingStars } from '@/components/molecules/RatingStars'
import { RecommendationRail } from '@/components/organisms/RecommendationRail'
import type { Credits, WatchProviders } from '@/types/movie'

interface CastSectionProps {
  credits: Credits | undefined
}

function CastSection({ credits }: CastSectionProps) {
  const cast = credits?.cast?.slice(0, 8) ?? []
  if (cast.length === 0) return null

  return (
    <section className="mt-10 space-y-4">
      <h2 className="font-heading text-xl font-bold text-foreground">Elenco</h2>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {cast.map((member) => {
          const profileUrl = tmdbImage(member.profile_path, 'w185')
          return (
            <div key={member.id} className="shrink-0 w-24 space-y-1 text-center">
              <div className="h-32 w-24 rounded-xl overflow-hidden bg-surface-hover">
                {profileUrl ? (
                  <img src={profileUrl} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-2xl">👤</div>
                )}
              </div>
              <p className="text-xs font-heading font-semibold text-foreground line-clamp-2">
                {member.name}
              </p>
              <p className="text-xs text-muted line-clamp-1">{member.character}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

interface WatchProvidersSectionProps {
  providers: WatchProviders['results']['BR']
}

function WatchProvidersSection({ providers }: WatchProvidersSectionProps) {
  if (!providers?.flatrate || providers.flatrate.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted font-heading font-medium uppercase tracking-wide">
        Disponível em
      </p>
      <div className="flex gap-3">
        {providers.flatrate.map((p) => (
          <img
            key={p.provider_id}
            src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
            alt={p.provider_name}
            className="h-10 w-10 rounded-xl ring-2 ring-border"
            title={p.provider_name}
          />
        ))}
      </div>
    </div>
  )
}

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)
  const { data: movie, isLoading, error } = useMovieDetails(movieId)
  const { isInWatchlist, add, getStatus } = useWatchlist()

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-2 text-center">
        <span className="text-5xl">😕</span>
        <h2 className="font-heading text-xl font-bold text-foreground">Filme não encontrado</h2>
        <p className="text-sm text-muted">Não conseguimos carregar as informações deste filme.</p>
      </div>
    )
  }

  const backdropUrl = tmdbImage(movie.backdrop_path, 'w1280')
  const posterUrl = tmdbImage(movie.poster_path, 'w500')
  const inList = isInWatchlist(movie.id)
  const status = getStatus(movie.id)
  const providers = movie.watch_providers?.results?.BR
  const director = movie.credits?.crew?.find((c) => c.job === 'Director')

  return (
    <div className="-mt-6 -mx-4 lg:-mx-8 space-y-8">
      <div className="relative h-[45vh] min-h-[360px] overflow-hidden">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="px-4 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="shrink-0 -mt-32 md:-mt-48 relative z-10"
          >
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="h-64 md:h-80 w-auto rounded-2xl shadow-glass ring-2 ring-border"
              />
            ) : (
              <div className="h-64 w-44 md:h-80 rounded-2xl bg-surface-hover ring-2 ring-border flex items-center justify-center text-5xl">
                🎬
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 space-y-4"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <Badge key={g.id} variant="accent" size="sm">
                    {g.name}
                  </Badge>
                ))}
              </div>
              <h1 className="font-heading text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-sm italic text-muted">"{movie.tagline}"</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-warning fill-warning" />
                <span className="font-heading font-semibold text-foreground">
                  {formatRating(movie.vote_average)}
                </span>
                <span>({formatVoteCount(movie.vote_count)} votos)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {formatRuntime(movie.runtime)}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatYear(movie.release_date)}
              </span>
            </div>

            <RatingStars rating={movie.vote_average} size="md" />

            <p className="text-sm text-muted leading-relaxed max-w-2xl">{movie.overview}</p>

            {director && (
              <p className="text-sm text-muted">
                <span className="font-heading font-semibold text-foreground">Direção:</span>{' '}
                {director.name}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => !inList && add(movie)}
                variant={inList ? 'ghost' : 'primary'}
                size="lg"
              >
                {inList ? <Check size={16} /> : <Plus size={16} />}
                {inList ? `Na lista (${status?.replace(/_/g, ' ')})` : 'Adicionar à lista'}
              </Button>

              {providers?.link && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(providers.link, '_blank')}
                >
                  <ExternalLink size={15} />
                  Onde assistir
                </Button>
              )}
            </div>

            <WatchProvidersSection providers={providers} />
          </motion.div>
        </div>

        <CastSection credits={movie.credits} />

        {movie.similar?.results && movie.similar.results.length > 0 && (
          <div className="mt-10">
            <RecommendationRail
              title="Filmes Similares"
              movies={movie.similar.results}
              cardSize="md"
            />
          </div>
        )}
      </div>
    </div>
  )
}
