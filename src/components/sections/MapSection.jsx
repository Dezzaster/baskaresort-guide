import { useTranslation } from 'react-i18next'
import Card from '../Card'

export default function MapSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-2xl text-[var(--primary)] mb-2">
        {t('map.title')}
      </h2>
      <p className="text-[0.75rem] text-[var(--text-muted)] mb-6">{t('map.subtitle')}</p>

      <Card icon="🗺️" title={t('map.title')} delay={0}>
        <div className="flex items-center justify-center py-16 rounded-xl bg-[var(--bg-blue)] border-2 border-dashed border-[var(--card-border)]">
          <div className="text-center">
            <div className="text-4xl mb-3">🗺️</div>
            <p className="text-[0.8rem] text-[var(--text-muted)] font-medium">{t('map.subtitle')}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
