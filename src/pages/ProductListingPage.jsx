import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Filters from '../components/Filters'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useFilters } from '../context/FilterContext'
import { useProducts } from '../hooks/useProducts'

export default function ProductListingPage() {
  const { filters, updateFilters } = useFilters()
  const { products, brands, loading, error, totalPages, currentPage, totalProducts } =
    useProducts(filters)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100/80">
      <Navbar onMenuClick={() => setMobileFiltersOpen(true)} />

      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        brands={brands}
        filters={filters}
        onFilterChange={updateFilters}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden w-64 shrink-0 lg:block"
          >
            <div className="sticky top-24 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h1 className="text-lg font-bold text-gray-900">Filters</h1>
              </div>
              <Filters brands={brands} filters={filters} onFilterChange={updateFilters} />
            </div>
          </motion.aside>

          <main className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">All Products</h2>
                {!loading && !error && (
                  <p className="mt-1 text-sm text-gray-500">
                    {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 lg:hidden"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}

            <AnimatePresence mode="wait">
              {!loading && !error && (
                <motion.div
                  key={`${filters.category}-${filters.page}-${filters.brands.join()}-${filters.minPrice}-${filters.maxPrice}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20"
                    >
                      <svg className="h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="mt-4 text-lg font-medium text-gray-500">No products match your filters</p>
                      <button
                        type="button"
                        onClick={() =>
                          updateFilters({ category: '', minPrice: '', maxPrice: '', brands: [] })
                        }
                        className="mt-3 text-sm font-semibold text-accent hover:text-accent-hover"
                      >
                        Clear all filters
                      </button>
                    </motion.div>
                  )}

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => updateFilters({ page })}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
