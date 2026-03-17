import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

import BaskaLogo from './components/BaskaLogo'
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

const sectionComponents = {
  info: InfoSection,
  rooms: RoomsSection,
  dining: DiningSection,
  alacarte: AlacarteSection,
  bars: BarsSection,
  beach: BeachSection,
  spa: SpaSection,
  activities: ActivitiesSection,
  kids: KidsSection,
  services: ServicesSection,
  map: MapSection,
  important: ImportantSection
}

function App() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('info')

  const ActiveComponent = sectionComponents[activeSection]

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero / Header */}
      <header className="relative text-center pt-8 pb-4 px-5 bg-gradient-to-b from-white to-[var(--bg)]">
        {/* Decorative stripe at top */}
        <div className="absolute top-0 left-0 right-0 h-[6px]" style={{
          background: 'repeating-linear-gradient(90deg, #F5C518 0px, #F5C518 12px, #fff 12px, #fff 24px)'
        }} />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <BaskaLogo size={80} color="#0033A0" />
        </motion.div>

        {/* Resort subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[0.6rem] text-[var(--text-muted)] tracking-[0.25em] uppercase mt-1"
        >
          RESORT — BODRUM
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-['Cormorant_Garamond'] text-sm text-[var(--primary)] mt-2 italic"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Guest Guide badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="mt-3"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--primary)] text-white text-[0.65rem] font-medium tracking-wider">
            {t('hero.subtitle')}
          </span>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <LanguageSelector />
        </motion.div>
      </header>

      {/* Yellow stripe separator */}
      <div className="stripe-bar" />

      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Content */}
      <main className="max-w-[540px] mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-8">
        <div className="stripe-bar-thick" />
        <div className="bg-[var(--primary)] text-white py-8 px-6 text-center">
          <BaskaLogo size={50} color="#FFFFFF" className="mx-auto" />
          <p className="text-[0.6rem] tracking-[0.2em] uppercase mt-2 opacity-50">
            RESORT — BODRUM
          </p>
          <p className="font-['Cormorant_Garamond'] text-sm italic mt-2 opacity-70">
            {t('footer.tagline')}
          </p>
          <p className="text-[0.62rem] opacity-40 mt-4">
            {t('footer.address')}
          </p>
          <p className="text-[0.58rem] opacity-30 mt-1">
            © {new Date().getFullYear()} BAŞKA Resort Bodrum. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
