import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, Info, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePopular } from '@/hooks/useMovies'
import { useWatchlist } from '@/hooks/useWatchlist'
import { useCoupleStore } from '@/stores/coupleStore'
import { tmdbImage } from '@/constants/tmdb'
import { formatYear, formatRating } from '@/utils/formatters'
import { movieDetailsPath } from '@/constants/routes'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Spinner } from '@/components/atoms/Spinner'
import type { Movie } from '@/types/movie'

const SWIPE_THRESHOLD = 100
const MATCH_PROBABILITY = 0.6
const MATCH_DISPLAY_MS = 3000
const CARD_SCALE_BASE = 0.94
const CARD_SCALE_STEP = 0.03
const CARD_OFFSET_PX = 8

export default function Discover() {
  const { data, isLoading } = usePopular()
  const { add } = useWatchlist()
  const { addMatch } = useCoupleStore()
  const [index, setIndex] = useState(0)
  const [showMatch, setShowMatch] = useState<Movie | null>(null)

  const movies = data?.results ?? []
  const current = movies[index]

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const likeOpacity = useTransform(x, [0, 80], [0, 1])
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0])

  const handleSwipe = useCallback(
    (direction: 'like' | 'nope') => {
      if (!current) return
      if (direction === 'like') {
        add(current)
        const isMatch = Math.random() > MATCH_PROBABILITY
        if (isMatch) {
          addMatch({
            movie_id: current.id,
            movie_title: current.title,
            poster_path: current.poster_path,
            matched_at: new Date().toISOString(),
          })
          setShowMatch(current)
          setTimeout(() => setShowMatch(null), MATCH_DISPLAY_MS)
        }
      }
      setIndex((prev) => prev + 1)
      x.set(0)
    },
    [current, add, addMatch, x]
  )

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (index >= movies.length) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
        <span className="text-6xl">🎬</span>
        <h2 className="font-heading text-2xl font-bold text-foreground">Acabou por hoje!</h2>
        <p className="text-sm text-muted">Você viu todos os filmes disponíveis.</p>
        <Button onClick={() => setIndex(0)} variant="primary">
          <RotateCcw size={15} />
          Recomeçar
        </Button>
      </div>
    )
  }

  const posterUrl = current ? tmdbImage(current.poster_path, 'w500') : null

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center space-y-1">
        <h1 className="font-heading text-3xl font-bold text-foreground">Descobrir</h1>
        <p className="text-sm text-muted">Deslize para gostar ou não gostar</p>
      </div>

      <div className="relative h-[520px] w-[340px] select-none">
        {movies.slice(index + 1, index + 3).reverse().map((movie, i) => (
          <div
            key={movie.id}
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ transform: `scale(${CARD_SCALE_BASE + i * CARD_SCALE_STEP}) translateY(${(1 - i) * CARD_OFFSET_PX}px)`, zIndex: i }}
          >
            {movie.poster_path && (
              <img
                src={tmdbImage(movie.poster_path, 'w500')!}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ))}

        <motion.div
          key={current?.id}
          style={{ x, rotate, zIndex: 10 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(_, info) => {
            if (info.offset.x > SWIPE_THRESHOLD) handleSwipe('like')
            else if (info.offset.x < -SWIPE_THRESHOLD) handleSwipe('nope')
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <div className="relative h-full rounded-2xl overflow-hidden shadow-glass">
            {posterUrl ? (
              <img src={posterUrl} alt={current?.title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-surface-hover flex items-center justify-center text-6xl">🎬</div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-8 left-6 rotate-[-20deg] rounded-lg border-4 border-success px-3 py-1"
            >
              <span className="font-heading text-xl font-black tracking-widest text-success">QUERO</span>
            </motion.div>

            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-8 right-6 rotate-[20deg] rounded-lg border-4 border-danger px-3 py-1"
            >
              <span className="font-heading text-xl font-black tracking-widest text-danger">NOPE</span>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white leading-tight">
                    {current?.title}
                  </h2>
                  <p className="text-sm text-white/70">
                    {formatYear(current?.release_date ?? '')} · ⭐ {formatRating(current?.vote_average ?? 0)}
                  </p>
                </div>
                <Link
                  to={movieDetailsPath(current?.id ?? 0)}
                  className="shrink-0 glass h-9 w-9 rounded-full flex items-center justify-center text-white/80 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info size={15} />
                </Link>
              </div>
              <p className="text-xs text-white/60 line-clamp-2">{current?.overview}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => handleSwipe('nope')}
          className="h-14 w-14 rounded-full glass flex items-center justify-center text-danger hover:bg-danger/10 hover:scale-110 transition-all duration-200"
        >
          <X size={24} />
        </button>
        <button
          onClick={() => setIndex((p) => Math.max(0, p - 1))}
          className="h-10 w-10 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-hover transition-all"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={() => handleSwipe('like')}
          className="h-14 w-14 rounded-full glass flex items-center justify-center text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-200 shadow-glow"
        >
          <Heart size={24} />
        </button>
      </div>

      <p className="text-xs text-muted">{movies.length - index} filmes restantes</p>

      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
          >
            <div className="glass-strong rounded-3xl p-8 text-center space-y-4 max-w-sm mx-4">
              <div className="text-5xl">🎉</div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-gradient-primary">MATCH!</h2>
                <p className="text-sm text-muted mt-1">Vocês dois querem assistir</p>
              </div>
              <div className="flex justify-center">
                {showMatch.poster_path && (
                  <img
                    src={tmdbImage(showMatch.poster_path, 'w185') ?? ''}
                    alt={showMatch.title}
                    className="h-36 rounded-xl shadow-glass"
                  />
                )}
              </div>
              <p className="font-heading font-bold text-foreground text-lg">{showMatch.title}</p>
              <Badge variant="success">Adicionado à lista de vocês</Badge>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
