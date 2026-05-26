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
    tag: 'Valoración completa',
    title: 'Paquete Valoración Premium',
    description:
      'Diseño de sonrisa, diagnóstico, radiografías, presupuesto y fotografías profesionales, todo en una sola cita a un gran precio.',
    price: 'Desde $200',
    priceNote: 'Sujeto a sucursal',
    featured: true
  },
  {
    tag: 'Descuento exclusivo',
    title: '10% en tu Tratamiento',
    description:
      'Obtén un descuento del 10% en el presupuesto de tu tratamiento. Solo preséntate a tu valoración y aplica automáticamente.',
    price: '10% off',
    priceNote: 'Sobre el presupuesto total',
    featured: false
  },
  {
    tag: 'Solo Polanco',
    title: 'Blanqueamiento Zoom',
    description:
      'El blanqueamiento dental más avanzado del mercado, disponible exclusivamente en nuestra sede de Polanco. Resultados desde la primera sesión.',
    price: 'Pregunta',
    priceNote: 'Disponible solo en Polanco',
    featured: false
  }
]

const MARQUEE_ITEMS = [
  '✦ Promociones',
  '★ Ofertas Especiales',
  '✦ Tiempo Limitado',
  '★ Smile Studio Experts',
  '✦ Promociones',
  '★ Ofertas Especiales',
  '✦ Tiempo Limitado',
  '★ Smile Studio Experts'
]

const Marquee = () => (
  <div className="w-full overflow-hidden py-3 md:py-5 bg-gold">
    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .marquee-track {
        display: flex;
        width: max-content;
        animation: marquee 18s linear infinite;
      }
      .marquee-track:hover {
        animation-play-state: paused;
      }
    `}</style>
    <div className="marquee-track">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span
          key={i}
          className="whitespace-nowrap px-8 md:px-12 text-white font-semibold tracking-[0.2em] md:tracking-[0.25em] uppercase text-sm md:text-2xl"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
)

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
      className="flex flex-col items-center justify-center gap-1 rounded-xl border border-border"
      style={{ width: 72, height: 72 }}
    >
      <span className="font-display text-2xl leading-none text-green">
        {String(val).padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
    </div>
  )

  const sep = <span className="font-display text-2xl pb-4 text-border">:</span>

  return (
    <div
      data-gsap="fade-up"
      className="flex flex-col items-center gap-3 mb-12 md:mb-16"
    >
      <p className="text-md font-semibold tracking-[0.2em] uppercase text-muted">
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
    className={`promo-card relative flex flex-col rounded-2xl overflow-hidden border ${
      featured ? 'bg-green border-gold/40' : 'bg-white border-black/7'
    }`}
    style={{
      boxShadow: featured
        ? '0 8px 40px rgba(var(--color-green), 0.18)'
        : '0 2px 16px rgba(0,0,0,0.06)'
    }}
  >
    <div className="px-6 pt-6 pb-0">
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase ${
          featured ? 'bg-gold/20 text-gold' : 'bg-green/7 text-green'
        }`}
      >
        {tag}
      </span>
    </div>
    <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-4">
      <h3
        className={`display-name text-xl tracking-[0.02em] ${
          featured ? 'text-white' : 'text-green'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-md lg:text-lg leading-[1.65] ${
          featured ? 'text-white/50' : 'text-green/60'
        }`}
      >
        {description}
      </p>
      <div className="mt-auto pt-2">
        <div
          className={`display-name text-3xl tracking-[0.02em] ${
            featured ? 'text-gold' : 'text-green'
          }`}
        >
          {price}
        </div>
        <div
          className={`text-md leading-[1.65] mt-0.5 ${
            featured ? 'text-white/40' : 'text-green/40'
          }`}
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
      className="bg-white py-10 md:py-10 lg:py-12 relative overflow-x-hidden"
    >
      <ShimmerStyles />

      <Marquee />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, var(--color-gold) 0%, transparent 60%), radial-gradient(circle at 70% 50%, var(--color-gold) 0%, transparent 60%)',
          zIndex: 1
        }}
      />

      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative mt-10 md:mt-14"
        style={{ zIndex: 2 }}
      >
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

        <CountdownTimer />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PROMOS.map(promo => (
            <PromoCard key={promo.title} {...promo} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              const el = document.getElementById('contacto')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-shimmer group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green text-white font-semibold text-md tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(30,70,32,0.35)]"
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
            <span className="shimmer-inner absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Promotions
