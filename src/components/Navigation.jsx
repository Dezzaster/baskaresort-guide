import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const sections = [
  'info', 'wifi', 'dining', 'alacarte', 'bars', 'beach',
  'spa', 'activities', 'kids', 'services', 'map', 'rooms', 'important'
]

export default function Navigation({ activeSection, onSectionChange }) {
  const { t } = useTranslation()

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-xl py-3 px-4 overflow-x-auto nav-scroll flex gap-2 justify-start md:justify-center max-w-[680px] mx-auto">
      {sections.map((id) => (
        <motion.button
          key={id}
          onClick={() => onSectionChange(id)}
          whileTap={{ scale: 0.95 }}
          style={{ padding: '14px 36px' }}
          className={`
            flex-shrink-0 rounded-full text-[0.7rem]
            font-medium whitespace-nowrap cursor-pointer border transition-all duration-300
            ${activeSection === id
              ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg'
              : 'bg-white/60 text-[var(--text-muted)] border-[var(--card-border)] hover:bg-white hover:text-[var(--primary)] hover:border-[var(--primary)]/30'
            }
          `}
        >
          {t(`nav.${id}`)}
        </motion.button>
      ))}
    </nav>
  )
}
