import { useState, useRef, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import consultorio from '../../assets/testimonials/consultorio.webp'
import { TESTIMONIALS } from './data'
import { ChevronLeft, ChevronRight, Stars } from './icons'

const INTERVAL = 6000

const Testimonials = () => {
  const ref = useScrollReveal({ stagger: 0.1 })
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = TESTIMONIALS.length

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), INTERVAL)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = (n: number) => {
    setCurrent(((n % total) + total) % total)
    startTimer()
  }

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="testimonios"
      className="bg-white relative overflow-hidden pt-10 pb-20 max-w-full mx-auto">
      <div className="absolute bottom-0 left-0 right-0 h-[90px] pointer-events-none z-[1] gradient-fade-top"
      />

      <div className="max-w-[1152px] mx-auto relative z-[2]">
        <div className="py-10 text-center flex flex-col gap-4 items-center relative z-[2]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10">
            <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">Testimonios</span>
          </div>
          <div className="text-white display-title text-center" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-green"><span className="text-gold">Resultados</span> Reales</h2>
          </div>
          <p className="text-green max-w-130 text-center">
            Más allá del resultado, cada paciente vive un proceso que transforma su forma de sonreír.
          </p>
        </div>

        <div className="mx-4 md:mx-14 lg:mx-10 xl:mx-0 relative z-[2]">
          <button onClick={() => navigate(current - 1)} aria-label="Anterior"
            className="hidden md:flex absolute items-center justify-center cursor-pointer z-30 text-green bg-white border border-green/35 rounded-full shadow-card-sm"
            style={{ top: '50%', left: '-44px', transform: 'translateY(-50%)', width: '32px', height: '32px' }}>
            <ChevronLeft />
          </button>

          <button onClick={() => navigate(current + 1)} aria-label="Siguiente"
            className="hidden md:flex absolute items-center justify-center cursor-pointer z-30 text-green bg-white border border-green/35 rounded-full shadow-card-sm"
            style={{ top: '50%', right: '-44px', transform: 'translateY(-50%)', width: '32px', height: '32px' }}>
            <ChevronRight />
          </button>

          <div className="bg-green rounded-[20px] overflow-hidden">
            <div className="relative overflow-hidden"
              onTouchStart={e => { startXRef.current = e.touches[0].clientX }}
              onTouchEnd={e => {
                const diff = startXRef.current - e.changedTouches[0].clientX
                if (Math.abs(diff) > 40) navigate(diff > 0 ? current + 1 : current - 1)
              }}>
              <img src={consultorio} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-35" />
              <div className="absolute inset-0 bg-green opacity-60" />

              <div className="relative flex"
                style={{ width: `${total * 100}%`, transform: `translateX(-${(current * 100) / total}%)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="relative flex-shrink-0" style={{ width: `${100 / total}%` }}>
                    <div className="hidden md:flex items-center" style={{ minHeight: '540px', padding: '40px 36px' }}>
                      <div className="flex-shrink-0 rounded-[20px] overflow-hidden border border-white/20 shadow-card-lg glass-card"
                        style={{ width: 'clamp(200px, 35%, 360px)', height: 'clamp(260px, 45vw, 480px)' }}>
                        {t.img && <img src={t.img} alt={t.subtitle} className="w-full h-full object-cover object-top block" />}
                      </div>

                      <div className="flex-1 min-w-0" style={{ paddingLeft: 'clamp(20px, 4vw, 48px)', paddingRight: '8px' }}>
                        <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-white/50 m-0 mb-1.5">Tratamiento</p>
                        <h3 className="text-white font-bold m-0 leading-[1.1] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis"
                          style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}>{t.subtitle}</h3>
                        <Stars count={t.stars} />
                        <div className="rounded-[16px] border border-white/20 glass-card-subtle" style={{ padding: 'clamp(14px, 2vw, 24px) clamp(16px, 2.5vw, 28px)' }}>
                          <p className="text-white font-bold leading-[1.5] m-0 mb-3" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>"{t.hook}"</p>
                          <p className="text-white/80 leading-[1.7] m-0 mb-3" style={{ fontSize: 'clamp(17px, 1.5vw, 19px)' }}>{t.body}</p>
                          <p className="text-gold font-medium m-0" style={{ fontSize: 'clamp(17px, 1.5vw, 19px)' }}>{t.closing}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:hidden flex-col items-center gap-0" style={{ padding: '32px 20px 28px' }}>
                      <div className="rounded-[16px] overflow-hidden border border-white/20 flex-shrink-0 mb-6 shadow-card glass-card"
                        style={{ width: '160px', height: '200px' }}>
                        {t.img && <img src={t.img} alt={t.subtitle} className="w-full h-full object-cover object-top block" />}
                      </div>
                      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 m-0 mb-1 text-center">Tratamiento</p>
                      {t.subtitle && <h3 className="text-[30px] font-bold text-white m-0 leading-[1.1] text-center">{t.subtitle}</h3>}
                      <div className="flex gap-1 my-2.5 mb-[18px] justify-center">
                        {Array.from({ length: t.stars }).map((_, i) => (<span key={i} className="text-gold text-[16px]">★</span>))}
                      </div>
                      <div className="w-full rounded-[14px] border border-white/20 glass-card-subtle" style={{ padding: '18px' }}>
                        <p className="text-white text-[22px] font-bold leading-[1.5] m-0 mb-2.5">"{t.hook}"</p>
                        <p className="text-white/80 text-[13px] leading-[1.7] m-0 mb-2.5">{t.body}</p>
                        <p className="text-gold text-[13px] font-medium m-0">{t.closing}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative flex justify-center items-center gap-2 py-4 pb-5 z-10">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => navigate(i)} aria-label={`Ir a testimonio ${i + 1}`}
                    className="w-2 h-2 rounded-full border-none cursor-pointer p-0 transition-colors"
                    style={{ backgroundColor: i === current ? 'var(--color-gold)' : 'rgba(255,255,255,0.25)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
