import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const basePath = import.meta.env.BASE_URL
const HOTEL_ORIGIN = 'Baska+Resort+Bodrum+(ex.+Holiday+Inn+Bodrum)'

const places = [
  { key: 'castle', dist: '1.5 km', dest: 'Bodrum+Castle', img: 'castle.jpg', gradient: 'from-[#1a3a6b] to-[#2d5f9e]' },
  { key: 'theatre', dist: '2 km', dest: 'Bodrum+Ancient+Theatre', img: 'theatre.jpg', gradient: 'from-[#5a3a2a] to-[#8b6e4c]' },
  { key: 'mausoleum', dist: '1.5 km', dest: 'Mausoleum+at+Halicarnassus+Bodrum', img: 'mausoleum.png', gradient: 'from-[#3d5a3e] to-[#6b8f5e]' },
  { key: 'marina', dist: '1.2 km', dest: 'Bodrum+Marina', img: 'marina.png', gradient: 'from-[#1a4a6b] to-[#3d8ab5]' },
  { key: 'windmills', dist: '1.8 km', dest: 'Bodrum+Windmills', img: 'windmills.jpg', gradient: 'from-[#7a6a2a] to-[#b5963d]' },
  { key: 'gumusluk', dist: '25 km', dest: 'Gumusluk+Bodrum', img: 'gumusluk.png', gradient: 'from-[#2a4a5a] to-[#4a8a9e]' },
  { key: 'yalikavak', dist: '20 km', dest: 'Yalikavak+Marina+Bodrum', img: 'yalikavlak marina.jpg', gradient: 'from-[#1a3a5b] to-[#3a7abd]' },
  { key: 'turkbuku', dist: '18 km', dest: 'Turkbuku+Bodrum', img: 'turkbuku.jpg', gradient: 'from-[#5a4a3a] to-[#9a7a5a]' },
]

export default function PlacesSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('places.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('places.subtitle')}</p>

      <div className="space-y-4">
        {places.map((place, i) => (
          <motion.div
            key={place.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative overflow-hidden rounded-2xl shadow-lg"
            style={{ minHeight: '200px' }}
          >
            <img
              src={`${basePath}${encodeURI(place.img)}`}
              alt={t(`places.${place.key}`)}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${place.gradient} opacity-60`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="relative z-10" style={{ padding: '28px 24px' }}>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-white text-[0.65rem] font-medium backdrop-blur-sm">
                {place.dist}
              </span>

              <div className="pt-16">
                <h3 className="text-white font-semibold text-[0.95rem] mb-2 pr-16">
                  {t(`places.${place.key}`)}
                </h3>
                <p className="text-white/80 text-[0.74rem] leading-[1.6] mb-4">
                  {t(`places.${place.key}Desc`)}
                </p>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${HOTEL_ORIGIN}&destination=${place.dest}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/20 text-white text-[0.72rem] font-medium backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  {t('places.directions')} ↗
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
