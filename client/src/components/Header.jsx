import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import axios from 'axios'
import { useEffect, useState } from 'react'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
let visitorCountRequest

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Education', to: '/education' },
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
  { label: 'GitHub', to: '/github' },
  { label: 'Contact', to: '/contact' },
  { label: 'Admin', to: '/admin' }
]

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [visitorCount, setVisitorCount] = useState(null)

  useEffect(() => {
    const loadVisitorCount = () => {
      if (visitorCountRequest) {
        return visitorCountRequest
      }

      const hasVisited = sessionStorage.getItem('portfolio-visitor-recorded')
      const isNewVisitor = !hasVisited

      if (isNewVisitor) {
        sessionStorage.setItem('portfolio-visitor-recorded', 'true')
      }

      visitorCountRequest = (isNewVisitor
        ? axios.post(`${apiBase}/analytics/visitor`)
        : axios.get(`${apiBase}/analytics/visitor-count`)
      ).then((response) => response.data.visits)
        .catch((error) => {
          visitorCountRequest = null
          if (isNewVisitor) {
            sessionStorage.removeItem('portfolio-visitor-recorded')
          }
          throw error
        })

      return visitorCountRequest
    }

    loadVisitorCount()
      .then(setVisitorCount)
      .catch((error) => console.error('Unable to load visitor count:', error))
  }, [])

  return (
    <>
  <div
  className="fixed right-3 top-9 z-[60] flex h-16 w-16 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-teal-400/40 bg-slate-950/95 text-center text-teal-200 shadow-lg shadow-slate-950/50 backdrop-blur sm:right-5"
  aria-label={
    visitorCount === null
      ? 'Visitor count loading'
      : `${visitorCount} portfolio visitors`
  }
>
  <span className="text-[8px] font-medium uppercase leading-none tracking-[0.12em] text-slate-400">
    Visitors
  </span>
  <span className="mt-1 font-mono text-sm font-semibold leading-none text-teal-300">
    {visitorCount === null ? '...' : visitorCount.toLocaleString()}
  </span>
</div>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-white shadow-glow">
              NT
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Nikhil</div>
              <div className="text-xs text-slate-400">Tyagi</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="https://www.linkedin.com/in/nikhil-tyagi-6040b6216/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 transition hover:bg-blue-500 hover:text-white"
            >
              Let&apos;s Connect
            </a>
          </div>

          <button
            className="rounded-lg border border-slate-700 p-2 text-xl text-slate-200 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm ${isActive ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:bg-slate-900'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
