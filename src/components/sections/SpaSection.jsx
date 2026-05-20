import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../Card'

const basePath = import.meta.env.BASE_URL
const WHATSAPP = '905307387764'

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

const treatments = {
  signatureTitle: [
    { name: 'Nefes Spa Signature Experience', duration: '100 min.', price: '€320', detail: 'Botanical Body Peeling + Signature Massage + Mini Facial' },
    { name: 'Serenity for Two', duration: '80 min.', price: '€220', detail: 'Relax Massage + Mini Facial' },
    { name: 'Lavender Ritual', duration: '80 min.', price: '€180', detail: 'Traditional Turkish Hammam + Bali Massage' },
  ],
  ritualsTitle: [
    { name: 'Nefes Spa Welcome Ritual', duration: '100 min.', price: '€140', detail: 'Hammam + Swedish Massage + Mini Facial' },
    { name: 'Revitalizing Effect', duration: '80 min.', price: '€115', detail: 'Hammam or Botanical Peeling + Deep Tissue Massage' },
    { name: 'Before Sun Tanning', duration: '80 min.', price: '€110', detail: 'Exfoliating Peeling + Polynesian Massage' },
  ],
  massagesTitle: [
    { name: 'Nefes Spa Signature Massage', duration: '60–75 min.', price: '€110–130' },
    { name: 'Deep Tissue Massage', duration: '50–75 min.', price: '€95–115' },
    { name: 'Polynesian Massage Ritual', duration: '50 min.', price: '€90' },
    { name: 'Traditional Bali Massage', duration: '50 min.', price: '€90' },
    { name: 'Authentic Thai Massage', duration: '50–75 min.', price: '€90–110' },
    { name: 'Volcanic Hot Stone Massage', duration: '60–75 min.', price: '€90–110' },
    { name: 'Classic Swedish Massage', duration: '50–75 min.', price: '€75–90' },
    { name: 'Indian Head Massage', duration: '30 min.', price: '€60' },
    { name: 'Asian Foot Massage', duration: '30 min.', price: '€60' },
    { name: 'Back and Neck Massage', duration: '30 min.', price: '€50' },
  ],
  facialTitle: [
    { name: 'Nefes Firming Facial Ritual', duration: '60 min.', price: '€130' },
    { name: 'Intensive Hydration Facial Ritual', duration: '50 min.', price: '€110' },
    { name: 'Mini Facial', duration: '20 min.', price: '€50' },
    { name: 'Nefes Eye Contour Treatment', duration: '20 min.', price: 'Add-On' },
  ],
  hammamBodyTitle: [
    { name: 'Nefes Spa Signature Hammam Ritual', duration: '50 min.', price: '€80' },
    { name: 'Traditional Turkish Hammam Ritual', duration: '30 min.', price: '€70' },
    { name: 'Botanical Exfoliating Body Peeling', duration: '30 min.', price: '€70' },
  ],
}

const categoryIcons = {
  signatureTitle: '💎',
  ritualsTitle: '🌿',
  massagesTitle: '💆',
  facialTitle: '✨',
  hammamBodyTitle: '🛁',
}

export default function SpaSection() {
  const { t, i18n } = useTranslation()
  const [openCategory, setOpenCategory] = useState(null)
  const [confirmItem, setConfirmItem] = useState(null)

  const brochureFile = getBrochure(i18n.language)

  const sendBooking = (item) => {
    const ticket = '№' + Math.floor(10000 + Math.random() * 90000)
    const msg = [
      `🧖 Nefes Spa Booking ${ticket}`,
      '',
      `💆 ${item.name}`,
      `⏱ ${item.duration}`,
      `💰 ${item.price}`,
      '',
      '— BAŞKA Guest Guide'
    ].join('\n')
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
    setConfirmItem(null)
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
          <div className="py-2 px-3 rounded-lg bg-[var(--bg-warm)]">
            <p className="text-[0.65rem] text-[var(--gold-dark)]">{t('spa.cancellation')}</p>
          </div>
          <div className="py-2 px-3 rounded-lg bg-[var(--bg-blue)]">
            <p className="text-[0.65rem] text-[var(--text-muted)]">{t('spa.ageNote')} · {t('spa.arriveNote')}</p>
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

      {/* Complimentary services */}
      {spaItems.map((item, i) => (
        <Card key={item.key} icon={item.icon} title={t(`spa.${item.key}`)} delay={i + 1}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7]">
            {t(`spa.${item.key}Desc`)}
          </p>
        </Card>
      ))}

      {/* Treatment Menu */}
      <div style={{ marginTop: '48px' }}>
        <div className="text-center" style={{ marginBottom: '28px' }}>
          <div className="flex items-center gap-4 justify-center" style={{ marginBottom: '10px' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
            <h3 className="font-['Cormorant_Garamond'] font-normal text-xl text-[var(--primary)]">
              Nefes Spa Menu
            </h3>
            <div style={{ height: '1px', width: '40px', background: 'rgba(0,51,160,0.12)' }} />
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(treatments).map(([catKey, items]) => (
            <div key={catKey} className="rounded-2xl border border-[var(--card-border)] bg-white/80 overflow-hidden">
              <button
                onClick={() => setOpenCategory(openCategory === catKey ? null : catKey)}
                className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{categoryIcons[catKey]}</span>
                  <span className="text-[0.82rem] text-[var(--primary)] font-semibold">
                    {t(`spa.${catKey}`)}
                  </span>
                  <span className="text-[0.6rem] text-[var(--text-muted)] bg-[var(--bg-blue)] px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: openCategory === catKey ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[var(--primary)] text-[0.7rem]"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {openCategory === catKey && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2">
                      {items.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl bg-[rgba(230,237,255,0.35)] border border-[rgba(0,51,160,0.05)]"
                          style={{ padding: '14px 16px' }}
                        >
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="text-[0.76rem] text-[var(--text-dark)] font-medium leading-tight flex-1">
                              {item.name}
                            </h4>
                            <span className="text-[0.76rem] text-[var(--gold-dark)] font-semibold whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-[0.65rem] text-[var(--text-muted)] mb-1">
                            ⏱ {item.duration}
                          </p>
                          {item.detail && (
                            <p className="text-[0.6rem] text-[var(--text-muted)] italic leading-relaxed">
                              {item.detail}
                            </p>
                          )}
                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setConfirmItem(item)}
                            className="mt-2 w-full py-2 rounded-lg bg-[var(--primary)] text-white text-[0.68rem] font-medium cursor-pointer hover:bg-[var(--primary)]/90 transition-colors"
                          >
                            {t('spa.bookTreatment')}
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Booking confirmation modal */}
      <AnimatePresence>
        {confirmItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setConfirmItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl mx-6 w-full max-w-sm overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-[var(--primary)] px-6 py-5 text-center">
                <p className="text-white text-[0.9rem] font-medium">
                  Nefes Spa
                </p>
              </div>
              <div className="px-6 py-5">
                <p className="text-[0.95rem] text-[var(--primary)] font-semibold text-center mb-1">
                  {confirmItem.name}
                </p>
                <p className="text-[0.78rem] text-[var(--text-muted)] text-center mb-1">
                  ⏱ {confirmItem.duration}
                </p>
                <p className="text-[0.85rem] text-[var(--gold-dark)] font-semibold text-center mb-5">
                  {confirmItem.price}
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => sendBooking(confirmItem)}
                  className="w-full py-3 rounded-xl bg-[#25D366] text-white text-[0.8rem] font-semibold cursor-pointer hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
                >
                  <span>📲</span> {t('spa.bookTreatment')}
                </motion.button>
                <button
                  onClick={() => setConfirmItem(null)}
                  className="w-full mt-2 py-2.5 text-[0.74rem] text-[var(--text-muted)] cursor-pointer hover:text-[var(--primary)] transition-colors"
                >
                  {t('menu.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
