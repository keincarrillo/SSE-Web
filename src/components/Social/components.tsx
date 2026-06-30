import { useState, useRef, useEffect, useCallback } from 'react'
import facebook from '../../assets/social/facebook.webp'
import instagram from '../../assets/social/instagram.webp'
import mouth1 from '../../assets/social/mouth1.webp'
import mouth2 from '../../assets/social/mouth2.webp'
import { ChevronLeft, ChevronRight, IconInstagram, IconFacebook } from './icons'

const GoldenCard = ({ showMouths = false }: { showMouths?: boolean }) => (
  <div style={{ width: '100%', aspectRatio: '12/16', position: 'relative', maxWidth: '100%' }}>
    <div className="bg-gold" style={{ width: '100%', height: '100%', borderRadius: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', boxSizing: 'border-box', gap: '1rem', position: 'relative' }}>
      <div className="text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green/40 bg-green/10">
          <span className="text-green text-md font-semibold tracking-[0.2em] uppercase">Redes sociales</span>
        </div>
        <div className="text-white display-title text-center" style={{ animationDelay: '0.1s', fontSize: 'clamp(1.8rem, 7vw, 3.5rem)' }}>
          <h2 className="text-green" style={{ fontSize: 'clamp(1.4rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
            <span className="text-white">INSPÍRATE EN NUESTRA</span> COMUNIDAD
          </h2>
        </div>
        <p className="text-white font-medium text-center" style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.03em', lineHeight: 1.6, margin: 0 }}>
          Conéctate con Smile Studio Experts. <br />
          Todo sobre nuestros servicios, tips de expertos y resultados increíbles a un solo clic.
        </p>
      </div>
    </div>

    {showMouths && (
      <>
        <img src={mouth1} alt="" style={{ position: 'absolute', width: '38%', top: '-12%', left: '-14%', pointerEvents: 'none' }} />
        <img src={mouth2} alt="" style={{ position: 'absolute', width: '38%', bottom: '-14%', right: '-14%', pointerEvents: 'none' }} />
      </>
    )}
  </div>
)

const PhonesCarousel = ({ inView }: { inView: boolean }) => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const phones = [
    { id: 1, name: 'Facebook', image: facebook, buttonText: 'Facebook', buttonLink: 'https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr' },
    { id: 2, name: 'Instagram', image: instagram, buttonText: 'Instagram', buttonLink: 'https://www.instagram.com/smilestudioexperts?igsh=Y241YjJqcTJrNm15&utm_source=qr' }
  ]

  const total = phones.length
  const goTo = (n: number) => setCurrent(((n % total) + total) % total)
  const next = useCallback(() => setCurrent(c => ((c + 1) % total + total) % total), [total])
  const prev = () => goTo(current - 1)

  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => next(), 3000)
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [current, next])

  return (
    <div className={`${inView ? 'fade-up' : 'hidden-init'}`}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={e => { startXRef.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const diff = startXRef.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) { if (diff > 0) next(); else prev() }
          }}
        >
          {phones.map(phone => (
            <div key={phone.id} className="min-w-full px-1">
              <img src={phone.image} alt={phone.name} className="w-full h-auto mx-auto"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))', maxWidth: '380px' }}
              />
              <div className="flex justify-center mt-6">
                <a href={phone.buttonLink} className="btn">{phone.buttonText}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {phones.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Ir a ${phones[i].name}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-gold' : 'w-2 bg-gray-mid'}`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 max-w-50 mx-auto">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:bg-gray transition-colors" aria-label="Anterior"><ChevronLeft /></button>
        <span className="text-muted text-sm font-medium">{current + 1} / {total}</span>
        <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:bg-gray transition-colors" aria-label="Siguiente"><ChevronRight /></button>
      </div>
    </div>
  )
}

const MobileView = ({ inView }: { inView: boolean }) => (
  <div className="md:hidden">
    <PhonesCarousel inView={inView} />
    <div className={`mt-12 px-2 ${inView ? 'fade-up' : 'hidden-init'}`} style={{ animationDelay: '0.2s' }}>
      <GoldenCard showMouths={false} />
    </div>
  </div>
)

const TabletView = ({ inView }: { inView: boolean }) => (
  <div className={`hidden md:flex lg:hidden flex-row items-center justify-center gap-4 px-4 ${inView ? 'fade-up' : 'hidden-init'}`}>
    <div className="flex flex-col items-center gap-3" style={{ flex: '0 0 38%' }}>
      <IconFacebook size={50} />
      <img src={facebook} alt="Facebook" className="w-full h-auto" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }} />
      <a href="https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="btn">Facebook</a>
    </div>
    <div style={{ flex: '0 0 14%', overflow: 'visible' }}><GoldenCard showMouths={true} /></div>
    <div className="flex flex-col items-center gap-3" style={{ flex: '0 0 38%' }}>
      <IconInstagram size={50} />
      <img src={instagram} alt="Instagram" className="w-full h-auto" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }} />
      <a href="https://www.instagram.com/smilestudioexperts?igsh=Y241YjJqcTJrNm15&utm_source=qr" target="_blank" rel="noopener noreferrer" className="btn">Instagram</a>
    </div>
  </div>
)

const DesktopView = () => (
  <div className="hidden lg:flex flex-row items-start justify-center gap-6">
    <div className="flex-1">
      <div className="flex justify-center mb-4"><IconFacebook size={70} /></div>
      <img src={facebook} alt="Facebook" className="w-full h-auto" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }} />
      <div className="flex justify-center mt-6">
        <a href="https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="btn">Facebook</a>
      </div>
    </div>
    <div className="w-1/3 shrink-0"><GoldenCard showMouths={true} /></div>
    <div className="flex-1">
      <div className="flex justify-center mb-4"><IconInstagram size={70} /></div>
      <img src={instagram} alt="Instagram" className="w-full h-auto" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }} />
      <div className="flex justify-center mt-6">
        <a href="https://www.instagram.com/smilestudioexperts?igsh=Y241YjJqcTJrNm15&utm_source=qr" target="_blank" rel="noopener noreferrer" className="btn">Instagram</a>
      </div>
    </div>
  </div>
)

export { MobileView, TabletView, DesktopView }
