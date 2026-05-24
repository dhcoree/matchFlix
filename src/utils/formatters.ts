export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatYear(dateString: string): string {
  if (!dateString) return '—'
  return new Date(dateString).getFullYear().toString()
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}

export function formatDate(dateString: string): string {
  if (!dateString) return '—'
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(dateString))
}

export function formatVoteCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

export function ratingColor(rating: number): string {
  if (rating >= 7.5) return 'text-success'
  if (rating >= 6) return 'text-warning'
  return 'text-danger'
}
