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
      className="relative md:min-h-screen bg-green overflow-hidden flex flex-col"
    >
      {/* Imagen del equipo */}
      <div className="absolute inset-x-0 bottom-[72px] md:bottom-[72px] lg:bottom-[72px] z-0">
        <img
          ref={imgRef}
          src={team}
          alt="Nuestro equipo"
          className="hidden md:block w-full object-cover"
          style={{
            height: 'clamp(500px, 72vh, 760px)',
            objectPosition: '50% 38%'
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-green/90 via-green/65 via-45% to-green/20" />

      {/* Contenido central */}
      <div className="relative z-20 flex-none md:flex-1 flex flex-col items-center justify-start text-center px-6 md:px-10 pt-32 md:pt-24 lg:pt-44">
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-5 md:mb-6"
        >
          <span className="text-gold text-sm md:text-md font-semibold tracking-[0.2em] uppercase">
            ¿Quiénes somos?
          </span>
        </div>

        <h1
          ref={titleRef}
          className="display-title text-white mb-5 md:mb-6"
          style={{
            fontSize: 'clamp(2rem, 4.4vw, 5rem)',
            lineHeight: '1.05'
          }}
        >
          Smile <span className="text-gold">Studio</span> Experts
        </h1>

        <p
          ref={subRef}
          className="text-white/90  md:max-w-xl mb-2 text-center"
          style={{
            fontSize: 'clamp(.9rem, 1.30vw, 1.35rem)',
            lineHeight: '1.6'
          }}
        >
          Somos un equipo enfocado en la estética y salud dental, creando
          sonrisas naturales y armónicas con tratamientos personalizados y el
          uso de tecnología y materiales de calidad para lograr resultados que
          se vean bien y duren en el tiempo.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap gap-4 justify-center mt-1 pb-10 md:pb-0"
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
