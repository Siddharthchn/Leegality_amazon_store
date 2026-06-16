import { motion } from 'framer-motion'

export default function ErrorMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-red-200 bg-red-50 px-6 py-4"
    >
      <p className="font-semibold text-red-800">Something went wrong</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>
    </motion.div>
  )
}
