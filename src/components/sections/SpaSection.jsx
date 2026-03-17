import { useTranslation } from 'react-i18next'
import Card from '../Card'

const spaItems = [
  { key: 'hammam', icon: '🛁' },
  { key: 'sauna', icon: '🧖' },
  { key: 'fitness', icon: '💪' },
  { key: 'massage', icon: '💆' },
  { key: 'skincare', icon: '✨' }
]

export default function SpaSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-2xl text-[var(--primary)] mb-1">
        {t('spa.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-5">{t('spa.subtitle')}</p>

      <Card icon="🧘" title="Soul Spa" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('spa.spaDesc')}
        </p>
      </Card>

      {spaItems.map((item, i) => (
        <Card key={item.key} icon={item.icon} title={t(`spa.${item.key}`)} delay={i + 1}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
            {t(`spa.${item.key}Desc`)}
          </p>
        </Card>
      ))}
    </div>
  )
}
