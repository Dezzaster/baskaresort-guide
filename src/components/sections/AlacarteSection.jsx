import { useTranslation } from 'react-i18next'
import Card from '../Card'

const restaurants = [
  { key: 'fish', code: 'A-1' },
  { key: 'teppanyaki', code: 'A-2' },
  { key: 'italian', code: 'A-3' },
  { key: 'theme', code: 'A-4' },
  { key: 'bistro', code: 'A-5' }
]

export default function AlacarteSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('alacarte.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('alacarte.subtitle')}</p>

      {restaurants.map((r, i) => (
        <Card key={r.key} title={t(`alacarte.${r.key}`)} label={r.code} delay={i}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-2">
            {t(`alacarte.${r.key}Desc`)}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-[var(--bg-blue)]">
              <span className="text-[0.68rem] text-[var(--text-muted)]">Time</span>
              <span className="text-[0.7rem] text-[var(--primary)] font-medium">{t(`alacarte.${r.key}Hours`)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-[var(--bg-warm)]">
              <span className="text-[0.7rem] text-[var(--gold-dark)] font-medium">{t(`alacarte.${r.key}Price`)}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
