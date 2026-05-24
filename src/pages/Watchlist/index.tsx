import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Eye, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { Badge } from '@/components/atoms/Badge'
import { movieDetailsPath } from '@/constants/routes'
import { tmdbImage } from '@/constants/tmdb'
import type { WatchlistStatus } from '@/types/watchlist'
import { cn } from '@/utils/cn'

const STATUS_CONFIG: Record<
  WatchlistStatus,
  { label: string; icon: React.ElementType; badge: Parameters<typeof Badge>[0]['variant'] }
> = {
  want_to_watch: { label: 'Quero assistir', icon: Clock, badge: 'default' },
  watching: { label: 'Assistindo', icon: Eye, badge: 'secondary' },
  completed: { label: 'Concluído', icon: CheckCircle2, badge: 'success' },
  abandoned: { label: 'Abandonado', icon: XCircle, badge: 'warning' },
}

const STATUSES = Object.keys(STATUS_CONFIG) as WatchlistStatus[]

export default function Watchlist() {
  const { items, updateStatus, removeItem } = useWatchlistStore()
  const [filter, setFilter] = useState<WatchlistStatus | 'all'>('all')

  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Lista do Casal</h1>
          <p className="text-sm text-muted">{items.length} filmes na lista</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-all',
            filter === 'all'
              ? 'bg-secondary text-white'
              : 'glass text-muted hover:text-foreground'
          )}
        >
          Todos ({items.length})
        </button>
        {STATUSES.map((status) => {
          const count = items.filter((i) => i.status === status).length
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-all',
                filter === status
                  ? 'bg-secondary text-white'
                  : 'glass text-muted hover:text-foreground'
              )}
            >
              {STATUS_CONFIG[status].label} ({count})
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
          <span className="text-5xl">🍿</span>
          <h2 className="font-heading text-xl font-bold text-foreground">Lista vazia</h2>
          <p className="text-sm text-muted">
            {filter === 'all'
              ? 'Adicione filmes enquanto navega ou usa o Descobrir.'
              : 'Nenhum filme nesta categoria ainda.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => {
            const config = STATUS_CONFIG[item.status]
            const StatusIcon = config.icon
            const posterUrl = tmdbImage(item.poster_path, 'w185')

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl overflow-hidden group"
              >
                <Link to={movieDetailsPath(item.movie_id)} className="flex gap-4 p-4">
                  <div className="h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-hover">
                    {posterUrl ? (
                      <img src={posterUrl} alt={item.movie_title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-2xl">🎬</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="font-heading font-semibold text-foreground text-sm line-clamp-2 group-hover:text-accent transition-colors">
                      {item.movie_title}
                    </h3>
                    <Badge variant={config.badge} size="sm">
                      <StatusIcon size={10} />
                      {config.label}
                    </Badge>
                  </div>
                </Link>

                <div className="border-t border-border px-4 py-2 flex items-center gap-1">
                  {STATUSES.filter((s) => s !== item.status).map((s) => {
                    const Icon = STATUS_CONFIG[s].icon
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(item.movie_id, s)}
                        title={STATUS_CONFIG[s].label}
                        className="h-7 w-7 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-hover transition-all"
                      >
                        <Icon size={14} />
                      </button>
                    )
                  })}
                  <button
                    onClick={() => removeItem(item.movie_id)}
                    className="ml-auto h-7 w-7 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
