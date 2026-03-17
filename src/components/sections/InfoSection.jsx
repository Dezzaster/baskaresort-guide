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
      className="flex justify-between items-start py-[7px] px-3 rounded-xl bg-white/60"
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
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.4rem] text-[var(--primary)] mb-1">
        {t('info.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-[18px]">{t('info.subtitle')}</p>

      <Card icon="🌊" title="BAŞKA Resort Bodrum" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.6]">
          {t('info.description')}
        </p>
      </Card>

      <Card icon="📍" title={t('info.address')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.6]">
          {t('info.addressVal')}
        </p>
      </Card>

      <Card delay={2}>
        <div className="flex flex-col gap-[3px]">
          <InfoRow label={t('info.phone')} value="+90 252 3132207" delay={0} />
          <InfoRow label={t('info.reception')} value={t('info.receptionVal')} delay={1} />
          <InfoRow label={t('info.email')} value="info@baskaresort.com" delay={2} />
          <InfoRow label={t('info.web')} value="www.baskaresort.com" delay={3} />
          <InfoRow label={t('info.checkin')} value="15:00" delay={4} />
          <InfoRow label={t('info.checkout')} value="12:00" delay={5} />
          <InfoRow label={t('info.concept')} value={t('info.conceptVal')} delay={6} />
          <InfoRow label={t('info.area')} value="57.000 m²" delay={7} />
          <InfoRow label={t('info.renovation')} value={t('info.renovationVal')} delay={8} />
          <InfoRow label={t('info.payment')} value={t('info.paymentVal')} delay={9} />
          <InfoRow label={t('info.currency')} value={t('info.currencyVal')} delay={10} />
          <InfoRow label={t('info.wifi')} value={t('info.wifiVal')} delay={11} />
          <InfoRow label={t('info.parking')} value={t('info.parkingVal')} delay={12} />
          <InfoRow label={t('info.petFriendly')} value={t('info.petVal')} delay={13} />
        </div>
      </Card>

      <Card icon="📌" title={t('info.location')} delay={3}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.6]">
          {t('info.locationVal')}
        </p>
      </Card>

      {/* Instagram Feed */}
      <InstagramFeed />
    </div>
  )
}
