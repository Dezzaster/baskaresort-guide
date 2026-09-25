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
