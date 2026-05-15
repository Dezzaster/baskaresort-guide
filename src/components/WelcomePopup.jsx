import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const basePath = import.meta.env.BASE_URL

export default function WelcomePopup({ show }) {
  const [dismissed, setDismissed] = useState(false)

  if (!show || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[99998] flex flex-col items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.85)' }}
        onClick={() => setDismissed(true)}
      >
        <button
          onClick={() => setDismissed(true)}
          className="fixed top-5 right-5 z-[99999] text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
          style={{ fontSize: '2.5rem', lineHeight: 1, background: 'none', border: 'none', padding: '8px' }}
        >
          ✕
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full max-w-md mx-4 flex flex-col items-center"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={`${basePath}popup1.png`}
            alt="Welcome to BAŞKA Resort"
            className="w-full rounded-2xl shadow-2xl"
            style={{ maxHeight: '85vh', objectFit: 'contain' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
