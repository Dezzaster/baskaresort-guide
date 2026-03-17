import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' }
]

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  return (
    <div className="flex justify-center gap-[6px] flex-wrap px-4 mt-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.68rem]
            font-medium transition-all duration-300 cursor-pointer border
            ${i18n.language === lang.code || (i18n.language.startsWith(lang.code))
              ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--bg-blue)] scale-105'
              : 'border-[var(--card-border)] text-[var(--text-muted)] bg-transparent hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }
          `}
        >
          <span className="text-sm">{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  )
}
