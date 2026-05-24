export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DISCOVER: '/discover',
  MOVIE_DETAILS: '/movie/:id',
  WATCHLIST: '/watchlist',
  COUPLE_PROFILE: '/couple',
} as const

export function movieDetailsPath(id: number) {
  return `/movie/${id}`
}
