import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'

// Map language to the matching sustainability report PDF
// TR users get Turkish, RU users get Russian, everyone else gets English
function getReportFile(lang) {
  const base = (lang || 'en').split('-')[0]
  if (base === 'tr') return 'sustainability-report-tr.pdf'
  if (base === 'ru') return 'sustainability-report-ru.pdf'
  return 'sustainability-report-en.pdf'
}

export default function ImportantSection() {
  const { t, i18n } = useTranslation()
  const items = t('important.items', { returnObjects: true })
  const basePath = import.meta.env.BASE_URL
  const reportHref = `${basePath}${getReportFile(i18n.language)}`

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-2">
        {t('important.title')}
      </h2>
      <p className="text-[0.74rem] text-[var(--text-muted)] mb-8">{t('important.subtitle')}</p>

      <Card title={t('important.title')} delay={0}>
        <div className="space-y-2">
          {Array.isArray(items) && items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-2.5 py-2 px-3 rounded-lg bg-[var(--bg-warm)] border border-[rgba(245,197,24,0.15)]"
            >
              <span className="w-5 h-5 rounded-full bg-[rgba(245,197,24,0.2)] border border-[var(--gold)] flex items-center justify-center text-[0.6rem] text-[var(--gold-dark)] font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-[0.74rem] text-[var(--text-muted)] leading-[1.7]">{item}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card icon="🌿" title={t('important.sustainabilityTitle')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-[1.7] mb-4">
          {t('important.sustainabilityDesc')}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            window.open(reportHref, '_blank', 'noopener,noreferrer')
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--primary)] text-white text-[0.78rem] font-medium hover:bg-[var(--primary-dark)] transition-colors duration-300 cursor-pointer"
        >
          <span>📄</span>
          <span>{t('important.sustainabilityCta')}</span>
        </button>
      </Card>
    </div>
  )
}
