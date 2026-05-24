import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/5 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="mb-8 text-center">
          <span className="font-heading text-5xl font-black tracking-tight text-gradient-primary">
            Match<span className="text-foreground/90">Flix</span>
          </span>
          <p className="mt-2 text-sm text-muted tracking-wide">descubra filmes juntos</p>
        </div>
        <Outlet />
      </motion.div>
    </div>
  )
}
