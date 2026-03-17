import { useTranslation } from 'react-i18next'
import Card from '../Card'

export default function BeachSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-2xl text-[var(--primary)] mb-1">
        {t('beach.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-5">{t('beach.subtitle')}</p>

      <Card icon="🏖️" title={t('beach.title')} delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('beach.beachDesc')}
        </p>
      </Card>

      <Card icon="🛖" title={t('beach.pavilion')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('beach.pavilionDesc')}
        </p>
      </Card>

      <Card icon="🏊" title={t('beach.pool')} delay={2}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('beach.poolDesc')}
        </p>
      </Card>

      <Card icon="🚌" title={t('beach.shuttle')} delay={3}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('beach.shuttleDesc')}
        </p>
      </Card>
    </div>
  )
}
