import { useTranslation } from 'react-i18next'
import Card from '../Card'

const spaItems = [
  { key: 'hammam' },
  { key: 'sauna' },
  { key: 'fitness' },
  { key: 'massage' },
  { key: 'skincare' }
]

export default function SpaSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-1">
        {t('spa.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-6">{t('spa.subtitle')}</p>

      <Card title="Soul Spa" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('spa.spaDesc')}
        </p>
      </Card>

      {spaItems.map((item, i) => (
        <Card key={item.key} title={t(`spa.${item.key}`)} delay={i + 1}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
            {t(`spa.${item.key}Desc`)}
          </p>
        </Card>
      ))}
    </div>
  )
}
