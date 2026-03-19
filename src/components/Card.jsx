import { motion } from 'framer-motion'

export default function Card({ children, icon, title, label, className = '', delay = 0, animate: shouldAnimate = true }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const motionProps = shouldAnimate
    ? {
        initial: { opacity: 0, y: isMobile ? 12 : 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: isMobile ? 0.35 : 0.5, delay: delay * 0.08, ease: 'easeOut' },
        whileHover: isMobile ? {} : { y: -2 },
      }
    : {}

  return (
    <motion.div
      {...motionProps}
      style={{ padding: '32px 28px' }}
      className={`bg-white/60 backdrop-blur-sm border border-[rgba(0,51,160,0.06)] rounded-2xl mb-10 shadow-[var(--shadow)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      {(icon || title) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-base flex-shrink-0">
              {icon}
            </div>
          )}
          <div>
            {title && <div className="font-semibold text-[0.85rem] text-[var(--text-dark)]">{title}</div>}
            {label && <div className="text-[0.65rem] text-[var(--text-muted)] mt-1">{label}</div>}
          </div>
        </div>
      )}
      {children}
    </motion.div>
  )
}
