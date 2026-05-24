export interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  created_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  display_name: string
  avatar_url: string | null
  favorite_genres: number[]
  bio: string | null
}
