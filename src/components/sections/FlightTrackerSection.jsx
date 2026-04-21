import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const STORAGE_KEY = 'baska_flight'

export default function FlightTrackerSection() {
  const { t } = useTranslation()
  const [flight, setFlight] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [form, setForm] = useState({ number: '', date: '', time: '12:00' })
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    if (!flight) { setCountdown(null); return }
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
    if (!form.number.trim() || !form.date) return
    const data = { number: form.number.trim().toUpperCase(), date: form.date, time: form.time }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setFlight(data)
  }

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY)
    setFlight(null)
    setForm({ number: '', date: '', time: '12:00' })
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('flight.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('flight.subtitle')}</p>

      {flight && countdown ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-3xl shadow-[var(--shadow)] p-8 text-center mb-6"
        >
          <div className="text-[0.72rem] text-[var(--text-muted)] uppercase tracking-[0.2em] mb-2">
            {flight.number}
          </div>
          <div className="text-[0.68rem] text-[var(--text-muted)] mb-6">
            {flight.date} · {flight.time}
          </div>
          <div className="flex justify-center gap-6">
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
          <button
            onClick={handleClear}
            className="mt-6 text-[0.68rem] text-[var(--text-muted)]/50 underline cursor-pointer hover:text-[var(--text-muted)] transition-colors"
          >
            {t('flight.clear')}
          </button>
        </motion.div>
      ) : flight && !countdown ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-3xl shadow-[var(--shadow)] p-8 text-center mb-6"
        >
          <p className="text-[0.82rem] text-[var(--primary)] font-medium">{flight.number}</p>
          <p className="text-[0.76rem] text-[var(--text-muted)] mt-2">{t('flight.departed')}</p>
          <button onClick={handleClear} className="mt-4 text-[0.68rem] text-[var(--text-muted)]/50 underline cursor-pointer">{t('flight.clear')}</button>
        </motion.div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-3xl shadow-[var(--shadow)] p-8"
      >
        <div className="space-y-5">
          <div>
            <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('flight.flightNumber')}</label>
            <input
              type="text"
              value={form.number}
              onChange={e => setForm({ ...form, number: e.target.value })}
              placeholder={t('flight.flightPlaceholder')}
              className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none focus:border-[var(--primary)]/30 transition-colors uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('flight.departureDate')}</label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none focus:border-[var(--primary)]/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('flight.departureTime')}</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none focus:border-[var(--primary)]/30 transition-colors"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-6 w-full py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-[0.82rem] cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
        >
          {t('flight.save')}
        </button>
      </motion.div>
    </div>
  )
}
