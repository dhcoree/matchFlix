import { Badge } from '@/components/atoms/Badge'
import { MOVIE_GENRES } from '@/constants/genres'

interface GenreBadgeProps {
  genreId: number
  onClick?: (id: number) => void
  active?: boolean
}

export function GenreBadge({ genreId, onClick, active }: GenreBadgeProps) {
  const genre = MOVIE_GENRES.find((g) => g.id === genreId)
  if (!genre) return null

  return (
    <Badge
      variant={active ? 'secondary' : 'default'}
      size="sm"
      className={onClick ? 'cursor-pointer hover:border-secondary/40 transition-colors' : ''}
      onClick={() => onClick?.(genreId)}
    >
      {genre.name}
    </Badge>
  )
}
