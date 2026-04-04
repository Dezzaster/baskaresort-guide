import { useState, useEffect, useRef } from 'react'
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

// Tagline font per language group
const taglineFontMap = {
  en: "'Californian Signature', 'Dancing Script'", de: "'Californian Signature', 'Dancing Script'", fr: "'Californian Signature', 'Dancing Script'", pl: "'Californian Signature', 'Dancing Script'", nl: "'Californian Signature', 'Dancing Script'",
  tr: "'Californian Signature', 'Caveat'", ru: "'Caveat'",
  ar: "'Aref Ruqaa'"
}

function getTaglineFont(lang) {
  const base = lang?.split('-')[0] || 'en'
  return taglineFontMap[base] || taglineFontMap.en
}

function App() {
  const { t, i18n } = useTranslation()
  const [activeSection, setActiveSection] = useState('info')
  const [videoVisible, setVideoVisible] = useState(false)
  const [stripesReady, setStripesReady] = useState(false)
  const [stripeStyle, setStripeStyle] = useState({})
  const videoRef = useRef(null)
  const logoRef = useRef(null)
  const headerRef = useRef(null)

  const ActiveComponent = sectionComponents[activeSection]
  const basePath = import.meta.env.BASE_URL
  const taglineFont = getTaglineFont(i18n.language)

  // Calculate stripe width based on viewport
  const getStripeWidth = () => {
    const vw = window.innerWidth
    if (vw < 380) return vw * 0.14
    if (vw < 768) return vw * 0.135
    if (vw < 1200) return vw * 0.075
    return vw * 0.055
  }

  // Generate stripe gradient centered on logo tree
  const updateStripes = () => {
    const logo = logoRef.current
    const header = headerRef.current
    if (!logo || !header) return

    const logoRect = logo.getBoundingClientRect()
    const headerRect = header.getBoundingClientRect()
    const logoCenterX = logoRect.left + logoRect.width / 2 - headerRect.left
    const sw = getStripeWidth()
    const bgPosX = logoCenterX - sw * 1.5

    // Gold stays bright, white is semi-transparent so video shows through
    setStripeStyle({
      background: `repeating-linear-gradient(90deg, rgba(245,197,24,0.9) 0px, rgba(245,197,24,0.9) ${sw}px, rgba(255,255,255,0) ${sw}px, rgba(255,255,255,0) ${sw * 2}px)`,
      backgroundPositionX: `${bgPosX}px`,
      backgroundRepeat: 'repeat',
      backgroundSize: `${sw * 2}px 100%`,
    })
  }

  useEffect(() => {
    const stripeTimer = setTimeout(() => setStripesReady(true), 2800)
    const videoTimer = setTimeout(() => {
      setVideoVisible(true)
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
      }
    }, 2200)

    const ro = new ResizeObserver(() => updateStripes())
    if (logoRef.current) ro.observe(logoRef.current)
    window.addEventListener('resize', updateStripes)
    const imgLoadTimer = setTimeout(updateStripes, 100)

    return () => {
      clearTimeout(stripeTimer)
      clearTimeout(videoTimer)
      clearTimeout(imgLoadTimer)
      ro.disconnect()
      window.removeEventListener('resize', updateStripes)
    }
  }, [])

  const handleVideoEnd = () => {
    setVideoVisible(false)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header ref={headerRef} className="relative text-center pt-10 pb-0 bg-gradient-to-b from-white via-[#FFFBF0] to-[var(--bg)]" style={{ overflow: 'hidden' }}>

        {/* Background video */}
        <video
          ref={videoRef}
          src={`${basePath}baskavideo.mp4`}
          muted
          playsInline
          onEnded={handleVideoEnd}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: videoVisible ? 0.18 : 0,
            transition: 'opacity 1.5s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Vertical stripes — white semi-transparent so video shows through */}
        <div
          className="header-stripes"
          style={{
            ...stripeStyle,
            opacity: stripesReady ? 1 : 0,
          }}
        />

        {/* Content above stripes */}
        <div className="header-inner">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <img
              ref={logoRef}
              src={`${basePath}BASKA RESORT-LOGO.png`}
              alt="BAŞKA Resort Bodrum"
              className="header-logo"
              onLoad={updateStripes}
            />
          </motion.div>

          <motion.div
            initial={{ clipPath: 'inset(-10% 100% -10% 0)' }}
            animate={{ clipPath: 'inset(-10% 0% -10% 0)' }}
            transition={{ duration: 2, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[var(--primary)] mt-2 text-center"
            style={{ position: 'relative', zIndex: 3 }}
          >
            <p className="header-tagline" style={{ fontFamily: taglineFont }}>
              {t('hero.tagline').split('...')[0]}...
            </p>
            <p className="header-motto">
              {t('hero.tagline').split('...').slice(1).join('...').trim()}
            </p>
          </motion.div>
        </div>

        {/* Blue language section — full width edge to edge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="relative mt-4 w-full"
          style={{ zIndex: 2 }}
        >
          <div className="bg-[var(--primary)] w-full pt-5 pb-7">
            <div className="header-inner">
              <p className="text-[0.68rem] text-white/55 tracking-[0.3em] uppercase mb-3 text-center">
                {t('hero.subtitle')}
              </p>
              <LanguageSelector />
            </div>
          </div>
        </motion.div>
      </header>

      <div className="h-3" />

      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Content */}
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

      {/* Footer */}
      <footer className="mt-10">
        <div className="h-16 bg-gradient-to-b from-[var(--bg)] to-[#FFF5E0]" />
        <div className="stripe-bar-footer" />
        <div className="bg-[var(--primary)] text-white pt-20 pb-12 text-center">
          <div className="header-inner">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <img
                src={`${basePath}BASKA RESORT-LOGO.png`}
                alt="BAŞKA Resort Bodrum"
                className="h-32 w-auto brightness-0 invert"
              />
            </motion.div>

            <p className="italic mt-8 opacity-70" style={{ fontFamily: taglineFont, fontSize: '1.2rem' }}>
              {t('footer.tagline')}
            </p>

            <a
              href="https://www.baskaresort.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 px-7 py-2.5 rounded-full border border-white/30 text-[0.74rem] tracking-wider uppercase text-white/80 hover:bg-white/10 transition-all duration-300"
            >
              www.baskaresort.com
            </a>

            <p className="text-[0.68rem] mt-12" style={{ color: 'var(--gold-light)', opacity: 0.85 }}>
              © {new Date().getFullYear()} BAŞKA Resort Bodrum. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
