import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Plus, Check } from 'lucide-react'
import { tmdbImage } from '@/constants/tmdb'
import { formatYear, formatRating } from '@/utils/formatters'
import { movieDetailsPath } from '@/constants/routes'
import { useWatchlist } from '@/hooks/useWatchlist'
import { cn } from '@/utils/cn'
import type { Movie } from '@/types/movie'

interface MovieCardProps {
  movie: Movie
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { card: 'w-32', poster: 'h-48' },
  md: { card: 'w-44', poster: 'h-64' },
  lg: { card: 'w-56', poster: 'h-80' },
}

export function MovieCard({ movie, size = 'md', className }: MovieCardProps) {
  const { isInWatchlist, add } = useWatchlist()
  const inList = isInWatchlist(movie.id)
  const posterUrl = tmdbImage(movie.poster_path, 'w342')

  function handleAddToList(e: React.MouseEvent) {
    e.preventDefault()
    if (!inList) add(movie)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('group relative flex-shrink-0', sizes[size].card, className)}
    >
      <Link to={movieDetailsPath(movie.id)} className="block">
        <div className={cn('relative overflow-hidden rounded-xl', sizes[size].poster)}>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-surface-hover flex items-center justify-center">
              <span className="text-muted text-3xl">🎬</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <button
            onClick={handleAddToList}
            className={cn(
              'absolute bottom-3 right-3 h-8 w-8 rounded-full flex items-center justify-center',
              'transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0',
              inList
                ? 'bg-success text-white'
                : 'glass text-foreground hover:bg-secondary hover:text-white'
            )}
          >
            {inList ? <Check size={14} /> : <Plus size={14} />}
          </button>

          <div className="absolute top-2 left-2 flex items-center gap-1 glass rounded-full px-2 py-0.5">
            <Star size={10} className="text-warning fill-warning" />
            <span className="text-xs font-heading font-semibold text-foreground">
              {formatRating(movie.vote_average)}
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-0.5">
          <h3 className="text-sm font-heading font-semibold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-muted">{formatYear(movie.release_date)}</p>
        </div>
      </Link>
    </motion.div>
  )
}
