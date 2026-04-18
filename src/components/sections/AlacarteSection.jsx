import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../Card'

const WHATSAPP = '905307387764'

const restaurants = [
  { key: 'fish', code: 'A-1' },
  { key: 'teppanyaki', code: 'A-2' },
  { key: 'italian', code: 'A-3' },
  { key: 'bistro', code: 'A-4' }
]

const timeSlots = [
  '12:00','12:30','13:00','13:30','14:00',
  '17:00','17:30','18:00','18:30',
  '19:00','19:30','20:00','20:30',
  '21:00','21:30','22:00','22:30'
]

export default function AlacarteSection() {
  const { t } = useTranslation()
  const [reserving, setReserving] = useState(null)
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: '2',
    room: localStorage.getItem('baska_room') || '',
    comment: ''
  })

  const sendReservation = () => {
    if (!form.room.trim()) return
    localStorage.setItem('baska_room', form.room.trim())
    const restaurant = t(`alacarte.${reserving}`)
    const code = restaurants.find(r => r.key === reserving)?.code || ''
    const msg = [
      `🍽️ ${t('alacarte.reservationTitle')}`,
      '',
      `🏪 ${restaurant} (${code})`,
      `📅 ${form.date}`,
      `🕐 ${form.time}`,
      `👥 ${form.guests}`,
      `🚪 ${t('requests.room')}: ${form.room.trim()}`,
      form.comment.trim() ? `💬 ${form.comment.trim()}` : '',
      '',
      '— BAŞKA Guest Guide'
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    setReserving(null)
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('alacarte.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('alacarte.subtitle')}</p>

      {restaurants.map((r, i) => (
        <Card key={r.key} title={t(`alacarte.${r.key}`)} label={r.code} delay={i}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-2">
            {t(`alacarte.${r.key}Desc`)}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-[var(--bg-blue)]">
              <span className="text-[0.68rem] text-[var(--text-muted)]">Time</span>
              <span className="text-[0.7rem] text-[var(--primary)] font-medium">{t(`alacarte.${r.key}Hours`)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-[var(--bg-warm)]">
              <span className="text-[0.7rem] text-[var(--gold-dark)] font-medium">{t(`alacarte.${r.key}Price`)}</span>
            </div>
          </div>
          {r.key !== 'bistro' && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setForm(f => ({ ...f, room: localStorage.getItem('baska_room') || f.room }))
                setReserving(r.key)
              }}
              className="mt-3 w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-[0.74rem] font-medium cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
            >
              {t('alacarte.reserve')}
            </motion.button>
          )}
        </Card>
      ))}

      <AnimatePresence>
        {reserving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-6"
            onClick={() => setReserving(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl"
              style={{ padding: '36px 32px 32px', maxHeight: '88vh', overflowY: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)] text-[1.2rem]">
                  {t('alacarte.reservationTitle')}
                </h3>
                <button onClick={() => setReserving(null)} className="text-[var(--text-muted)]/50 text-lg cursor-pointer">✕</button>
              </div>

              <div className="text-[0.78rem] text-[var(--text-dark)] font-medium mb-6 py-3 px-4 rounded-xl bg-[var(--bg-blue)]">
                {t(`alacarte.${reserving}`)} ({restaurants.find(r => r.key === reserving)?.code})
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('alacarte.date')}</label>
                  <input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none focus:border-[var(--primary)]/30 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('alacarte.time')}</label>
                    <select
                      value={form.time}
                      onChange={e => setForm({ ...form, time: e.target.value })}
                      className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none bg-white focus:border-[var(--primary)]/30 transition-colors"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('alacarte.guests')}</label>
                    <select
                      value={form.guests}
                      onChange={e => setForm({ ...form, guests: e.target.value })}
                      className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none bg-white focus:border-[var(--primary)]/30 transition-colors"
                    >
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('requests.room')}</label>
                  <input
                    type="text"
                    value={form.room}
                    onChange={e => setForm({ ...form, room: e.target.value })}
                    placeholder="405"
                    className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none focus:border-[var(--primary)]/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[0.7rem] text-[var(--text-muted)] mb-2 block tracking-wide">{t('alacarte.comment')}</label>
                  <textarea
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    placeholder={t('alacarte.commentPlaceholder')}
                    rows={2}
                    className="w-full border border-[rgba(0,51,160,0.1)] rounded-xl px-5 py-3 text-[0.82rem] text-[var(--text-dark)] outline-none resize-none focus:border-[var(--primary)]/30 transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={sendReservation}
                className="mt-6 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-semibold text-[0.82rem] flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors cursor-pointer"
              >
                💬 {t('alacarte.sendWhatsapp')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
