import { motion } from 'framer-motion'
import { getVisiblePages } from '../utils/pagination'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = getVisiblePages(currentPage, totalPages)

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Product pagination"
    >
      <motion.button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.02 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.98 }}
        className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous
      </motion.button>

      {pages[0] > 1 && (
        <>
          <PageButton page={1} currentPage={currentPage} onPageChange={onPageChange} />
          {pages[0] > 2 && <span className="px-1 text-gray-400">…</span>}
        </>
      )}

      {pages.map((page) => (
        <PageButton key={page} page={page} currentPage={currentPage} onPageChange={onPageChange} />
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-gray-400">…</span>
          )}
          <PageButton
            page={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}

      <motion.button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.02 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.98 }}
        className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </motion.button>
    </motion.nav>
  )
}

function PageButton({ page, currentPage, onPageChange }) {
  const isActive = page === currentPage

  return (
    <motion.button
      type="button"
      onClick={() => onPageChange(page)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? 'page' : undefined}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition ${
        isActive
          ? 'bg-accent text-white shadow-md shadow-blue-200'
          : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      {page}
    </motion.button>
  )
}
