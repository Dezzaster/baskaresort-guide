import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const primaryLanguages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' }
]

const secondaryLanguages = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' }
]

export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const [showMore, setShowMore] = useState(false)
  const [flashingFlag, setFlashingFlag] = useState(null)
  const flashTimerRef = useRef(null)

  const isActive = (code) =>
    i18n.language === code || i18n.language.startsWith(code)

  const handleLangClick = (lang) => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current)
    setFlashingFlag(lang.code)
    flashTimerRef.current = setTimeout(() => setFlashingFlag(null), 900)
    i18n.changeLanguage(lang.code)
  }

  const LangButton = ({ lang }) => (
    <motion.button
      onClick={() => handleLangClick(lang)}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`
        rounded-full text-[0.72rem] font-medium cursor-pointer transition-all duration-300 flex-1 min-w-0
        bg-[var(--primary)] text-white relative overflow-hidden
        ${isActive(lang.code)
          ? 'border-2 border-white shadow-[0_2px_14px_rgba(255,255,255,0.3)]'
          : 'border border-white/40 hover:border-white/70'
        }
      `}
      style={{ padding: '9px 4px' }}
    >
      <AnimatePresence>
        {flashingFlag === lang.code && (
          <motion.span
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 flex items-center justify-center text-lg pointer-events-none"
          >
            {lang.flag}
          </motion.span>
        )}
      </AnimatePresence>
      <span style={{ opacity: flashingFlag === lang.code ? 0 : 1, transition: 'opacity 0.2s' }}>
        {lang.label}
      </span>
    </motion.button>
  )

  return (
    <div>
      <div className="grid grid-cols-4 gap-2.5">
        {primaryLanguages.map((lang) => (
          <LangButton key={lang.code} lang={lang} />
        ))}
      </div>

      {!showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="w-full text-[0.68rem] text-white/50 hover:text-white/80 transition-colors duration-300 flex items-center justify-center gap-1 mt-3"
        >
          <span>+4</span>
          <span className="opacity-70">more languages</span>
        </button>
      )}

      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="h-2" />
            <div className="grid grid-cols-4 gap-2.5">
              {secondaryLanguages.map((lang) => (
                <LangButton key={lang.code} lang={lang} />
              ))}
            </div>
            <div className="h-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
