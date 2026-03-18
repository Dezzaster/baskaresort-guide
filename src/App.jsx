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
      {/* Header — full width */}
      <header className="relative text-center pt-16 pb-10 px-8 bg-gradient-to-b from-white to-[var(--bg)]">
        <div className="absolute top-0 left-0 right-0 h-[6px]" style={{
          background: 'repeating-linear-gradient(90deg, #F5C518 0px, #F5C518 12px, #fff 12px, #fff 24px)'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
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
          className="text-[0.72rem] text-[var(--text-muted)] tracking-[0.3em] uppercase mt-2"
        >
          RESORT — BODRUM
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-['Cormorant_Garamond'] text-[1.15rem] text-[var(--primary)] mt-8 italic leading-relaxed max-w-[380px] mx-auto"
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
      </header>

      {/* Yellow stripe — full width */}
      <div className="stripe-bar" />

      {/* Spacer between stripe and nav */}
      <div className="h-3" />

      {/* Sticky Navigation — full width, centered on desktop */}
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Content — centered, generous side margins */}
      <main className="max-w-[520px] mx-auto px-8 pt-10 pb-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer — full width */}
      <footer className="mt-10">
        <div className="stripe-bar-thick" />
        <div className="bg-[var(--primary)] text-white py-16 px-10 text-center">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
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
      </footer>
    </div>
  )
}

export default App
