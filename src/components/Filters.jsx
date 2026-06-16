import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchCategories } from '../services/api'

function FilterSection({ title, children }) {
  return (
    <div className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
        {title}
      </h2>
      {children}
    </div>
  )
}

function CheckboxItem({ checked, onChange, label }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
    </label>
  )
}

export default function Filters({ brands, onFilterChange, filters, className = '' }) {
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState(null)
  const [minPrice, setMinPrice] = useState(filters.minPrice)
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        setCategoriesError(err.message)
      } finally {
        setCategoriesLoading(false)
      }
    }

    loadCategories()
  }, [])

  useEffect(() => {
    setMinPrice(filters.minPrice)
    setMaxPrice(filters.maxPrice)
  }, [filters.minPrice, filters.maxPrice])

  const handleCategoryChange = (slug) => {
    onFilterChange({ category: filters.category === slug ? '' : slug })
  }

  const handleBrandChange = (brand) => {
    const nextBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    onFilterChange({ brands: nextBrands })
  }

  const handlePriceApply = () => {
    onFilterChange({ minPrice, maxPrice })
  }

  const activeCount =
    (filters.search ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    filters.brands.length

  return (
    <aside className={`space-y-5 ${className}`}>
      {activeCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2"
        >
          <span className="text-xs font-medium text-blue-700">
            {activeCount} filter{activeCount > 1 ? 's' : ''} active
          </span>
          <button
            type="button"
            onClick={() =>
              onFilterChange({ search: '', category: '', minPrice: '', maxPrice: '', brands: [] })
            }
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        </motion.div>
      )}

      <FilterSection title="Categories">
        {categoriesLoading && (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 animate-pulse rounded bg-gray-100" />
            ))}
          </div>
        )}
        {categoriesError && <p className="text-sm text-red-500">{categoriesError}</p>}
        <div className="max-h-52 space-y-0.5 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <CheckboxItem
              key={cat.slug}
              checked={filters.category === cat.slug}
              onChange={() => handleCategoryChange(cat.slug)}
              label={cat.name}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="number"
            placeholder="Max"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <motion.button
          type="button"
          onClick={handlePriceApply}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover"
        >
          Apply
        </motion.button>
      </FilterSection>

      <FilterSection title="Brands">
        <div className="max-h-48 space-y-0.5 overflow-y-auto pr-1">
          {brands.length === 0 ? (
            <p className="text-sm text-gray-400">No brands available</p>
          ) : (
            brands.map((brand) => (
              <CheckboxItem
                key={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                label={brand}
              />
            ))
          )}
        </div>
      </FilterSection>
    </aside>
  )
}
