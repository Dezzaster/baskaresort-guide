import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

export default function InstallPrompt() {
  const { t } = useTranslation()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showIosModal, setShowIosModal] = useState(false)
  const [isIos, setIsIos] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) return
    if (localStorage.getItem('baska_pwa_dismissed')) return

    const iosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    setIsIos(iosDevice)

    if (iosDevice) {
      const timer = setTimeout(() => setShowBanner(true), 4000)
      return () => clearTimeout(timer)
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setTimeout(() => setShowBanner(true), 4000)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (isIos) {
      setShowIosModal(true)
      return
    }
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') setShowBanner(false)
      setDeferredPrompt(null)
    }
  }

  const dismiss = () => {
    setShowBanner(false)
    setShowIosModal(false)
    localStorage.setItem('baska_pwa_dismissed', '1')
  }

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
          >
            <div className="bg-[var(--primary)] text-white rounded-2xl shadow-2xl flex flex-col items-center gap-3" style={{ padding: '20px 28px', width: '42%', minWidth: '200px', maxWidth: '320px' }}>
              <div className="text-center">
                <div className="font-semibold text-[0.78rem]">{t('pwa.title')}</div>
                <div className="text-[0.65rem] text-white/60 mt-1">{t('pwa.subtitle')}</div>
              </div>
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-white text-[var(--primary)] py-2.5 rounded-xl text-[0.72rem] font-semibold cursor-pointer"
                >
                  {t('pwa.install')}
                </button>
                <button onClick={dismiss} className="text-white/40 text-sm cursor-pointer px-1">✕</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showIosModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center p-6"
            onClick={dismiss}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl max-w-sm w-full shadow-2xl"
              style={{ padding: '36px 32px 28px' }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-semibold text-[var(--primary)] text-center text-[0.95rem] mb-6">{t('pwa.iosTitle')}</h3>
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--primary)]/8 flex items-center justify-center text-xs font-bold text-[var(--primary)] flex-shrink-0">1</span>
                  <span className="text-[0.8rem] text-[var(--text-dark)]">{t('pwa.iosStep1')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--primary)]/8 flex items-center justify-center text-xs font-bold text-[var(--primary)] flex-shrink-0">2</span>
                  <span className="text-[0.8rem] text-[var(--text-dark)]">{t('pwa.iosStep2')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--primary)]/8 flex items-center justify-center text-xs font-bold text-[var(--primary)] flex-shrink-0">3</span>
                  <span className="text-[0.8rem] text-[var(--text-dark)]">{t('pwa.iosStep3')}</span>
                </div>
              </div>
              <button
                onClick={dismiss}
                className="w-full py-3.5 rounded-xl bg-[var(--primary)] text-white text-[0.8rem] font-semibold cursor-pointer"
              >
                {t('pwa.gotIt')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
