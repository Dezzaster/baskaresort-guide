import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const primaryLanguages = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ru', label: 'Русский' },
  { code: 'de', label: 'Deutsch' }
]

const secondaryLanguages = [
  { code: 'fr', label: 'Français' },
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
    <button
      onClick={() => i18n.changeLanguage(lang.code)}
      className={`
        px-7 py-3 rounded-full text-[0.72rem]
        font-medium transition-all duration-300 cursor-pointer border
        ${isActive(lang.code)
          ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--bg-blue)] scale-105 shadow-sm'
          : 'border-[var(--card-border)] text-[var(--text-muted)] bg-transparent hover:border-[var(--primary)] hover:text-[var(--primary)]'
        }
      `}
    >
      {lang.label}
    </button>
  )

  return (
    <div className="flex flex-col items-center gap-3 px-4">
      <div className="flex justify-center gap-2.5 flex-wrap">
        {primaryLanguages.map((lang) => (
          <LangButton key={lang.code} lang={lang} />
        ))}
      </div>

      {!showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="text-[0.68rem] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-1"
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
            className="flex justify-center gap-2.5 flex-wrap overflow-hidden"
          >
            {secondaryLanguages.map((lang) => (
              <LangButton key={lang.code} lang={lang} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
