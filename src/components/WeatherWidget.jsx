import { useState, useEffect } from 'react'

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

export default function WeatherWidget() {
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

  return (
    <div
      className="mb-10 rounded-3xl border border-[rgba(0,51,160,0.06)] backdrop-blur-sm"
      style={{
        padding: '28px 32px 24px',
        background: 'linear-gradient(145deg, rgba(0,51,160,0.04) 0%, rgba(46,196,182,0.04) 50%, rgba(245,197,24,0.03) 100%)',
      }}
    >
      <div className="flex items-center gap-5">
        <span className="text-[2.8rem] leading-none">{icons[weather.code] ?? '🌤️'}</span>
        <div>
          <div className="text-[2rem] font-light text-[var(--primary)] leading-none tracking-tight">{weather.temp}°</div>
          <div className="text-[0.7rem] text-[var(--text-muted)] mt-1.5 tracking-wide uppercase">Bodrum</div>
        </div>
      </div>

      <div className="flex gap-6 mt-5 pt-4 border-t border-[rgba(0,51,160,0.05)]">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">Humidity</span>
          <span className="text-[0.82rem] font-medium text-[var(--primary)]">{weather.humidity}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">Wind</span>
          <span className="text-[0.82rem] font-medium text-[var(--primary)]">{weather.wind} km/h</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">Sea</span>
          <span className="text-[0.82rem] font-medium text-[var(--primary)]">~{weather.water}°</span>
        </div>
      </div>
    </div>
  )
}
