import { useState, useEffect } from 'react'

const PROMO_DEADLINE = new Date(Date.now() + 24 * 60 * 60 * 1000)

export const useCountdown = () => {
  const calc = () => {
    const diff = PROMO_DEADLINE.getTime() - Date.now()
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }
    return {
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}
