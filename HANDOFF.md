# BAŞKA Resort Guest Guide — состояние проекта

Документ-память проекта. Держать в корне репозитория и обновлять при изменениях,
чтобы любая новая сессия сразу имела полный контекст без пересказа истории.

---

## Стек

- React 19 + Vite 7 + Tailwind CSS v4
- i18next, 8 языков: `en, tr, ru, de, fr, ar, pl, uk`
- Framer Motion (анимации), GSAP + ScrollTrigger
- react-router-dom (роутинг), react-pdf (просмотр PDF)
- VitePWA, `registerType: 'autoUpdate'`

**Важно про PWA:** service worker кэширует агрессивно. После деплоя изменения
могут не отображаться — нужен hard refresh (Ctrl+Shift+R) или
DevTools → Application → Clear site data.

**Важно про Tailwind:** если класс не применяется (наблюдалось с `px-7`,
паддингами заголовков категорий спа) — использовать инлайн-стили.

Домен: **guide.baskaresort.com**
Рабочая ветка: `claude/create-hotel-guide-vVYUz`

---

## Контакты

**WhatsApp (основной): `905307387764`**

Захардкожен в 7 файлах — при смене менять во всех:
`RequestsSection`, `InfoSection`, `RoomsSection`, `FlightTrackerSection`,
`SpaSection`, `BeachSection`, `AlacarteSection`.

История номеров: `905307387764` → `905421789246` → обратно `905307387764`.

Телефон спа: **9500** (внутренний, показан в карточке Nefes Spa).

---

## Страница меню `/menu`

Отдельный роут, `src/pages/MenuPage.jsx`. Подключён через lazy-загрузку
в `src/main.jsx`, чтобы react-pdf (~430 КБ) не утяжелял основной гид.

### Как устроено

- PDF рендерится через **react-pdf** (canvas), не через iframe.
  Причина: на iOS iframe показывал только первую страницу и не масштабировался.
  Сейчас все страницы видны, ширина подстраивается под устройство.
- Заходишь по QR-ссылке → PDF сразу на весь экран, выйти к списку нельзя.
- Заходишь на `/menu` без хеша → список всех ресторанов, оттуда можно открыть
  любое меню и вернуться назад.
- В шапке просмотра всегда две кнопки: **Wine Menu** и **Drink Menu**.
  При переходе в них появляется кнопка **← Back** к исходному меню.
- Эмодзи на странице меню не используются (сознательное решение).

### Kıyıda — особый случай

Один QR на ресторан, внутри **табы** Lunch / Dinner с трёхъязычными подписями
(`Lunch · Öğle · Обед`). Раньше было всплывающее окно выбора — заменено на табы.
Хеши `#fish`, `#fish-dinner`, `#fish-lunch` — все ведут на этот экран.

### QR-ссылки

| Ресторан | Ссылка |
|---|---|
| Kıyıda (обед + ужин, табы) | `guide.baskaresort.com/menu#fish` |
| Kai Teppanyaki | `guide.baskaresort.com/menu#teppanyaki-dinner` |
| Lento Italian | `guide.baskaresort.com/menu#italian-dinner` |
| Daima Restaurant | `guide.baskaresort.com/menu#daima` |
| Leziz Snack | `guide.baskaresort.com/menu#leziz` |
| Beverage Menu | `guide.baskaresort.com/menu#beverages` |
| Wine Menu | `guide.baskaresort.com/menu#wine` |
| Вся страница | `guide.baskaresort.com/menu` |
| Меню кабан (прямой PDF) | `guide.baskaresort.com/cabana_menu.pdf` |

**Ссылки менять нельзя** — под них уже напечатаны QR-коды.

### Файлы меню в `public/`

Актуальные версии (в новых PDF вино и напитки уже внутри):

- `Kıyıda A La Carte Dinner Menu updated.pdf`
- `Kıyıda A La Carte Lunch Menu new.pdf`
- `Kai Teppanyaki A La Carte Dinner Menu new.pdf`
- `Lento Italian A La Carte Dinner Menu new.pdf`
- `Daima Restaurant Menu new.pdf`
- `Leziz Snack A La Carte Lunch Menu new.pdf`
- `Beverage Menu.pdf`, `Wine Menu.pdf`, `cabana_menu.pdf`

Не подключён: `Room Service Menü new.pdf` (лежит в `public`, но нигде не используется).

---

## Спа

`src/components/sections/SpaSection.jsx`

- Интерактивное меню: 26 процедур в 5 категориях, мультивыбор с количеством,
  плавающая кнопка «Book Selected» → WhatsApp.
- Категории с фоновыми изображениями: `signatures_and_couples.png`,
  `rituals_and_packages.png`, `massages.png`, `facial_treatments.png`,
  `hammam_and_body.png`.
- **`SHOW_PRICES = false`** — флаг скрытия цен. Цены временно убраны по просьбе
  заказчика. Чтобы вернуть — поставить `true`, данные о ценах в коде сохранены.
- Брошюры без цен, по языкам: TR/RU свои, остальные — английская
  (`Nefes-Spa-Brochure-EN-noprice.pdf`).
- Complimentary: Hammam, Sauna, Fitness. У всех короткое описание
  («Complimentary»), слово «Turkish» из названия хаммама убрано.
- При открытии вкладки Spa & Fitness показывается попап `spa_message.jpg`.
- Убрано из раздела: Skincare & Hairdressing.

---

## Часы работы (актуальные)

| Точка | Часы |
|---|---|
| Главный ресторан — ужин | 19:00 – 21:30 |
| Главный ресторан — завтрак | 07:00 – 10:00 |
| Главный ресторан — обед | 12:30 – 14:30 |
| Fitness Center | 08:00 – 20:00 |
| Manzara Patisserie | 12:00 – 18:00 |
| Beach Patisserie | 11:00 – 16:00 |
| Leziz Snack | 12:00 – 16:00 |
| Lento (дневное, snacks) | 12:00 – 16:00 |
| Köy Kahvesi | 10:00 – 16:00 |
| Padel Court | 09:00 – 24:00 |

**DAİMA 7/24:** шведский стол до 02:00, после 02:00 — обслуживание по меню à la carte.

Время ужина продублировано в `src/components/MealNotifier.jsx`
(`{ key: 'dinner', hour: 19, minute: 0 }`) — при смене менять и там,
и в ключах `dinnerTime` / `dinnerSoon` во всех локалях.

---

## Платные услуги

Формулировка «subject to extra charge» добавлена в описания:

- **Beach Cabanas** — `beach.cabanaDesc`
- **Water Sports** — `activities.waterSportsDesc` + примечание `waterSportsNote`

---

## Падел-теннис

`src/components/sections/PadelBooking.jsx`, подключён в `ActivitiesSection`.

- Корт €75/час, урок с тренером €50/час, работа 09:00 – 24:00
- Две кнопки: **Reserve Court** / **Book Lesson**
- Модалка с выбором дня (ближайшие 7 дней) и часа (слоты 09:00–23:00)
- На сегодняшний день уже прошедшие часы скрываются автоматически
  (буфер 30 минут); если слотов не осталось — предлагает выбрать другой день
- Кнопка отправки заблокирована, пока не выбрано время
- Отправка в WhatsApp в общем формате: тикет, услуга, дата, время, цена

---

## Убрано из гида

- Прокат велосипедов (Bicycle Rental) — из Activities
- Fish Sandwich (Balık Sandviç) — из Street Food
- Chicken & Rice — из Street Food
- Skincare & Hairdressing — из Spa

---

## Попапы

`src/components/WelcomePopup.jsx` экспортирует `PopupOverlay` (именованный)
для переиспользования.

- При запуске: `popup1.png`
- При смене языка: `popuptr.png`, `popupde.png`, `popupru.png`
  (только эти три + английский; для uk/ar/fr/pl попапа нет)
- При открытии вкладки Spa & Fitness: `spa_message.jpg`

---

## Отчёты об устойчивом развитии

`src/components/sections/ImportantSection.jsx`, по языкам:

- TR → `Sürdürebilirlik Raporu TR.pptx`
- RU → `Sürdürebilirlik Raporu Rusça.pptx`
- остальные → `Sürdürebilirlik Raporu İngilizce.pptx`

Старые `sustainability-report-*.pdf` остались в `public`, но не используются.

---

## Рабочие привычки по проекту

- Изменения текста — всегда во **всех 8 локалях** сразу, не только в английской.
- После правок: `npx vite build` для проверки, затем коммит и пуш в рабочую ветку.
- Кнопки меню имеют увеличенную высоту (инлайн-паддинги 16–24px).
- PR не создавать, если не попросили явно.
