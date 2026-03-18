import { useTranslation } from 'react-i18next'
import Card from '../Card'

export default function KidsSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('kids.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('kids.subtitle')}</p>

      <Card title={t('kids.miniClub')} delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('kids.miniClubDesc')}
        </p>
      </Card>

      <Card title={t('kids.babysitting')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('kids.babysittingDesc')}
        </p>
      </Card>

      <Card title={t('kids.stroller')} delay={2}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('kids.strollerDesc')}
        </p>
      </Card>
    </div>
  )
}
