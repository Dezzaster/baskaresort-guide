import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP = '905307387764'

const requests = [
  { key: 'towels' },
  { key: 'minibar' },
  { key: 'cleaning' },
  { key: 'maintenance' },
  { key: 'pillows' },
  { key: 'wakeup' },
  { key: 'luggage' },
  { key: 'taxi' },
]

const maintenanceItems = [
  'ac', 'balcony', 'shower', 'water', 'lights', 'tv', 'safe', 'door'
]

export default function RequestsSection() {
  const { t } = useTranslation()
  const [room, setRoom] = useState(() => localStorage.getItem('baska_room') || '')
  const [showRoomInput, setShowRoomInput] = useState(false)
  const [showMaintenance, setShowMaintenance] = useState(false)
  const [pendingRequest, setPendingRequest] = useState(null)

  const doSend = (label) => {
    const msg = `🏨 ${t('requests.serviceRequest')}\n\n📋 ${label}\n🚪 ${t('requests.room')}: ${room.trim()}\n\n— BAŞKA Guest Guide`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleRequest = (key) => {
    if (key === 'maintenance') {
      if (!room.trim()) {
        setPendingRequest('__maintenance__')
        setShowRoomInput(true)
        return
      }
      setShowMaintenance(true)
      return
    }

    if (!room.trim()) {
      setPendingRequest(key)
      setShowRoomInput(true)
      return
    }
    doSend(t(`requests.${key}`))
  }

  const handleMaintenanceSelect = (item) => {
    setShowMaintenance(false)
    doSend(`${t('requests.maintenance')} — ${t(`requests.mt_${item}`)}`)
  }

  const handleRoomSubmit = () => {
    if (!room.trim()) return
    localStorage.setItem('baska_room', room.trim())
    setShowRoomInput(false)
    if (pendingRequest === '__maintenance__') {
      setPendingRequest(null)
      setTimeout(() => setShowMaintenance(true), 150)
    } else if (pendingRequest) {
      const key = pendingRequest
      setPendingRequest(null)
      setTimeout(() => doSend(t(`requests.${key}`)), 100)
    }
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('requests.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('requests.subtitle')}</p>

      <div className="grid grid-cols-2 gap-3.5">
        {requests.map((req, i) => (
          <motion.button
            key={req.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleRequest(req.key)}
            className="py-5 px-4 bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-2xl shadow-[var(--shadow)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer"
          >
            <span className="text-[0.82rem] font-medium text-[var(--text-dark)] tracking-wide">{t(`requests.${req.key}`)}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-[0.65rem] text-[var(--text-muted)] opacity-60 text-center mt-8 tracking-wide">
        {t('requests.whatsappNote')}
      </p>

      {/* Room Number Modal */}
      <AnimatePresence>
        {showRoomInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-6"
            onClick={() => { setShowRoomInput(false); setPendingRequest(null) }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl max-w-xs w-full shadow-2xl"
              style={{ padding: '36px 32px 28px' }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)] text-[1.1rem] mb-5">{t('requests.enterRoom')}</h3>
              <input
                type="text"
                value={room}
                onChange={e => setRoom(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRoomSubmit()}
                placeholder="405"
                autoFocus
                className="w-full border border-[rgba(0,51,160,0.12)] rounded-xl px-5 py-3.5 text-center text-lg font-semibold text-[var(--primary)] outline-none focus:border-[var(--primary)]/30 mb-5 transition-colors"
              />
              <button
                onClick={handleRoomSubmit}
                className="w-full py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-[0.8rem] cursor-pointer"
              >
                {t('requests.confirm')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Maintenance Subcategory Modal */}
      <AnimatePresence>
        {showMaintenance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-6"
            onClick={() => setShowMaintenance(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm shadow-2xl"
              style={{ padding: '36px 28px 28px' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)] text-[1.1rem]">
                  {t('requests.maintenanceSelect')}
                </h3>
                <button onClick={() => setShowMaintenance(false)} className="text-[var(--text-muted)]/50 text-lg cursor-pointer">✕</button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {maintenanceItems.map(item => (
                  <button
                    key={item}
                    onClick={() => handleMaintenanceSelect(item)}
                    className="py-4 px-3 bg-[var(--bg)]/80 border border-[rgba(0,51,160,0.06)] rounded-xl text-[0.78rem] font-medium text-[var(--text-dark)] hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/15 transition-all duration-200 cursor-pointer"
                  >
                    {t(`requests.mt_${item}`)}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
