import { useRef, useEffect, useState, type RefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import tooth from '../../assets/tooth.webp'
import brackets from '../../assets/figures/brackets.svg'
import smile from '../../assets/figures/smile.svg'
import star from '../../assets/figures/star.svg'
import toothFigure from '../../assets/figures/tooth.svg'
import valuation from '../../assets/figures/valuation.svg'

const LEFT = [
  {
    title: 'Prótesis',
    description:
      'Tratamientos que permiten reemplazar o restaurar piezas dentales perdidas o dañadas, devolviendo función, estética y seguridad al sonreír.',
    size: 'sm' as const,
    icon: smile
  },
  {
    title: 'Ortodoncia',
    description:
      'Procedimientos enfocados en corregir la posición de los dientes y la mordida, mejorando tanto la estética como la funcionalidad de la sonrisa.',
    size: 'lg' as const,
    icon: brackets
  }
]

const FEATURED = {
  title: 'Diseño de sonrisa ',
  description:
    'Tratamiento estético enfocado en mejorar la forma, tamaño y color de los dientes para lograr una sonrisa más armónica y natural, adaptada a cada paciente.',
  icon: star
}

const RIGHT = [
  {
    title: 'Blanqueamiento dental',
    description:
      'Tratamiento que aclara el tono de los dientes y devuelve luminosidad a la sonrisa de forma segura y controlada.',
    size: 'lg' as const,
    icon: toothFigure
  },
  {
    title: 'Valoración y limpieza dental',
    description:
      'Evaluación de tu sonrisa para recomendar el tratamiento ideal, seguida de una limpieza que elimina placa y sarro para mantener dientes más sanos.',
    size: 'sm' as const,
    icon: valuation
  }
]

const ALL_MOBILE = [
  { ...FEATURED, isFeatured: true as const },
  ...LEFT.map(s => ({ ...s, isFeatured: false as const })),
  ...RIGHT.map(s => ({ ...s, isFeatured: false as const }))
]

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

const PulseStyles = () => (
  <style>{`
    @keyframes floatTooth {
      0%, 100% { transform: translateX(-50%) translateY(0px); }
      50%       { transform: translateX(-50%) translateY(-14px); }
    }
    .tooth-float { animation: floatTooth 4s ease-in-out infinite; }

    @keyframes pulseGold {
      0%   { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.55); }
      70%  { box-shadow: 0 0 0 16px rgba(201, 168, 76, 0); }
      100% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0); }
    }
    .icon-pulse-gold { animation: pulseGold 2.2s ease-out infinite; }

    @keyframes pulseGreen {
      0%   { box-shadow: 0 0 0 0 rgba(30, 70, 32, 0.45); }
      70%  { box-shadow: 0 0 0 16px rgba(30, 70, 32, 0); }
      100% { box-shadow: 0 0 0 0 rgba(30, 70, 32, 0); }
    }
    .icon-pulse-green { animation: pulseGreen 2.2s ease-out infinite; }

    @keyframes shimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .btn-shimmer:hover .shimmer-inner {
      animation: shimmer 0.7s ease forwards;
    }
  `}</style>
)

/* ─── Fondo animado ─── */
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    const drawWave = (
      yBase: number,
      amplitude: number,
      frequency: number,
      speed: number,
      colorTop: string,
      colorBot: string
    ) => {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      for (let x = 0; x <= canvas.width; x += 3) {
        const y =
          yBase +
          Math.sin(
            (x / canvas.width) * frequency * Math.PI * 2 + time * speed
          ) *
            amplitude +
          Math.sin(
            (x / canvas.width) * frequency * 0.6 * Math.PI * 2 +
              time * speed * 1.4 +
              0.8
          ) *
            amplitude *
            0.5
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()

      const grad = ctx.createLinearGradient(
        0,
        yBase - amplitude,
        0,
        canvas.height
      )
      grad.addColorStop(0, colorTop)
      grad.addColorStop(1, colorBot)
      ctx.fillStyle = grad
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.007

      const h = canvas.height

      drawWave(
        h * 0.82,
        h * 0.1,
        2.2,
        0.5,
        'rgba(45,90,39,0.18)',
        'rgba(45,90,39,0.04)'
      )
      drawWave(
        h * 0.72,
        h * 0.09,
        2.8,
        0.8,
        'rgba(201,170,101,0.16)',
        'rgba(201,170,101,0.03)'
      )
      drawWave(
        h * 0.6,
        h * 0.08,
        2.0,
        0.65,
        'rgba(80,145,60,0.14)',
        'rgba(80,145,60,0.02)'
      )
      drawWave(
        h * 0.46,
        h * 0.07,
        3.2,
        1.0,
        'rgba(230,205,120,0.13)',
        'rgba(230,205,120,0.02)'
      )
      drawWave(
        h * 0.3,
        h * 0.06,
        2.5,
        1.2,
        'rgba(45,90,39,0.10)',
        'rgba(45,90,39,0.01)'
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => setSize())
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

    setSize()
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

/* ─── Card verde izquierda ─── */
const ServiceCardLeft = ({
  title,
  description,
  icon,
  gsap
}: {
  title: string
  description: string
  size: 'sm' | 'lg'
  icon: string
  gsap: string
}) => (
  <div
    data-gsap={gsap}
    className="relative rounded-2xl border border-white/[0.07] bg-green p-[28px_26px] pl-20 min-h-56 lg:min-h-64"
    style={{ height: '100%' }}
  >
    <div
      className="icon-pulse-gold absolute left-0 top-1/2 z-20 w-32 h-32 rounded-full bg-gold/25 border-2 border-gold/60 flex items-center justify-center"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <img src={icon} alt="" className="w-20 h-20 object-contain" />
    </div>

    <h3 className="display-name text-xl tracking-[0.02em] text-white mb-2">
      {title}
    </h3>
    <p className="text-md lg:text-lg leading-[1.65] text-white/50">
      {description}
    </p>
  </div>
)

/* ─── Card verde derecha ─── */
const ServiceCardRight = ({
  title,
  description,
  icon,
  gsap
}: {
  title: string
  description: string
  size: 'sm' | 'lg'
  icon: string
  gsap: string
}) => (
  <div
    data-gsap={gsap}
    className="relative rounded-2xl border border-white/[0.07] bg-green p-[28px_26px] pr-20 min-h-56 lg:min-h-64"
    style={{ height: '100%' }}
  >
    <div
      className="icon-pulse-gold absolute right-0 top-1/2 z-20 w-32 h-32 rounded-full bg-gold/25 border-2 border-gold/60 flex items-center justify-center"
      style={{ transform: 'translate(50%, -50%)' }}
    >
      <img src={icon} alt="" className="w-20 h-20 object-contain" />
    </div>

    <h3 className="display-name text-xl tracking-[0.02em] text-white mb-2">
      {title}
    </h3>
    <p className="text-md lg:text-lg leading-[1.65] text-white/50">
      {description}
    </p>
  </div>
)

/* ─── Card móvil genérica ─── */
const ServiceCard = ({
  title,
  description,
  icon,
  gsap
}: {
  title: string
  description: string
  size: 'sm' | 'lg'
  icon: string
  gsap: string
}) => (
  <div
    data-gsap={gsap}
    className="rounded-2xl border border-white/[0.07] bg-green p-[28px_26px] min-h-56 lg:min-h-64"
    style={{ height: '100%' }}
  >
    <div className="flex justify-center mb-4">
      <div className="w-18 h-18 rounded-full bg-gold/25 border-2 border-gold/60 flex items-center justify-center">
        <img src={icon} alt="" className="w-13 h-13 object-contain" />
      </div>
    </div>

    <h3 className="display-name text-xl tracking-[0.02em] text-white mb-2 text-center">
      {title}
    </h3>
    <p className="text-md lg:text-lg leading-[1.65] text-white/50 text-center">
      {description}
    </p>
  </div>
)

/* ─── Card dorada central ─── */
const FeaturedCard = ({
  title,
  description,
  icon,
  cardRef
}: {
  title: string
  description: string
  icon?: string
  cardRef?: RefObject<HTMLDivElement | null>
}) => (
  <div
    ref={cardRef}
    data-gsap="fade-up"
    className="relative rounded-2xl border border-gold/40 bg-gold w-full p-[22px_26px_28px] md:p-[75px_26px_28px] min-h-0 md:min-h-105"
  >
    {icon && (
      <>
        <div
          className="icon-pulse-green hidden lg:flex absolute top-0 left-1/2 z-20 w-32 h-32 rounded-full bg-green/20 border-2 border-green/50 items-center justify-center"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <img src={icon} alt="" className="w-20 h-20 object-contain" />
        </div>

        <div className="lg:hidden flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-green/20 border-2 border-green/50 flex items-center justify-center">
            <img
              src={icon}
              alt=""
              style={{ width: '52px', height: '52px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </>
    )}

    <h3 className="display-name text-xl tracking-[0.02em] text-green mb-2 text-center">
      {title}
    </h3>
    <p className="text-md lg:text-lg leading-[1.65] text-green/65 text-center">
      {description}
    </p>
  </div>
)

/* ─── Mobile Carousel ─── */
const MobileCarousel = () => {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const total = ALL_MOBILE.length

  const goTo = (n: number) => {
    setCurrent(((n % total) + total) % total)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
  }

  return (
    <div className="lg:hidden">
      <div className="flex justify-center mb-6">
        <img
          src={tooth}
          alt="Diente"
          className="w-48 h-48 object-contain drop-shadow-2xl"
        />
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {ALL_MOBILE.map((s, i) => (
            <div key={i} className="min-w-full px-4">
              {s.isFeatured ? (
                <FeaturedCard
                  title={s.title}
                  description={s.description}
                  icon={s.icon}
                />
              ) : (
                <ServiceCard
                  title={s.title}
                  description={s.description}
                  size={(s as { size: 'sm' | 'lg' }).size}
                  icon={(s as { icon: string }).icon}
                  gsap="fade-up"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 mt-4">
        <button
          onClick={() => goTo(current - 1)}
          className="w-12 h-12 rounded-full border border-green/20 flex items-center justify-center text-green hover:bg-green/5 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft />
        </button>
        <span className="text-green/45 text-sm font-medium">
          {current + 1} / {total}
        </span>
        <button
          onClick={() => goTo(current + 1)}
          className="w-12 h-12 rounded-full border border-green/20 flex items-center justify-center text-green hover:bg-green/5 transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex justify-center gap-1.5 mt-5">
        {ALL_MOBILE.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a servicio ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === current ? 'bg-green' : 'bg-green/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
const Services = () => {
  const ref = useScrollReveal({ stagger: 0.08 })
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const toothRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const updateToothPosition = () => {
      if (!cardRef.current || !toothRef.current || !sectionRef.current) return

      const cardRect = cardRef.current.getBoundingClientRect()
      const sectionRect = sectionRef.current.getBoundingClientRect()

      const centerX = cardRect.left - sectionRect.left + cardRect.width / 2
      const bottom = cardRect.bottom - sectionRect.top

      toothRef.current.style.left = `${centerX}px`
      toothRef.current.style.top = `${bottom - 110}px`
      toothRef.current.style.transform = 'translateX(-50%)'
    }

    updateToothPosition()
    window.addEventListener('resize', updateToothPosition)
    window.addEventListener('scroll', updateToothPosition)
    return () => {
      window.removeEventListener('resize', updateToothPosition)
      window.removeEventListener('scroll', updateToothPosition)
    }
  }, [])

  const setRef = (el: HTMLElement | null) => {
    ;(ref as React.MutableRefObject<HTMLElement | null>).current = el
    ;(sectionRef as React.MutableRefObject<HTMLElement | null>).current = el
  }

  return (
    <section
      ref={setRef}
      id="servicios"
      className="bg-white py-10 md:py-16 lg:py-24 relative overflow-hidden"
    >
      <PulseStyles />

      {/* Fondo animado */}
      <AnimatedBackground />

      <div
        ref={toothRef}
        className="tooth-float hidden lg:block pointer-events-none z-20"
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          top: 0,
          left: 0
        }}
      >
        <img
          src={tooth}
          alt="Diente"
          className="object-contain drop-shadow-2xl w-full h-full"
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, #C9A84C 0%, transparent 60%), radial-gradient(circle at 70% 50%, #C9A84C 0%, transparent 60%)',
          zIndex: 1
        }}
      />

      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative"
        style={{ zIndex: 2 }}
      >
        <div className="text-center mb-12 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6">
            <span
              data-gsap="fade-up"
              className="text-gold text-md font-semibold tracking-[0.2em] uppercase"
            >
              Lo que ofrecemos
            </span>
          </div>
          <h2
            data-gsap="fade-up"
            className="display-lg text-green"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Nuestros <span className="text-gold">Servicios</span>
          </h2>
          <p
            data-gsap="fade-up"
            className="mt-4 text-green/60 text-md lg:text-lg leading-[1.7] max-w-4xl mx-auto"
          >
            Cada sonrisa es única, por eso ofrecemos tratamientos personalizados
            que combinan estética y funcionalidad para lograr resultados
            naturales que se adapten a ti.
          </p>
        </div>

        <MobileCarousel />

        <div
          className="hidden lg:grid items-start mt-22"
          style={{
            gridTemplateColumns: '1fr 320px 1fr',
            gap: '0 24px',
            overflow: 'visible'
          }}
        >
          <div className="flex flex-col gap-10" style={{ overflow: 'visible' }}>
            {LEFT.map(s => (
              <ServiceCardLeft key={s.title} {...s} gsap="fade-right" />
            ))}
          </div>

          <div
            className="flex flex-col items-center"
            style={{ overflow: 'visible' }}
          >
            <FeaturedCard {...FEATURED} cardRef={cardRef} />
            <div className="h-52" />
            <p className="text-green/70 text-md tracking-[0.25em] uppercase whitespace-nowrap">
              resultados naturales que se adaptan a ti
            </p>
          </div>

          <div className="flex flex-col gap-10" style={{ overflow: 'visible' }}>
            {RIGHT.map(s => (
              <ServiceCardRight key={s.title} {...s} gsap="fade-left" />
            ))}
          </div>
        </div>

        {/* ─── Botón Ver más ─── */}
        <div className="flex justify-center mt-14 md:mt-20">
          <button
            onClick={() => navigate('/servicios')}
            className="btn-shimmer group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green text-white font-semibold text-md tracking-[0.05em] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(30,70,32,0.35)]"
          >
            <span className="relative z-10">Ver todos los servicios</span>
            <span className="relative z-10 w-7 h-7 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span className="shimmer-inner absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services
