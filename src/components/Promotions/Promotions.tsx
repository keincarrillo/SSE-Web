import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useState, useEffect } from 'react'

const PROMO_DEADLINE = new Date(Date.now() + 24 * 60 * 60 * 1000)

const useCountdown = () => {
  const calc = () => {
    const diff = PROMO_DEADLINE.getTime() - Date.now()
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }
    return {
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const PROMOS = [
  {
    tag: 'Más popular',
    title: 'Paquete Sonrisa Brillante',
    description:
      'Incluye valoración dental completa + limpieza profesional + blanqueamiento dental. El combo ideal para renovar tu sonrisa.',
    price: '$2,500',
    priceNote: 'Precio regular $3,800',
    featured: true
  },
  {
    tag: 'Tiempo limitado',
    title: 'Primera Consulta Gratis',
    description:
      'Agenda tu valoración inicial sin costo. Conoce el estado de tu salud bucal y recibe un plan de tratamiento personalizado.',
    price: 'Gratis',
    priceNote: 'Valor regular $500',
    featured: false
  },
  {
    tag: 'Promo especial',
    title: 'Ortodoncia con Descuento',
    description:
      'Tratamiento de ortodoncia con brackets con 20% de descuento al pagar el enganche en tu primera cita. Cupo limitado.',
    price: '20% off',
    priceNote: 'Enganche desde $3,000',
    featured: false
  }
]

const ShimmerStyles = () => (
  <style>{`
    @keyframes shimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .btn-shimmer:hover .shimmer-inner {
      animation: shimmer 0.7s ease forwards;
    }
    .promo-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .promo-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.15);
    }
  `}</style>
)

const CountdownTimer = () => {
  const { hours, minutes, seconds } = useCountdown()
  const expired = hours === 0 && minutes === 0 && seconds === 0

  const box = (val: number, label: string) => (
    <div
      className="flex flex-col items-center justify-center gap-1 rounded-xl"
      style={{
        background: 'transparent',
        border: '1.5px solid #e0ddd5',
        width: 72,
        height: 72
      }}
    >
      <span
        className="font-display text-2xl leading-none"
        style={{ color: '#284b09' }}
      >
        {String(val).padStart(2, '0')}
      </span>
      <span
        className="text-[10px] uppercase tracking-[0.15em]"
        style={{ color: '#b0afa9' }}
      >
        {label}
      </span>
    </div>
  )

  const sep = (
    <span className="font-display text-2xl pb-4" style={{ color: '#e0ddd5' }}>
      :
    </span>
  )

  return (
    <div
      data-gsap="fade-up"
      className="flex flex-col items-center gap-3 mb-12 md:mb-16"
    >
      <p
        className="text-md font-semibold tracking-[0.2em] uppercase"
        style={{ color: '#b0afa9' }}
      >
        {expired ? 'Promoción finalizada' : 'Ofertas válidas por'}
      </p>
      {expired ? (
        <p className="text-md font-semibold text-green">
          Contáctanos para más información
        </p>
      ) : (
        <div className="flex items-center gap-3">
          {box(hours, 'hrs')}
          {sep}
          {box(minutes, 'min')}
          {sep}
          {box(seconds, 'seg')}
        </div>
      )}
    </div>
  )
}

const PromoCard = ({
  tag,
  title,
  description,
  price,
  priceNote,
  featured
}: (typeof PROMOS)[number]) => (
  <div
    className="promo-card relative flex flex-col rounded-2xl overflow-hidden border"
    style={{
      background: featured ? '#284b09' : '#fff',
      borderColor: featured ? 'rgba(201,170,101,0.4)' : 'rgba(0,0,0,0.07)',
      boxShadow: featured
        ? '0 8px 40px rgba(40,75,9,0.18)'
        : '0 2px 16px rgba(0,0,0,0.06)'
    }}
  >
    {/* Tag */}
    <div className="px-6 pt-6 pb-0">
      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase"
        style={{
          background: featured
            ? 'rgba(201,170,101,0.18)'
            : 'rgba(40,75,9,0.07)',
          color: featured ? '#c9aa65' : '#284b09'
        }}
      >
        {tag}
      </span>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-4">
      <h3
        className="display-name text-xl tracking-[0.02em]"
        style={{ color: featured ? '#fff' : '#284b09' }}
      >
        {title}
      </h3>

      <p
        className="text-md lg:text-lg leading-[1.65]"
        style={{
          color: featured ? 'rgba(255,255,255,0.5)' : 'rgba(40,75,9,0.6)'
        }}
      >
        {description}
      </p>

      {/* Price */}
      <div className="mt-auto pt-2">
        <div
          className="display-name text-3xl tracking-[0.02em]"
          style={{ color: featured ? '#c9aa65' : '#284b09' }}
        >
          {price}
        </div>
        <div
          className="text-md leading-[1.65] line-through mt-0.5"
          style={{
            color: featured ? 'rgba(255,255,255,0.3)' : 'rgba(40,75,9,0.3)'
          }}
        >
          {priceNote}
        </div>
      </div>
    </div>
  </div>
)

const Promotions = () => {
  const ref = useScrollReveal({ stagger: 0.08 })

  return (
    <section
      ref={ref}
      id="promociones"
      className="bg-white py-10 md:py-16 lg:py-24 relative overflow-x-hidden"
    >
      <ShimmerStyles />

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
        {/* Header */}
        <div className="text-center mb-12 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6">
            <span
              data-gsap="fade-up"
              className="text-gold text-md font-semibold tracking-[0.2em] uppercase"
            >
              Ofertas especiales
            </span>
          </div>
          <h2
            data-gsap="fade-up"
            className="display-lg text-green"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Nuestras <span className="text-gold">Promociones</span>
          </h2>
          <p
            data-gsap="fade-up"
            className="mt-4 text-green/60 text-md lg:text-lg leading-[1.7] max-w-4xl mx-auto"
          >
            Aprovecha nuestras ofertas por tiempo limitado y da el primer paso
            hacia la sonrisa que siempre quisiste.
          </p>
        </div>

        {/* Countdown */}
        <CountdownTimer />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PROMOS.map(promo => (
            <PromoCard key={promo.title} {...promo} />
          ))}
        </div>

        {/* Botón */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              const el = document.getElementById('contacto')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-shimmer group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green text-white font-semibold text-md tracking-[0.05em] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(30,70,32,0.35)]"
          >
            <span className="relative z-10">Agendar mi cita</span>
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

export default Promotions
