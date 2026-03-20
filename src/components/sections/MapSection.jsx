import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const mapLocations = [
  { id: '1', name: 'Main Building (Lobby Bar)' },
  { id: '2', name: 'Main Building Living Area (Ege & Begonvil Rooms)' },
  { id: '3', name: 'Bodrum Main Restaurant' },
  { id: '4', name: 'Cafe Bodrum' },
  { id: '5', name: 'Lobby Entrance' },
  { id: '6', name: 'Spa & Fitness Center' },
  { id: '7', name: 'Funicular Lift' },
  { id: '8', name: 'Panorama Event Zone' },
  { id: '9', name: 'Valet' },
  { id: '10', name: 'Shuttle' },
  { id: '11', name: 'Parking Zone' },
  { id: '12', name: 'Bistro Bodrum 24/7' },
  { id: '13', name: 'Swimming Pool' },
  { id: '14', name: 'Dome Room' },
  { id: '15', name: 'Köy Kahvesi' },
  { id: '16', name: 'Night Club Area' },
  { id: '17', name: 'Branded Theme Restaurant' },
  { id: '18', name: 'Italyan Gusto A la Carte' },
  { id: '19', name: 'Teppanyaki & Sushi' },
  { id: '20', name: 'Aegean Gourmet Bar' },
  { id: '21', name: 'Ege & Begonvil Club Rooms' },
  { id: '22', name: 'Stone Houses Coastal' },
  { id: '23', name: 'Pub Fıstık' },
  { id: '24', name: 'Başka Fish' },
  { id: '25', name: 'Mussel Bar' },
  { id: '26', name: "Cabana's Pavilion" },
  { id: '27', name: 'THE GULET on the SEA' },
  { id: '28', name: 'Sailing Academy' },
  { id: '29', name: 'Love Rooms' },
  { id: 'S-1', name: 'Market' },
  { id: 'S-2/S-3', name: 'Nish Boutique' },
  { id: 'M-3 – M-7', name: 'Mobile Food Stands (Fruits, Fish, etc.)' },
]

export default function MapSection() {
  const { t } = useTranslation()
  const [legendOpen, setLegendOpen] = useState(false)
  const basePath = import.meta.env.BASE_URL

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('map.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('map.subtitle')}</p>

      {/* Map Image */}
      <div
        className="rounded-2xl overflow-hidden border border-[rgba(0,51,160,0.06)] shadow-[var(--shadow)]"
        style={{ marginBottom: '20px' }}
      >
        <img
          src={`${basePath}baskamap.png`}
          alt="BAŞKA Resort Bodrum — Resort Map"
          className="w-full h-auto"
          style={{ display: 'block' }}
        />
      </div>

      {/* Expandable Legend */}
      <div
        className="bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-2xl shadow-[var(--shadow)] overflow-hidden"
      >
        <button
          onClick={() => setLegendOpen(!legendOpen)}
          className="w-full flex items-center justify-between cursor-pointer"
          style={{ padding: '18px 24px' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">📍</span>
            <span className="font-semibold text-[0.85rem] text-[var(--text-dark)]">
              {t('map.legend', 'Map Legend')}
            </span>
          </div>
          <span
            className="text-[var(--text-muted)] transition-transform duration-300"
            style={{
              display: 'inline-block',
              transform: legendOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              fontSize: '0.75rem'
            }}
          >
            ▼
          </span>
        </button>

        <div
          className="transition-all duration-400 ease-in-out overflow-hidden"
          style={{
            maxHeight: legendOpen ? '2000px' : '0px',
            opacity: legendOpen ? 1 : 0,
          }}
        >
          <div style={{ padding: '0 24px 20px' }}>
            <div className="flex flex-col gap-1.5">
              {mapLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="flex items-start gap-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60"
                  style={{ padding: '10px 14px' }}
                >
                  <span
                    className="flex-shrink-0 rounded-lg bg-[var(--primary)] text-white font-bold text-center"
                    style={{
                      minWidth: '36px',
                      padding: '3px 8px',
                      fontSize: '0.65rem',
                      lineHeight: '1.4',
                    }}
                  >
                    {loc.id}
                  </span>
                  <span className="text-[0.76rem] text-[var(--text-muted)] font-medium" style={{ paddingTop: '1px' }}>
                    {loc.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
