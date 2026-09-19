// Номер WhatsApp зависит от выбранного языка:
// турецкий — отдельная линия, все остальные языки — общая.
//
// Важно: вызывать getWhatsAppNumber(i18n.language) в момент отправки,
// а не сохранять результат в константу уровня модуля — иначе при смене
// языка на лету номер останется от первого рендера.

const TR = '905421789249'
const DEFAULT = '905421789246'

export function getWhatsAppNumber(lang) {
  const base = (lang || 'en').split('-')[0]
  return base === 'tr' ? TR : DEFAULT
}

export function buildWhatsAppLink(lang, text) {
  const number = getWhatsAppNumber(lang)
  return text
    ? `https://wa.me/${number}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${number}`
}
