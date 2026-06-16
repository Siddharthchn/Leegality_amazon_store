import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFilters } from '../context/FilterContext'

export default function Navbar({ onMenuClick }) {
  const { filters, updateFilters } = useFilters()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearchChange = (e) => {
    const value = e.target.value
    updateFilters({ search: value })

    if (value.trim() && location.pathname !== '/') {
      navigate('/')
    }
  }

  const handleClearSearch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    updateFilters({ search: '' })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <header className="sticky top-0 z-40 bg-brand shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <motion.button
          type="button"
          onClick={onMenuClick}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg p-1.5 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle filters"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>

        <Link to="/" className="hidden shrink-0 sm:block" aria-label="Amazon Store home">
          <span className="text-lg font-bold tracking-tight text-white">Amazon Store</span>
        </Link>

        <form role="search" className="relative flex-1" onSubmit={handleSearchSubmit}>
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="site-search"
            name="search"
            type="text"
            enterKeyHint="search"
            autoComplete="off"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full rounded-full bg-white py-2 pl-10 pr-10 text-sm shadow-inner outline-none transition focus:ring-2 focus:ring-blue-400 sm:py-2.5 sm:pl-11 sm:pr-11 sm:text-base"
          />
          {filters.search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </form>

        <nav className="flex shrink-0 items-center gap-1 sm:gap-3" aria-label="Account and cart">
          {[
            {
              label: 'Shopping cart',
              path: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
            },
            {
              label: 'Notifications',
              path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
            },
            {
              label: 'User profile',
              path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            },
          ].map((icon) => (
            <motion.button
              key={icon.label}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={icon.label}
              className="rounded-lg p-2 text-white transition hover:bg-white/10"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon.path} />
              </svg>
            </motion.button>
          ))}
        </nav>
      </div>
    </header>
  )
}
