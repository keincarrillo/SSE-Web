import { useState, useRef, useEffect, type RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import consultorio from '../../assets/consultorio.webp'
import testimony1 from '../../assets/testimony1.webp'
import testimony2 from '../../assets/testimony2.webp'
import testimony3 from '../../assets/testimony3.webp'
import testimony4 from '../../assets/testimony4.webp'

const TESTIMONIALS = [
  {
    subtitle: 'Prótesis',
    stars: 5,
    hook: 'Nunca pensé que volvería a sentirme cómoda al comer y sonreír.',
    body: 'Había perdido confianza porque mi sonrisa ya no era la misma, pero con la prótesis todo cambió. El resultado fue cómodo, funcional y natural.',
    closing: 'Ahora puedo sonreír con mucha más seguridad.',
    img: testimony1
  },
  {
    subtitle: 'Diseño de sonrisa',
    stars: 5,
    hook: 'Siempre quise mejorar mi sonrisa, pero me preocupaba que se viera artificial.',
    body: 'Desde la valoración entendieron lo que buscaba y el resultado fue una sonrisa más armónica, sin perder naturalidad.',
    closing: 'Me siento mucho más segura al sonreír.',
    img: testimony3
  },
  {
    subtitle: 'Blanqueamiento',
    stars: 5,
    hook: 'Con el tiempo mis dientes habían perdido brillo y eso me incomodaba.',
    body: 'Buscaba un resultado natural y el blanqueamiento fue justo lo que necesitaba.',
    closing: 'Mi sonrisa se ve más fresca y luminosa.',
    img: testimony2
  },
  {
    subtitle: 'Diseño de sonrisa',
    stars: 5,
    hook: 'No sabía exactamente qué necesitaba, solo quería mejorar mi sonrisa.',
    body: 'Me orientaron en todo momento y el diseño se adaptó perfecto a mi rostro. El cambio es sutil, pero hace una gran diferencia.',
    closing: 'Ahora sonrío con más confianza.',
    img: testimony4
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

// AnimatedBackground - PUNTOS DORADOS MÁS GRANDES Y VISIBLES
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: any[] = []
    let time = 0

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 80; i++) {
        // Menos partículas pero más grandes
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 6 + 3, // Puntos más grandes (3-9px)
          alpha: Math.random() * 0.5 + 0.3, // Más intensos
          speedX: (Math.random() - 0.5) * 0.2, // Movimiento más lento
          speedY: (Math.random() - 0.5) * 0.15,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          pulseOffset: Math.random() * Math.PI * 2
        })
      }
    }

    const animate = () => {
      // Limpiar con fondo blanco sólido
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      time += 0.02

      // Dibujar puntos dorados más grandes
      particles.forEach(p => {
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.2 + 0.8
        const currentRadius = p.r * pulse
        const currentAlpha = p.alpha * pulse

        ctx.fillStyle = `rgba(212,175,55,${currentAlpha * 0.8})` // Más intenso
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()

        // Mover partículas lentamente
        p.x += p.speedX
        p.y += p.speedY

        // Rebote suave en bordes
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => {
      setSize()
      initParticles()
    })

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    setSize()
    initParticles()
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  )
}

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
      style={{
        maxWidth: '100%',
        margin: '0 auto',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        paddingTop: '40px',
        paddingBottom: '80px'
      }}
    >
      {/* Fondo con puntos dorados más grandes */}
      <AnimatedBackground />

      <div
        style={{
          maxWidth: '1152px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* ── 1. Título ── */}

        <div
          className="py-10 text-center flex flex-col gap-4 items-center"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10">
            <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
              Testimonios
            </span>
          </div>

          <div
            className={`text-white display-title text-center}`}
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="text-green">Resultados reales</h2>
          </div>
        </div>

        {/* ── 2. Bloque verde ── */}
        <div
          className="mx-4 md:mx-0"
          style={{ position: 'relative', zIndex: 2 }}
        >
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
                            alt={t.subtitle}
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
                        {/* Tratamiento label */}
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

                        {/* Tratamiento título */}
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
                          {t.subtitle}
                        </h3>

                        <Stars count={t.stars} />

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
                              fontSize: '22px',
                              fontWeight: 700,
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
                            alt={t.subtitle}
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

                      {/* Tratamiento label móvil */}
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

                      {/* Subtítulo móvil */}
                      {t.subtitle && (
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
                          {t.subtitle}
                        </h3>
                      )}

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
                            fontSize: '22px',
                            fontWeight: 700,
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
      </div>
    </section>
  )
}

export default Testimonials
