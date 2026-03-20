import { useState, useRef, useEffect, useCallback } from 'react'
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

function MapLightbox({ src, alt, onClose }) {
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const translateStart = useRef({ x: 0, y: 0 })
  const lastTouchDist = useRef(null)
  const containerRef = useRef(null)

  const clampScale = (s) => Math.min(Math.max(s, 1), 5)

  // Wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.3 : 0.3
    setScale((prev) => {
      const next = clampScale(prev + delta)
      if (next === 1) setTranslate({ x: 0, y: 0 })
      return next
    })
  }, [])

  // Double tap to reset
  const lastTap = useRef(0)
  const handleTap = useCallback(() => {
    const now = Date.now()
    if (now - lastTap.current < 300) {
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    }
    lastTap.current = now
  }, [])

  // Mouse drag
  const handleMouseDown = (e) => {
    if (scale <= 1) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    translateStart.current = { ...translate }
  }
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    setTranslate({
      x: translateStart.current.x + (e.clientX - dragStart.current.x),
      y: translateStart.current.y + (e.clientY - dragStart.current.y),
    })
  }, [isDragging])
  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  // Touch drag + pinch
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastTouchDist.current = Math.hypot(dx, dy)
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true)
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      translateStart.current = { ...translate }
    }
  }
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      if (lastTouchDist.current !== null) {
        const delta = (dist - lastTouchDist.current) * 0.01
        setScale((prev) => {
          const next = clampScale(prev + delta)
          if (next === 1) setTranslate({ x: 0, y: 0 })
          return next
        })
      }
      lastTouchDist.current = dist
    } else if (e.touches.length === 1 && isDragging) {
      setTranslate({
        x: translateStart.current.x + (e.touches[0].clientX - dragStart.current.x),
        y: translateStart.current.y + (e.touches[0].clientY - dragStart.current.y),
      })
    }
  }, [isDragging])
  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length < 2) lastTouchDist.current = null
    if (e.touches.length === 0) setIsDragging(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleWheel, handleTouchMove])

  return (
    <div
      ref={containerRef}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
        touchAction: 'none',
        animation: 'mapFadeIn 0.3s ease',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10000,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          color: '#fff',
          fontSize: '1.3rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}
      >
        ✕
      </button>

      {/* Zoom controls */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 12,
        zIndex: 10000,
      }}>
        <button
          onClick={() => setScale((s) => { const n = clampScale(s - 0.5); if (n === 1) setTranslate({ x: 0, y: 0 }); return n })}
          style={zoomBtnStyle}
        >−</button>
        <span style={{ color: '#fff', fontSize: '0.8rem', minWidth: 48, textAlign: 'center', lineHeight: '36px' }}>
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale((s) => clampScale(s + 0.5))}
          style={zoomBtnStyle}
        >+</button>
      </div>

      <img
        src={src}
        alt={alt}
        onClick={handleTap}
        onMouseDown={handleMouseDown}
        draggable={false}
        style={{
          maxWidth: '95vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease',
          userSelect: 'none',
        }}
      />
    </div>
  )
}

const zoomBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.15)',
  border: 'none',
  color: '#fff',
  fontSize: '1.2rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(8px)',
}

export default function MapSection() {
  const { t } = useTranslation()
  const [legendOpen, setLegendOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const basePath = import.meta.env.BASE_URL
  const mapSrc = `${basePath}baskamap.png`

  return (
    <div>
      <style>{`
        @keyframes mapFadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>

      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('map.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('map.subtitle')}</p>

      {/* Map Image — clickable */}
      <div
        onClick={() => setLightboxOpen(true)}
        className="rounded-2xl overflow-hidden border border-[rgba(0,51,160,0.06)] shadow-[var(--shadow)] cursor-pointer relative group"
        style={{ marginBottom: '20px' }}
      >
        <img
          src={mapSrc}
          alt="BAŞKA Resort Bodrum — Resort Map"
          className="w-full h-auto"
          style={{ display: 'block' }}
        />
        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-[var(--primary)] text-[0.75rem] font-semibold px-4 py-2 rounded-full shadow-lg">
            🔍 {t('map.tapToZoom', 'Tap to zoom')}
          </span>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <MapLightbox
          src={mapSrc}
          alt="BAŞKA Resort Bodrum — Resort Map"
          onClose={() => setLightboxOpen(false)}
        />
      )}

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
