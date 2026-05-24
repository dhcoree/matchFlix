import { useWatchlistStore } from '@/stores/watchlistStore'
import { useAuthStore } from '@/stores/authStore'
import { useCoupleStore } from '@/stores/coupleStore'
import type { Movie } from '@/types/movie'
import type { WatchlistStatus } from '@/types/watchlist'

export function useWatchlist() {
  const { items, addItem, updateStatus, removeItem, isInWatchlist, getStatus } =
    useWatchlistStore()
  const { user } = useAuthStore()
  const { couple } = useCoupleStore()

  function add(movie: Movie, status: WatchlistStatus = 'want_to_watch') {
    if (!user || !couple) return
    addItem({
      id: crypto.randomUUID(),
      couple_id: couple.id,
      movie_id: movie.id,
      movie_title: movie.title,
      poster_path: movie.poster_path,
      status,
      added_by: user.id,
      added_at: new Date().toISOString(),
    })
  }

  return { items, add, updateStatus, removeItem, isInWatchlist, getStatus }
}
