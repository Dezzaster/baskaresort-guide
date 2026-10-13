// Сезонный переключатель.
//
// В конце сезона рестораны и бары закрываются, и PDF-меню еды и напитков
// прячутся по всему гиду разом — карточки заведений при этом остаются.
// Чтобы вернуть всё к новому сезону, достаточно поставить true здесь:
// это единственное место на весь проект.
//
// Затрагивает: AlacarteSection, BarsSection, DiningSection, BeachSection
// и страницу /menu (включая QR-ссылки).
//
// Брошюра спа под этот флаг НЕ попадает — это не меню еды и напитков.
export const SHOW_MENUS = false

// À la carte рестораны, закрытые на межсезонье: их карточки не показываются
// ни в разделе A La Carte, ни на странице /menu. Ключи — как в locales
// (`alacarte.*`) и в restaurantList на странице меню.
// Открыть обратно — убрать ключ из списка.
// Сейчас закрыты все три — вкладка A La Carte скрывается сама (см. isSectionVisible).
export const CLOSED_ALACARTE = ['fish', 'teppanyaki', 'italian']

// Все à la carte рестораны гида — нужен, чтобы понять, остался ли хоть один открытый.
const ALL_ALACARTE = ['fish', 'teppanyaki', 'italian']

export function isAlacarteOpen(key) {
  return !CLOSED_ALACARTE.includes(key)
}

// Бары, закрытые на межсезонье (ключи `bars.*`).
// coffeeHouse — Zeytinaltı Köy Kahvesi; loungeBar — у персонала «Begonvil Bar»;
// beachPastane — Beach Patisserie; poolLounge — Alize Pool Bar.
export const CLOSED_BARS = ['coffeeHouse', 'loungeBar', 'beachPastane', 'poolLounge']

export function isBarOpen(key) {
  return !CLOSED_BARS.includes(key)
}

// Снэк-рестораны, закрытые на межсезонье (ключи `snacks.*`).
// Сейчас закрыты все, включая Gözleme и Fıstık Döner, — поэтому раздел
// Snack Restaurants в Dining скрыт целиком (он прячется сам, когда открытых
// точек не осталось). Открыть точку — убрать её ключ из списка.
// 'leziz' совпадает с ключом ресторана на странице /menu — это то же место,
// поэтому закрытие убирает и его QR-меню.
export const CLOSED_SNACKS = ['leziz', 'kiyida', 'lento', 'koyKahvesi', 'gozleme', 'fistik']

export function isSnackOpen(key) {
  return !CLOSED_SNACKS.includes(key)
}

// Разделы гида, скрытые на межсезонье (ключи — как в App.jsx и `nav.*`).
// Убираются из обеих навигаций: вкладок и бургер-меню.
export const HIDDEN_SECTIONS = ['kids']

export function isSectionVisible(key) {
  if (HIDDEN_SECTIONS.includes(key)) return false
  // Вкладка A La Carte прячется сама, когда открытых ресторанов не осталось,
  // и возвращается, как только хоть один убран из CLOSED_ALACARTE.
  if (key === 'alacarte') return ALL_ALACARTE.some(isAlacarteOpen)
  return true
}

// Карточка BAŞKA Sailing Academy в разделе Activities.
export const SHOW_SAILING_ACADEMY = false
