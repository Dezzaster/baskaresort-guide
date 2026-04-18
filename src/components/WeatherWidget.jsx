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
    <div className="mb-8 rounded-2xl overflow-hidden border border-[rgba(0,51,160,0.08)]" style={{ background: 'linear-gradient(135deg, rgba(0,51,160,0.06) 0%, rgba(46,196,182,0.06) 100%)' }}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl leading-none">{icons[weather.code] ?? '🌤️'}</span>
            <div>
              <div className="text-[1.6rem] font-semibold text-[var(--primary)] leading-tight">{weather.temp}°C</div>
              <div className="text-[0.68rem] text-[var(--text-muted)] mt-0.5">Bodrum, Türkiye</div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-4 pt-3 border-t border-[rgba(0,51,160,0.06)]">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">💧</span>
            <span className="text-[0.72rem] text-[var(--text-muted)]">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">💨</span>
            <span className="text-[0.72rem] text-[var(--text-muted)]">{weather.wind} km/h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🌊</span>
            <span className="text-[0.72rem] text-[var(--text-muted)]">~{weather.water}°C</span>
          </div>
        </div>
      </div>
    </div>
  )
}
