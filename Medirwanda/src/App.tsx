import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import LoadingSpinner from './components/shared/LoadingSpinner'
import NotificationToast from './components/shared/NotificationToast'

export default function App() {
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored ?? (prefersDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])
  return (
    <div className="min-h-screen gradient-bg text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950">
      <Suspense fallback={<div className="grid place-items-center h-screen"><LoadingSpinner /></div>}>
        <RouterProvider router={router} />
      </Suspense>
      <NotificationToast />
    </div>
  )
}