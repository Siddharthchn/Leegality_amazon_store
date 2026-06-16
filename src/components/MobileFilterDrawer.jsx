import { AnimatePresence, motion } from 'framer-motion'
import Filters from './Filters'

export default function MobileFilterDrawer({ isOpen, onClose, brands, filters, onFilterChange }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-[min(320px,85vw)] overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                aria-label="Close filters"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Filters
              brands={brands}
              filters={filters}
              onFilterChange={(updates) => {
                onFilterChange(updates)
              }}
            />
            <motion.button
              type="button"
              onClick={onClose}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white"
            >
              Show Results
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
