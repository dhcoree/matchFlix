import { motion } from 'framer-motion'
import { Heart, Copy, Check, Users, Film, Star } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '@/components/atoms/Avatar'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { useAuthStore } from '@/stores/authStore'
import { useCoupleStore } from '@/stores/coupleStore'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { tmdbImage } from '@/constants/tmdb'
import { MOVIE_GENRES } from '@/constants/genres'

export default function CoupleProfile() {
  const { user } = useAuthStore()
  const { couple, partner, matches } = useCoupleStore()
  const { items } = useWatchlistStore()
  const [copied, setCopied] = useState(false)

  const completed = items.filter((i) => i.status === 'completed').length
  const inviteCode = couple?.invite_code ?? 'MATCH-DEMO-2026'

  function handleCopyCode() {
    navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = [
    { label: 'Matches', value: matches.length, icon: Heart },
    { label: 'Assistidos', value: completed, icon: Film },
    { label: 'Na lista', value: items.length, icon: Star },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-heading text-3xl font-bold text-foreground">Perfil do Casal</h1>
        <p className="text-sm text-muted">Sua história cinéfila juntos</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center gap-2">
            <Avatar src={user?.avatar_url} name={user?.name} size="xl" />
            <div className="text-center">
              <p className="font-heading font-bold text-foreground text-sm">{user?.name}</p>
              <p className="text-xs text-muted">Você</p>
            </div>
          </div>

          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={32} className="text-primary fill-primary drop-shadow-lg" />
          </motion.div>

          <div className="flex flex-col items-center gap-2">
            <Avatar src={partner?.avatar_url} name={partner?.name ?? 'Parceiro(a)'} size="xl" />
            <div className="text-center">
              <p className="font-heading font-bold text-foreground text-sm">
                {partner?.name ?? 'Parceiro(a)'}
              </p>
              <p className="text-xs text-muted">Parceiro(a)</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-4 text-center space-y-1"
          >
            <Icon size={20} className="mx-auto text-secondary" />
            <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted">{label}</p>
          </motion.div>
        ))}
      </div>

      {!partner && (
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Users size={18} className="text-secondary" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-foreground text-sm">Convidar Parceiro(a)</h2>
              <p className="text-xs text-muted">Compartilhe o código abaixo</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-surface rounded-xl p-3 border border-border">
            <code className="flex-1 font-heading text-lg font-bold text-accent tracking-widest">
              {inviteCode}
            </code>
            <Button variant="ghost" size="icon-sm" onClick={handleCopyCode}>
              {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
            </Button>
          </div>

          <p className="text-xs text-muted text-center">
            Seu parceiro(a) usa este código para se conectar com você
          </p>
        </div>
      )}

      {matches.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <Heart size={18} className="text-primary fill-primary" />
            Matches do Casal
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {matches.map((match) => (
              <div key={match.matched_at} className="space-y-1">
                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-surface-hover">
                  {match.poster_path ? (
                    <img
                      src={tmdbImage(match.poster_path, 'w185') ?? ''}
                      alt={match.movie_title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-2xl">🎬</div>
                  )}
                </div>
                <p className="text-xs font-heading font-semibold text-foreground line-clamp-2 text-center">
                  {match.movie_title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-6 space-y-3">
        <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
          <Star size={16} className="text-warning fill-warning" />
          Compatibilidade de Gostos
        </h2>
        <p className="text-xs text-muted">
          Conforme vocês avaliam filmes, vamos identificar os gêneros que mais combinam com o casal.
        </p>
        <div className="flex flex-wrap gap-2">
          {MOVIE_GENRES.slice(0, 6).map((genre) => (
            <Badge key={genre.id} variant="glass" size="sm">
              {genre.name}
            </Badge>
          ))}
        </div>
        <Badge variant="accent" size="sm">Em breve: IA de recomendação</Badge>
      </div>
    </div>
  )
}
