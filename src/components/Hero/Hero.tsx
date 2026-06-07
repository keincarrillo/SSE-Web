import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import team from '../../assets/team.webp'

gsap.registerPlugin(ScrollTrigger)

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
  const imgRef = useRef<HTMLImageElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    if (!barRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsActive(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.04 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%'
          }
        }
      )

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%'
          }
        })
        .fromTo(
          tagRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
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

      gsap.fromTo(
        barRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 95%'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-0 md:min-h-screen bg-green overflow-hidden flex flex-col"
    >
      {/* Imagen anclada al fondo — crece hacia arriba, doctores siempre en la parte baja */}
      <div className="absolute inset-x-0 bottom-[90px] md:bottom-[72px]">
        <img
          ref={imgRef}
          src={team}
          alt="Nuestro equipo"
          className="hidden md:block w-full object-cover object-top"
          style={{ height: '95vh' }}
        />
      </div>
      {/* Overlay: fuerte arriba para el texto, transparente abajo para los doctores */}
      <div className="absolute inset-0 bg-linear-to-b from-green/85 via-green/50 via-40% to-green/5" />

      {/* Contenido central */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start text-center px-6 md:px-10 pt-36 md:pt-50">
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6"
        >
          <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
            ¿Quiénes somos?
          </span>
        </div>

        {/* Título en una sola línea */}
        <h1
          ref={titleRef}
          className="display-title text-white mb-6 whitespace-nowrap"
          style={{ fontSize: 'clamp(1.8rem, 5.5vw, 5rem)' }}
        >
          Smile <span className="text-gold">Studio</span> Experts
        </h1>

        {/* Texto descriptivo más grande y legible */}
        <p
          ref={subRef}
          className="text-white/85  max-w-2xl mb-2 text-center "
          style={{
            fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)',
            lineHeight: '1.4'
          }}
        >
          Somos un equipo enfocado en la estética y salud dental, creando
          sonrisas naturales y armónicas con tratamientos personalizados y el
          uso de tecnología y materiales de calidad para lograr resultados que
          se vean bien y duren en el tiempo.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap gap-4 justify-center mt-8 pb-12 md:pb-0"
        >
          <button
            onClick={() => {
              const lenis = (window as any).__lenis
              if (lenis) {
                lenis.scrollTo('#contacto', { offset: 0, duration: 1.8 })
              } else {
                document
                  .getElementById('contacto')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gold text-black text-md font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300"
          >
            Agendar cita →
          </button>
        </div>
      </div>

      {/* Barra de stats */}
      <div ref={barRef} className="relative z-20 w-full bg-gold">
        <div className="w-full px-6 py-1 md:py-2 grid grid-cols-3 items-center divide-x-0 md:divide-x-0">
          {STATS.map(s => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center gap-0.5 py-2"
            >
              <span className="display-name text-green-dark font-black text-md sm:text-2xl md:text-4xl tabular-nums leading-none">
                {s.prefix}
                <AnimatedNumber target={s.value} active={statsActive} />
                {s.suffix}
              </span>
              <span className="font-semibold text-white text-xs lg:text-lg tracking-[0.15em] uppercase text-center">
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
