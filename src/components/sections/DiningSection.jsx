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

  const snackRestaurants = [
    { key: 'leziz', charged: true },
    { key: 'kiyida', charged: true },
    { key: 'lento', charged: true },
    { key: 'koyKahvesi', charged: false },
  ]

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('dining.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('dining.subtitle')}</p>

      <Card title={t('dining.mainRestaurant')} delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-3">
          {t('dining.mainDesc')}
        </p>
        <div className="space-y-2.5">
          {meals.map((meal, i) => (
            <div key={i} className="flex justify-between items-center py-3 px-4 rounded-[var(--radius-sm)] bg-[rgba(230,237,255,0.5)]">
              <span className="text-[0.74rem] text-[var(--primary)] font-medium">{meal.label}</span>
              <span className="text-[0.72rem] text-[var(--gold-dark)] font-semibold">{meal.time}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card icon="🌿" title={t('dining.leziz')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('dining.lezizDesc')}
        </p>
      </Card>

      <Card icon="🕐" title={t('dining.daima')} delay={2}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('dining.daimaDesc')}
        </p>
      </Card>

      <Card title="" delay={3}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] italic">
          {t('dining.concept')}
        </p>
      </Card>

      {/* Snack Restaurants */}
      <div style={{ marginTop: '72px' }}>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div className="flex items-center gap-4 justify-center" style={{ marginBottom: '10px' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
            <h3 className="font-['Cormorant_Garamond'] font-normal text-xl text-[var(--primary)]">
              {t('snacks.title')}
            </h3>
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
          </div>
          <p className="text-[0.74rem] text-[var(--text-muted)]">{t('snacks.subtitle')}</p>
        </div>

        {snackRestaurants.map((r, i) => (
          <Card key={r.key} title={t(`snacks.${r.key}`)} delay={i + 4}>
            <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-2">
              {t(`snacks.${r.key}Desc`)}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-[var(--bg-blue)]">
                <span className="text-[0.68rem] text-[var(--text-muted)]">{t('alacarte.time')}</span>
                <span className="text-[0.7rem] text-[var(--primary)] font-medium">{t(`snacks.${r.key}Hours`)}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 px-3 rounded-lg bg-[var(--bg-warm)]">
                <span className="text-[0.7rem] text-[var(--gold-dark)] font-medium">
                  {r.charged ? t('snacks.charged') : t('streetFood.bai')}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Street Food Section */}
      <div style={{ marginTop: '72px' }}>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div className="flex items-center gap-4 justify-center" style={{ marginBottom: '10px' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
            <h3 className="font-['Cormorant_Garamond'] font-normal text-xl text-[var(--primary)]">
              {t('streetFood.title')}
            </h3>
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
          </div>
          <p className="text-[0.74rem] text-[var(--text-muted)]">{t('streetFood.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'fishSandwich' },
            { key: 'chickenRice' },
            { key: 'meatballKokorec' },
            { key: 'gelato' }
          ].map((item, i) => (
            <Card key={item.key} title={t(`streetFood.${item.key}`)} delay={i + 8}>
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
