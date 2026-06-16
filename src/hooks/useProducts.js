import { useEffect, useState } from 'react'
import { fetchProducts, fetchProductsByCategory, fetchSearchProducts } from '../services/api'
import { useDebounce } from './useDebounce'

const PAGE_SIZE = 8

export function useProducts(filters) {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const trimmedSearch = filters.search.trim()
  const debouncedSearch = useDebounce(trimmedSearch, 400)
  // Clear immediately; debounce only when typing
  const searchQuery = trimmedSearch === '' ? '' : debouncedSearch

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      setLoading(true)
      setError(null)

      try {
        let data

        if (searchQuery) {
          data = await fetchSearchProducts(searchQuery, { limit: 0 })
        } else if (filters.category) {
          data = await fetchProductsByCategory(filters.category, { limit: 0 })
        } else {
          data = await fetchProducts({ limit: 0 })
        }

        if (!cancelled) setAllProducts(data.products)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProducts()
    return () => {
      cancelled = true
    }
  }, [filters.category, searchQuery])

  const brands = [...new Set(allProducts.map((p) => p.brand).filter(Boolean))].sort()

  const filteredProducts = allProducts.filter((product) => {
    const min = filters.minPrice !== '' ? Number(filters.minPrice) : null
    const max = filters.maxPrice !== '' ? Number(filters.maxPrice) : null

    if (filters.category && product.category !== filters.category) return false
    if (min !== null && product.price < min) return false
    if (max !== null && product.price > max) return false
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false

    return true
  })

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const currentPage = Math.min(filters.page, totalPages)
  const skip = (currentPage - 1) * PAGE_SIZE
  const paginatedProducts = filteredProducts.slice(skip, skip + PAGE_SIZE)

  return {
    products: paginatedProducts,
    brands,
    loading,
    error,
    totalProducts: filteredProducts.length,
    totalPages,
    currentPage,
    pageSize: PAGE_SIZE,
    appliedSearch: searchQuery,
  }
}
