import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const BODRUM_LAT = 37.0344
const BODRUM_LON = 27.4305
const CACHE_KEY = 'baska_weather'
const CACHE_TTL = 30 * 60 * 1000
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${BODRUM_LAT}&longitude=${BODRUM_LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Europe/Istanbul`

const icons = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌦️', 56: '🌨️', 57: '🌨️',
  61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌨️', 67: '🌨️',
  71: '❄️', 73: '❄️', 75: '❄️', 77: '❄️',
  80: '🌧️', 81: '🌧️', 82: '🌧️', 85: '❄️', 86: '❄️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
}

const seaTemps = [16, 15, 15, 17, 19, 22, 24, 26, 25, 22, 19, 17]

function getTimeOfDay() {
  const now = new Date()
  const istanbulStr = now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' })
  const hour = new Date(istanbulStr).getHours()
  if (hour >= 6 && hour < 10) return 'sunrise'
  if (hour >= 10 && hour < 17) return 'daylight'
  if (hour >= 17 && hour < 21) return 'sunset'
  return 'night'
}

function getWeatherBg(code, basePath) {
  if (code >= 45) return `${basePath}baskaweatherdayfogandrain.png`
  const map = {
    sunrise: `${basePath}baskaweathersunrise.png`,
    daylight: `${basePath}baskaweatherdaylight.JPG`,
    sunset: `${basePath}baskaweathersunset.png`,
    night: `${basePath}baskaweathernight.png`,
  }
  return map[getTimeOfDay()]
}

function getSwimStatus(code, wind) {
  if (code >= 95 || wind > 35) return 'no'
  if (code >= 45 || wind >= 20) return 'caution'
  return 'ok'
}

export default function WeatherWidget() {
  const { t } = useTranslation()
  const basePath = import.meta.env.BASE_URL
  const [weather, setWeather] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) return JSON.parse(cached).data
    } catch {}
    return null
  })

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const { ts } = JSON.parse(cached)
        if (Date.now() - ts < CACHE_TTL) return
      } catch {}
    }

    fetch(API_URL)
      .then(r => r.json())
      .then(({ current }) => {
        const data = {
          temp: Math.round(current.temperature_2m),
          humidity: current.relative_humidity_2m,
          code: current.weather_code,
          wind: Math.round(current.wind_speed_10m),
          water: seaTemps[new Date().getMonth()],
        }
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })) } catch {}
        setWeather(data)
      })
      .catch(() => {})
  }, [])

  if (!weather) return null

  const bgImage = getWeatherBg(weather.code, basePath)
  const swim = getSwimStatus(weather.code, weather.wind)
  const swimFlags = { ok: '🟢', caution: '🟡', no: '🔴' }
  const swimLabels = { ok: t('weather.swimOk'), caution: t('weather.swimCaution'), no: t('weather.swimNo') }

  return (
    <div className="mb-10 rounded-3xl border border-white/20 backdrop-blur-sm overflow-hidden relative" style={{ minHeight: '180px' }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      <div className="relative z-10" style={{ padding: '28px 32px 24px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-[2.8rem] leading-none drop-shadow-lg">{icons[weather.code] ?? '🌤️'}</span>
            <div>
              <div className="text-[2rem] font-light text-white leading-none tracking-tight drop-shadow-md">{weather.temp}°</div>
              <div className="text-[0.7rem] text-white/70 mt-1.5 tracking-wide uppercase">Bodrum</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-lg">{swimFlags[swim]}</span>
            <span
              className="text-[0.58rem] text-white/80 text-center leading-tight max-w-[80px]"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              {swimLabels[swim]}
            </span>
          </div>
        </div>

        <div className="flex gap-6 mt-5 pt-4 border-t border-white/15">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[0.65rem] text-white/60 uppercase tracking-wider">Humidity</span>
            <span className="text-[0.82rem] font-medium text-white">{weather.humidity}%</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[0.65rem] text-white/60 uppercase tracking-wider">Wind</span>
            <span className="text-[0.82rem] font-medium text-white">{weather.wind} km/h</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[0.65rem] text-white/60 uppercase tracking-wider">Sea</span>
            <span className="text-[0.82rem] font-medium text-white">~{weather.water}°</span>
          </div>
        </div>
      </div>
    </div>
  )
}
