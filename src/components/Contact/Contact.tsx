import { useState, useRef, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const LOCATIONS = [
  {
    munucipality: 'Chimalhuacan',
    state: 'EDOMEX',
    address: 'C. 16 de Septiembre, Chimalhuacán, Estado de México',
    whatsapp: 'https://wa.me/message/3AXNNBK5CECNO1',
    whatsappDisplay: '+52 55 4502 1633',
    email: 'smilestudioexperts@outlook.com',
    horario: '12:00–18:00',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.885824363715!2d-98.98411995776843!3d19.402947118852673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e33713944d9f%3A0x3252260afa632afc!2sSmile%20Studio%20Experts!5e0!3m2!1ses-419!2smx!4v1777084851360!5m2!1ses-419!2smx'
  },
  {
    munucipality: 'Polanco',
    state: 'CDMX',
    address: 'Av. Homero 1425, Polanco II Secc, Miguel Hidalgo, CDMX',
    whatsapp: 'https://wa.me/message/3AXNNBK5CECNO1',
    whatsappDisplay: '+52 55 4502 1633',
    email: 'smilestudioexperts@outlook.com',
    horario: '12:00–18:00',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.4452483689947!2d-99.2041844!3d19.4363609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2021b854c170f%3A0x1b2db9d3c21f177a!2sAv.%20Homero%201425%2C%20Polanco%2C%20Polanco%20II%20Secc%2C%20Miguel%20Hidalgo%2C%2011530%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1777939435249!5m2!1ses-419!2smx'
  }
]

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr',
    color: '#1877F2',
    gradient: undefined as string | undefined,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/smilestudioexperts?igsh=Y241YjJqcTJrNm15&utm_source=qr',
    color: '#E1306C',
    gradient:
      'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    )
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@jesusodontotrembo?_r=1&_t=ZS-971u0nhdxBQ',
    color: '#010101',
    gradient: undefined as string | undefined,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.01-8.38a8.16 8.16 0 0 0 4.77 1.52V5.01a4.85 4.85 0 0 1-1-.32z" />
      </svg>
    )
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

const AmbientCanvas = ({
  containerRef
}: {
  containerRef: React.RefObject<HTMLElement | null>
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const orbs = [
      { x: 0.0, y: 0.0, r: 350, a: 0.22, xA: 60, yA: -40, xD: 10, yD: 7 },
      { x: 1.0, y: 1.0, r: 300, a: 0.18, xA: -50, yA: 50, xD: 13, yD: 9 },
      { x: 0.9, y: 0.33, r: 128, a: 0.28, xA: 35, yA: -30, xD: 8, yD: 12 },
      { x: 0.08, y: 0.66, r: 96, a: 0.24, xA: -40, yA: 45, xD: 11, yD: 8 }
    ]

    const draw = () => {
      t += 0.016
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      orbs.forEach(o => {
        const ox = o.x * w + Math.sin(t / o.xD) * o.xA
        const oy = o.y * h + Math.sin(t / o.yD) * o.yA
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r)
        g.addColorStop(0, `rgba(201,170,101,${o.a})`)
        g.addColorStop(0.45, `rgba(201,170,101,0.03)`)
        g.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [containerRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        display: 'block'
      }}
    />
  )
}

/* ── Columna izquierda: redes sociales + info de contacto ── */
const SocialColumn = () => (
  <div className="flex flex-col gap-4">
    <p className="font-display text-gold text-xs tracking-[0.22em] uppercase mb-2">
      Redes
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
        <svg
          className="ml-auto text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    ))}

    {/* Info de contacto */}
    <div className="mt-2 flex flex-col gap-0">
      {[
        { label: 'Email', value: 'smilestudioexperts@outlook.com' },
        { label: 'Horario', value: '12:00–18:00' }
      ].map((item, i) => (
        <div
          key={item.label}
          className={`flex gap-3 items-center py-3 border-b border-white/8 ${i === 0 ? 'border-t border-white/8' : ''}`}
        >
          <span className="text-gold text-[11px] tracking-[0.18em] uppercase font-semibold w-16 shrink-0">
            {item.label}
          </span>
          <span className="text-white/60 text-lg">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
)

/* ── Tarjeta de sucursal: info a la izquierda, mapa a la derecha ── */
const LocationCard = ({ loc }: { loc: (typeof LOCATIONS)[number] }) => (
  <div>
    {/* Título fuera de la card */}
    <div className="display-sm tracking-[0.05em] uppercase mb-2 px-1">
      <span className="text-gold">{loc.munucipality}</span>
      <span className="text-white">, {loc.state}</span>
    </div>

    <div className="rounded-2xl overflow-hidden border border-white/15 hover:border-gold/40 transition-colors duration-300 bg-white/6">
      {/* Fila: 1/3 info + 2/3 mapa */}
      <div className="flex h-56">
        {/* Info + WhatsApp — 1/3 */}
        <div className="w-1/3 flex flex-col justify-between p-4 gap-3 min-w-0 shrink-0">
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
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1fc45e] hover:scale-105 transition-all duration-300 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mapa — 2/3 */}
        <div className="w-2/3 flex-shrink-0 border-l border-white/10 overflow-hidden">
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
  </div>
)

/* ── Mobile: redes arriba, sucursales en carrusel abajo ── */
const MobileLayout = () => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const total = LOCATIONS.length
  const goTo = (n: number) => setCurrent(((n % total) + total) % total)

  return (
    <div className="lg:hidden flex flex-col gap-10">
      {/* Redes */}
      <SocialColumn />

      {/* Sucursales carrusel */}
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

const Contact = () => {
  const ref = useScrollReveal({ stagger: 0.1 })
  const sectionRef = useRef<HTMLElement>(null)

  const setRef = (el: HTMLElement | null) => {
    ;(ref as React.MutableRefObject<HTMLElement | null>).current = el
    ;(sectionRef as React.MutableRefObject<HTMLElement | null>).current = el
  }

  return (
    <section
      ref={setRef}
      id="contacto"
      style={{ isolation: 'isolate', position: 'relative', overflow: 'hidden' }}
      className="py-24 md:py-32 bg-green"
    >
      <AmbientCanvas containerRef={sectionRef} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6">
            <span
              data-gsap="fade-up"
              className="text-gold text-md font-semibold tracking-[0.2em] uppercase"
            >
              Contáctanos
            </span>
          </div>
          <h2 data-gsap="fade-up" className="display-title text-white">
            Agenda tu cita <span className="text-gold">hoy</span>
          </h2>
        </div>

        {/* Mobile */}
        <MobileLayout />

        {/* Desktop: 2 columnas iguales — redes | sucursales apiladas */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-0 items-start relative">
          {/* Columna izquierda: redes */}
          <div data-gsap="fade-up" className="pr-10">
            <SocialColumn />
          </div>

          {/* Línea divisoria vertical */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px pointer-events-none" />

          {/* Columna derecha: dos sucursales apiladas */}
          <div data-gsap="fade-up" className="flex flex-col gap-6 pl-10">
            {LOCATIONS.map(loc => (
              <LocationCard key={loc.munucipality} loc={loc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
