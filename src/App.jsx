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

const sectionComponents = {
  info: InfoSection,
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
      {/* Hero / Header */}
      <header className="relative text-center pt-10 pb-8 px-6 bg-gradient-to-b from-white to-[var(--bg)]">
        {/* Decorative stripe at top */}
        <div className="absolute top-0 left-0 right-0 h-[6px]" style={{
          background: 'repeating-linear-gradient(90deg, #F5C518 0px, #F5C518 12px, #fff 12px, #fff 24px)'
        }} />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <img
            src={`${basePath}logobaska.png`}
            alt="BAŞKA Resort Bodrum"
            className="h-24 w-auto object-contain"
          />
        </motion.div>

        {/* Resort subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-[0.6rem] text-[var(--text-muted)] tracking-[0.3em] uppercase mt-3"
        >
          RESORT — BODRUM
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-16 h-[1px] bg-[var(--gold)] mx-auto mt-3"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-['Cormorant_Garamond'] text-base text-[var(--primary)] mt-4 italic leading-relaxed"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Guest Guide badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-5"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-[var(--primary)] text-white text-[0.65rem] font-medium tracking-wider uppercase">
            {t('hero.subtitle')}
          </span>
        </motion.div>

        {/* Language Selector - more space from badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-7"
        >
          <LanguageSelector />
        </motion.div>
      </header>

      {/* Yellow stripe separator */}
      <div className="stripe-bar" />

      {/* Navigation - more padding top from stripe */}
      <div className="pt-3">
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Content */}
      <main className="max-w-[540px] mx-auto px-6 py-8">
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

      {/* Footer */}
      <footer className="mt-12">
        <div className="stripe-bar-thick" />
        <div className="bg-[var(--primary)] text-white py-10 px-6 text-center">
          <motion.img
            src={`${basePath}logobaska.png`}
            alt="BAŞKA"
            className="h-14 w-auto mx-auto brightness-0 invert"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-[0.6rem] tracking-[0.25em] uppercase mt-3 opacity-50">
            RESORT — BODRUM
          </p>
          <p className="font-['Cormorant_Garamond'] text-sm italic mt-3 opacity-70">
            {t('footer.tagline')}
          </p>

          {/* Website link */}
          <a
            href="https://www.baskaresort.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-1.5 rounded-full border border-white/30 text-[0.65rem] tracking-wider uppercase text-white/80 hover:bg-white/10 transition-all duration-300"
          >
            www.baskaresort.com
          </a>

          <p className="text-[0.62rem] opacity-40 mt-5">
            {t('footer.address')}
          </p>
          <p className="text-[0.58rem] opacity-30 mt-1.5">
            © {new Date().getFullYear()} BAŞKA Resort Bodrum. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
