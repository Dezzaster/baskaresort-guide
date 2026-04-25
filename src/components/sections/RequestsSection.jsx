import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP = '905307387764'

const requestKeys = [
  'towels', 'minibar', 'cleaning', 'maintenance',
  'pillows', 'wakeup', 'luggage', 'taxi',
  'lateCheckout', 'laundry'
]

const maintenanceItems = ['ac', 'balcony', 'shower', 'water', 'lights', 'tv', 'safe', 'door']

export default function RequestsSection() {
  const { t } = useTranslation()
  const [showMaintenance, setShowMaintenance] = useState(false)
  const [showPillowSelect, setShowPillowSelect] = useState(false)
  const [showLaundry, setShowLaundry] = useState(false)
  const [laundryComment, setLaundryComment] = useState('')

  const doSend = (label, extra = '') => {
    const ticket = '№' + Math.floor(10000 + Math.random() * 90000)
    const msg = [
      `🏨 ${t('requests.serviceRequest')} ${ticket}`,
      '',
      `📋 ${label}`,
      extra ? `💬 ${extra}` : '',
      '',
      '— BAŞKA Guest Guide'
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleRequest = (key) => {
    if (key === 'maintenance') { setShowMaintenance(true); return }
    if (key === 'pillows') { setShowPillowSelect(true); return }
    if (key === 'laundry') { setShowLaundry(true); return }
    if (key === 'lateCheckout') {
      doSend(`${t('requests.lateCheckout')} — €20/h`)
    } else {
      doSend(t(`requests.${key}`))
    }
  }

  const handleMaintenanceSelect = (item) => {
    setShowMaintenance(false)
    doSend(`${t('requests.maintenance')} — ${t(`requests.mt_${item}`)}`)
  }

  const handlePillowSelect = (type) => {
    setShowPillowSelect(false)
    doSend(`${t('requests.pillows')} — ${t(`requests.pillow${type}`)}`)
  }

  const handleLaundrySend = () => {
    setShowLaundry(false)
    doSend(t('requests.laundry'), laundryComment.trim())
    setLaundryComment('')
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('requests.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('requests.subtitle')}</p>

      <div className="grid grid-cols-2 gap-3.5">
        {requestKeys.map((key, i) => (
          <motion.button
            key={key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleRequest(key)}
            className="py-5 px-4 bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-2xl shadow-[var(--shadow)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer"
          >
            <span className="text-[0.82rem] font-medium text-[var(--text-dark)] tracking-wide">{t(`requests.${key}`)}</span>
            {key === 'lateCheckout' && (
              <span className="block text-[0.62rem] text-[var(--gold-dark)] mt-1">{t('requests.lateCheckoutNote')}</span>
            )}
          </motion.button>
        ))}
      </div>

      <p className="text-[0.65rem] text-[var(--text-muted)] opacity-60 text-center mt-8 tracking-wide">
        {t('requests.whatsappNote')}
      </p>

      {/* Maintenance Modal */}
      <AnimatePresence>
        {showMaintenance && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-6"
            onClick={() => setShowMaintenance(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm shadow-2xl"
              style={{ padding: '36px 28px 28px' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)] text-[1.1rem]">{t('requests.maintenanceSelect')}</h3>
                <button onClick={() => setShowMaintenance(false)} className="text-[var(--text-muted)]/50 text-lg cursor-pointer">✕</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {maintenanceItems.map(item => (
                  <button key={item} onClick={() => handleMaintenanceSelect(item)}
                    className="py-4 px-3 bg-[var(--bg)]/80 border border-[rgba(0,51,160,0.06)] rounded-xl text-[0.78rem] font-medium text-[var(--text-dark)] hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/15 transition-all duration-200 cursor-pointer">
                    {t(`requests.mt_${item}`)}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pillow Select Modal */}
      <AnimatePresence>
        {showPillowSelect && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-6"
            onClick={() => setShowPillowSelect(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-xs shadow-2xl"
              style={{ padding: '36px 28px 28px' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)] text-[1.1rem]">{t('requests.pillowSelect')}</h3>
                <button onClick={() => setShowPillowSelect(false)} className="text-[var(--text-muted)]/50 text-lg cursor-pointer">✕</button>
              </div>
              <div className="space-y-3">
                <button onClick={() => handlePillowSelect('Regular')}
                  className="w-full py-4 px-4 bg-[var(--bg)]/80 border border-[rgba(0,51,160,0.06)] rounded-xl text-[0.82rem] font-medium text-[var(--text-dark)] hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/15 transition-all duration-200 cursor-pointer">
                  {t('requests.pillowRegular')}
                </button>
                <button onClick={() => handlePillowSelect('Orthopedic')}
                  className="w-full py-4 px-4 bg-[var(--bg)]/80 border border-[rgba(0,51,160,0.06)] rounded-xl text-[0.82rem] font-medium text-[var(--text-dark)] hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/15 transition-all duration-200 cursor-pointer">
                  {t('requests.pillowOrthopedic')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Laundry Modal */}
      <AnimatePresence>
        {showLaundry && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-6"
            onClick={() => setShowLaundry(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm shadow-2xl"
              style={{ padding: '36px 28px 28px' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)] text-[1.1rem]">{t('requests.laundry')}</h3>
                <button onClick={() => setShowLaundry(false)} className="text-[var(--text-muted)]/50 text-lg cursor-pointer">✕</button>
              </div>
              <div>
                <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('requests.laundryComment')}</label>
                <textarea
                  value={laundryComment} onChange={e => setLaundryComment(e.target.value)}
                  placeholder={t('requests.laundryPlaceholder')} rows={3} autoFocus
                  className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none resize-none focus:border-[var(--primary)]/30 transition-colors"
                />
              </div>
              <button onClick={handleLaundrySend}
                className="mt-5 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-semibold text-[0.82rem] flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors cursor-pointer">
                💬 {t('alacarte.sendWhatsapp')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
