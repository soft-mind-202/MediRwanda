import { Link } from 'react-router-dom'
import Button from '../ui/button'
import { Moon, SunMedium } from 'lucide-react'
import { getUser, clearUser } from '../../store/auth.store'

export default function Header() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }
  const user = getUser()
  return (
    <header className="glass sticky top-0 z-30 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-500"></div>
          <span className="font-semibold">MediLink Rwanda</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/patient" className="px-3 py-1.5 rounded-md hover:bg-white/10">Patient</Link>
          <Link to="/doctor" className="px-3 py-1.5 rounded-md hover:bg-white/10">Doctor</Link>
          <Link to="/pharmacy" className="px-3 py-1.5 rounded-md hover:bg-white/10">Pharmacy</Link>
          <Link to="/delivery" className="px-3 py-1.5 rounded-md hover:bg-white/10">Delivery</Link>
          <Link to="/admin" className="px-3 py-1.5 rounded-md hover:bg-white/10">Admin</Link>
          {!user && <Link to="/login" className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500">Login</Link>}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={toggleTheme} aria-label="Toggle theme">
            <SunMedium className="size-4 hidden dark:block" />
            <Moon className="size-4 block dark:hidden" />
          </Button>
          {user && (
            <div className="flex items-center gap-2">
              <Link to="/patient" className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10">
                <div className="size-6 rounded-full bg-indigo-600 text-white grid place-items-center text-xs">{user.name?.[0]?.toUpperCase() || 'U'}</div>
                <span className="text-sm">{user.name}</span>
              </Link>
              <Button variant="outline" onClick={() => { clearUser(); location.href = '/'; }}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}