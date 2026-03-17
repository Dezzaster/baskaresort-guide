import { motion } from 'framer-motion'

export default function Card({ children, icon, title, label, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.08, ease: 'easeOut' }}
      className={`bg-white rounded-2xl p-4 mb-3 border border-[var(--card-border)] shadow-[var(--shadow)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-[1.01] hover:-translate-y-0.5 ${className}`}
    >
      {(icon || title) && (
        <div className="flex items-center gap-2.5 mb-2">
          {icon && (
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--bg-blue)] flex items-center justify-center text-base flex-shrink-0">
              {icon}
            </div>
          )}
          <div>
            {title && <div className="font-semibold text-[0.82rem] text-[var(--primary)]">{title}</div>}
            {label && <div className="text-[0.63rem] text-[var(--text-muted)] mt-0.5">{label}</div>}
          </div>
        </div>
      )}
      {children}
    </motion.div>
  )
}
