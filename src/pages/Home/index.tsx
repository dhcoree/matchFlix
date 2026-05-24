import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play, Heart } from 'lucide-react'
import { RecommendationRail } from '@/components/organisms/RecommendationRail'
import { CoupleDashboard } from '@/components/organisms/CoupleDashboard'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { useTrending, usePopular, useDateNightMovies } from '@/hooks/useMovies'
import { tmdbImage } from '@/constants/tmdb'
import { formatYear, formatRating } from '@/utils/formatters'
import { movieDetailsPath, ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/authStore'

export default function Home() {
  const { user } = useAuthStore()
  const { data: trending, isLoading: trendingLoading } = useTrending()
  const { data: popular, isLoading: popularLoading } = usePopular()
  const { data: dateNight, isLoading: dateNightLoading } = useDateNightMovies()

  const hero = trending?.results[0]
  const backdropUrl = hero ? tmdbImage(hero.backdrop_path, 'w1280') : null

  return (
    <div className="space-y-10 -mt-6 -mx-4 lg:-mx-8">
      {hero && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[60vh] min-h-[480px] overflow-hidden"
        >
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt={hero.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 lg:p-16 space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Badge variant="primary" size="sm">Em Alta</Badge>
              <Badge variant="glass" size="sm">⭐ {formatRating(hero.vote_average)}</Badge>
              <Badge variant="glass" size="sm">{formatYear(hero.release_date)}</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-heading text-4xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              {hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm text-muted line-clamp-3 max-w-lg"
            >
              {hero.overview}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-3"
            >
              <Button asChild size="lg">
                <Link to={movieDetailsPath(hero.id)}>
                  <Play size={16} fill="currentColor" />
                  Ver detalhes
                </Link>
              </Button>
              <Button variant="glass" size="lg">
                <Heart size={16} />
                Adicionar à lista
              </Button>
            </motion.div>
          </div>
        </motion.section>
      )}

      <div className="px-4 lg:px-8 space-y-10">
        {user && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-6 space-y-2 h-full">
                <h2 className="font-heading font-bold text-foreground">
                  Bom dia, {user.name.split(' ')[0]} 👋
                </h2>
                <p className="text-sm text-muted">
                  Continue descobrindo filmes com seu parceiro(a).
                </p>
                <div className="pt-2">
                  <Button asChild variant="primary">
                    <Link to={ROUTES.DISCOVER}>
                      Descobrir agora
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <CoupleDashboard />
          </section>
        )}

        <RecommendationRail
          title="Em Alta esta Semana"
          subtitle="Os mais assistidos do momento"
          movies={trending?.results ?? []}
          isLoading={trendingLoading}
          cardSize="md"
        />

        <RecommendationRail
          title="Perfeito para Date Night 💑"
          subtitle="Filmes que vocês vão amar juntos"
          movies={dateNight?.results ?? []}
          isLoading={dateNightLoading}
          cardSize="lg"
        />

        <RecommendationRail
          title="Populares Agora"
          movies={popular?.results ?? []}
          isLoading={popularLoading}
          cardSize="md"
        />
      </div>
    </div>
  )
}
