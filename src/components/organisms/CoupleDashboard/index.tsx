import { Heart, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Avatar } from '@/components/atoms/Avatar'
import { Badge } from '@/components/atoms/Badge'
import { useAuthStore } from '@/stores/authStore'
import { useCoupleStore } from '@/stores/coupleStore'

export function CoupleDashboard() {
  const { user } = useAuthStore()
  const { partner, matches } = useCoupleStore()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 space-y-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-foreground">Vocês dois</h3>
        <Badge variant="primary" size="sm">
          <Zap size={10} />
          {matches.length} matches
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Avatar src={user?.avatar_url} name={user?.name} size="lg" />
          <div>
            <p className="text-sm font-heading font-semibold text-foreground">{user?.name}</p>
            <p className="text-xs text-muted">Você</p>
          </div>
        </div>

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto"
        >
          <Heart size={24} className="text-primary fill-primary" />
        </motion.div>

        <div className="flex items-center gap-3 flex-row-reverse">
          <Avatar src={partner?.avatar_url} name={partner?.name ?? 'Parceiro(a)'} size="lg" />
          <div className="text-right">
            <p className="text-sm font-heading font-semibold text-foreground">
              {partner?.name ?? 'Parceiro(a)'}
            </p>
            <p className="text-xs text-muted">Parceiro(a)</p>
          </div>
        </div>
      </div>

      {matches.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted font-heading font-medium uppercase tracking-wide">
            Últimos matches
          </p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {matches.slice(0, 5).map((match) => (
              <div key={match.matched_at} className="flex-shrink-0">
                {match.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${match.poster_path}`}
                    alt={match.movie_title}
                    className="h-16 w-11 rounded-lg object-cover ring-2 ring-secondary/30"
                  />
                ) : (
                  <div className="h-16 w-11 rounded-lg bg-surface-hover ring-2 ring-border flex items-center justify-center text-lg">
                    🎬
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
