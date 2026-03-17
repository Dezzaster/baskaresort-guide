import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const sections = [
  { id: 'info', icon: '🏨' },
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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[var(--card-border)] py-3.5 px-4 overflow-x-auto nav-scroll flex gap-2.5 justify-start">
      {sections.map((sec) => (
        <motion.button
          key={sec.id}
          onClick={() => onSectionChange(sec.id)}
          whileTap={{ scale: 0.95 }}
          className={`
            flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-[0.7rem]
            font-medium whitespace-nowrap cursor-pointer transition-all duration-300
            ${activeSection === sec.id
              ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
              : 'bg-[var(--bg-blue)] text-[var(--text-muted)] hover:bg-[rgba(0,51,160,0.08)] hover:text-[var(--primary)]'
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
