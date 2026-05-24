import { useEffect } from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/supabase'
import type { User } from '@/types/user'

function mapUser(u: SupabaseUser): User {
  return {
    id: u.id,
    email: u.email ?? '',
    name: u.user_metadata?.full_name ?? u.email ?? '',
    avatar_url: u.user_metadata?.avatar_url ?? null,
    created_at: u.created_at,
  }
}

export function useAuth() {
  const { user, isLoading, setUser, setLoading, logout } = useAuthStore()

  useEffect(() => {
    setLoading(true)
    authService.getSession().then(({ data }) => {
      if (data.session?.user) setUser(mapUser(data.session.user))
      setLoading(false)
    })

    const { data: listener } = authService.onAuthStateChange(async (_event, session) => {
      if (session?.user) setUser(mapUser(session.user))
      else logout()
    })

    return () => listener.subscription.unsubscribe()
  }, [setUser, setLoading, logout])

  return { user, isLoading, logout: authService.signOut }
}
