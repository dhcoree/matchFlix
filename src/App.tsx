import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import DefaultLayout from '@/components/templates/DefaultLayout'
import AuthLayout from '@/components/templates/AuthLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Discover from '@/pages/Discover'
import MovieDetails from '@/pages/MovieDetails'
import Watchlist from '@/pages/Watchlist'
import CoupleProfile from '@/pages/CoupleProfile'
import { useAuthStore } from '@/stores/authStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.DISCOVER} element={<Discover />} />
        <Route path={ROUTES.MOVIE_DETAILS} element={<MovieDetails />} />
        <Route path={ROUTES.WATCHLIST} element={<Watchlist />} />
        <Route path={ROUTES.COUPLE_PROFILE} element={<CoupleProfile />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
