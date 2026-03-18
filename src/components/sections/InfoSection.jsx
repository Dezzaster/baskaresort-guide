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
      className="flex justify-between items-start py-3.5 px-5 rounded-xl bg-white/50 backdrop-blur-md border border-white/60"
    >
      <span className="text-[0.76rem] text-[var(--text-muted)] font-medium">{label}</span>
      <span className="text-[0.76rem] text-[var(--primary)] font-semibold text-right ml-4 max-w-[55%]">{value}</span>
    </motion.div>
  )
}

function ContactCard({ delay = 0 }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: 'easeOut' }}
      className="bg-[rgba(230,237,255,0.55)] backdrop-blur-sm border border-white/40 rounded-2xl p-7 mb-8 shadow-[var(--shadow)]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-base flex-shrink-0">
          📞
        </div>
        <div className="font-semibold text-[0.85rem] text-[var(--text-dark)]">
          {t('info.phone')}
        </div>
      </div>

      {/* Description */}
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-5">
        {t('info.receptionVal')} · Mobile: +90 252 313 22 07
      </p>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <a
          href="tel:0"
          className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/70 hover:bg-white/80 transition-all duration-300"
        >
          <span className="text-xl">📱</span>
          <span className="text-[0.7rem] font-medium text-[var(--text-dark)]">Dial 0</span>
        </a>
        <a
          href="https://wa.me/902523132207"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/70 hover:bg-white/80 transition-all duration-300"
        >
          <span className="text-xl">💬</span>
          <span className="text-[0.7rem] font-medium text-[var(--text-dark)]">WhatsApp</span>
        </a>
        <a
          href="mailto:info@baskaresort.com"
          className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/70 hover:bg-white/80 transition-all duration-300"
        >
          <span className="text-xl">✉️</span>
          <span className="text-[0.7rem] font-medium text-[var(--text-dark)]">Email</span>
        </a>
      </div>
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
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('info.subtitle')}</p>

      <Card title="BAŞKA Resort Bodrum" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('info.description')}
        </p>
      </Card>

      {/* Contact Card */}
      <ContactCard delay={1} />

      <Card delay={2}>
        <div className="flex flex-col gap-2.5">
          <InfoRow label={t('info.checkin')} value="15:00" delay={0} />
          <InfoRow label={t('info.checkout')} value="12:00" delay={1} />
          <InfoRow label={t('info.concept')} value={t('info.conceptVal')} delay={2} />
          <InfoRow label={t('info.area')} value="57.000 m²" delay={3} />
          <InfoRow label={t('info.renovation')} value={t('info.renovationVal')} delay={4} />
          <InfoRow label={t('info.payment')} value={t('info.paymentVal')} delay={5} />
          <InfoRow label={t('info.currency')} value={t('info.currencyVal')} delay={6} />
          <InfoRow label={t('info.wifi')} value={t('info.wifiVal')} delay={7} />
          <InfoRow label={t('info.parking')} value={t('info.parkingVal')} delay={8} />
          <InfoRow label={t('info.petFriendly')} value={t('info.petVal')} delay={9} />
        </div>
      </Card>

      <Card title={t('info.location')} delay={3}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('info.locationVal')}
        </p>
      </Card>

      {/* Instagram Feed */}
      <InstagramFeed />
    </div>
  )
}
