import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Card from '../Card'

function PoolSplash() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#e8f4fd] to-[#d0ebff] p-4 mb-3">
      {/* Left splash */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`l-${i}`}
            className="absolute rounded-full bg-[#4dabf7]/30"
            style={{
              width: 6 + Math.random() * 8,
              height: 6 + Math.random() * 8,
              left: 8 + i * 6,
              top: -20 + i * 12,
            }}
            animate={{
              x: [0, -(10 + i * 5), -(5 + i * 3)],
              y: [0, -(15 + i * 8), 5 + i * 4],
              opacity: [0, 0.8, 0],
              scale: [0.3, 1.2, 0.5],
            }}
            transition={{ duration: 1, delay: i * 0.08, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}
      </motion.div>

      {/* Right splash */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`r-${i}`}
            className="absolute rounded-full bg-[#4dabf7]/30"
            style={{
              width: 6 + Math.random() * 8,
              height: 6 + Math.random() * 8,
              right: 8 + i * 6,
              top: -20 + i * 12,
            }}
            animate={{
              x: [0, 10 + i * 5, 5 + i * 3],
              y: [0, -(15 + i * 8), 5 + i * 4],
              opacity: [0, 0.8, 0],
              scale: [0.3, 1.2, 0.5],
            }}
            transition={{ duration: 1, delay: i * 0.08, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}
      </motion.div>

      {/* Water wave lines */}
      <svg className="absolute bottom-0 left-0 right-0 h-6 opacity-20" viewBox="0 0 400 24" preserveAspectRatio="none">
        <motion.path
          d="M0 12 Q50 0, 100 12 T200 12 T300 12 T400 12 V24 H0Z"
          fill="#4dabf7"
          animate={{ d: [
            "M0 12 Q50 0, 100 12 T200 12 T300 12 T400 12 V24 H0Z",
            "M0 12 Q50 24, 100 12 T200 12 T300 12 T400 12 V24 H0Z",
            "M0 12 Q50 0, 100 12 T200 12 T300 12 T400 12 V24 H0Z",
          ] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      <div className="relative z-10 text-center">
        <span className="text-[0.8rem] font-semibold text-[#4dabf7]">POOL</span>
      </div>
    </div>
  )
}

export default function BeachSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] font-normal text-[1.5rem] text-[var(--primary)] mb-1">
        {t('beach.title')}
      </h2>
      <p className="text-[0.72rem] text-[var(--text-muted)] mb-6">{t('beach.subtitle')}</p>

      <Card title={t('beach.title')} delay={0}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('beach.beachDesc')}
        </p>
      </Card>

      <Card title={t('beach.pavilion')} delay={1}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('beach.pavilionDesc')}
        </p>
      </Card>

      {/* Pool card with splash animation */}
      <div className="relative">
        <PoolSplash />
        <Card title={t('beach.pool')} delay={2}>
          <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
            {t('beach.poolDesc')}
          </p>
        </Card>
      </div>

      <Card title={t('beach.shuttle')} delay={3}>
        <p className="text-[0.76rem] text-[var(--text-muted)] leading-relaxed">
          {t('beach.shuttleDesc')}
        </p>
      </Card>
    </div>
  )
}
