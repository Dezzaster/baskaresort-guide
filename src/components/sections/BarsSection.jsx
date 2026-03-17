import { useTranslation } from 'react-i18next'
import Card from '../Card'

const bars = [
  { key: 'lobbyBar' },
  { key: 'coffeeHouse' },
  { key: 'aegeanBar' },
  { key: 'cafeBodrum' },
  { key: 'bistroBodrum' },
  { key: 'pubFistik' },
  { key: 'poolLounge' },
  { key: 'espresso' }
]

export default function BarsSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-1">
        {t('bars.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-6">{t('bars.subtitle')}</p>

      {bars.map((bar, i) => (
        <Card key={bar.key} title={t(`bars.${bar.key}`)} delay={i}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
            {t(`bars.${bar.key}Desc`)}
          </p>
        </Card>
      ))}
    </div>
  )
}
