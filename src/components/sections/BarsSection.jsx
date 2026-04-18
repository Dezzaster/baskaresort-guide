import { useTranslation } from 'react-i18next'
import Card from '../Card'

const bars = [
  { key: 'lobbyBar', icon: '🍸' },
  { key: 'manzaraPatisserie', icon: '🍰' },
  { key: 'coffeeHouse', icon: '☕' },
  { key: 'cafeBodrum', icon: '🫖' },
  { key: 'pubFistik', icon: '🍺' },
  { key: 'poolLounge', icon: '🏊' },
  { key: 'loungeBar', icon: '🍹' },
  { key: 'beachPastane', icon: '🥐' }
]

export default function BarsSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('bars.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('bars.subtitle')}</p>

      {bars.map((bar, i) => (
        <Card key={bar.key} icon={bar.icon} title={t(`bars.${bar.key}`)} delay={i}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
            {t(`bars.${bar.key}Desc`)}
          </p>
        </Card>
      ))}
    </div>
  )
}
