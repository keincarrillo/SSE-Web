import { useRef, useEffect, type RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import tooth from '../../assets/tooth.svg'

const LEFT = [
  {
    title: 'Prótesis',
    description:
      'Tratamientos que permiten reemplazar o restaurar piezas dentales perdidas o dañadas, devolviendo función, estética y seguridad al sonreír.',
    size: 'sm' as const
  },
  {
    title: 'Ortodoncia',
    description:
      'Procedimientos enfocados en corregir la posición de los dientes y la mordida, mejorando tanto la estética como la funcionalidad de la sonrisa.',
    size: 'lg' as const
  }
]

const FEATURED = {
  title: 'Diseño de sonrisa (carillas)',
  description:
    'Tratamiento estético enfocado en mejorar la forma, tamaño y color de los dientes para lograr una sonrisa más armónica y natural, adaptada a cada paciente.'
}

const RIGHT = [
  {
    title: 'Blanqueamiento dental',
    description:
      'Tratamiento que aclara el tono de los dientes y devuelve luminosidad a la sonrisa de forma segura y controlada.',
    size: 'lg' as const
  },
  {
    title: 'Resinas estéticas',
    description:
      'Procedimiento que permite reparar o mejorar dientes con fracturas, desgaste o imperfecciones, logrando un resultado natural.',
    size: 'sm' as const
  }
]

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
)

const ServiceCard = ({
  title,
  description,
  gsap
}: {
  title: string
  description: string
  size: 'sm' | 'lg'
  gsap: string
}) => (
  <div
    data-gsap={gsap}
    className="rounded-2xl border border-white/[0.07] bg-green p-[28px_26px] min-h-56 lg:min-h-64"
    style={{ height: '100%' }}
  >
    <h3 className="display-name text-xl tracking-[0.02em] text-white mb-2">
      {title}
    </h3>
    <p className="text-md lg:text-lg leading-[1.65] text-white/50">
      {description}
    </p>
  </div>
)

const FeaturedCard = ({
  title,
  description,
  cardRef
}: {
  title: string
  description: string
  cardRef?: RefObject<HTMLDivElement | null>
}) => (
  <div
    ref={cardRef}
    data-gsap="fade-up"
    className="rounded-2xl border border-gold/40 bg-gold w-full p-[22px_26px_28px] min-h-0 md:min-h-105"
  >
    <div className="flex items-center gap-1.5 mb-2">
      <div className="w-5.5 h-5.5 rounded-full bg-green flex items-center justify-center text-gold">
        <StarIcon />
      </div>
      <span className="text-green text-xs font-bold tracking-[0.2em] uppercase">
        Destacado
      </span>
    </div>
    <h3 className="display-name text-xl tracking-[0.02em] text-green mb-2">
      {title}
    </h3>
    <p className="text-md lg:text-lg leading-[1.65] text-green/65">
      {description}
    </p>
  </div>
)

const Services = () => {
  const ref = useScrollReveal({ stagger: 0.08 })
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const toothRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateToothPosition = () => {
      if (!cardRef.current || !toothRef.current || !sectionRef.current) return

      const cardRect = cardRef.current.getBoundingClientRect()
      const sectionRect = sectionRef.current.getBoundingClientRect()

      const centerX = cardRect.left - sectionRect.left + cardRect.width / 2
      const bottom = cardRect.bottom - sectionRect.top

      toothRef.current.style.left = `${centerX}px`
      toothRef.current.style.top = `${bottom - 140}px`
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
      className="bg-white py-10 md:py-16 lg:py-24 relative"
    >
      <style>{`
        @keyframes floatTooth {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50%       { transform: translateX(-50%) translateY(-14px); }
        }
        .tooth-float { animation: floatTooth 4s ease-in-out infinite; }
      `}</style>

      <div
        ref={toothRef}
        className="tooth-float hidden lg:block pointer-events-none z-50"
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
            'radial-gradient(circle at 30% 50%, #C9A84C 0%, transparent 60%), radial-gradient(circle at 70% 50%, #C9A84C 0%, transparent 60%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
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

        {/* MOBILE */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex justify-center mb-2">
            <img
              src={tooth}
              alt="Diente"
              className="w-56 h-56 object-contain drop-shadow-2xl"
            />
          </div>
          <FeaturedCard {...FEATURED} />
          {[...LEFT, ...RIGHT].map(s => (
            <ServiceCard key={s.title} {...s} gsap="fade-up" />
          ))}
        </div>

        {/* DESKTOP — cols verdes usan flex con flex-1 para que las cards se estiren igual */}
        <div
          className="hidden lg:grid items-start"
          style={{ gridTemplateColumns: '1fr 320px 1fr', gap: '0 24px' }}
        >
          {/* Col 1 — flex col con gap, cards se estiran */}
          <div className="flex flex-col gap-10">
            {LEFT.map(s => (
              <ServiceCard key={s.title} {...s} gsap="fade-right" />
            ))}
          </div>

          {/* Col 2 — card dorada */}
          <div className="flex flex-col items-center">
            <FeaturedCard {...FEATURED} cardRef={cardRef} />
            <div style={{ height: '200px' }} />
            <p className="text-green/35 text-md font-bold tracking-[0.25em] uppercase whitespace-nowrap">
              resultados naturales que se adaptan a ti
            </p>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-10">
            {RIGHT.map(s => (
              <ServiceCard key={s.title} {...s} gsap="fade-left" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
