import { useTranslation } from 'react-i18next'
import Card from '../Card'
import InstagramFeed from '../InstagramFeed'
import WeatherWidget from '../WeatherWidget'

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-3.5 px-5 rounded-xl bg-white/50 backdrop-blur-md border border-white/60">
      <span className="text-[0.76rem] text-[var(--text-muted)] font-medium">{label}</span>
      <span className="text-[0.76rem] text-[var(--primary)] font-semibold text-right ml-4 max-w-[55%]">{value}</span>
    </div>
  )
}

function ContactCard({ delay = 0 }) {
  const { t } = useTranslation()

  return (
    <div
      style={{ padding: '32px 28px' }}
      className="bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-2xl mb-10 shadow-[var(--shadow)]"
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
        {t('info.receptionVal')} · +90 252 275 05 50
      </p>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <a
          href="tel:+902522750550"
          className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/70 hover:bg-white/80 transition-all duration-300"
        >
          <span className="text-xl">📱</span>
          <span className="text-[0.65rem] font-medium text-[var(--text-dark)]">+90 252 275 05 50</span>
        </a>
        <a
          href="https://wa.me/905307387764"
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
    </div>
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

      <WeatherWidget />

      <Card title="BAŞKA Resort Bodrum" animate={false}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('info.description')}
        </p>
      </Card>

      {/* Contact Card */}
      <ContactCard />

      <Card animate={false}>
        <div className="flex flex-col gap-2.5">
          <InfoRow label={t('info.checkin')} value="15:00" />
          <InfoRow label={t('info.checkout')} value="12:00" />

          <div className="h-2" />
          <InfoRow label={t('info.concept')} value={t('info.conceptVal')} />
          <InfoRow label={t('info.area')} value="57.000 m²" />
          <InfoRow label={t('info.renovation')} value={t('info.renovationVal')} />
          <InfoRow label={t('info.payment')} value={t('info.paymentVal')} />
          <InfoRow label={t('info.currency')} value={t('info.currencyVal')} />
          <InfoRow label={t('info.wifi')} value={t('info.wifiVal')} />
          <InfoRow label={t('info.parking')} value={t('info.parkingVal')} />

          <div className="h-2" />
          <InfoRow label={t('info.petFriendly')} value={t('info.petVal')} />
        </div>
      </Card>

      <Card title={t('info.location')} animate={false}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('info.locationVal')}
        </p>
      </Card>

      {/* Instagram Feed */}
      <div className="mt-4" />
      <InstagramFeed />
    </div>
  )
}
