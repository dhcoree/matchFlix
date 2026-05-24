import { useState, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchMovies } from '@/hooks/useMovies'
import { tmdbImage } from '@/constants/tmdb'
import { formatYear, formatRating } from '@/utils/formatters'
import { movieDetailsPath } from '@/constants/routes'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { data, isLoading } = useSearchMovies(query)

  const showResults = focused && query.length > 2
  const results = data?.results.slice(0, 6) ?? []

  function clearSearch() {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <div className={cn('relative', className)}>
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-3 text-muted pointer-events-none" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Buscar filmes..."
          className={cn(
            'w-full rounded-xl border border-border bg-surface pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted/60',
            'transition-all duration-200 outline-none',
            'focus:border-secondary focus:ring-2 focus:ring-secondary/20',
            focused && query.length > 2 && 'rounded-b-none border-b-transparent'
          )}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 text-muted hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 glass-strong rounded-b-xl border border-t-0 border-border overflow-hidden"
          >
            {isLoading && (
              <div className="p-4 text-center text-sm text-muted">Buscando...</div>
            )}
            {!isLoading && results.length === 0 && (
              <div className="p-4 text-center text-sm text-muted">Nenhum resultado encontrado</div>
            )}
            {results.map((movie) => (
              <Link
                key={movie.id}
                to={movieDetailsPath(movie.id)}
                onClick={() => setQuery('')}
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-hover transition-colors"
              >
                <div className="h-12 w-8 shrink-0 overflow-hidden rounded-md">
                  {movie.poster_path ? (
                    <img
                      src={tmdbImage(movie.poster_path, 'w185') ?? ''}
                      alt={movie.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-surface-hover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-heading font-semibold text-foreground truncate">
                    {movie.title}
                  </p>
                  <p className="text-xs text-muted">
                    {formatYear(movie.release_date)} · ⭐ {formatRating(movie.vote_average)}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
