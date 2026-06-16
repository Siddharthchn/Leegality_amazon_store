import { useEffect, useState } from 'react'
import { fetchProducts, fetchProductsByCategory } from '../services/api'

const PAGE_SIZE = 8

export function useProducts(filters) {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      setLoading(true)
      setError(null)

      try {
        const data = filters.category
          ? await fetchProductsByCategory(filters.category, { limit: 0 })
          : await fetchProducts({ limit: 0 })

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
  }, [filters.category])

  const brands = [...new Set(allProducts.map((p) => p.brand).filter(Boolean))].sort()

  const filteredProducts = allProducts.filter((product) => {
    const min = filters.minPrice !== '' ? Number(filters.minPrice) : null
    const max = filters.maxPrice !== '' ? Number(filters.maxPrice) : null

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
  }
}
