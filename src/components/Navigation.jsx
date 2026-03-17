import { useTranslation } from 'react-i18next'

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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[var(--card-border)] py-2.5 px-3 overflow-x-auto nav-scroll flex gap-1.5 justify-start">
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => onSectionChange(sec.id)}
          className={`
            flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.68rem]
            font-medium whitespace-nowrap cursor-pointer border transition-all duration-300
            ${activeSection === sec.id
              ? 'bg-[var(--primary)] text-white border-[var(--primary)] scale-105'
              : 'bg-transparent text-[var(--text-muted)] border-[var(--card-border)] hover:bg-[var(--bg-blue)] hover:text-[var(--primary)] hover:scale-105'
            }
          `}
        >
          <span className="text-xs">{sec.icon}</span>
          {t(`nav.${sec.id}`)}
        </button>
      ))}
    </nav>
  )
}
