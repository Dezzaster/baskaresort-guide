import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSelector from '../components/LanguageSelector'

const basePath = import.meta.env.BASE_URL

const restaurants = [
  {
    key: 'fish',
    code: 'A-1',
    emoji: '🐟',
    menus: [
      { id: 'fish-dinner', label: 'dinnerMenu', file: 'Kıyıda A La Carte Dinner Menu Kopyası.pdf' },
      { id: 'fish-lunch', label: 'lunchMenu', file: 'Kıyıda A La Carte Lunch Menu.pdf' },
    ],
  },
  {
    key: 'teppanyaki',
    code: 'A-2',
    emoji: '🥢',
    menus: [
      { id: 'teppanyaki-dinner', label: 'dinnerMenu', file: 'Kai Teppanyaki A La Carte Dinner Menu.pdf' },
    ],
  },
  {
    key: 'italian',
    code: 'A-3',
    emoji: '🍝',
    menus: [
      { id: 'italian-dinner', label: 'dinnerMenu', file: 'Lento Italian A La Carte Dinner Menu.pdf' },
    ],
  },
  {
    key: 'daima',
    code: '',
    emoji: '🍽️',
    menus: [
      { id: 'daima', label: 'viewMenu', file: 'Daima Restaurant Menu.pdf' },
    ],
  },
]

const drinkMenus = [
  { id: 'beverages', label: 'beverageMenu', file: 'Beverage Menu.pdf', emoji: '🍹' },
  { id: 'wine', label: 'wineMenu', file: 'Wine Menu.pdf', emoji: '🍷' },
]

function PdfViewer({ file, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[99998] flex flex-col"
      style={{ background: 'rgba(0,0,0,0.92)' }}
    >
      <div className="flex items-center justify-between px-4 py-3" style={{ background: 'rgba(0,51,160,0.95)' }}>
        <span className="text-white text-[0.8rem] font-medium truncate flex-1 mr-3">
          {file.replace('.pdf', '').replace(/ Kopyası/, '')}
        </span>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors cursor-pointer"
          style={{ fontSize: '1.5rem', lineHeight: 1, background: 'none', border: 'none', padding: '4px 8px' }}
        >
          ✕
        </button>
      </div>
      <iframe
        src={`${basePath}${file}`}
        className="flex-1 w-full"
        style={{ border: 'none', background: '#fff' }}
        title="Menu PDF"
      />
    </motion.div>
  )
}

function DrinkFloatingButtons({ onOpen, activePdf }) {
  if (activePdf) return null

  return (
    <div className="fixed bottom-6 right-4 z-[9997] flex flex-col gap-3">
      {drinkMenus.map((d) => (
        <motion.button
          key={d.id}
          whileTap={{ scale: 0.93 }}
          onClick={() => onOpen(d.file)}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center cursor-pointer"
          style={{
            background: d.id === 'wine' ? 'linear-gradient(135deg, #722F37, #9B2335)' : 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            border: '2px solid rgba(255,255,255,0.2)',
          }}
          title={d.label}
        >
          <span style={{ fontSize: '1.4rem' }}>{d.emoji}</span>
        </motion.button>
      ))}
    </div>
  )
}

export default function MenuPage() {
  const { t, i18n } = useTranslation()
  const [activePdf, setActivePdf] = useState(null)
  const [drinkOverlay, setDrinkOverlay] = useState(null)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    for (const r of restaurants) {
      const m = r.menus.find((m) => m.id === hash)
      if (m) { setActivePdf(m.file); return }
    }
    const d = drinkMenus.find((d) => d.id === hash)
    if (d) setActivePdf(d.file)
  }, [])

  const openDrinkOverlay = (file) => setDrinkOverlay(file)
  const closeDrinkOverlay = () => setDrinkOverlay(null)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFFDF5 0%, #FFF8EC 50%, #FFFDF5 100%)' }}>
      {/* Header */}
      <header className="text-center" style={{ paddingTop: '40px', paddingBottom: '24px', background: 'linear-gradient(180deg, #fff 0%, #FFFBF0 100%)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <img
            src={`${basePath}BASKA RESORT-LOGO.png`}
            alt="BAŞKA Resort Bodrum"
            style={{ height: '80px', width: 'auto' }}
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)] mt-4"
          style={{ fontSize: '1.6rem' }}
        >
          {t('menuPage.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[0.74rem] text-[var(--text-muted)] mt-1"
        >
          {t('menuPage.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <LanguageSelector />
        </motion.div>
      </header>

      {/* Drink menus bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex gap-3 px-5 mb-6"
        style={{ maxWidth: '480px', margin: '0 auto', paddingTop: '16px' }}
      >
        {drinkMenus.map((d) => (
          <button
            key={d.id}
            onClick={() => setActivePdf(d.file)}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl text-white text-[0.78rem] font-medium cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{
              paddingTop: '18px',
              paddingBottom: '18px',
              background: d.id === 'wine' ? 'linear-gradient(135deg, #722F37, #9B2335)' : 'linear-gradient(135deg, var(--primary), var(--primary-light))',
              border: 'none',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{d.emoji}</span>
            {t(`menu.${d.label}`)}
          </button>
        ))}
      </motion.div>

      {/* Restaurant cards */}
      <div className="px-5 pb-10" style={{ maxWidth: '480px', margin: '0 auto' }}>
        {restaurants.map((r, i) => (
          <motion.div
            key={r.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl mb-4 overflow-hidden"
            style={{
              border: '1px solid rgba(0,51,160,0.08)',
              boxShadow: '0 2px 20px rgba(0,51,160,0.05)',
            }}
          >
            <div
              className="flex items-center gap-3 px-5"
              style={{
                paddingTop: '18px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(0,51,160,0.06)',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{r.emoji}</span>
              <div className="flex-1">
                <h3 className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)]" style={{ fontSize: '1.15rem' }}>
                  {r.key === 'daima' ? 'Daima Restaurant' : t(`alacarte.${r.key}`)}
                </h3>
                {r.code && (
                  <span className="text-[0.65rem] text-[var(--text-muted)]">{r.code}</span>
                )}
              </div>
            </div>

            <div className="px-5" style={{ paddingTop: '14px', paddingBottom: '18px' }}>
              <div className={`grid gap-2 ${r.menus.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {r.menus.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActivePdf(m.file)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--primary)]/15 text-[var(--primary)] text-[0.74rem] font-medium cursor-pointer hover:bg-[var(--bg-blue)] transition-colors"
                    style={{ paddingTop: '20px', paddingBottom: '20px', background: 'none' }}
                  >
                    📋 {t(`menu.${m.label}`)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer link back to guide */}
      <div className="text-center pb-8">
        <a
          href={basePath}
          className="text-[0.72rem] text-[var(--primary)] opacity-60 hover:opacity-100 transition-opacity"
        >
          ← {t('menuPage.backToGuide')}
        </a>
      </div>

      {/* Floating drink buttons */}
      <DrinkFloatingButtons onOpen={openDrinkOverlay} activePdf={activePdf} />

      {/* Drink mini overlay */}
      <AnimatePresence>
        {drinkOverlay && !activePdf && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 z-[9998] w-72 rounded-2xl overflow-hidden shadow-2xl"
            style={{ height: '60vh', border: '2px solid rgba(0,51,160,0.15)' }}
          >
            <div className="flex items-center justify-between px-3 py-2" style={{ background: 'var(--primary)' }}>
              <span className="text-white text-[0.7rem] font-medium truncate">
                {drinkOverlay.replace('.pdf', '')}
              </span>
              <button
                onClick={closeDrinkOverlay}
                className="text-white/80 hover:text-white cursor-pointer"
                style={{ fontSize: '1.2rem', background: 'none', border: 'none', padding: '2px 6px' }}
              >
                ✕
              </button>
            </div>
            <iframe
              src={`${basePath}${drinkOverlay}`}
              className="w-full"
              style={{ height: 'calc(100% - 36px)', border: 'none', background: '#fff' }}
              title="Drink Menu"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main PDF viewer overlay */}
      <AnimatePresence>
        {activePdf && (
          <PdfViewer file={activePdf} onClose={() => setActivePdf(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
