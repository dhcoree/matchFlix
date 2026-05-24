export interface Couple {
  id: string
  created_at: string
  invite_code: string
}

export interface CoupleMatch {
  movie_id: number
  movie_title: string
  poster_path: string | null
  matched_at: string
}

export interface CompatibilityScore {
  overall: number
  genres: { genre_id: number; genre_name: string; score: number }[]
  top_genres: string[]
  avoid_genres: string[]
}
