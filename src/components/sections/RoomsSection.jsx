import { useTranslation } from 'react-i18next'
import Card from '../Card'

const rooms = [
  { key: 'ege', size: '20–30 m²', beds: '1 French / 2 Twin' },
  { key: 'begonvil', size: '20–24 m²', beds: '1 French / 2 Twin' },
  { key: 'egeFamily', size: '36–42 m²', beds: '1 French + 2 Twin' },
  { key: 'egeClub', size: '19–30 m²', beds: '1 French / 2 Twin' },
  { key: 'egeBegonvil', size: '19–22 m²', beds: '1 French / 2 Twin' },
  { key: 'egeClubFamily', size: '30–45 m²', beds: '1 French + 2 Twin' },
  { key: 'stoneHouses', size: '22–25 m²', beds: '1 French / 2 Twin' },
  { key: 'stoneCoastal', size: '30–35 m²', beds: '1 French / 2 Twin' },
  { key: 'askA', size: '30–35 m²', beds: '1 French, Romantic' },
  { key: 'dome', size: '100 m² Terrace', beds: 'Butler Service' }
]

export default function RoomsSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('rooms.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-7">{t('rooms.subtitle')}</p>

      <Card title="Standard Amenities" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('rooms.description')}
        </p>
      </Card>

      {rooms.map((room, i) => (
        <Card key={room.key} title={t(`rooms.${room.key}`)} delay={i + 1}>
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
