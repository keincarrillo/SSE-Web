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
        style={{
          display: 'flex',
          width: `${images.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(current * 100) / images.length}%)`,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              width: `${100 / images.length}%`,
              flexShrink: 0,
              height: '100%'
            }}
          >
            <img
              src={img}
              alt={`${title} ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '64px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
            pointerEvents: 'none'
          }}
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
              style={{
                width: i === current ? '20px' : '7px',
                height: '7px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                backgroundColor:
                  i === current
                    ? 'var(--color-gold-light)'
                    : 'rgba(255,255,255,0.5)',
                transition: 'width 0.3s ease, background-color 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceVisual
