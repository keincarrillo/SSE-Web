import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SERVICES } from '../../data/services'

const PageHeader = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll('[data-gsap="fade-up"]')
      if (els?.length)
        gsap.fromTo(
          els,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.15
          }
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="relative pt-28 pb-20 md:pt-40 md:pb-28 text-center px-4 bg-green overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, var(--color-gold-light) 0%, transparent 55%), radial-gradient(circle at 80% 50%, var(--color-gold-light) 0%, transparent 55%)'
        }}
      />

      <div
        data-gsap="fade-up"
        className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/50 bg-gold/15 mb-6"
      >
        <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
          Lo que ofrecemos
        </span>
      </div>

      <h1
        data-gsap="fade-up"
        className="relative display-lg text-white"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
      >
        Nuestros <span className="text-gold">Servicios</span>
      </h1>

      <p
        data-gsap="fade-up"
        className="relative mt-4 text-white/55 text-md lg:text-lg leading-[1.7] max-w-2xl mx-auto"
      >
        Conoce en detalle cada uno de los tratamientos que ofrecemos. Cada
        servicio está diseñado para cuidar tu salud bucal y transformar tu
        sonrisa.
      </p>

      <div
        data-gsap="fade-up"
        className="relative flex flex-wrap justify-center gap-2 mt-8"
      >
        {SERVICES.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-4 py-1.5 rounded-full border border-white/20 text-white/60 text-sm hover:bg-white hover:text-green hover:border-white transition-all duration-200"
          >
            {s.title}
          </a>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12"
        >
          <path
            d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
  )
}

export default PageHeader
