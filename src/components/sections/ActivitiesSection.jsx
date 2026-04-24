import { useTranslation } from 'react-i18next'
import Card from '../Card'

export default function ActivitiesSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('activities.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('activities.subtitle')}</p>

      <Card title={t('activities.sailing')} delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('activities.sailingDesc')}
        </p>
      </Card>

      <Card title={t('activities.entertainment')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('activities.entertainmentDesc')}
        </p>
      </Card>

      <Card title={t('activities.acoustic')} delay={2}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('activities.acousticDesc')}
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3" style={{ marginTop: '24px' }}>
        {[
          { label: t('activities.tableTennis') },
          { label: t('activities.cycling') },
          { label: t('activities.waterSports') }
        ].map((act, i) => (
          <div
            key={i}
            style={{ padding: '16px 20px' }}
            className="rounded-[var(--radius)] bg-[var(--bg-blue)] text-center transition-all duration-300 hover:scale-105 hover:bg-[rgba(0,51,160,0.08)]"
          >
            <div className="text-[0.8rem] text-[var(--primary)] font-medium">{act.label}</div>
          </div>
        ))}
      </div>

      <p className="text-[0.62rem] text-[var(--text-muted)] text-center mt-2 italic">
        {t('activities.cyclingNote')}
      </p>
    </div>
  )
}
