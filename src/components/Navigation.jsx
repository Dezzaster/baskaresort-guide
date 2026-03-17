import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const sections = [
  { id: 'info', icon: '🏨' },
  { id: 'rooms', icon: '🛏️' },
  { id: 'dining', icon: '🍽️' },
  { id: 'alacarte', icon: '👨‍🍳' },
  { id: 'bars', icon: '☕' },
  { id: 'beach', icon: '🏖️' },
  { id: 'spa', icon: '🧖' },
  { id: 'activities', icon: '⛵' },
  { id: 'kids', icon: '👶' },
  { id: 'services', icon: '✨' },
  { id: 'map', icon: '🗺️' },
  { id: 'important', icon: '⚠️' }
]

export default function Navigation({ activeSection, onSectionChange }) {
  const { t } = useTranslation()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[var(--card-border)] py-3 px-3 overflow-x-auto nav-scroll flex gap-2 justify-start">
      {sections.map((sec) => (
        <motion.button
          key={sec.id}
          onClick={() => onSectionChange(sec.id)}
          whileTap={{ scale: 0.95 }}
          className={`
            flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.7rem]
            font-medium whitespace-nowrap cursor-pointer border transition-all duration-300
            ${activeSection === sec.id
              ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-md'
              : 'bg-transparent text-[var(--text-muted)] border-[var(--card-border)] hover:bg-[var(--bg-blue)] hover:text-[var(--primary)]'
            }
          `}
        >
          <span className="text-xs">{sec.icon}</span>
          {t(`nav.${sec.id}`)}
        </motion.button>
      ))}
    </nav>
  )
}
