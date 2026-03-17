import { useTranslation } from 'react-i18next'
import Card from '../Card'

const rooms = [
  { key: 'ege', icon: '🌅', size: '20–30 m²', beds: '1 French / 2 Twin' },
  { key: 'begonvil', icon: '🌺', size: '20–24 m²', beds: '1 French / 2 Twin' },
  { key: 'egeFamily', icon: '👨‍👩‍👧‍👦', size: '36–42 m²', beds: '1 French + 2 Twin' },
  { key: 'egeClub', icon: '⭐', size: '19–30 m²', beds: '1 French / 2 Twin' },
  { key: 'egeBegonvil', icon: '🌿', size: '19–22 m²', beds: '1 French / 2 Twin' },
  { key: 'egeClubFamily', icon: '🏠', size: '30–45 m²', beds: '1 French + 2 Twin' },
  { key: 'stoneHouses', icon: '🪨', size: '22–25 m²', beds: '1 French / 2 Twin' },
  { key: 'stoneCoastal', icon: '🏡', size: '30–35 m²', beds: '1 French / 2 Twin' },
  { key: 'askA', icon: '💕', size: '30–35 m²', beds: '1 French, Romantic' },
  { key: 'dome', icon: '🏛️', size: '100 m² Terrace', beds: 'Butler Service' }
]

export default function RoomsSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-2xl text-[var(--primary)] mb-1">
        {t('rooms.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-5">{t('rooms.subtitle')}</p>

      <Card icon="✨" title="Standard Amenities" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('rooms.description')}
        </p>
      </Card>

      {rooms.map((room, i) => (
        <Card key={room.key} icon={room.icon} title={t(`rooms.${room.key}`)} delay={i + 1}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed mb-2">
            {t(`rooms.${room.key}Desc`)}
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-[var(--bg-blue)] text-[var(--primary)] font-medium">
              {room.size}
            </span>
            <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-[var(--bg-warm)] text-[var(--gold-dark)] font-medium">
              {room.beds}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}
