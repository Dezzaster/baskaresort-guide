import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'

export default function ServicesSection() {
  const { t } = useTranslation()

  const freeItems = Array.from({ length: 11 }, (_, i) => t(`services.free${i + 1}`))
  const paidItems = Array.from({ length: 15 }, (_, i) => t(`services.paid${i + 1}`))

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('services.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('services.subtitle')}</p>

      <Card title={t('services.freeTitle')} delay={0}>
        <div className="space-y-1.5">
          {freeItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-2 py-1.5 px-2 rounded-lg bg-[rgba(46,196,182,0.06)]"
            >
              <span className="text-[0.7rem] text-[var(--accent)] mt-0.5">●</span>
              <span className="text-[0.74rem] text-[var(--text-muted)]">{item}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card title={t('services.paidTitle')} delay={1}>
        <div className="space-y-1.5">
          {paidItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-2 py-1.5 px-2 rounded-lg bg-[var(--bg-warm)]"
            >
              <span className="text-[0.7rem] text-[var(--gold-dark)] mt-0.5">●</span>
              <span className="text-[0.74rem] text-[var(--text-muted)]">{item}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Shops */}
      <div style={{ marginTop: '64px' }}>
        <h3 className="font-['Cormorant_Garamond'] font-normal text-xl text-[var(--primary)] mb-3">
          {t('shops.title')}
        </h3>
        {['market', 'boutique', 'artisan', 'florist'].map((key, i) => (
          <Card key={key} title={t(`shops.${key}`)} delay={i + 2}>
            <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
              {t(`shops.${key}Desc`)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
