import { useTranslation } from 'react-i18next'
import Card from '../Card'

export default function DiningSection() {
  const { t } = useTranslation()

  const meals = [
    { label: t('dining.breakfast'), time: t('dining.breakfastTime') },
    { label: t('dining.lateBreakfast'), time: t('dining.lateBreakfastTime') },
    { label: t('dining.lunch'), time: t('dining.lunchTime') },
    { label: t('dining.dinner'), time: t('dining.dinnerTime') }
  ]

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-2xl text-[var(--primary)] mb-1">
        {t('dining.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-5">{t('dining.subtitle')}</p>

      <Card icon="🍽️" title={t('dining.mainRestaurant')} delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed mb-3">
          {t('dining.mainDesc')}
        </p>
        <div className="space-y-1">
          {meals.map((meal, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-3 rounded-[var(--radius-sm)] bg-[var(--bg-blue)]">
              <span className="text-[0.74rem] text-[var(--primary)] font-medium">{meal.label}</span>
              <span className="text-[0.72rem] text-[var(--gold-dark)] font-semibold">{meal.time}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card icon="🌿" title="" delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed italic">
          {t('dining.concept')}
        </p>
      </Card>

      {/* Street Food Section */}
      <div className="mt-6">
        <h3 className="font-['Cormorant_Garamond'] font-normal text-xl text-[var(--primary)] mb-1">
          {t('streetFood.title')}
        </h3>
        <p className="text-[0.72rem] text-[var(--text-muted)] mb-4">{t('streetFood.subtitle')}</p>

        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'fishSandwich', icon: '🐟' },
            { key: 'musselBar', icon: '🦪' },
            { key: 'fruitStand', icon: '🍉' },
            { key: 'chickenRice', icon: '🍗' },
            { key: 'meatballKokorec', icon: '🥙' },
            { key: 'gelato', icon: '🍨' }
          ].map((item, i) => (
            <Card key={item.key} icon={item.icon} title={t(`streetFood.${item.key}`)} delay={i + 2}>
              <p className="text-[0.65rem] text-[var(--gold-dark)] font-medium">
                {t(`streetFood.${item.key}Time`)}
              </p>
              <p className="text-[0.6rem] text-[var(--text-muted)]">{t('streetFood.bai')}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
