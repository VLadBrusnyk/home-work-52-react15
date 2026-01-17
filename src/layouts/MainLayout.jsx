import { useEffect, useRef, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('theme')
  if (saved) return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const MainLayout = ({ children }) => {
  const wasIdleRef = useRef(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useIdleTimer({
    timeout: 1000 * 60 * 3,
    onIdle: () => {
      wasIdleRef.current = true
      toast.warn('Ви неактивні вже 3 хвилини.')
    },
    onActive: () => {
      if (wasIdleRef.current) {
        toast.info('Ласкаво просимо назад!')
        wasIdleRef.current = false
      }
    },
  })

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
        }
      />
      <main className="main">{children}</main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={2500} />
    </div>
  )
}

export default MainLayout
