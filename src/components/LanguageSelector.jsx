import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const primaryLanguages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
]

const secondaryLanguages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' }
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
        flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[0.7rem]
        font-medium transition-all duration-300 cursor-pointer border
        ${isActive(lang.code)
          ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--bg-blue)] scale-105 shadow-sm'
          : 'border-[var(--card-border)] text-[var(--text-muted)] bg-transparent hover:border-[var(--primary)] hover:text-[var(--primary)]'
        }
      `}
    >
      <span className="text-sm">{lang.flag}</span>
      <span>{lang.label}</span>
    </button>
  )

  return (
    <div className="flex flex-col items-center gap-2.5 px-4">
      <div className="flex justify-center gap-2 flex-wrap">
        {primaryLanguages.map((lang) => (
          <LangButton key={lang.code} lang={lang} />
        ))}
      </div>

      {!showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="text-[0.65rem] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-1"
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
            className="flex justify-center gap-2 flex-wrap overflow-hidden"
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
