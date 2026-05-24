import { create } from 'zustand'
import type { WatchlistItem, WatchlistStatus } from '@/types/watchlist'

interface WatchlistState {
  items: WatchlistItem[]
  setItems: (items: WatchlistItem[]) => void
  addItem: (item: WatchlistItem) => void
  updateStatus: (movieId: number, status: WatchlistStatus) => void
  removeItem: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
  getStatus: (movieId: number) => WatchlistStatus | null
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateStatus: (movieId, status) =>
    set((state) => ({
      items: state.items.map((i) => (i.movie_id === movieId ? { ...i, status } : i)),
    })),
  removeItem: (movieId) =>
    set((state) => ({ items: state.items.filter((i) => i.movie_id !== movieId) })),
  isInWatchlist: (movieId) => get().items.some((i) => i.movie_id === movieId),
  getStatus: (movieId) => get().items.find((i) => i.movie_id === movieId)?.status ?? null,
}))
