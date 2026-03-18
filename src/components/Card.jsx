import { motion } from 'framer-motion'

export default function Card({ children, icon, title, label, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className={`bg-[var(--card-cream)] rounded-2xl p-6 mb-7 shadow-[var(--shadow)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] ${className}`}
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
