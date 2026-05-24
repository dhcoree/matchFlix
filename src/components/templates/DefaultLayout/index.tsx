import { Outlet } from 'react-router-dom'
import { Header } from '@/components/organisms/Header'

export default function DefaultLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 lg:px-8 pb-24 md:pb-8 pt-6">
        <Outlet />
      </main>
    </div>
  )
}
