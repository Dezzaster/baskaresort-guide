import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const primaryLanguages = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' }
]

const secondaryLanguages = [
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
  { code: 'pl', label: 'Polski' },
  { code: 'nl', label: 'Nederlands' }
]

export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const [showMore, setShowMore] = useState(false)

  const isActive = (code) =>
    i18n.language === code || i18n.language.startsWith(code)

  const LangButton = ({ lang }) => (
    <motion.button
      onClick={() => i18n.changeLanguage(lang.code)}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`
        rounded-full text-[0.7rem] font-medium cursor-pointer border-2 transition-all duration-300 flex-1 min-w-0
        ${isActive(lang.code)
          ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_2px_12px_rgba(0,51,160,0.35)]'
          : 'border-[var(--primary)] bg-[var(--primary)] text-white/90 hover:shadow-[0_2px_12px_rgba(0,51,160,0.25)]'
        }
      `}
      style={{ padding: '8px 4px' }}
    >
      {lang.label}
    </motion.button>
  )

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Blue background panel behind buttons */}
      <div className="w-full rounded-2xl bg-[var(--bg-blue)] border border-[var(--card-border)] p-3">
        <div className="grid grid-cols-4 gap-2">
          {primaryLanguages.map((lang) => (
            <LangButton key={lang.code} lang={lang} />
          ))}
        </div>

        {!showMore && (
          <button
            onClick={() => setShowMore(true)}
            className="w-full text-[0.68rem] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center justify-center gap-1 mt-2.5"
          >
            <span>+4</span>
            <span className="opacity-60">more languages</span>
          </button>
        )}

        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2"
            >
              <div className="grid grid-cols-4 gap-2">
                {secondaryLanguages.map((lang) => (
                  <LangButton key={lang.code} lang={lang} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
