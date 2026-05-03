import { useState, useRef, useEffect, type RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import consultorio from '../../assets/consultorio.webp'
import testimony1 from '../../assets/testimony1.webp'
import testimony2 from '../../assets/testimony2.webp'
import testimony3 from '../../assets/testimony3.webp'
import testimony4 from '../../assets/testimony4.webp'

const TESTIMONIALS = [
  {
    treatment: 'Prótesis',
    stars: 5,
    hook: 'Nunca pensé que volvería a sentirme cómoda al comer y sonreír.',
    body: 'Había perdido confianza porque mi sonrisa ya no era la misma, pero con la prótesis todo cambió. El resultado fue cómodo, funcional y natural.',
    closing: 'Ahora puedo sonreír con mucha más seguridad.',
    img: testimony1
  },
  {
    treatment: 'Carillas',
    subtitle: 'Diseño de sonrisa',
    stars: 5,
    hook: 'Siempre quise mejorar mi sonrisa, pero me preocupaba que se viera artificial.',
    body: 'Desde la valoración entendieron lo que buscaba y el resultado fue una sonrisa más armónica, sin perder naturalidad.',
    closing: 'Me siento mucho más segura al sonreír.',
    img: testimony2
  },
  {
    treatment: 'Blanqueamiento',
    stars: 5,
    hook: 'Con el tiempo mis dientes habían perdido brillo y eso me incomodaba.',
    body: 'Buscaba un resultado natural y el blanqueamiento fue justo lo que necesitaba.',
    closing: 'Mi sonrisa se ve más fresca y luminosa.',
    img: testimony4
  },
  {
    treatment: 'Carillas',
    subtitle: 'Diseño de sonrisa',
    stars: 5,
    hook: 'No sabía exactamente qué necesitaba, solo quería mejorar mi sonrisa.',
    body: 'Me orientaron en todo momento y el diseño se adaptó perfecto a mi rostro. El cambio es sutil, pero hace una gran diferencia.',
    closing: 'Ahora sonrío con más confianza.',
    img: testimony3
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

const Stars = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', gap: '4px', margin: '10px 0 18px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: '#c9aa65', fontSize: '18px' }}>
        ★
      </span>
    ))}
  </div>
)

const Testimonials = () => {
  const ref = useScrollReveal({ stagger: 0.1 })
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
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

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      id="testimonios"
      style={{ maxWidth: '1152px', margin: '0 auto', background: '#fff' }}
    >
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
      <div className="mx-4 md:mx-0" style={{ position: 'relative' }}>
        {/* Flecha izquierda */}
        <button
          onClick={() => navigate(current - 1)}
          aria-label="Anterior"
          style={{
            position: 'absolute',
            top: '50%',
            left: '-44px',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1.5px solid rgba(45,90,39,0.35)',
            background: '#fff',
            color: '#2d5a27',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
          }}
        >
          <ChevronLeft />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={() => navigate(current + 1)}
          aria-label="Siguiente"
          style={{
            position: 'absolute',
            top: '50%',
            right: '-44px',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1.5px solid rgba(45,90,39,0.35)',
            background: '#fff',
            color: '#2d5a27',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
          }}
        >
          <ChevronRight />
        </button>

        {/* Contenedor verde */}
        <div
          className="bg-green"
          style={{ borderRadius: '20px', overflow: 'hidden' }}
        >
          <div
            ref={carouselRef}
            style={{ position: 'relative', overflow: 'hidden' }}
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

            {/* Track */}
            <div
              style={{
                display: 'flex',
                width: `${total * 100}%`,
                transform: `translateX(-${(current * 100) / total}%)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    width: `${100 / total}%`,
                    flexShrink: 0,
                    position: 'relative'
                  }}
                >
                  {/* ── Desktop ── */}
                  <div
                    className="hidden md:flex"
                    style={{
                      alignItems: 'center',
                      minHeight: '640px',
                      padding: '48px 56px'
                    }}
                  >
                    {/* Foto */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: '360px',
                        height: '480px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '2px solid rgba(255,255,255,0.18)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
                        background: 'rgba(255,255,255,0.05)'
                      }}
                    >
                      {t.img && (
                        <img
                          src={t.img}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            display: 'block'
                          }}
                        />
                      )}
                    </div>

                    {/* Texto desktop */}
                    <div
                      style={{
                        flex: 1,
                        paddingLeft: '48px',
                        paddingRight: '16px'
                      }}
                    >
                      {/* Tratamiento grande */}
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.5)',
                          margin: '0 0 6px 0'
                        }}
                      >
                        Tratamiento
                      </p>
                      <h3
                        style={{
                          fontSize: '40px',
                          fontWeight: 700,
                          color: '#fff',
                          margin: 0,
                          lineHeight: 1.1,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {t.treatment}
                      </h3>
                      {t.subtitle && (
                        <p
                          style={{
                            fontSize: '16px',
                            color: 'rgba(255,255,255,0.55)',
                            margin: '4px 0 0',
                            fontStyle: 'italic'
                          }}
                        >
                          {t.subtitle}
                        </p>
                      )}

                      {/* Estrellas */}
                      <Stars count={t.stars} />

                      {/* Texto testimonio */}
                      <div
                        style={{
                          borderRadius: '16px',
                          padding: '24px 28px',
                          border: '1.5px solid rgba(255,255,255,0.18)',
                          background: 'rgba(255,255,255,0.06)'
                        }}
                      >
                        <p
                          style={{
                            color: '#fff',
                            fontSize: '17px',
                            fontWeight: 500,
                            lineHeight: 1.5,
                            margin: '0 0 12px 0'
                          }}
                        >
                          "{t.hook}"
                        </p>
                        <p
                          style={{
                            color: 'rgba(255,255,255,0.78)',
                            fontSize: '15px',
                            lineHeight: 1.7,
                            margin: '0 0 12px 0'
                          }}
                        >
                          {t.body}
                        </p>
                        <p
                          style={{
                            color: '#c9aa65',
                            fontSize: '15px',
                            fontWeight: 500,
                            margin: 0
                          }}
                        >
                          {t.closing}
                        </p>
                      </div>

                      {/* Nombre */}
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '13px',
                          margin: '16px 0 0',
                          letterSpacing: '0.1em'
                        }}
                      ></p>
                    </div>
                  </div>

                  {/* ── Móvil ── */}
                  <div
                    className="flex md:hidden"
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '32px 20px 28px',
                      gap: '0'
                    }}
                  >
                    {/* Foto */}
                    <div
                      style={{
                        width: '160px',
                        height: '200px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '2px solid rgba(255,255,255,0.18)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        background: 'rgba(255,255,255,0.05)',
                        flexShrink: 0,
                        marginBottom: '24px'
                      }}
                    >
                      {t.img && (
                        <img
                          src={t.img}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            display: 'block'
                          }}
                        />
                      )}
                    </div>

                    {/* Tratamiento grande móvil */}
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)',
                        margin: '0 0 4px 0',
                        textAlign: 'center'
                      }}
                    >
                      Tratamiento
                    </p>
                    <h3
                      style={{
                        fontSize: '30px',
                        fontWeight: 700,
                        color: '#fff',
                        margin: 0,
                        lineHeight: 1.1,
                        textAlign: 'center'
                      }}
                    >
                      {t.treatment}
                    </h3>
                    {t.subtitle && (
                      <p
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.55)',
                          margin: '4px 0 0',
                          fontStyle: 'italic',
                          textAlign: 'center'
                        }}
                      >
                        {t.subtitle}
                      </p>
                    )}

                    {/* Estrellas centradas */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '4px',
                        margin: '10px 0 18px',
                        justifyContent: 'center'
                      }}
                    >
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <span
                          key={i}
                          style={{ color: '#c9aa65', fontSize: '16px' }}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Texto testimonio */}
                    <div
                      style={{
                        width: '100%',
                        borderRadius: '14px',
                        padding: '18px 18px',
                        border: '1.5px solid rgba(255,255,255,0.18)',
                        background: 'rgba(255,255,255,0.06)'
                      }}
                    >
                      <p
                        style={{
                          color: '#fff',
                          fontSize: '15px',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          margin: '0 0 10px 0'
                        }}
                      >
                        "{t.hook}"
                      </p>
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.78)',
                          fontSize: '13px',
                          lineHeight: 1.7,
                          margin: '0 0 10px 0'
                        }}
                      >
                        {t.body}
                      </p>
                      <p
                        style={{
                          color: '#c9aa65',
                          fontSize: '13px',
                          fontWeight: 500,
                          margin: 0
                        }}
                      >
                        {t.closing}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div
              style={{
                position: 'relative',
                padding: '16px 0 20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10
              }}
            >
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
