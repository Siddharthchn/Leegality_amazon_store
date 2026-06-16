import { createContext, useContext, useMemo, useState } from 'react'

const FilterContext = createContext(null)

const defaultFilters = {
  category: '',
  minPrice: '',
  maxPrice: '',
  brands: [],
  page: 1,
}

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters)

  const updateFilters = (updates) => {
    setFilters((prev) => {
      const next = { ...prev, ...updates }
      const filtersChanged = ['category', 'minPrice', 'maxPrice', 'brands'].some(
        (key) => JSON.stringify(prev[key]) !== JSON.stringify(next[key]),
      )
      return filtersChanged ? { ...next, page: 1 } : next
    })
  }

  const resetFilters = () => setFilters(defaultFilters)

  const value = useMemo(
    () => ({ filters, updateFilters, resetFilters }),
    [filters],
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
