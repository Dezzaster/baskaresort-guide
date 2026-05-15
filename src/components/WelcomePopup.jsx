import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const basePath = import.meta.env.BASE_URL

export default function WelcomePopup() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99998] flex flex-col items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-md mx-4 flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={`${basePath}popup1.jpg`}
              alt="Welcome to BAŞKA Resort"
              className="w-full rounded-2xl shadow-2xl"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            />
            <button
              onClick={() => setVisible(false)}
              className="mt-5 px-10 py-3.5 rounded-full bg-white text-[var(--primary)] font-semibold text-[0.9rem] tracking-wider uppercase shadow-lg hover:bg-white/90 transition-all duration-300 cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
