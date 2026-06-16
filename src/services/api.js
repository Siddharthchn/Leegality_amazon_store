const BASE_URL = 'https://dummyjson.com'

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Request failed with status ${response.status}`)
  }
  return response.json()
}

export async function fetchProducts({ limit = 30, skip = 0 } = {}) {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)
  return handleResponse(response)
}

export async function fetchProductsByCategory(category, { limit = 30, skip = 0 } = {}) {
  const response = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`,
  )
  return handleResponse(response)
}

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`)
  return handleResponse(response)
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  return handleResponse(response)
}
