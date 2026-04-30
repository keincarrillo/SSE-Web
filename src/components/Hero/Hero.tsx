import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import team from '../../assets/team.webp'

const STATS = [
  { label: 'Pacientes satisfechos', value: 10000, suffix: '+', prefix: '' },
  { label: 'Años de experiencia', value: 5, suffix: '+', prefix: '' },
  { label: 'Satisfacción', value: 100, suffix: '%', prefix: '' }
]

const AnimatedNumber = ({
  target,
  active
}: {
  target: number
  active: boolean
}) => {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const totalMs = 1400
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / totalMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [active, target])

  return <>{count.toLocaleString('es-MX')}</>
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.8 })
        .fromTo(
          imgRef.current,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
        )
        .fromTo(
          tagRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          barRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.2'
        )
        // dispara el conteo justo cuando la barra termina de animarse
        .call(() => setStatsActive(true))
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen bg-green overflow-hidden flex flex-col"
    >
      <div ref={imgRef} className="absolute inset-0 w-full h-full">
        <div className="w-full h-full overflow-hidden">
          <img
            src={team}
            alt="Nuestro equipo"
            className="hidden md:block w-full h-full object-cover scale-110 -translate-y-8 md:-translate-y-12 lg:-translate-y-0.5"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-green-dark/70 via-green/50 to-green-dark/80" />
      </div>

      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-10 pb-20 pt-30 md:pt-0">
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6"
        >
          <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
            ¿Quiénes somos?
          </span>
        </div>

        <h1 ref={titleRef} className="display-title text-white mb-6 max-w-3xl">
          Smile <span className="text-gold">Studio</span> Experts
        </h1>

        <p
          ref={subRef}
          className="text-white/70 text-base leading-relaxed max-w-2xl mb-10 text-justify md:text-center md:text-lg"
        >
          Somos un equipo enfocado en la estética y salud dental, creando
          sonrisas naturales y armónicas con tratamientos personalizados y el
          uso de tecnología y materiales de calidad para lograr resultados que
          se vean bien y duren en el tiempo.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gold text-black text-md font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300"
          >
            Agendar cita →
          </a>
        </div>
      </div>

      {/* Barra de stats */}
      <div ref={barRef} className="relative z-20 w-full bg-gold">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 md:py-4 flex flex-col sm:flex-row items-center justify-around divide-y sm:divide-y-0 sm:divide-x divide-black/10">
          {STATS.map(s => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-0.5 px-2 sm:px-6 py-2 sm:py-0 w-full sm:w-auto"
            >
              <span className="display-name text-green-dark font-black text-2xl sm:text-2xl md:text-4xl tabular-nums leading-none">
                {s.prefix}
                <AnimatedNumber target={s.value} active={statsActive} />
                {s.suffix}
              </span>
              <span className="font-semibold text-white text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
