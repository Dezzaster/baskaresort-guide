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
export const CLOSED_ALACARTE = ['teppanyaki', 'italian']

export function isAlacarteOpen(key) {
  return !CLOSED_ALACARTE.includes(key)
}

// Бары, закрытые на межсезонье (ключи `bars.*`).
// coffeeHouse — Zeytinaltı Köy Kahvesi; loungeBar — у персонала «Begonvil Bar».
export const CLOSED_BARS = ['coffeeHouse', 'loungeBar']

export function isBarOpen(key) {
  return !CLOSED_BARS.includes(key)
}

// Снэк-рестораны, закрытые на межсезонье (ключи `snacks.*`).
// Из раздела сейчас открыт только Fıstık Döner. Gözleme тоже временно
// скрыта — убрать 'gozleme' из списка, когда точка откроется.
// 'leziz' совпадает с ключом ресторана на странице /menu — это то же место,
// поэтому закрытие убирает и его QR-меню.
export const CLOSED_SNACKS = ['leziz', 'kiyida', 'lento', 'koyKahvesi', 'gozleme']

export function isSnackOpen(key) {
  return !CLOSED_SNACKS.includes(key)
}

// Разделы гида, скрытые на межсезонье (ключи — как в App.jsx и `nav.*`).
// Убираются из обеих навигаций: вкладок и бургер-меню.
export const HIDDEN_SECTIONS = ['kids']

export function isSectionVisible(key) {
  return !HIDDEN_SECTIONS.includes(key)
}

// Карточка BAŞKA Sailing Academy в разделе Activities.
export const SHOW_SAILING_ACADEMY = false
