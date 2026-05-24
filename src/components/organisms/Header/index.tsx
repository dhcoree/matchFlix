import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Heart, Compass, BookMarked, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants/routes'
import { SearchBar } from '@/components/molecules/SearchBar'
import { Avatar } from '@/components/atoms/Avatar'
import { Button } from '@/components/atoms/Button'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/supabase'
import { cn } from '@/utils/cn'

const navItems = [
  { to: ROUTES.HOME, label: 'Início', icon: Heart },
  { to: ROUTES.DISCOVER, label: 'Descobrir', icon: Compass },
  { to: ROUTES.WATCHLIST, label: 'Lista', icon: BookMarked },
  { to: ROUTES.COUPLE_PROFILE, label: 'Casal', icon: User },
]

export function Header() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  async function handleLogout() {
    await authService.signOut()
    navigate(ROUTES.LOGIN)
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-40 glass-strong border-b border-border"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 lg:px-8">
        <Link to={ROUTES.HOME} className="shrink-0">
          <span className="font-heading text-2xl font-black tracking-tight text-gradient-primary">
            Match<span className="text-foreground/90">Flix</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.HOME}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-heading font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted hover:text-foreground hover:bg-surface-hover'
                )
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1 max-w-sm">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-3">
          {user && (
            <>
              <Avatar src={user.avatar_url} name={user.name} size="sm" />
              <Button variant="ghost" size="icon-sm" onClick={handleLogout} title="Sair">
                <LogOut size={15} />
              </Button>
            </>
          )}
        </div>
      </div>

      <nav className="flex md:hidden items-center justify-around border-t border-border bg-background/98 backdrop-blur-md fixed bottom-0 left-0 right-0 z-40 pt-3 pb-6">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.HOME}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1.5 px-5 py-1 text-xs font-heading font-semibold transition-colors',
                isActive ? 'text-primary' : 'text-muted hover:text-foreground'
              )
            }
          >
            <Icon size={22} />
            {label}
          </NavLink>
        ))}
      </nav>
    </motion.header>
  )
}
