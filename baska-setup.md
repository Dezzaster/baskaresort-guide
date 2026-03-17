# BAŞKA Resort Bodrum — Guest Guide: Начальная настройка проекта

Создай проект React + Vite с полной настройкой. Только инициализация, установка зависимостей и базовая конфигурация. Контент и структуру секций я добавлю позже сам.

## 1. Инициализация
```bash
npm create vite@latest . -- --template react
npm install
```

## 2. Установка всех зависимостей
```bash
# Стилизация
npm install -D tailwindcss @tailwindcss/vite

# Анимации
npm install framer-motion gsap

# Мультиязычность
npm install react-i18next i18next i18next-browser-languagedetector

# Карта
npm install react-leaflet leaflet

# Слайдеры
npm install swiper

# Иконки
npm install lucide-react

# QR-коды
npm install qrcode.react

# Роутинг
npm install react-router-dom

# PWA
npm install -D vite-plugin-pwa

# Деплой
npm install -D gh-pages
```

## 3. Конфигурация vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/baska-guide/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BAŞKA Resort Bodrum — Guest Guide',
        short_name: 'BAŞKA Guide',
        theme_color: '#1a1a2e',
        background_color: '#faf8f5',
        display: 'standalone'
      }
    })
  ]
})
```

## 4. Tailwind в index.css
```css
@import "tailwindcss";
```

## 5. Google Fonts — подключить в index.html
- Заголовки: `Cormorant Garamond` (serif, элегантный)
- Текст: `DM Sans` (modern sans-serif)

## 6. Дизайн-система (CSS variables в index.css)
Палитра 5-звёздочного курорта, утончённая, НЕ кричащая:
- Primary (тёмно-синий, ночное Эгейское): `#1a1a2e`
- Gold (тёплое золото): `#c9a84c`
- Accent (бирюза, море): `#2ec4b6`
- Background: `#faf8f5`
- Text: `#1a1a2e`
- Muted: `#8b8b97`

## 7. Базовая настройка i18next
Настрой конфиг react-i18next с 4 языками: EN, TR, RU, DE.
Создай файлы locales (en.json, tr.json, ru.json, de.json) с парой placeholder-строк.
Автоопределение языка браузера.

## 8. Создай базовый App.jsx
Минимальный layout: header с переключателем языков, main area, footer.
Подключи все библиотеки чтобы убедиться что всё работает.
Покажи demo-элемент с Framer Motion анимацией (fade-in при скролле).

## 9. package.json scripts для деплоя
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

## 10. GSAP — зарегистрируй ScrollTrigger глобально
```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

Убедись что проект запускается без ошибок через `npm run dev`.
