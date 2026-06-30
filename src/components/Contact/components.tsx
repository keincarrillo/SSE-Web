import { useState, useRef } from 'react'
import { LOCATIONS, SOCIAL_LINKS } from './data'
import { ChevronLeft, ChevronRight } from './icons'

const SocialColumn = () => (
  <div className="flex flex-col gap-4">
    <p className="font-display text-gold text-md tracking-[0.22em] uppercase mb-2">redes sociales</p>
    {SOCIAL_LINKS.map(social => (
      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
        className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/25 hover:scale-[1.02]">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: social.gradient ?? social.color }}>
          {social.icon}
        </div>
        <span className="text-white font-semibold text-lg tracking-wide">{social.label}</span>
        <svg className="ml-auto text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300"
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    ))}

    <div className="mt-2 flex flex-col gap-0">
      {[
        { label: 'Email', value: 'smilestudioexperts@outlook.com' },
        { label: 'Horario', value: '12:00–18:00 de Lun a Sab' }
      ].map((item, i) => (
        <div key={item.label} className={`flex gap-10 items-center py-3 border-b border-white/8 ${i === 0 ? 'border-t border-white/8' : ''}`}>
          <span className="text-gold text-md tracking-[0.18em] uppercase font-semibold w-16 shrink-0">{item.label}</span>
          <span className="text-white text-xl">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
)

const LocationCard = ({ loc }: { loc: (typeof LOCATIONS)[number] }) => (
  <div>
    <div className="display-sm tracking-[0.05em] uppercase mb-2 px-1">
      <span className="text-gold">{loc.munucipality}</span>
      <span className="text-white">, {loc.state}</span>
    </div>

    <div className="rounded-2xl overflow-hidden border border-white/15 hover:border-gold/40 transition-colors duration-300 bg-white/6">
      <div className="flex h-56">
        <div className="hidden lg:flex w-1/3 flex-col justify-between p-4 gap-3 min-w-0 shrink-0">
          <div className="flex flex-col">
            <div className="flex flex-col gap-0.5 py-1.5 border-t border-white/8">
              <span className="text-gold text-[11px] tracking-[0.18em] uppercase font-semibold">WhatsApp</span>
              <span className="text-white/75 text-base leading-tight">{loc.whatsappDisplay}</span>
            </div>
            <div className="flex flex-col gap-0.5 py-1.5 border-t border-white/8">
              <span className="text-gold text-[11px] tracking-[0.18em] uppercase font-semibold">Dirección</span>
              <span className="text-white/75 text-base leading-snug">{loc.address}</span>
            </div>
          </div>
          <a href={loc.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1fc45e] hover:scale-105 transition-all duration-300 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="w-full lg:w-2/3 flex-shrink-0 lg:border-l border-white/10 overflow-hidden">
          <iframe src={loc.embedUrl} width="100%" height="100%" style={{ border: 0, display: 'block', filter: 'saturate(0.7) contrast(1.05)' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${loc.munucipality}, ${loc.state}`} />
        </div>
      </div>
    </div>
  </div>
)

const MobileLayout = () => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const total = LOCATIONS.length
  const goTo = (n: number) => setCurrent(((n % total) + total) % total)

  return (
    <div className="lg:hidden flex flex-col gap-10">
      <SocialColumn />

      <div>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={e => { startXRef.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              const diff = startXRef.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
            }}>
            {LOCATIONS.map(loc => (
              <div key={loc.munucipality} className="min-w-full">
                <LocationCard loc={loc} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button onClick={() => goTo(current - 1)}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Anterior"><ChevronLeft /></button>
          <div className="flex gap-1.5">
            {LOCATIONS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Ir a sucursal ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === current ? 'bg-gold' : 'bg-white/20'}`} />
            ))}
          </div>
          <button onClick={() => goTo(current + 1)}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Siguiente"><ChevronRight /></button>
        </div>
      </div>
    </div>
  )
}

export { SocialColumn, LocationCard, MobileLayout }
