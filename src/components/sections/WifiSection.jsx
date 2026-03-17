import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'

export default function WifiSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('wifi.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-7">{t('wifi.subtitle')}</p>

      <Card title={t('wifi.connection')} delay={0}>
        <div className="space-y-3 mt-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex justify-between items-center py-3 px-4 rounded-xl bg-white/70"
          >
            <span className="text-[0.76rem] text-[var(--text-muted)] font-medium">{t('wifi.network')}</span>
            <span className="text-[0.82rem] text-[var(--primary)] font-bold tracking-wide">Başka Resort</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="flex justify-between items-center py-3 px-4 rounded-xl bg-white/70"
          >
            <span className="text-[0.76rem] text-[var(--text-muted)] font-medium">{t('wifi.password')}</span>
            <span className="text-[0.82rem] text-[var(--primary)] font-bold tracking-wide font-mono">Bodrum2026</span>
          </motion.div>
        </div>
      </Card>

      <Card title={t('wifi.coverage')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('wifi.coverageDesc')}
        </p>
      </Card>
    </div>
  )
}
