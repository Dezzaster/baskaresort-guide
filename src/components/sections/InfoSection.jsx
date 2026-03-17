import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'
import InstagramFeed from '../InstagramFeed'

function InfoRow({ label, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.05 }}
      className="flex justify-between items-start py-2.5 px-4 rounded-xl bg-white/40 backdrop-blur-md border border-white/50"
    >
      <span className="text-[0.76rem] text-[var(--text-muted)] font-medium">{label}</span>
      <span className="text-[0.76rem] text-[var(--primary)] font-semibold text-right ml-3 max-w-[55%]">{value}</span>
    </motion.div>
  )
}

export default function InfoSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('info.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-7">{t('info.subtitle')}</p>

      <Card title="BAŞKA Resort Bodrum" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.65]">
          {t('info.description')}
        </p>
      </Card>

      <Card delay={1}>
        <div className="flex flex-col gap-1.5">
          <InfoRow label={t('info.phone')} value="+90 252 3132207" delay={0} />
          <InfoRow label={t('info.reception')} value={t('info.receptionVal')} delay={1} />
          <InfoRow label={t('info.email')} value="info@baskaresort.com" delay={2} />
          <InfoRow label={t('info.checkin')} value="15:00" delay={3} />
          <InfoRow label={t('info.checkout')} value="12:00" delay={4} />
          <InfoRow label={t('info.concept')} value={t('info.conceptVal')} delay={5} />
          <InfoRow label={t('info.area')} value="57.000 m²" delay={6} />
          <InfoRow label={t('info.renovation')} value={t('info.renovationVal')} delay={7} />
          <InfoRow label={t('info.payment')} value={t('info.paymentVal')} delay={8} />
          <InfoRow label={t('info.currency')} value={t('info.currencyVal')} delay={9} />
          <InfoRow label={t('info.wifi')} value={t('info.wifiVal')} delay={10} />
          <InfoRow label={t('info.parking')} value={t('info.parkingVal')} delay={11} />
          <InfoRow label={t('info.petFriendly')} value={t('info.petVal')} delay={12} />
        </div>
      </Card>

      <Card title={t('info.location')} delay={2}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.65]">
          {t('info.locationVal')}
        </p>
      </Card>

      {/* Instagram Feed */}
      <InstagramFeed />
    </div>
  )
}
