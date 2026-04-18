import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP = '905307387764'

const requests = [
  { key: 'towels', icon: '🛁' },
  { key: 'minibar', icon: '🧊' },
  { key: 'cleaning', icon: '🧹' },
  { key: 'maintenance', icon: '🔧' },
  { key: 'pillows', icon: '🛏️' },
  { key: 'wakeup', icon: '⏰' },
  { key: 'luggage', icon: '🧳' },
  { key: 'taxi', icon: '🚕' },
]

export default function RequestsSection() {
  const { t } = useTranslation()
  const [room, setRoom] = useState(() => localStorage.getItem('baska_room') || '')
  const [showRoomInput, setShowRoomInput] = useState(false)
  const [pendingRequest, setPendingRequest] = useState(null)

  const saveRoom = (val) => {
    setRoom(val)
    if (val) localStorage.setItem('baska_room', val)
  }

  const sendRequest = (key) => {
    if (!room.trim()) {
      setPendingRequest(key)
      setShowRoomInput(true)
      return
    }
    const label = t(`requests.${key}`)
    const msg = `🏨 ${t('requests.serviceRequest')}\n\n📋 ${label}\n🚪 ${t('requests.room')}: ${room.trim()}\n\n— BAŞKA Guest Guide`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleRoomSubmit = () => {
    if (!room.trim()) return
    saveRoom(room.trim())
    setShowRoomInput(false)
    if (pendingRequest) {
      setTimeout(() => sendRequest(pendingRequest), 100)
      setPendingRequest(null)
    }
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('requests.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-6">{t('requests.subtitle')}</p>

      <div className="mb-6 flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-xl px-4 py-2.5">
        <span className="text-sm">🚪</span>
        <input
          type="text"
          value={room}
          onChange={e => saveRoom(e.target.value)}
          placeholder={t('requests.roomPlaceholder')}
          className="bg-transparent text-[0.8rem] text-[var(--text-dark)] outline-none w-full placeholder:text-[var(--text-muted)]/50"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {requests.map((req, i) => (
          <motion.button
            key={req.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => sendRequest(req.key)}
            className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-2xl shadow-[var(--shadow)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer text-left"
          >
            <span className="text-xl flex-shrink-0">{req.icon}</span>
            <span className="text-[0.74rem] font-medium text-[var(--text-dark)] leading-tight">{t(`requests.${req.key}`)}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-[0.65rem] text-[var(--text-muted)] opacity-70 text-center mt-6">
        {t('requests.whatsappNote')}
      </p>

      <AnimatePresence>
        {showRoomInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4"
            onClick={() => { setShowRoomInput(false); setPendingRequest(null) }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-semibold text-[var(--primary)] text-[0.9rem] mb-4">{t('requests.enterRoom')}</h3>
              <input
                type="text"
                value={room}
                onChange={e => setRoom(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRoomSubmit()}
                placeholder="405"
                autoFocus
                className="w-full border border-[rgba(0,51,160,0.15)] rounded-xl px-4 py-3 text-center text-lg font-semibold text-[var(--primary)] outline-none focus:border-[var(--primary)]/40 mb-4"
              />
              <button
                onClick={handleRoomSubmit}
                className="w-full py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-[0.8rem] cursor-pointer"
              >
                {t('requests.confirm')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
