import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isDemoMode =
  !rawUrl || !rawKey || rawUrl.startsWith('your_') || rawKey.startsWith('your_')

const supabaseUrl = isDemoMode ? 'https://placeholder.supabase.co' : rawUrl
const supabaseAnonKey = isDemoMode ? 'placeholder-key' : rawKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const noopSession = { data: { session: null }, error: null }
const noopListener = {
  data: { subscription: { unsubscribe: () => {} } },
}

export const authService = {
  async signInWithGoogle() {
    if (isDemoMode) return
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  },

  async signInWithGithub() {
    if (isDemoMode) return
    return supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin },
    })
  },

  async signOut() {
    if (isDemoMode) return
    return supabase.auth.signOut()
  },

  async getSession() {
    if (isDemoMode) return noopSession
    return supabase.auth.getSession()
  },

  onAuthStateChange(callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
    if (isDemoMode) return noopListener as ReturnType<typeof supabase.auth.onAuthStateChange>
    return supabase.auth.onAuthStateChange(callback)
  },
}
