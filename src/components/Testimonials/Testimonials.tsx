import { useState, useRef, useEffect, type RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import consultorio from '../../assets/consultorio.webp'
import testimony1 from '../../assets/testimony1.webp'

const TESTIMONIALS = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at lorem lacinia ipsum sollicitudin eleifend. Vivamus commodo.',
    author: '[Nombre del paciente]',
    treatment: 'Ortodoncia',
    img: testimony1
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at lorem lacinia ipsum sollicitudin eleifend. Vivamus commodo.',
    author: '[Nombre del paciente]',
    treatment: 'Implantes',
    img: undefined
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at lorem lacinia ipsum sollicitudin eleifend. Vivamus commodo.',
    author: '[Nombre del paciente]',
    treatment: 'Limpieza dental',
    img: undefined
  }
]

const INTERVAL = 6000

const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
)

const Testimonials = () => {
  const ref = useScrollReveal({ stagger: 0.1 })
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = TESTIMONIALS.length

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total)
    }, INTERVAL)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const navigate = (n: number) => {
    setCurrent(((n % total) + total) % total)
    startTimer()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) navigate(diff > 0 ? current + 1 : current - 1)
  }

  const t = TESTIMONIALS[current]

  return (
    <section ref={ref as RefObject<HTMLElement>} id="testimonios">
      {/* ── 1. Título ── */}
      <div className="bg-white py-10 text-center">
        <span
          data-gsap="fade-up"
          className="block text-xs font-semibold tracking-[0.25em] uppercase mb-3"
          style={{ color: '#2d5a27' }}
        >
          Testimonios
        </span>
        <h2
          data-gsap="fade-up"
          className="font-display text-4xl md:text-5xl uppercase tracking-widest"
          style={{ color: '#2d5a27' }}
        >
          Testimonios
        </h2>
      </div>

      {/* ── 2. Bloque verde ── */}
      <div className="bg-green">
        {/* Carrusel */}
        <div
          style={{ position: 'relative', minHeight: '860px', overflow: 'clip' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Fondo consultorio */}
          <img
            src={consultorio}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.35
            }}
          />

          {/* Tinte verde */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#2d5a27',
              opacity: 0.6
            }}
          />

          {/* Layout flex */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              minHeight: '860px',
              width: '100%'
            }}
          >
            {/* Foto — grande, sin recorte */}
            <div
              style={{
                flexShrink: 0,
                width: '620px',
                height: '880px',
                position: 'relative'
              }}
            >
              {t.img ? (
                <img
                  src={t.img}
                  alt={t.author}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center'
                  }}
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '80%',
                    borderRadius: '999px 999px 0 0',
                    backgroundColor: 'rgba(255,255,255,0.08)'
                  }}
                />
              )}
            </div>

            {/* Tarjetas */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                paddingRight: '60px',
                paddingLeft: '8px'
              }}
            >
              {/* Pill nombre + estrellas */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 28px',
                  borderRadius: '999px',
                  border: '1.5px solid rgba(255,255,255,0.85)'
                }}
              >
                <span
                  style={{ color: '#fff', fontWeight: 500, fontSize: '16px' }}
                >
                  {t.author}
                </span>
                <span
                  style={{
                    color: '#c9aa65',
                    fontSize: '15px',
                    letterSpacing: '3px'
                  }}
                >
                  ★★★★★
                </span>
              </div>

              {/* Box tratamiento + cita */}
              <div
                style={{
                  borderRadius: '16px',
                  padding: '24px 28px',
                  border: '1.5px solid rgba(255,255,255,0.82)',
                  minHeight: '180px'
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#c9aa65',
                    margin: '0 0 14px 0'
                  }}
                >
                  {t.treatment}
                </p>
                <blockquote
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.7,
                    fontSize: '16px',
                    margin: 0
                  }}
                >
                  "{t.quote}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          >
            <div
              key={current}
              style={{
                height: '100%',
                backgroundColor: '#c9aa65',
                transformOrigin: 'left',
                animation: `tsBar ${INTERVAL}ms linear forwards`
              }}
            />
          </div>
        </div>

        {/* Controles */}
        <div
          style={{
            width: '100%',
            padding: '20px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button
            onClick={() => navigate(current - 1)}
            aria-label="Anterior"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  aria-label={`Ir a testimonio ${i + 1}`}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    backgroundColor:
                      i === current ? '#c9aa65' : 'rgba(255,255,255,0.25)'
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)'
              }}
            >
              {current + 1} / {total}
            </span>
          </div>

          <button
            onClick={() => navigate(current + 1)}
            aria-label="Siguiente"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes tsBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}

export default Testimonials
