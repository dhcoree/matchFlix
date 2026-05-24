export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL ?? 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p'

export const TMDB_IMAGE_SIZES = {
  poster: {
    sm: 'w185',
    md: 'w342',
    lg: 'w500',
    xl: 'w780',
    original: 'original',
  },
  backdrop: {
    sm: 'w300',
    md: 'w780',
    lg: 'w1280',
    original: 'original',
  },
  profile: {
    sm: 'w45',
    md: 'w185',
    lg: 'h632',
    original: 'original',
  },
} as const

export function tmdbImage(path: string | null, size: string): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
