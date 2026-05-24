export type WatchlistStatus = 'want_to_watch' | 'watching' | 'completed' | 'abandoned'

export interface WatchlistItem {
  id: string
  couple_id: string
  movie_id: number
  movie_title: string
  poster_path: string | null
  status: WatchlistStatus
  added_by: string
  added_at: string
}

export interface Rating {
  id: string
  user_id: string
  movie_id: number
  score: number
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  user_id: string
  movie_id: number
  content: string
  has_spoiler: boolean
  created_at: string
}
