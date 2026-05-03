import { useState, useRef, type RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me gustaría agendar una cita.'
)

const LOCATIONS = [
  {
    label: 'Sucursal 1',
    address: '[Dirección sucursal 1]',
    telefono: '+52 (xxx) xxx-xxxx',
    whatsapp: 'XXXXXXXXXX',
    email: 'sucursal1@ssedental.com',
    horario: 'Lun – Vie: 9:00–18:00 · Sáb: 9:00–14:00',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.885824363715!2d-98.98411995776843!3d19.402947118852673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e33713944d9f%3A0x3252260afa632afc!2sSmile%20Studio%20Experts!5e0!3m2!1ses-419!2smx!4v1777084851360!5m2!1ses-419!2smx'
  },
  {
    label: 'Sucursal 2',
    address: '[Dirección sucursal 2]',
    telefono: '+52 (xxx) xxx-xxxx',
    whatsapp: 'XXXXXXXXXX',
    email: 'sucursal2@ssedental.com',
    horario: 'Lun – Vie: 9:00–18:00 · Sáb: 9:00–14:00',
    embedUrl: 'https://www.google.com/maps/embed?pb=XXXXXXXXXXXXXXX'
  }
]

const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-10 h-10"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/* ─── Card individual ─── */
const LocationCard = ({ loc }: { loc: (typeof LOCATIONS)[number] }) => (
  <div className="rounded-2xl overflow-hidden border border-white/15 hover:border-gold/40 transition-colors duration-300 bg-white/6">
    <div className="flex flex-col h-full">
      {/* Info + botón WhatsApp */}
      <div className="flex items-center gap-4 p-5">
        <div className="flex flex-col flex-1 min-w-0 gap-2">
          <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
            {loc.label}
          </span>
          <p className="text-white/70 text-sm leading-relaxed">{loc.address}</p>

          <div className="flex flex-col mt-1">
            {[
              { label: 'Teléfono', value: loc.telefono },
              { label: 'WhatsApp', value: loc.whatsapp },
              { label: 'Email', value: loc.email },
              { label: 'Horario', value: loc.horario }
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex gap-3 items-center py-2 border-b border-white/8 ${i === 0 ? 'border-t border-white/8' : ''}`}
              >
                <span className="text-gold text-[11px] tracking-[0.18em] uppercase font-semibold w-19.5 shrink-0">
                  {item.label}
                </span>
                <span className="text-white/75 text-sm truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <a
          href={`https://wa.me/${loc.whatsapp}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="shrink-0 w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#1fc45e] hover:scale-110 transition-all duration-300"
        >
          <WhatsAppIcon />
        </a>
      </div>

      {/* Mapa */}
      <div className="h-70 md:h-87.5">
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
          title={loc.label}
        />
      </div>
    </div>
  </div>
)

/* ─── Carrusel móvil ─── */
const MobileCarousel = () => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const total = LOCATIONS.length

  const goTo = (n: number) => setCurrent(((n % total) + total) % total)

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
  }

  return (
    <div className="lg:hidden">
      {/* Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {LOCATIONS.map(loc => (
            <div key={loc.label} className="min-w-full">
              <LocationCard loc={loc} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {LOCATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a sucursal ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === current ? 'bg-gold' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Flechas + contador */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => goTo(current - 1)}
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft />
        </button>
        <span className="text-white/45 text-sm font-medium">
          {current + 1} / {total}
        </span>
        <button
          onClick={() => goTo(current + 1)}
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

/* ─── Sección principal ─── */
const Contact = () => {
  const ref = useScrollReveal({ stagger: 0.1 })

  return (
    <>
      <section
        ref={ref as RefObject<HTMLElement>}
        id="contacto"
        className="py-24 md:py-32 bg-green"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6">
                <span
                  data-gsap="fade-up"
                  className="text-gold text-md font-semibold tracking-[0.2em] uppercase"
                >
                  Contáctanos
                </span>
              </div>
            </div>
            <h2 data-gsap="fade-up" className="display-lg text-white">
              Agenda tu cita <span className="text-gold">hoy</span>
            </h2>
          </div>

          {/* Móvil: carrusel */}
          <MobileCarousel />

          {/* Desktop: grid normal */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            {LOCATIONS.map(loc => (
              <div key={loc.label} data-gsap="fade-up">
                <LocationCard loc={loc} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
