import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import StarRating from '../components/StarRating'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { fetchProductById } from '../services/api'
import { getVisiblePages } from '../utils/pagination'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      setLoading(true)
      setError(null)
      setActiveImage(0)

      try {
        const data = await fetchProductById(id)
        if (!cancelled) setProduct(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProduct()
    return () => {
      cancelled = true
    }
  }, [id])

  const images = product?.images?.length ? product.images : product ? [product.thumbnail] : []
  const imagePages = getVisiblePages(activeImage + 1, images.length)

  return (
    <div className="min-h-screen bg-gray-100/80">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </motion.div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        <AnimatePresence mode="wait">
          {product && !loading && (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-6 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm"
            >
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="border-b border-gray-100 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-gray-50 to-white sm:h-80 lg:h-96">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={images[activeImage]}
                        src={images[activeImage]}
                        alt={product.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="max-h-full max-w-full object-contain"
                      />
                    </AnimatePresence>
                  </div>

                  {images.length > 1 && (
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveImage((i) => Math.max(0, i - 1))}
                        disabled={activeImage === 0}
                        className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ← Previous
                      </button>

                      {imagePages.map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setActiveImage(page - 1)}
                          className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold transition ${
                            page === activeImage + 1
                              ? 'bg-accent text-white shadow-md'
                              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => setActiveImage((i) => Math.min(images.length - 1, i + 1))}
                        disabled={activeImage === images.length - 1}
                        className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-bold text-gray-900 sm:text-3xl"
                  >
                    {product.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mt-3 text-3xl font-bold text-gray-900"
                  >
                    ${product.price}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3"
                  >
                    <StarRating rating={product.rating} size="lg" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mt-5 flex flex-wrap gap-3"
                  >
                    <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                      Brand: <span className="text-gray-900">{product.brand}</span>
                    </span>
                    <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                      Category:{' '}
                      <span className="capitalize text-gray-900">
                        {product.category.replace(/-/g, ' ')}
                      </span>
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                  >
                    <h2 className="text-lg font-bold text-gray-900">Description</h2>
                    <p className="mt-3 leading-relaxed text-gray-600">{product.description}</p>
                  </motion.div>

                  {product.reviews?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="mt-8"
                    >
                      <h2 className="text-lg font-bold text-gray-900">Reviews</h2>
                      <div className="mt-4 space-y-4">
                        {product.reviews.map((review, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
                          >
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                                {review.reviewerName.charAt(0)}
                              </div>
                              <div>
                                <span className="font-semibold text-gray-900">
                                  {review.reviewerName}
                                </span>
                                <div className="mt-0.5">
                                  <StarRating rating={review.rating} />
                                </div>
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600">
                              {review.comment}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
