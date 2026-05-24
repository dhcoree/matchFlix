import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MovieCard } from '@/components/molecules/MovieCard'
import { Spinner } from '@/components/atoms/Spinner'
import { cn } from '@/utils/cn'
import type { Movie } from '@/types/movie'

interface RecommendationRailProps {
  title: string
  subtitle?: string
  movies: Movie[]
  isLoading?: boolean
  cardSize?: 'sm' | 'md' | 'lg'
  className?: string
}

export function RecommendationRail({
  title,
  subtitle,
  movies,
  isLoading,
  cardSize = 'md',
  className,
}: RecommendationRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 'left' | 'right') {
    if (!scrollRef.current) return
    const amount = 400
    scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section className={cn('space-y-4', className)}>
      <div className="flex items-end justify-between px-4 lg:px-0">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => scroll('left')}
            className="h-8 w-8 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-hover transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="h-8 w-8 rounded-full glass flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-hover transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-4 lg:px-0 pb-2"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} size={cardSize} />
          ))}
        </div>
      )}
    </section>
  )
}
