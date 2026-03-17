import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const sections = [
  { id: 'info', icon: '🏨' },
  { id: 'wifi', icon: '📶' },
  { id: 'dining', icon: '🍽️' },
  { id: 'alacarte', icon: '👨‍🍳' },
  { id: 'bars', icon: '☕' },
  { id: 'beach', icon: '🏖️' },
  { id: 'spa', icon: '🧖' },
  { id: 'activities', icon: '⛵' },
  { id: 'kids', icon: '👶' },
  { id: 'services', icon: '✨' },
  { id: 'map', icon: '🗺️' },
  { id: 'rooms', icon: '🛏️' },
  { id: 'important', icon: '⚠️' }
]

export default function Navigation({ activeSection, onSectionChange }) {
  const { t } = useTranslation()

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-xl py-2.5 px-3 overflow-x-auto nav-scroll flex gap-2 justify-start">
      {sections.map((sec) => (
        <motion.button
          key={sec.id}
          onClick={() => onSectionChange(sec.id)}
          whileTap={{ scale: 0.95 }}
          className={`
            flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-[14px] text-[0.68rem]
            font-medium whitespace-nowrap cursor-pointer border transition-all duration-300
            ${activeSection === sec.id
              ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg'
              : 'bg-white/60 text-[var(--text-muted)] border-[var(--card-border)] hover:bg-white hover:text-[var(--primary)] hover:border-[var(--primary)]/30'
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
