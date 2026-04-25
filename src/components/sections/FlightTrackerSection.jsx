import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'

const STORAGE_KEY = 'baska_flight'
const WHATSAPP = '905307387764'

export default function FlightTrackerSection() {
  const { t } = useTranslation()
  const [flight, setFlight] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [flightNumber, setFlightNumber] = useState('')
  const [showManual, setShowManual] = useState(false)
  const [manualDate, setManualDate] = useState('')
  const [manualTime, setManualTime] = useState('12:00')
  const [countdown, setCountdown] = useState(null)



  useEffect(() => {
    if (!flight?.date || !flight?.time) { setCountdown(null); return }
    const update = () => {
      const dep = new Date(`${flight.date}T${flight.time}:00`)
      const diff = dep - Date.now()
      if (diff <= 0) { setCountdown(null); return }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
      })
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [flight])

  const handleSave = () => {
    if (!flightNumber.trim()) return
    const data = {
      number: flightNumber.trim().toUpperCase(),
      date: manualDate || null,
      time: manualTime || null,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setFlight(data)
    setFlightNumber('')
    setManualDate('')
    setManualTime('12:00')
    setShowManual(false)
  }

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY)
    setFlight(null)
    setFlightNumber('')
    setManualDate('')
    setManualTime('12:00')
    setCountdown(null)
  }

  const trackUrl = flight
    ? `https://www.flightradar24.com/data/flights/${flight.number.toLowerCase()}`
    : null

  const sendTransfer = (type) => {
    const ticket = '№' + Math.floor(10000 + Math.random() * 90000)
    const emoji = type === 'taxi' ? '🚕' : '🚐'
    const label = type === 'taxi' ? t('flight.requestTaxi') : t('flight.requestVip')
    const msg = [
      `${emoji} ${label} ${ticket}`,
      '',
      t('flight.transferIntro'),
      flight ? `✈️ ${flight.number}` : '',
      flight?.date ? `📅 ${flight.date}` : '',
      flight?.time ? `🕐 ${flight.time}` : '',
      '',
      '— BAŞKA Guest Guide'
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('flight.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('flight.subtitle')}</p>

      {flight ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-3xl shadow-[var(--shadow)] p-8 text-center mb-6"
        >
          <div className="text-[0.72rem] text-[var(--text-muted)] uppercase tracking-[0.2em] mb-1">
            {t('flight.flightNumber')}
          </div>
          <div className="text-[1.4rem] font-light text-[var(--primary)] tracking-wider mb-4">
            {flight.number}
          </div>

          {flight.date && flight.time && (
            <div className="text-[0.68rem] text-[var(--text-muted)] mb-4">
              {flight.date} · {flight.time}
            </div>
          )}

          {countdown && (
            <div className="flex justify-center gap-6 mb-5">
              {[
                { val: countdown.days, label: t('flight.days') },
                { val: countdown.hours, label: t('flight.hours') },
                { val: countdown.minutes, label: t('flight.minutes') },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-[2rem] font-light text-[var(--primary)] leading-none">{val}</span>
                  <span className="text-[0.6rem] text-[var(--text-muted)] mt-2 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          )}

          {flight.date && flight.time && !countdown && (
            <p className="text-[0.76rem] text-[var(--text-muted)] mb-4">{t('flight.departed')}</p>
          )}

          <a
            href={trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-8 rounded-xl bg-[var(--primary)] text-white text-[0.78rem] font-semibold hover:bg-[var(--primary)]/90 transition-colors"
          >
            {t('flight.trackLive')} ↗
          </a>

          <div className="mt-4">
            <button
              onClick={handleClear}
              className="text-[0.68rem] text-[var(--text-muted)]/50 underline cursor-pointer hover:text-[var(--text-muted)] transition-colors"
            >
              {t('flight.clear')}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-3xl shadow-[var(--shadow)] p-8 mb-6"
        >
          <p className="text-[0.74rem] text-[var(--text-muted)] mb-5 text-center">{t('flight.trackDesc')}</p>

          <div className="space-y-5">
            <div>
              <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('flight.flightNumber')}</label>
              <input
                type="text"
                value={flightNumber}
                onChange={e => setFlightNumber(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                placeholder={t('flight.flightPlaceholder')}
                className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none focus:border-[var(--primary)]/30 transition-colors uppercase"
              />
            </div>

            <button
              onClick={() => setShowManual(!showManual)}
              className="text-[0.68rem] text-[var(--primary)]/60 underline cursor-pointer hover:text-[var(--primary)] transition-colors"
            >
              {t('flight.setDeparture')}
            </button>

            {showManual && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-2 gap-4 overflow-hidden"
              >
                <div>
                  <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('flight.departureDate')}</label>
                  <input
                    type="date"
                    value={manualDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setManualDate(e.target.value)}
                    className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none focus:border-[var(--primary)]/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('flight.departureTime')}</label>
                  <input
                    type="time"
                    value={manualTime}
                    onChange={e => setManualTime(e.target.value)}
                    className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none focus:border-[var(--primary)]/30 transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </div>

          <button
            onClick={handleSave}
            className="mt-6 w-full py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-[0.82rem] cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
          >
            {t('flight.save')}
          </button>
        </motion.div>
      )}

      {/* Airport Transfer */}
      <Card icon="🚐" title={t('flight.transferTitle')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-4">
          {t('flight.transferDesc')}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => sendTransfer('taxi')}
            className="py-3 rounded-xl bg-[var(--primary)] text-white text-[0.74rem] font-medium cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
          >
            🚕 {t('flight.requestTaxi')}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => sendTransfer('vip')}
            className="py-3 rounded-xl bg-[var(--gold-dark)] text-white text-[0.74rem] font-medium cursor-pointer hover:bg-[var(--gold-dark)]/90 transition-colors"
          >
            🚐 {t('flight.requestVip')}
          </motion.button>
        </div>
      </Card>
    </div>
  )
}
