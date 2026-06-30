import { useScrollReveal } from '../../hooks/useScrollReveal'
import { PROMOS } from './data'
import { Marquee, CountdownTimer, PromoCard } from './components'

const Promotions = () => {
  const ref = useScrollReveal({ stagger: 0.08 })

  return (
    <section ref={ref} id="promociones" className="bg-white py-10 md:py-10 lg:py-12 relative overflow-x-hidden">
      <Marquee />

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, var(--color-gold) 0%, transparent 60%), radial-gradient(circle at 70% 50%, var(--color-gold) 0%, transparent 60%)', zIndex: 1 }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative mt-10 md:mt-14" style={{ zIndex: 2 }}>
        <div className="text-center mb-12 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6">
            <span data-gsap="fade-up" className="text-gold text-md font-semibold tracking-[0.2em] uppercase">Ofertas especiales</span>
          </div>
          <h2 data-gsap="fade-up" className="display-title text-green" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            Nuestras <span className="text-gold">Promociones</span>
          </h2>
          <p data-gsap="fade-up" className="mt-4 text-green/60 text-md leading-[1.7] max-w-5xl mx-auto">
            Aprovecha nuestras ofertas por tiempo limitado y da el primer paso hacia la sonrisa que siempre quisiste.
          </p>
        </div>

        <CountdownTimer />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PROMOS.map(promo => <PromoCard key={promo.title} {...promo} />)}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-shimmer group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green text-white font-semibold text-md tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(30,70,32,0.35)]"
          >
            <span className="relative z-10">Agendar mi cita</span>
            <span className="relative z-10 w-7 h-7 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
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
