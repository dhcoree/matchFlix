import axios from 'axios'
import { TMDB_BASE_URL } from '@/constants/tmdb'

export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'pt-BR',
  },
})

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('TMDB API key inválida ou não configurada.')
    }
    return Promise.reject(error)
  }
)
