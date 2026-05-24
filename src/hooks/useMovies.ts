import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { tmdbService } from '@/services/tmdb'

export const movieKeys = {
  all: ['movies'] as const,
  trending: () => [...movieKeys.all, 'trending'] as const,
  popular: () => [...movieKeys.all, 'popular'] as const,
  topRated: () => [...movieKeys.all, 'top-rated'] as const,
  details: (id: number) => [...movieKeys.all, 'details', id] as const,
  search: (query: string) => [...movieKeys.all, 'search', query] as const,
  discover: (params: object) => [...movieKeys.all, 'discover', params] as const,
  dateNight: () => [...movieKeys.all, 'date-night'] as const,
}

export function useTrending() {
  return useQuery({
    queryKey: movieKeys.trending(),
    queryFn: () => tmdbService.getTrending('week'),
    staleTime: 1000 * 60 * 30,
  })
}

export function usePopular() {
  return useQuery({
    queryKey: movieKeys.popular(),
    queryFn: () => tmdbService.getPopular(),
  })
}

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: movieKeys.details(id),
    queryFn: () => tmdbService.getMovieDetails(id),
    enabled: !!id,
  })
}

export function useDateNightMovies() {
  return useQuery({
    queryKey: movieKeys.dateNight(),
    queryFn: () => tmdbService.getDateNightMovies(),
    staleTime: 1000 * 60 * 60,
  })
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: movieKeys.search(query),
    queryFn: () => tmdbService.searchMovies(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
  })
}

export function useInfinitePopular() {
  return useInfiniteQuery({
    queryKey: [...movieKeys.popular(), 'infinite'],
    queryFn: ({ pageParam = 1 }) => tmdbService.getPopular(pageParam as number),
    getNextPageParam: (last) => (last.page < last.total_pages ? last.page + 1 : undefined),
    initialPageParam: 1,
  })
}
