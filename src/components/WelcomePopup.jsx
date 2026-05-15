import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const basePath = import.meta.env.BASE_URL

const langPopupMap = {
  en: 'popup1.png',
  tr: 'popuptr.png',
  de: 'popupde.png',
  ru: 'popupru.png',
}

function PopupOverlay({ image, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[99998] flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
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
          src={`${basePath}${image}`}
          alt="Welcome to BAŞKA Resort"
          className="w-full rounded-2xl shadow-2xl"
          style={{ maxHeight: '85vh', objectFit: 'contain' }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function WelcomePopup({ show }) {
  const { i18n } = useTranslation()
  const [initialDismissed, setInitialDismissed] = useState(false)
  const [langPopup, setLangPopup] = useState(null)
  const prevLangRef = useRef(i18n.language?.split('-')[0] || 'en')

  useEffect(() => {
    const handleLangChange = (lng) => {
      const base = lng?.split('-')[0] || 'en'
      const prev = prevLangRef.current
      prevLangRef.current = base

      if (base !== prev && langPopupMap[base]) {
        setLangPopup(langPopupMap[base])
      }
    }

    i18n.on('languageChanged', handleLangChange)
    return () => i18n.off('languageChanged', handleLangChange)
  }, [i18n])

  const showInitial = show && !initialDismissed
  const showLang = !!langPopup

  if (!showInitial && !showLang) return null

  return (
    <AnimatePresence>
      {showLang ? (
        <PopupOverlay
          key="lang-popup"
          image={langPopup}
          onClose={() => setLangPopup(null)}
        />
      ) : showInitial ? (
        <PopupOverlay
          key="initial-popup"
          image="popup1.png"
          onClose={() => setInitialDismissed(true)}
        />
      ) : null}
    </AnimatePresence>
  )
}
