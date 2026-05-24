import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PAIN_POINTS = [
  { icon: '😬', text: 'Miedo o vergüenza al dentista' },
  { icon: '🔍', text: 'No saber qué tratamiento necesito' },
  { icon: '💸', text: 'Precios poco claros o sorpresivos' }
]

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.6 })
        .fromTo(
          tagRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(
          questionRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          bodyRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          pillsRef.current!.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.12
          },
          '-=0.3'
        )
        .fromTo(
          arrowRef.current,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.1'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-green-dark overflow-hidden min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,170,101,0.06) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Tag — igual al del Hero */}
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6"
        >
          <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
            ¿Te identificas?
          </span>
        </div>

        {/* Pregunta — misma clase display-title que el Hero */}
        <h2
          ref={questionRef}
          className="display-title text-white mb-6 max-w-3xl"
        >
          ¿Cuándo fue la última vez que sonreíste{' '}
          <span className="text-gold">sin pensarlo dos veces?</span>
        </h2>

        {/* Cuerpo — mismo estilo que el subtítulo del Hero */}
        <p
          ref={bodyRef}
          className="text-white/70 text-base leading-relaxed max-w-2xl mb-10 mx-auto text-justify md:text-center md:text-lg"
        >
          Muchas personas evitan el dentista por miedo, desconfianza o porque
          simplemente no saben por dónde empezar. Y mientras tanto, su sonrisa
          —y su confianza— lo resiente.
        </p>

        {/* Pills de pain points */}
        <div
          ref={pillsRef}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {PAIN_POINTS.map(p => (
            <div
              key={p.text}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-sm text-gold font-semibold tracking-wide"
            >
              <span aria-hidden="true">{p.icon}</span>
              {p.text}
            </div>
          ))}
        </div>

        {/* Flecha */}
        <div
          ref={arrowRef}
          className="flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
            Hay una solución
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce text-gold"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Problem
