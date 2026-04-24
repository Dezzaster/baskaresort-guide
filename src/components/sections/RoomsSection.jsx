import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'

const WHATSAPP = '905307387764'

const rooms = [
  { key: 'ege', size: '20–30 m²', beds: '1 French / 2 Single' },
  { key: 'begonvil', size: '20–24 m²', beds: '1 French / 2 Single' },
  { key: 'egeFamily', size: '36–42 m²', beds: '1 French + 2 Single' },
  { key: 'egeClub', size: '19–30 m²', beds: '1 French / 2 Single' },
  { key: 'egeBegonvil', size: '19–22 m²', beds: '1 French / 2 Single' },
  { key: 'egeClubFamily', size: '30–45 m²', beds: '1 French + 2 Single' },
  { key: 'stoneHouses', size: '22–25 m²', beds: '1 French / 2 Single' },
  { key: 'stoneCoastal', size: '30–35 m²', beds: '1 French / 2 Single' },
  { key: 'askA', size: '30–35 m²', beds: '1 French, Romantic' },
  { key: 'dome', size: '100 m² Terrace', beds: 'Butler Service' }
]

export default function RoomsSection() {
  const { t } = useTranslation()

  const bi = (key) => {
    const u = t(key), tr = t(key, { lng: 'tr' })
    return u === tr ? u : `${u} / ${tr}`
  }

  const handleUpgrade = (key) => {
    const ticket = '№' + Math.floor(10000 + Math.random() * 90000)
    const roomName = t(`rooms.${key}`)
    const roomNameTr = t(`rooms.${key}`, { lng: 'tr' })
    const biRoom = roomName === roomNameTr ? roomName : `${roomName} / ${roomNameTr}`

    const msg = [
      `🏨 ${bi('rooms.upgradeTitle')} ${ticket}`,
      '',
      `${bi('rooms.upgradeIntro')}`,
      `🔑 ${biRoom}`,
      '',
      '— BAŞKA Guest Guide'
    ].join('\n')
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('rooms.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('rooms.subtitle')}</p>

      <Card title="Standard Amenities" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
          {t('rooms.description')}
        </p>
      </Card>

      {rooms.map((room, i) => (
        <Card key={room.key} title={t(`rooms.${room.key}`)} delay={i + 1}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-2">
            {t(`rooms.${room.key}Desc`)}
          </p>
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-[var(--bg-blue)] text-[var(--primary)] font-medium">
              {room.size}
            </span>
            <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-[var(--bg-warm)] text-[var(--gold-dark)] font-medium">
              {room.beds}
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleUpgrade(room.key)}
            className="w-full py-2 rounded-xl border border-[var(--primary)]/30 text-[var(--primary)] text-[0.7rem] font-medium cursor-pointer hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
          >
            {t('rooms.requestUpgrade')}
          </motion.button>
        </Card>
      ))}
    </div>
  )
}
