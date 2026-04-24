import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'

const WHATSAPP = '905307387764'

const restaurants = [
  { key: 'fish', code: 'A-1' },
  { key: 'teppanyaki', code: 'A-2' },
  { key: 'italian', code: 'A-3' }
]

export default function AlacarteSection() {
  const { t } = useTranslation()

  const bi = (key) => {
    const u = t(key), tr = t(key, { lng: 'tr' })
    return u === tr ? u : `${u} / ${tr}`
  }

  const handleReserve = (key) => {
    const ticket = '№' + Math.floor(10000 + Math.random() * 90000)
    const restaurant = t(`alacarte.${key}`)
    const restaurantTr = t(`alacarte.${key}`, { lng: 'tr' })
    const code = restaurants.find(r => r.key === key)?.code || ''
    const biRestaurant = restaurant === restaurantTr ? restaurant : `${restaurant} / ${restaurantTr}`

    const msg = [
      `🍽️ ${bi('alacarte.reservationTitle')} ${ticket}`,
      '',
      `${bi('alacarte.reserveIntro')}`,
      `🏪 ${biRestaurant} (${code})`,
      '',
      '— BAŞKA Guest Guide'
    ].join('\n')
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
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
              <span className="text-[0.68rem] text-[var(--text-muted)]">{t('alacarte.time')}</span>
              <span className="text-[0.7rem] text-[var(--primary)] font-medium">{t(`alacarte.${r.key}Hours`)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-[var(--bg-warm)]">
              <span className="text-[0.7rem] text-[var(--gold-dark)] font-medium">{t(`alacarte.${r.key}Price`)}</span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleReserve(r.key)}
            className="mt-3 w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-[0.74rem] font-medium cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
          >
            {t('alacarte.reserve')}
          </motion.button>
        </Card>
      ))}
    </div>
  )
}
