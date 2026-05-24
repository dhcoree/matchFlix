import { tmdbClient } from '@/services/api/client'
import type { Movie, MovieDetails, TMDBResponse } from '@/types/movie'

export const tmdbService = {
  async getTrending(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<Movie>> {
    const { data } = await tmdbClient.get(`/trending/movie/${timeWindow}`)
    return data
  },

  async getPopular(page = 1): Promise<TMDBResponse<Movie>> {
    const { data } = await tmdbClient.get('/movie/popular', { params: { page } })
    return data
  },

  async getTopRated(page = 1): Promise<TMDBResponse<Movie>> {
    const { data } = await tmdbClient.get('/movie/top_rated', { params: { page } })
    return data
  },

  async getUpcoming(): Promise<TMDBResponse<Movie>> {
    const { data } = await tmdbClient.get('/movie/upcoming')
    return data
  },

  async getMovieDetails(id: number): Promise<MovieDetails> {
    const { data } = await tmdbClient.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,similar,watch/providers',
      },
    })
    return data
  },

  async searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
    const { data } = await tmdbClient.get('/search/movie', { params: { query, page } })
    return data
  },

  async discoverMovies(params: {
    with_genres?: string
    year?: number
    'vote_average.gte'?: number
    sort_by?: string
    page?: number
    'with_watch_providers'?: string
    watch_region?: string
  }): Promise<TMDBResponse<Movie>> {
    const { data } = await tmdbClient.get('/discover/movie', {
      params: { sort_by: 'popularity.desc', ...params },
    })
    return data
  },

  async getDateNightMovies(): Promise<TMDBResponse<Movie>> {
    return tmdbService.discoverMovies({
      with_genres: '10749,35',
      'vote_average.gte': 7,
      sort_by: 'vote_average.desc',
    })
  },
}
