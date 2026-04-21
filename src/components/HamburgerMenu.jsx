import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  'info', 'wifi', 'dining', 'alacarte', 'bars', 'requests', 'beach',
  'spa', 'activities', 'kids', 'services', 'rooms', 'important', 'flight'
]

export default function HamburgerMenu({ activeSection, onSectionChange }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleSelect = (id) => {
    onSectionChange(id)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute left-5 top-10 z-[5] p-2.5 cursor-pointer"
        aria-label="Menu"
      >
        <div className="w-[22px] flex flex-col gap-[5px]">
          <span className="block h-[1.5px] w-full bg-[var(--primary)] rounded-full" />
          <span className="block h-[1.5px] w-[70%] bg-[var(--primary)] rounded-full" />
          <span className="block h-[1.5px] w-full bg-[var(--primary)] rounded-full" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] bg-[var(--primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-8 right-6 text-white/60 text-2xl cursor-pointer hover:text-white transition-colors"
              aria-label={t('menu.close')}
            >
              ✕
            </button>

            <nav className="flex flex-col items-center gap-1 max-h-[80vh] overflow-y-auto py-4">
              {sections.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={(e) => { e.stopPropagation(); handleSelect(id) }}
                  className={`
                    py-2.5 px-8 rounded-full text-[0.9rem] tracking-wide cursor-pointer transition-all duration-200
                    ${activeSection === id
                      ? 'text-white font-medium bg-white/15'
                      : 'text-white/60 hover:text-white/90'}
                  `}
                >
                  {t(`nav.${id}`)}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
