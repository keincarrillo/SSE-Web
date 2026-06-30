import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'

const CtaSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll('[data-gsap="fade-up"]')
      if (els?.length)
        gsap.fromTo(
          els,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%' }
          }
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="relative py-20 text-center px-4 bg-green border-t border-white/10"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, var(--color-gold-light) 0%, transparent 55%), radial-gradient(circle at 80% 50%, var(--color-gold-light) 0%, transparent 55%)'
        }}
      />

      <h2
        data-gsap="fade-up"
        className="relative display-name text-2xl md:text-3xl text-white mb-3"
      >
        ¿Listo para transformar tu sonrisa?
      </h2>
      <p
        data-gsap="fade-up"
        className="relative text-white/55 text-md mb-8 max-w-md mx-auto"
      >
        Agenda una valoración sin costo y descubre qué tratamiento es ideal para
        ti.
      </p>
      <button
        data-gsap="fade-up"
        onClick={() => {
          navigate('/')
          setTimeout(
            () =>
              document
                .getElementById('contacto')
                ?.scrollIntoView({ behavior: 'smooth' }),
            400
          )
        }}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-green font-semibold text-md tracking-[0.05em] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      >
        <span className="relative z-10">Agendar hoy</span>
        <span className="relative z-10 w-7 h-7 rounded-full bg-green/10 border border-green/30 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
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
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-green/5 to-transparent" />
      </button>
    </div>
  )
}

export default CtaSection
