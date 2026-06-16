import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StarRating from './StarRating'

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm transition-shadow hover:border-gray-300 hover:shadow-lg"
      >
        <div className="relative flex h-48 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white p-5">
          <motion.img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-gray-100 p-4">
          <h3 className="line-clamp-2 h-10 text-sm font-semibold leading-snug text-gray-900 transition group-hover:text-accent sm:h-11 sm:text-base">
            {product.title}
          </h3>
          <p className="mt-2 shrink-0 text-lg font-bold text-gray-900">${product.price}</p>
          <div className="mt-auto shrink-0 pt-2">
            <StarRating rating={product.rating} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
