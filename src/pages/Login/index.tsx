import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Zap } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { authService } from '@/services/supabase'
import { useAuthStore } from '@/stores/authStore'
import { useCoupleStore } from '@/stores/coupleStore'
import { ROUTES } from '@/constants/routes'

const DEMO_USER = {
  id: 'demo-root',
  email: 'root@teste.com',
  name: 'Root Teste',
  avatar_url: null,
  created_at: new Date().toISOString(),
}

const DEMO_PARTNER = {
  id: 'demo-partner',
  email: 'parceira@teste.com',
  name: 'Parceira Demo',
  avatar_url: null,
  created_at: new Date().toISOString(),
}

const DEMO_COUPLE = {
  id: 'demo-couple',
  created_at: new Date().toISOString(),
  invite_code: 'MATCH-DEMO-2026',
}

export default function Login() {
  const { setUser } = useAuthStore()
  const { setCouple, setPartner } = useCoupleStore()
  const navigate = useNavigate()

  function handleDemoLogin() {
    setUser(DEMO_USER)
    setCouple(DEMO_COUPLE)
    setPartner(DEMO_PARTNER)
    navigate(ROUTES.HOME)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass rounded-2xl p-8 space-y-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">Entrar</h1>
        <p className="text-sm text-muted">
          Conecte-se com seu parceiro(a) e descubram filmes juntos
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          size="lg"
          className="w-full gap-3"
          onClick={() => authService.signInWithGoogle()}
        >
          <GoogleIcon />
          Continuar com Google
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full gap-3"
          onClick={() => authService.signInWithGithub()}
        >
          <Github size={18} />
          Continuar com GitHub
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-surface px-3 text-xs text-muted">ou</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full gap-3"
        onClick={handleDemoLogin}
      >
        <Zap size={18} />
        Entrar como Root Teste (Demo)
      </Button>

      <p className="text-center text-xs text-muted">
        Ao entrar, você concorda com os{' '}
        <span className="text-accent cursor-pointer hover:underline">Termos de Uso</span>
      </p>
    </motion.div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}
