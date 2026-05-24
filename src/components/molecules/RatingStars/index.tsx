import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

interface RatingStarsProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
  className?: string
}

const iconSizes = { sm: 12, md: 16, lg: 20 }

export function RatingStars({
  rating,
  max = 10,
  size = 'md',
  interactive = false,
  onChange,
  className,
}: RatingStarsProps) {
  const stars = 5
  const filled = Math.round((rating / max) * stars * 2) / 2

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: stars }, (_, i) => {
        const starValue = i + 1
        const isFull = filled >= starValue
        const isHalf = !isFull && filled >= starValue - 0.5

        let starClass = 'text-border'
        if (isFull) starClass = 'text-warning fill-warning'
        else if (isHalf) starClass = 'text-warning fill-warning/50'

        return (
          <button
            key={i}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onChange?.((starValue / stars) * max) : undefined}
            className={cn(
              'transition-transform',
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            )}
          >
            <Star size={iconSizes[size]} className={starClass} />
          </button>
        )
      })}
    </div>
  )
}
