import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Document, Page, pdfjs } from 'react-pdf'
import LanguageSelector from '../components/LanguageSelector'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const basePath = import.meta.env.BASE_URL

const menuData = {
  'fish-dinner':       { file: 'Kıyıda A La Carte Dinner Menu Kopyası.pdf', isDrink: false, labelKey: 'dinnerMenu', restaurantKey: 'fish' },
  'fish-lunch':        { file: 'Kıyıda A La Carte Lunch Menu.pdf',          isDrink: false, labelKey: 'lunchMenu',  restaurantKey: 'fish' },
  'teppanyaki-dinner': { file: 'Kai Teppanyaki A La Carte Dinner Menu.pdf',  isDrink: false, labelKey: 'dinnerMenu', restaurantKey: 'teppanyaki' },
  'italian-dinner':    { file: 'Lento Italian A La Carte Dinner Menu.pdf',   isDrink: false, labelKey: 'dinnerMenu', restaurantKey: 'italian' },
  'daima':             { file: 'Daima Restaurant Menu.pdf',                  isDrink: false, labelKey: 'viewMenu',   restaurantKey: 'daima' },
  'beverages':         { file: 'Beverage Menu.pdf',                          isDrink: true,  labelKey: 'drinkMenu' },
  'wine':              { file: 'Wine Menu.pdf',                              isDrink: true,  labelKey: 'wineMenu' },
}

const restaurantList = [
  { nameKey: 'fish', code: 'A-1', items: ['fish-dinner', 'fish-lunch'] },
  { nameKey: 'teppanyaki', code: 'A-2', items: ['teppanyaki-dinner'] },
  { nameKey: 'italian', code: 'A-3', items: ['italian-dinner'] },
  { nameKey: 'daima', code: '', items: ['daima'] },
]

function getMenuName(id, t) {
  const m = menuData[id]
  if (!m) return ''
  if (m.isDrink) return t(`menuPage.${m.labelKey}`)
  const rName = m.restaurantKey === 'daima' ? 'Daima Restaurant' : t(`alacarte.${m.restaurantKey}`)
  return `${rName} — ${t(`menu.${m.labelKey}`)}`
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div
        style={{
          width: 36, height: 36,
          border: '3px solid rgba(0,51,160,0.1)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

function Viewer({ menuId, originalMenuId, onSwitchDrink, onBack, onBackToListing, showBackToListing }) {
  const { t } = useTranslation()
  const [numPages, setNumPages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)

  const menu = menuData[menuId]
  const isDrink = menu?.isDrink
  const showDrinkButtons = !isDrink
  const showBackButton = isDrink && !!originalMenuId

  useEffect(() => {
    setLoading(true)
    setNumPages(null)
    setError(false)
  }, [menuId])

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setWidth(containerRef.current.clientWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const onLoadSuccess = useCallback(({ numPages: n }) => {
    setNumPages(n)
    setLoading(false)
  }, [])

  const onLoadError = useCallback(() => {
    setError(true)
    setLoading(false)
  }, [])

  if (!menu) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#f5f5f5' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          background: 'var(--primary)',
          padding: '12px 16px',
          minHeight: 48,
        }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {showBackToListing && (
            <button
              onClick={onBackToListing}
              className="text-white/70 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              style={{ background: 'none', border: 'none', fontSize: '1.2rem', padding: '0 4px' }}
            >
              ←
            </button>
          )}
          <span className="text-white text-[0.78rem] font-medium truncate">
            {getMenuName(menuId, t)}
          </span>
        </div>

        <div className="flex gap-2 flex-shrink-0 ml-3">
          {showDrinkButtons && (
            <>
              <button
                onClick={() => onSwitchDrink('wine')}
                className="text-[0.65rem] font-medium cursor-pointer transition-all"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '6px 10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('menuPage.wineMenu')}
              </button>
              <button
                onClick={() => onSwitchDrink('beverages')}
                className="text-[0.65rem] font-medium cursor-pointer transition-all"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '6px 10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('menuPage.drinkMenu')}
              </button>
            </>
          )}
          {showBackButton && (
            <button
              onClick={onBack}
              className="text-[0.65rem] font-medium cursor-pointer transition-all"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                borderRadius: 8,
                padding: '6px 10px',
                whiteSpace: 'nowrap',
              }}
            >
              ← {t('menuPage.back')}
            </button>
          )}
        </div>
      </div>

      {/* PDF content */}
      <div ref={containerRef} className="flex-1 overflow-y-auto overflow-x-hidden">
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-[var(--text-muted)] text-[0.8rem]">{t('menuPage.loadError')}</p>
            <a
              href={`${basePath}${menu.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-white text-[0.78rem] font-medium"
              style={{ background: 'var(--primary)' }}
            >
              {t('menuPage.openExternal')}
            </a>
          </div>
        ) : (
          <>
            {loading && <Spinner />}
            <Document
              file={`${basePath}${menu.file}`}
              onLoadSuccess={onLoadSuccess}
              onLoadError={onLoadError}
              loading=""
            >
              {numPages && Array.from({ length: numPages }, (_, i) => (
                <Page
                  key={`${menuId}-${i}`}
                  pageNumber={i + 1}
                  width={width || undefined}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading=""
                  className="pdf-page"
                />
              ))}
            </Document>
          </>
        )}
      </div>
    </div>
  )
}

function Listing({ onSelectMenu, t }) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fff 0%, #FFFBF0 30%, #FFF8EC 100%)' }}>
      {/* Header */}
      <header className="text-center" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
        <img
          src={`${basePath}BASKA RESORT-LOGO.png`}
          alt="BAŞKA Resort Bodrum"
          style={{ height: '72px', width: 'auto', margin: '0 auto' }}
        />
        <h1
          className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)] mt-4"
          style={{ fontSize: '1.5rem' }}
        >
          {t('menuPage.title')}
        </h1>
        <p className="text-[0.72rem] text-[var(--text-muted)] mt-1">
          {t('menuPage.subtitle')}
        </p>
        <div className="mt-3">
          <LanguageSelector />
        </div>
      </header>

      {/* Drink menus */}
      <div className="px-5" style={{ maxWidth: 480, margin: '0 auto' }}>
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => onSelectMenu('wine')}
            className="flex-1 rounded-xl text-white text-[0.76rem] font-medium cursor-pointer transition-all hover:shadow-lg"
            style={{
              padding: '16px 12px',
              background: 'linear-gradient(135deg, #722F37, #9B2335)',
              border: 'none',
            }}
          >
            {t('menuPage.wineMenu')}
          </button>
          <button
            onClick={() => onSelectMenu('beverages')}
            className="flex-1 rounded-xl text-white text-[0.76rem] font-medium cursor-pointer transition-all hover:shadow-lg"
            style={{
              padding: '16px 12px',
              background: 'var(--primary)',
              border: 'none',
            }}
          >
            {t('menuPage.drinkMenu')}
          </button>
        </div>

        {/* Restaurant cards */}
        {restaurantList.map((r) => (
          <div
            key={r.nameKey}
            className="bg-white rounded-2xl mb-4 overflow-hidden"
            style={{
              border: '1px solid rgba(0,51,160,0.08)',
              boxShadow: '0 2px 16px rgba(0,51,160,0.04)',
            }}
          >
            <div
              className="flex items-center justify-between px-5"
              style={{ paddingTop: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(0,51,160,0.05)' }}
            >
              <h3 className="font-['Cormorant_Garamond'] font-normal text-[var(--primary)]" style={{ fontSize: '1.1rem' }}>
                {r.nameKey === 'daima' ? 'Daima Restaurant' : t(`alacarte.${r.nameKey}`)}
              </h3>
              {r.code && (
                <span className="text-[0.62rem] text-[var(--text-muted)] px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-blue)' }}>
                  {r.code}
                </span>
              )}
            </div>
            <div className="px-5" style={{ paddingTop: '12px', paddingBottom: '16px' }}>
              <div className={`grid gap-2 ${r.items.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {r.items.map((id) => (
                  <button
                    key={id}
                    onClick={() => onSelectMenu(id)}
                    className="rounded-xl text-[var(--primary)] text-[0.73rem] font-medium cursor-pointer hover:bg-[var(--bg-blue)] transition-colors"
                    style={{
                      padding: '14px 12px',
                      background: 'none',
                      border: '1px solid rgba(0,51,160,0.12)',
                    }}
                  >
                    {t(`menu.${menuData[id].labelKey}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Back to guide */}
        <div className="text-center py-6">
          <a
            href={basePath}
            className="text-[0.7rem] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
          >
            ← {t('menuPage.backToGuide')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  const { t } = useTranslation()
  const [currentMenu, setCurrentMenu] = useState(null)
  const [originalMenu, setOriginalMenu] = useState(null)
  const [fromHash, setFromHash] = useState(false)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && menuData[hash]) {
      setCurrentMenu(hash)
      if (!menuData[hash].isDrink) setOriginalMenu(hash)
      setFromHash(true)
    }
  }, [])

  const handleSelectMenu = (id) => {
    setCurrentMenu(id)
    if (!menuData[id].isDrink) setOriginalMenu(id)
    setFromHash(false)
  }

  const handleSwitchDrink = (drinkId) => {
    setCurrentMenu(drinkId)
  }

  const handleBackFromDrink = () => {
    if (originalMenu) setCurrentMenu(originalMenu)
  }

  const handleBackToListing = () => {
    setCurrentMenu(null)
    setOriginalMenu(null)
  }

  if (currentMenu) {
    return (
      <Viewer
        menuId={currentMenu}
        originalMenuId={originalMenu}
        onSwitchDrink={handleSwitchDrink}
        onBack={handleBackFromDrink}
        onBackToListing={!fromHash ? handleBackToListing : null}
        showBackToListing={!fromHash}
      />
    )
  }

  return <Listing onSelectMenu={handleSelectMenu} t={t} />
}
