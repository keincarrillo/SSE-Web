import { useState, useRef, useEffect, useCallback } from 'react'
import { Check } from 'lucide-react'
import { type BgVariant } from '../../data/services'

export { Check }

const ServiceVisual = ({
  images,
  title,
  bg
}: {
  images: string[]
  title: string
  bg: BgVariant
}) => {
  const isGreen = bg === 'green'
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasMultiple = images.length > 1

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % images.length)
    }, 4000)
  }, [images.length])

  useEffect(() => {
    if (!hasMultiple) return
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [hasMultiple, images.length, startTimer])

  const goTo = (i: number) => {
    setCurrent(i)
    startTimer()
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border h-[550px] md:h-[650px] lg:h-[700px] ${
        isGreen ? 'border-white/10' : 'border-green/10'
      }`}
      onMouseEnter={() => {
        if (!hasMultiple) return
        if (timerRef.current) clearInterval(timerRef.current)
      }}
      onMouseLeave={() => {
        if (!hasMultiple) return
        startTimer()
      }}
    >
      <div
        className="carousel-track"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(current * 100) / images.length}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="carousel-slide"
            style={{ width: `${100 / images.length}%` }}
          >
            <img
              src={img}
              alt={`${title} ${i + 1}`}
            />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <div
          className="absolute bottom-0 left-0 right-0 h-16 gradient-fade-bottom pointer-events-none"
        />
      )}

      {hasMultiple && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            zIndex: 10
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Imagen ${i + 1}`}
              className={`dot-indicator ${i === current ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceVisual
