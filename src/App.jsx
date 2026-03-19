import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

import LanguageSelector from './components/LanguageSelector'
import Navigation from './components/Navigation'

import InfoSection from './components/sections/InfoSection'
import RoomsSection from './components/sections/RoomsSection'
import DiningSection from './components/sections/DiningSection'
import AlacarteSection from './components/sections/AlacarteSection'
import BarsSection from './components/sections/BarsSection'
import BeachSection from './components/sections/BeachSection'
import SpaSection from './components/sections/SpaSection'
import ActivitiesSection from './components/sections/ActivitiesSection'
import KidsSection from './components/sections/KidsSection'
import ServicesSection from './components/sections/ServicesSection'
import MapSection from './components/sections/MapSection'
import ImportantSection from './components/sections/ImportantSection'
import WifiSection from './components/sections/WifiSection'

const sectionComponents = {
  info: InfoSection,
  wifi: WifiSection,
  dining: DiningSection,
  alacarte: AlacarteSection,
  bars: BarsSection,
  beach: BeachSection,
  spa: SpaSection,
  activities: ActivitiesSection,
  kids: KidsSection,
  services: ServicesSection,
  map: MapSection,
  rooms: RoomsSection,
  important: ImportantSection
}

function App() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('info')

  const ActiveComponent = sectionComponents[activeSection]
  const basePath = import.meta.env.BASE_URL

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header — full width, centered content */}
      <header className="relative text-center pt-16 pb-10 bg-gradient-to-b from-white via-[#FFFBF0] to-[var(--bg)]" style={{ overflow: 'hidden' }}>
        {/* Top gold stripe */}
        <div className="absolute top-0 left-0 right-0 h-[6px]" style={{
          background: 'repeating-linear-gradient(90deg, #F5C518 0px, #F5C518 12px, #fff 12px, #fff 24px)'
        }} />

        {/* Decorative thick vertical stripes background */}
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(90deg, rgba(245,197,24,0.04) 0px, rgba(245,197,24,0.04) 45px, transparent 45px, transparent 100px)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 8%', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <img
              src={`${basePath}logobaska.png`}
              alt="BAŞKA Resort Bodrum"
              className="h-36 w-auto object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-[0.72rem] text-[var(--text-muted)] tracking-[0.3em] uppercase"
            style={{ marginTop: '-4px' }}
          >
            RESORT — BODRUM
          </motion.p>

          <motion.p
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 2, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-['Cormorant_Garamond'] text-[1.15rem] text-[var(--primary)] mt-8 italic leading-relaxed"
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-[0.78rem] text-[var(--text-muted)] tracking-[0.35em] uppercase mt-8"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-10"
          >
            <LanguageSelector />
          </motion.div>
        </div>
      </header>

      {/* Yellow stripe — full width */}
      <div className="stripe-bar" />

      {/* Spacer */}
      <div className="h-3" />

      {/* Sticky Navigation — full width, centered */}
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Content — centered with proportional side padding */}
      <main className="content-container" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, #FFF8EC 30%, #FFF8EC 70%, var(--bg) 100%)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer — full width, centered content */}
      <footer className="mt-10">
        <div className="h-16 bg-gradient-to-b from-[var(--bg)] to-[#FFF5E0]" />
        <div className="stripe-bar-thick" />
        <div className="bg-[var(--primary)] text-white py-16 text-center">
          <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 8%' }}>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <img
                src={`${basePath}logobaska.png`}
                alt="BAŞKA"
                className="h-24 w-auto brightness-0 invert"
              />
            </motion.div>
            <p className="text-[0.72rem] tracking-[0.25em] uppercase mt-5 opacity-50">
              RESORT — BODRUM
            </p>
            <p className="font-['Cormorant_Garamond'] text-lg italic mt-6 opacity-70">
              {t('footer.tagline')}
            </p>

            <a
              href="https://www.baskaresort.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-7 py-2.5 rounded-full border border-white/30 text-[0.74rem] tracking-wider uppercase text-white/80 hover:bg-white/10 transition-all duration-300"
            >
              www.baskaresort.com
            </a>

            <p className="text-[0.65rem] opacity-30 mt-10">
              © {new Date().getFullYear()} BAŞKA Resort Bodrum. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
