import { useTranslation } from 'react-i18next'
import Card from '../Card'

export default function WifiSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('wifi.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('wifi.subtitle')}</p>

      <Card title={t('wifi.connection')} animate={false}>
        <div className="space-y-3 mt-2">
          <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-white/70">
            <span className="text-[0.76rem] text-[var(--text-muted)] font-medium">{t('wifi.network')}</span>
            <span className="text-[0.82rem] text-[var(--primary)] font-bold tracking-wide">Başka Resort</span>
          </div>
          <div className="py-3 px-4 rounded-xl bg-[var(--bg-warm)]">
            <p className="text-[0.76rem] text-[var(--gold-dark)] font-medium leading-[1.6]">
              {t('wifi.captivePortal')}
            </p>
          </div>
        </div>
      </Card>

      <Card title={t('wifi.coverage')} animate={false}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('wifi.coverageDesc')}
        </p>
      </Card>
    </div>
  )
}
