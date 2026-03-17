import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'

export default function ImportantSection() {
  const { t } = useTranslation()
  const items = t('important.items', { returnObjects: true })

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-1">
        {t('important.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-6">{t('important.subtitle')}</p>

      <Card title={t('important.title')} delay={0}>
        <div className="space-y-2">
          {Array.isArray(items) && items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-2.5 py-2 px-3 rounded-lg bg-[var(--bg-warm)] border border-[rgba(245,197,24,0.15)]"
            >
              <span className="w-5 h-5 rounded-full bg-[rgba(245,197,24,0.2)] border border-[var(--gold)] flex items-center justify-center text-[0.6rem] text-[var(--gold-dark)] font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-[0.74rem] text-[var(--text-muted)] leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
