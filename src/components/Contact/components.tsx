import { useState, useRef } from 'react'
import { ExternalLink, MessageCircle } from 'lucide-react'
import { LOCATIONS, SOCIAL_LINKS } from './data'
import { ChevronLeft, ChevronRight } from './icons'

const SocialColumn = () => (
  <div className="flex flex-col gap-4">
    <p className="font-display text-gold text-md tracking-[0.22em] uppercase mb-2">
      redes sociales
    </p>
    {SOCIAL_LINKS.map(social => (
      <a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/25 hover:scale-[1.02]"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: social.gradient ?? social.color }}
        >
          {social.icon}
        </div>
        <span className="text-white font-semibold text-lg tracking-wide">
          {social.label}
        </span>
        <ExternalLink className="ml-auto text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300 w-4 h-4" />
      </a>
    ))}

    <div className="mt-2 flex flex-col gap-0">
      {[
        { label: 'Email', value: 'smilestudioexperts@outlook.com' },
        { label: 'Horario', value: '12:00–18:00 de Lun a Sab' }
      ].map((item, i) => (
        <div
          key={item.label}
          className={`flex gap-10 items-center py-3 border-b border-white/8 ${i === 0 ? 'border-t border-white/8' : ''}`}
        >
          <span className="text-gold text-md tracking-[0.18em] uppercase font-semibold w-16 shrink-0">
            {item.label}
          </span>
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
      <div className="flex h-48 lg:h-56">
        <div className="hidden lg:flex w-1/3 flex-col justify-between p-4 gap-3 min-w-0 shrink-0">
          <div className="flex flex-col">
            <div className="flex flex-col gap-0.5 py-1.5 border-t border-white/8">
              <span className="text-gold text-[11px] tracking-[0.18em] uppercase font-semibold">
                WhatsApp
              </span>
              <span className="text-white/75 text-base leading-tight">
                {loc.whatsappDisplay}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 py-1.5 border-t border-white/8">
              <span className="text-gold text-[11px] tracking-[0.18em] uppercase font-semibold">
                Dirección
              </span>
              <span className="text-white/75 text-base leading-snug">
                {loc.address}
              </span>
            </div>
          </div>
          <a
            href={loc.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full btn-whatsapp text-sm font-semibold w-full"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="w-full lg:w-2/3 flex-shrink-0 lg:border-l border-white/10 overflow-hidden">
          <iframe
            src={loc.embedUrl}
            width="100%"
            height="100%"
            style={{
              border: 0,
              display: 'block',
              filter: 'saturate(0.7) contrast(1.05)'
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${loc.munucipality}, ${loc.state}`}
          />
        </div>
      </div>
    </div>

    <a
      href={loc.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="lg:hidden flex items-center justify-center gap-2 mt-3 px-4 py-3 rounded-full btn-whatsapp text-sm font-semibold w-3/4 mx-auto"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span>WhatsApp</span>
    </a>
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
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={e => {
              startXRef.current = e.touches[0].clientX
            }}
            onTouchEnd={e => {
              const diff = startXRef.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 40)
                goTo(diff > 0 ? current + 1 : current - 1)
            }}
          >
            {LOCATIONS.map(loc => (
              <div key={loc.munucipality} className="min-w-full">
                <LocationCard loc={loc} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => goTo(current - 1)}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>
          <div className="flex gap-1.5">
            {LOCATIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a sucursal ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === current ? 'bg-gold' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(current + 1)}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export { SocialColumn, LocationCard, MobileLayout }
