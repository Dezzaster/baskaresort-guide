import { useTranslation } from 'react-i18next'
import Card from '../Card'

export default function ActivitiesSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-2xl text-[var(--primary)] mb-2">
        {t('activities.title')}
      </h2>
      <p className="text-[0.75rem] text-[var(--text-muted)] mb-6">{t('activities.subtitle')}</p>

      <Card icon="⛵" title={t('activities.sailing')} delay={0}>
        <p className="text-[0.78rem] text-[var(--text-muted)] leading-relaxed">
          {t('activities.sailingDesc')}
        </p>
      </Card>

      <Card icon="🎵" title={t('activities.entertainment')} delay={1}>
        <p className="text-[0.78rem] text-[var(--text-muted)] leading-relaxed">
          {t('activities.entertainmentDesc')}
        </p>
      </Card>

      <Card icon="🎸" title={t('activities.acoustic')} delay={2}>
        <p className="text-[0.78rem] text-[var(--text-muted)] leading-relaxed">
          {t('activities.acousticDesc')}
        </p>
      </Card>

      <Card icon="🎶" title={t('activities.nightclub')} delay={3}>
        <p className="text-[0.78rem] text-[var(--text-muted)] leading-relaxed">
          {t('activities.nightclubDesc')}
        </p>
      </Card>

      <div className="grid grid-cols-3 gap-2 mt-3">
        {[
          { icon: '🏓', label: t('activities.padel') },
          { icon: '🏸', label: t('activities.tableTennis') },
          { icon: '🚴', label: t('activities.cycling') },
          { icon: '🏄', label: t('activities.waterSports') },
          { icon: '🎨', label: t('activities.artWorkshop') }
        ].map((act, i) => (
          <div
            key={i}
            className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-blue)] text-center transition-all duration-300 hover:scale-105 hover:bg-[rgba(0,51,160,0.08)]"
          >
            <div className="text-xl mb-1">{act.icon}</div>
            <div className="text-[0.68rem] text-[var(--primary)] font-medium">{act.label}</div>
          </div>
        ))}
      </div>

      <p className="text-[0.62rem] text-[var(--text-muted)] text-center mt-2 italic">
        {t('activities.cyclingNote')}
      </p>
    </div>
  )
}
