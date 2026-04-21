import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const MEALS = [
  { key: 'breakfast', hour: 7, minute: 0 },
  { key: 'lunch', hour: 12, minute: 30 },
  { key: 'dinner', hour: 19, minute: 0 },
]

const NOTIFY_BEFORE = 15

export default function MealNotifier() {
  const { t } = useTranslation()

  useEffect(() => {
    if (!('Notification' in window)) return
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }

    const check = () => {
      if (Notification.permission !== 'granted') return
      const now = new Date()
      const istanbulStr = now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' })
      const istanbul = new Date(istanbulStr)
      const currentMinutes = istanbul.getHours() * 60 + istanbul.getMinutes()

      for (const meal of MEALS) {
        const mealMinutes = meal.hour * 60 + meal.minute
        const diff = mealMinutes - currentMinutes
        if (diff > 0 && diff <= NOTIFY_BEFORE) {
          const notifKey = `baska_meal_notif_${meal.key}_${istanbul.toDateString()}`
          if (!localStorage.getItem(notifKey)) {
            localStorage.setItem(notifKey, '1')
            new Notification('BAŞKA Resort', {
              body: t(`meal.${meal.key}Soon`),
              icon: '/BASKA RESORT-LOGO.png',
            })
          }
        }
      }
    }

    check()
    const interval = setInterval(check, 60000)
    return () => clearInterval(interval)
  }, [t])

  return null
}
