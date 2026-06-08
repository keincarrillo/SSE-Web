import { useState, useRef, useEffect, type RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import consultorio from '../../assets/consultorio.webp'
import testimony1 from '../../assets/testimony1.webp'
import testimony2 from '../../assets/testimony2.webp'
import testimony3 from '../../assets/testimony3.webp'
import testimony4 from '../../assets/testimony4.webp'
import testimony5 from '../../assets/testimony5.webp'
import testimony6 from '../../assets/testimony6.webp'
import testimony7 from '../../assets/testimony7.webp'
import testimony8 from '../../assets/testimony8.webp'

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
  },
  {
    subtitle: 'Diseño de sonrisa',
    stars: 5,
    hook: 'Siempre tuve inseguridad con la posición de mis dientes y lo evitaba en fotos.',
    body: 'El tratamiento fue más cómodo de lo que esperaba y los avances se notaron desde los primeros meses.',
    closing: 'Hoy sonrío diferente, con mucha más seguridad.',
    img: testimony5
  },
  {
    subtitle: 'Diseño de sonrisa',
    stars: 5,
    hook: 'No había ido al dentista en mucho tiempo y tenía miedo de lo que pudieran encontrar.',
    body: 'Me atendieron sin juzgarme, explicaron todo con calma y el resultado fue mejor de lo que esperaba.',
    closing: 'Salí con una sonrisa más limpia y con ganas de volver.',
    img: testimony6
  },
  {
    subtitle: 'Prótesis',
    stars: 5,
    hook: 'Tenía miedo de que la prótesis se notara o no se sintiera natural.',
    body: 'Desde el primer ajuste se sintió cómoda y el resultado visual fue increíble. Nadie nota que es una prótesis.',
    closing: 'Recuperé mi sonrisa y con ella mi confianza.',
    img: testimony7
  },
  {
    subtitle: 'Blanqueamiento',
    stars: 5,
    hook: 'Quería un blanqueamiento pero temía que mis dientes quedaran demasiado blancos.',
    body: 'El resultado fue gradual y natural, exactamente como lo pedí. El proceso fue rápido y sin molestias.',
    closing: 'Mi sonrisa luce más brillante sin perder naturalidad.',
    img: testimony8
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
  <div className="flex gap-1 my-2.5 mb-[18px]">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-gold text-[18px]">
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
      className="bg-white relative overflow-hidden pt-10 pb-20 max-w-full mx-auto"
    >
      {/* Difuminado inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[90px] pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--color-white) 100%)'
        }}
      />

      <div className="max-w-[1152px] mx-auto relative z-[2]">
        {/* ── 1. Título ── */}
        <div className="py-10 text-center flex flex-col gap-4 items-center relative z-[2]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10">
            <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
              Testimonios
            </span>
          </div>

          <div
            className="text-white display-title text-center"
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="text-green">
              <span className="text-gold">Resultados</span> Reales
            </h2>
          </div>

          <p className="text-green  max-w-130 text-center">
            Más allá del resultado, cada paciente vive un proceso que transforma
            su forma de sonreír.
          </p>
        </div>

        {/* ── 2. Bloque verde ── */}
        <div className="mx-4 md:mx-14 lg:mx-10 xl:mx-0 relative z-[2]">
          {/* Flecha izquierda — solo md+ */}
          <button
            onClick={() => navigate(current - 1)}
            aria-label="Anterior"
            className="hidden md:flex absolute items-center justify-center cursor-pointer z-30 text-green bg-white border border-green/35 rounded-full"
            style={{
              top: '50%',
              left: '-44px',
              transform: 'translateY(-50%)',
              width: '32px',
              height: '32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}
          >
            <ChevronLeft />
          </button>

          {/* Flecha derecha — solo md+ */}
          <button
            onClick={() => navigate(current + 1)}
            aria-label="Siguiente"
            className="hidden md:flex absolute items-center justify-center cursor-pointer z-30 text-green bg-white border border-green/35 rounded-full"
            style={{
              top: '50%',
              right: '-44px',
              transform: 'translateY(-50%)',
              width: '32px',
              height: '32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}
          >
            <ChevronRight />
          </button>

          {/* Contenedor verde */}
          <div className="bg-green rounded-[20px] overflow-hidden">
            <div
              ref={carouselRef}
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Fondo consultorio */}
              <img
                src={consultorio}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />

              {/* Tinte verde */}
              <div className="absolute inset-0 bg-green opacity-60" />

              {/* Track */}
              <div
                className="relative flex"
                style={{
                  width: `${total * 100}%`,
                  transform: `translateX(-${(current * 100) / total}%)`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className="relative flex-shrink-0"
                    style={{ width: `${100 / total}%` }}
                  >
                    {/* ── Desktop / Tablet ── */}
                    <div
                      className="hidden md:flex items-center"
                      style={{ minHeight: '540px', padding: '40px 36px' }}
                    >
                      {/* Foto */}
                      <div
                        className="flex-shrink-0 rounded-[20px] overflow-hidden border border-white/20"
                        style={{
                          width: 'clamp(200px, 35%, 360px)',
                          height: 'clamp(260px, 45vw, 480px)',
                          boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
                          background: 'rgba(255,255,255,0.05)'
                        }}
                      >
                        {t.img && (
                          <img
                            src={t.img}
                            alt={t.subtitle}
                            className="w-full h-full object-cover object-top block"
                          />
                        )}
                      </div>

                      {/* Texto desktop/tablet */}
                      <div
                        className="flex-1 min-w-0"
                        style={{
                          paddingLeft: 'clamp(20px, 4vw, 48px)',
                          paddingRight: '8px'
                        }}
                      >
                        <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-white/50 m-0 mb-1.5">
                          Tratamiento
                        </p>
                        <h3
                          className="text-white font-bold m-0 leading-[1.1] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis"
                          style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}
                        >
                          {t.subtitle}
                        </h3>
                        <Stars count={t.stars} />
                        <div
                          className="rounded-[16px] border border-white/20"
                          style={{
                            padding:
                              'clamp(14px, 2vw, 24px) clamp(16px, 2.5vw, 28px)',
                            background: 'rgba(255,255,255,0.06)'
                          }}
                        >
                          <p
                            className="text-white font-bold leading-[1.5] m-0 mb-3"
                            style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}
                          >
                            "{t.hook}"
                          </p>
                          <p
                            className="text-white/80 leading-[1.7] m-0 mb-3"
                            style={{ fontSize: 'clamp(17px, 1.5vw, 19px)' }}
                          >
                            {t.body}
                          </p>
                          <p
                            className="text-gold font-medium m-0"
                            style={{ fontSize: 'clamp(17px, 1.5vw, 19px)' }}
                          >
                            {t.closing}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ── Móvil ── */}
                    <div
                      className="flex md:hidden flex-col items-center gap-0"
                      style={{ padding: '32px 20px 28px' }}
                    >
                      <div
                        className="rounded-[16px] overflow-hidden border border-white/20 flex-shrink-0 mb-6"
                        style={{
                          width: '160px',
                          height: '200px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                          background: 'rgba(255,255,255,0.05)'
                        }}
                      >
                        {t.img && (
                          <img
                            src={t.img}
                            alt={t.subtitle}
                            className="w-full h-full object-cover object-top block"
                          />
                        )}
                      </div>

                      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 m-0 mb-1 text-center">
                        Tratamiento
                      </p>

                      {t.subtitle && (
                        <h3 className="text-[30px] font-bold text-white m-0 leading-[1.1] text-center">
                          {t.subtitle}
                        </h3>
                      )}

                      <div className="flex gap-1 my-2.5 mb-[18px] justify-center">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <span key={i} className="text-gold text-[16px]">
                            ★
                          </span>
                        ))}
                      </div>

                      <div
                        className="w-full rounded-[14px] border border-white/20"
                        style={{
                          padding: '18px',
                          background: 'rgba(255,255,255,0.06)'
                        }}
                      >
                        <p className="text-white text-[22px] font-bold leading-[1.5] m-0 mb-2.5">
                          "{t.hook}"
                        </p>
                        <p className="text-white/80 text-[13px] leading-[1.7] m-0 mb-2.5">
                          {t.body}
                        </p>
                        <p className="text-gold text-[13px] font-medium m-0">
                          {t.closing}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="relative flex justify-center items-center gap-2 py-4 pb-5 z-10">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(i)}
                    aria-label={`Ir a testimonio ${i + 1}`}
                    className="w-2 h-2 rounded-full border-none cursor-pointer p-0 transition-colors"
                    style={{
                      backgroundColor:
                        i === current
                          ? 'var(--color-gold)'
                          : 'rgba(255,255,255,0.25)'
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
