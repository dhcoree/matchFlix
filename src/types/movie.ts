export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  video: boolean
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number | null
  status: string
  tagline: string
  budget: number
  revenue: number
  production_companies: ProductionCompany[]
  spoken_languages: SpokenLanguage[]
  watch_providers?: WatchProviders
  credits?: Credits
  similar?: { results: Movie[] }
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface WatchProvider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface WatchProviders {
  results: {
    BR?: {
      link: string
      flatrate?: WatchProvider[]
      rent?: WatchProvider[]
      buy?: WatchProvider[]
    }
  }
}

export interface Credits {
  cast: CastMember[]
  crew: CrewMember[]
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
