import { PROMOS, MARQUEE_ITEMS } from './data'
import { useCountdown } from './hooks'

const Marquee = () => (
  <div className="w-full overflow-hidden py-3 md:py-5 bg-gold">
    <div className="marquee-track">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i} className="whitespace-nowrap px-8 md:px-12 text-white font-semibold tracking-[0.2em] md:tracking-[0.25em] uppercase text-sm md:text-2xl">
          {item}
        </span>
      ))}
    </div>
  </div>
)

const box = (val: number, label: string) => (
  <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-border"
    style={{ width: 72, height: 72 }}>
    <span className="font-display text-2xl leading-none text-green">{String(val).padStart(2, '0')}</span>
    <span className="text-[10px] uppercase tracking-[0.15em] text-muted">{label}</span>
  </div>
)

const sep = <span className="font-display text-2xl pb-4 text-border">:</span>

const CountdownTimer = () => {
  const { hours, minutes, seconds } = useCountdown()
  const expired = hours === 0 && minutes === 0 && seconds === 0

  return (
    <div data-gsap="fade-up" className="flex flex-col items-center gap-3 mb-12 md:mb-16">
      <p className="text-md font-semibold tracking-[0.2em] uppercase text-muted">
        {expired ? 'Promoción finalizada' : 'Ofertas válidas por'}
      </p>
      {expired ? (
        <p className="text-md font-semibold text-green">Contáctanos para más información</p>
      ) : (
        <div className="flex items-center gap-3">
          {box(hours, 'hrs')}{sep}{box(minutes, 'min')}{sep}{box(seconds, 'seg')}
        </div>
      )}
    </div>
  )
}

const PromoCard = (promo: (typeof PROMOS)[number]) => (
  <div className={`promo-card relative flex flex-col rounded-2xl overflow-hidden border ${promo.featured ? 'bg-green border-gold/40' : 'bg-white border-black/7'}`}
    style={{ boxShadow: promo.featured ? '0 8px 40px rgba(var(--color-green-rgb), 0.18)' : '0 2px 16px rgba(0,0,0,0.06)' }}>
    <div className="px-6 pt-6 pb-0">
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase ${promo.featured ? 'bg-gold/20 text-gold' : 'bg-green/7 text-green'}`}>
        {promo.tag}
      </span>
    </div>
    <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-4">
      <h3 className={`display-name text-xl tracking-[0.02em] ${promo.featured ? 'text-white' : 'text-green'}`}>{promo.title}</h3>
      <p className={`text-md leading-[1.2] ${promo.featured ? 'text-white/50' : 'text-green/60'}`}>{promo.description}</p>
      <div className="mt-auto pt-2">
        <div className={`display-name text-3xl tracking-[0.02em] ${promo.featured ? 'text-gold' : 'text-green'}`}>{promo.price}</div>
        <div className={`text-md leading-[1.65] mt-0.5 ${promo.featured ? 'text-white/40' : 'text-green/40'}`}>{promo.priceNote}</div>
      </div>
    </div>
  </div>
)

export { Marquee, CountdownTimer, PromoCard }
