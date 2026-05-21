import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../Card'

const basePath = import.meta.env.BASE_URL
const WHATSAPP = '905421789246'

const brochureMap = {
  tr: 'SPA_BROCHURE_TR.pdf',
  ru: 'SPA_BROCHURE_RU.pdf',
}

function getBrochure(lang) {
  return brochureMap[lang?.split('-')[0]] || 'SPA_BROCHURE_EN.pdf'
}

const spaItems = [
  { key: 'hammam', icon: '🛁' },
  { key: 'sauna', icon: '🧖' },
  { key: 'fitness', icon: '💪' },
]

const categories = [
  {
    key: 'signatureTitle',
    image: 'signatures_and_couples.png',
    items: [
      { id: 's1', name: 'Nefes Spa Signature Experience', duration: '100 min.', price: 320, detail: 'Botanical Body Peeling + Signature Massage + Mini Facial' },
      { id: 's2', name: 'Serenity for Two', duration: '80 min.', price: 220, detail: 'Relax Massage + Mini Facial' },
      { id: 's3', name: 'Lavender Ritual', duration: '80 min.', price: 180, detail: 'Traditional Turkish Hammam + Bali Massage' },
    ],
  },
  {
    key: 'ritualsTitle',
    image: 'rituals_and_packages.png',
    items: [
      { id: 'r1', name: 'Nefes Spa Welcome Ritual', duration: '100 min.', price: 140, detail: 'Hammam + Swedish Massage + Mini Facial' },
      { id: 'r2', name: 'Revitalizing Effect', duration: '80 min.', price: 115, detail: 'Hammam or Botanical Peeling + Deep Tissue Massage' },
      { id: 'r3', name: 'Before Sun Tanning', duration: '80 min.', price: 110, detail: 'Exfoliating Peeling + Polynesian Massage' },
    ],
  },
  {
    key: 'massagesTitle',
    image: 'massages.png',
    items: [
      { id: 'm1', name: 'Nefes Spa Signature Massage', duration: '60–75 min.', price: 110, priceLabel: '€110–130' },
      { id: 'm2', name: 'Deep Tissue Massage', duration: '50–75 min.', price: 95, priceLabel: '€95–115' },
      { id: 'm3', name: 'Polynesian Massage Ritual', duration: '50 min.', price: 90 },
      { id: 'm4', name: 'Traditional Bali Massage', duration: '50 min.', price: 90 },
      { id: 'm5', name: 'Authentic Thai Massage', duration: '50–75 min.', price: 90, priceLabel: '€90–110' },
      { id: 'm6', name: 'Volcanic Hot Stone Massage', duration: '60–75 min.', price: 90, priceLabel: '€90–110' },
      { id: 'm7', name: 'Classic Swedish Massage', duration: '50–75 min.', price: 75, priceLabel: '€75–90' },
      { id: 'm8', name: 'Indian Head Massage', duration: '30 min.', price: 60 },
      { id: 'm9', name: 'Asian Foot Massage', duration: '30 min.', price: 60 },
      { id: 'm10', name: 'Back and Neck Massage', duration: '30 min.', price: 50 },
    ],
  },
  {
    key: 'facialTitle',
    image: 'facial_treatments.png',
    items: [
      { id: 'f1', name: 'Nefes Firming Facial Ritual', duration: '60 min.', price: 130 },
      { id: 'f2', name: 'Intensive Hydration Facial Ritual', duration: '50 min.', price: 110 },
      { id: 'f3', name: 'Mini Facial', duration: '20 min.', price: 50 },
      { id: 'f4', name: 'Nefes Eye Contour Treatment', duration: '20 min.', price: 0, priceLabel: 'Add-On' },
    ],
  },
  {
    key: 'hammamBodyTitle',
    image: 'hammam_and_body.png',
    items: [
      { id: 'h1', name: 'Nefes Spa Signature Hammam Ritual', duration: '50 min.', price: 80 },
      { id: 'h2', name: 'Traditional Turkish Hammam Ritual', duration: '30 min.', price: 70 },
      { id: 'h3', name: 'Botanical Exfoliating Body Peeling', duration: '30 min.', price: 70 },
    ],
  },
]

export default function SpaSection() {
  const { t, i18n } = useTranslation()
  const [openCategory, setOpenCategory] = useState(null)
  const [cart, setCart] = useState({})

  const brochureFile = getBrochure(i18n.language)

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const removeFromCart = (id) => {
    setCart(prev => {
      const next = { ...prev }
      if (next[id] > 1) next[id]--
      else delete next[id]
      return next
    })
  }

  const allItems = categories.flatMap(c => c.items)

  const sendBooking = () => {
    const ticket = '№' + Math.floor(10000 + Math.random() * 90000)
    const lines = [`🧖 Nefes Spa Booking ${ticket}`, '']
    let total = 0
    Object.entries(cart).forEach(([id, qty]) => {
      const item = allItems.find(i => i.id === id)
      if (!item) return
      const label = item.priceLabel || `€${item.price}`
      lines.push(`${qty}× ${item.name} (${item.duration}) — ${label}`)
      total += item.price * qty
    })
    if (total > 0) lines.push('', `💰 ~€${total}`)
    lines.push('', '— BAŞKA Guest Guide')
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
    setCart({})
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('spa.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('spa.subtitle')}</p>

      {/* Intro card */}
      <Card icon="🧘" title="Nefes Spa" delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-3">
          {t('spa.spaDesc')}
        </p>
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-[var(--bg-blue)]">
            <span className="text-[0.68rem] text-[var(--text-muted)]">🕐</span>
            <span className="text-[0.7rem] text-[var(--primary)] font-medium">{t('spa.hours')}</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-[var(--bg-warm)]">
            <span className="text-[0.68rem] text-[var(--text-muted)]">📞</span>
            <span className="text-[0.7rem] text-[var(--gold-dark)] font-medium">9500</span>
          </div>
          <div className="py-2 px-3 rounded-lg bg-[var(--bg-blue)]">
            <p className="text-[0.65rem] text-[var(--text-muted)]">{t('spa.cancellation')}</p>
          </div>
          <div className="py-2 px-3 rounded-lg bg-[var(--bg-warm)]">
            <p className="text-[0.65rem] text-[var(--gold-dark)]">{t('spa.ageNote')} · {t('spa.arriveNote')}</p>
          </div>
        </div>
        <a
          href={`${basePath}${brochureFile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 py-2.5 px-5 rounded-xl border border-[var(--primary)]/20 text-[var(--primary)] text-[0.72rem] font-medium hover:bg-[var(--bg-blue)] transition-colors"
        >
          📋 {t('spa.viewBrochure')}
        </a>
      </Card>

      {/* Treatment Menu — right after Nefes Spa card */}
      <div style={{ marginTop: '24px' }}>
        <div className="text-center" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-4 justify-center">
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
            <h3 className="font-['Cormorant_Garamond'] font-normal text-xl text-[var(--primary)]">
              Nefes Spa Menu
            </h3>
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
          </div>
        </div>

        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.key} className="rounded-2xl overflow-hidden border border-[var(--card-border)]">
              {/* Category header with background image */}
              <button
                onClick={() => setOpenCategory(openCategory === cat.key ? null : cat.key)}
                className="w-full relative cursor-pointer overflow-hidden"
                style={{ height: '110px' }}
              >
                <img
                  src={`${basePath}${cat.image}`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,30,80,0.35) 0%, rgba(0,20,60,0.65) 100%)' }} />
                <div className="relative z-10 h-full flex items-center justify-between" style={{ paddingLeft: '28px', paddingRight: '28px' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold text-[0.88rem] drop-shadow-sm">
                      {t(`spa.${cat.key}`)}
                    </span>
                    <span className="text-[0.6rem] text-white/70 bg-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {cat.items.length}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: openCategory === cat.key ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/80 text-[0.7rem]"
                  >
                    ▼
                  </motion.span>
                </div>
              </button>

              {/* Expandable items */}
              <AnimatePresence>
                {openCategory === cat.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden bg-white/80"
                  >
                    <div className="px-4 py-3 space-y-2">
                      {cat.items.map((item) => {
                        const qty = cart[item.id] || 0
                        const label = item.priceLabel || `€${item.price}`
                        return (
                          <div
                            key={item.id}
                            className="rounded-xl border"
                            style={{
                              padding: '14px 16px',
                              background: qty > 0 ? 'rgba(0,51,160,0.06)' : 'rgba(230,237,255,0.35)',
                              borderColor: qty > 0 ? 'rgba(0,51,160,0.15)' : 'rgba(0,51,160,0.05)',
                            }}
                          >
                            <div className="flex justify-between items-start gap-2 mb-1">
                              <h4 className="text-[0.76rem] text-[var(--text-dark)] font-medium leading-tight flex-1">
                                {item.name}
                              </h4>
                              <span className="text-[0.76rem] text-[var(--gold-dark)] font-semibold whitespace-nowrap">
                                {label}
                              </span>
                            </div>
                            <p className="text-[0.65rem] text-[var(--text-muted)] mb-1">
                              ⏱ {item.duration}
                            </p>
                            {item.detail && (
                              <p className="text-[0.6rem] text-[var(--text-muted)] italic leading-relaxed mb-2">
                                {item.detail}
                              </p>
                            )}
                            {/* Quantity controls */}
                            <div className="flex items-center gap-3 mt-2">
                              {qty > 0 ? (
                                <div className="flex items-center gap-0 rounded-lg overflow-hidden border border-[var(--primary)]/20">
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="w-8 h-8 flex items-center justify-center text-[var(--primary)] text-[0.85rem] font-bold cursor-pointer hover:bg-[var(--bg-blue)] transition-colors"
                                  >
                                    −
                                  </button>
                                  <span className="w-8 h-8 flex items-center justify-center text-[0.75rem] text-[var(--primary)] font-semibold bg-[var(--bg-blue)]">
                                    {qty}
                                  </span>
                                  <button
                                    onClick={() => addToCart(item.id)}
                                    className="w-8 h-8 flex items-center justify-center text-[var(--primary)] text-[0.85rem] font-bold cursor-pointer hover:bg-[var(--bg-blue)] transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <motion.button
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => addToCart(item.id)}
                                  className="py-1.5 px-4 rounded-lg border border-[var(--primary)]/20 text-[var(--primary)] text-[0.68rem] font-medium cursor-pointer hover:bg-[var(--bg-blue)] transition-colors"
                                >
                                  + {t('spa.add')}
                                </motion.button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Complimentary services */}
      <div style={{ marginTop: '48px' }}>
        <div className="text-center" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-4 justify-center">
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
            <h3 className="font-['Cormorant_Garamond'] font-normal text-xl text-[var(--primary)]">
              Complimentary
            </h3>
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
          </div>
        </div>
        {spaItems.map((item, i) => (
          <Card key={item.key} icon={item.icon} title={t(`spa.${item.key}`)} delay={i + 1}>
            <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
              {t(`spa.${item.key}Desc`)}
            </p>
          </Card>
        ))}
      </div>

      {/* Floating book button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 left-0 right-0 z-[9998] flex justify-center px-4"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={sendBooking}
              className="w-full max-w-sm py-3.5 rounded-2xl bg-[#25D366] text-white text-[0.82rem] font-semibold cursor-pointer shadow-xl flex items-center justify-center gap-2"
              style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.35)' }}
            >
              <span>📲</span>
              {t('spa.bookSelected')}
              <span className="ml-1 bg-white/20 px-2.5 py-0.5 rounded-full text-[0.72rem]">
                {totalItems}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
