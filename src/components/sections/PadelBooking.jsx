import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../Card'

const WHATSAPP = '905307387764'

const OPEN_HOUR = 9
const CLOSE_HOUR = 24
const DAYS_AHEAD = 7

// Court is bookable in 1-hour blocks: last start is 23:00, ending at midnight.
function buildSlots() {
  const slots = []
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
  }
  return slots
}

const ALL_SLOTS = buildSlots()

function buildDays() {
  const days = []
  const now = new Date()
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    d.setHours(0, 0, 0, 0)
    days.push(d)
  }
  return days
}

export default function PadelBooking() {
  const { t, i18n } = useTranslation()
  const [mode, setMode] = useState(null) // 'court' | 'lesson'
  const [dayIndex, setDayIndex] = useState(0)
  const [slot, setSlot] = useState(null)

  const days = useMemo(() => buildDays(), [mode])

  // For today, hide hours that already passed (with a small booking buffer).
  const availableSlots = useMemo(() => {
    if (dayIndex !== 0) return ALL_SLOTS
    const now = new Date()
    const cutoff = now.getHours() + (now.getMinutes() > 30 ? 1 : 0)
    return ALL_SLOTS.filter(s => parseInt(s, 10) > cutoff)
  }, [dayIndex, mode])

  const open = (m) => {
    setMode(m)
    setDayIndex(0)
    setSlot(null)
  }

  const close = () => {
    setMode(null)
    setSlot(null)
  }

  const selectDay = (i) => {
    setDayIndex(i)
    setSlot(null)
  }

  const dayLabel = (d, i) => {
    if (i === 0) return t('activities.today')
    if (i === 1) return t('activities.tomorrow')
    return d.toLocaleDateString(i18n.language, { weekday: 'short' })
  }

  const send = () => {
    if (!slot) return
    const ticket = '№' + Math.floor(10000 + Math.random() * 90000)
    const d = days[dayIndex]
    const dateStr = d.toLocaleDateString(i18n.language, {
      weekday: 'long', day: 'numeric', month: 'long'
    })
    const isLesson = mode === 'lesson'
    const msg = [
      `🎾 ${t('activities.padelBookingTitle')} ${ticket}`,
      '',
      t('alacarte.reserveIntro'),
      `🏟️ ${t('activities.padel')} — ${isLesson ? t('activities.lesson') : t('activities.court')}`,
      `📅 ${dateStr}`,
      `🕐 ${slot}`,
      `💰 ${isLesson ? '€50' : '€75'} / ${t('activities.perHour')}`,
      '',
      '— BAŞKA Guest Guide'
    ].join('\n')
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    close()
  }

  return (
    <>
      <Card icon="🎾" title={t('activities.padel')} delay={3}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-3">
          {t('activities.padelDesc')}
        </p>

        <div className="space-y-1 mb-4">
          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-[var(--bg-blue)]">
            <span className="text-[0.68rem] text-[var(--text-muted)]">🕐</span>
            <span className="text-[0.7rem] text-[var(--primary)] font-medium">
              {t('activities.padelHours')}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-[var(--bg-warm)]">
            <span className="text-[0.68rem] text-[var(--text-muted)]">{t('activities.court')}</span>
            <span className="text-[0.7rem] text-[var(--gold-dark)] font-medium">
              €75 / {t('activities.perHour')}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-[var(--bg-warm)]">
            <span className="text-[0.68rem] text-[var(--text-muted)]">{t('activities.lesson')}</span>
            <span className="text-[0.7rem] text-[var(--gold-dark)] font-medium">
              €50 / {t('activities.perHour')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => open('court')}
            className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-[0.72rem] font-medium cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
          >
            {t('activities.reserveCourt')}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => open('lesson')}
            className="w-full py-2.5 rounded-xl border border-[var(--primary)]/25 text-[var(--primary)] text-[0.72rem] font-medium cursor-pointer hover:bg-[var(--bg-blue)] transition-colors"
            style={{ background: 'none' }}
          >
            {t('activities.bookLesson')}
          </motion.button>
        </div>
      </Card>

      <AnimatePresence>
        {mode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl mx-6 w-full max-w-sm overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-[var(--primary)] px-6 py-4 text-center">
                <p className="text-white text-[0.9rem] font-medium">
                  {t('activities.padelBookingTitle')}
                </p>
                <p className="text-white/70 text-[0.68rem] mt-0.5">
                  {mode === 'lesson' ? t('activities.lesson') : t('activities.court')} · {mode === 'lesson' ? '€50' : '€75'} / {t('activities.perHour')}
                </p>
              </div>

              <div className="px-5" style={{ paddingTop: '16px', paddingBottom: '18px' }}>
                {/* Day picker */}
                <p className="text-[0.68rem] text-[var(--text-muted)] mb-2">
                  {t('activities.selectDay')}
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4">
                  {days.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => selectDay(i)}
                      className="flex-shrink-0 rounded-xl text-center cursor-pointer transition-colors"
                      style={{
                        padding: '8px 10px',
                        minWidth: 56,
                        border: dayIndex === i ? '1px solid var(--primary)' : '1px solid rgba(0,51,160,0.12)',
                        background: dayIndex === i ? 'var(--primary)' : 'none',
                        color: dayIndex === i ? '#fff' : 'var(--text-muted)',
                      }}
                    >
                      <span className="block text-[0.62rem] opacity-80">{dayLabel(d, i)}</span>
                      <span className="block text-[0.8rem] font-medium">{d.getDate()}</span>
                    </button>
                  ))}
                </div>

                {/* Time picker */}
                <p className="text-[0.68rem] text-[var(--text-muted)] mb-2">
                  {t('activities.selectTime')}
                </p>
                {availableSlots.length === 0 ? (
                  <p className="text-[0.72rem] text-[var(--text-muted)] text-center py-4 italic">
                    {t('activities.noSlotsToday')}
                  </p>
                ) : (
                  <div className="grid grid-cols-4 gap-1.5 mb-4" style={{ maxHeight: 160, overflowY: 'auto' }}>
                    {availableSlots.map(s => (
                      <button
                        key={s}
                        onClick={() => setSlot(s)}
                        className="rounded-lg text-[0.7rem] font-medium cursor-pointer transition-colors"
                        style={{
                          padding: '9px 0',
                          border: slot === s ? '1px solid var(--primary)' : '1px solid rgba(0,51,160,0.12)',
                          background: slot === s ? 'var(--primary)' : 'none',
                          color: slot === s ? '#fff' : 'var(--primary)',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={send}
                  disabled={!slot}
                  className="w-full py-3 rounded-xl text-white text-[0.8rem] font-semibold transition-colors flex items-center justify-center gap-2"
                  style={{
                    background: slot ? '#25D366' : 'rgba(0,51,160,0.15)',
                    cursor: slot ? 'pointer' : 'not-allowed',
                    border: 'none',
                  }}
                >
                  <span>📲</span> {t('alacarte.placeOrder')}
                </motion.button>
                <button
                  onClick={close}
                  className="w-full mt-2 py-2.5 text-[0.74rem] text-[var(--text-muted)] cursor-pointer hover:text-[var(--primary)] transition-colors"
                  style={{ background: 'none', border: 'none' }}
                >
                  {t('menu.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
