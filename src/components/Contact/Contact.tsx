import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const LOCATIONS = [
  {
    munucipality: 'Chimalhuacan',
    state: 'EDOMEX',
    address: 'Sucursal 1',
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
    address: 'Sucursal 2',
    whatsapp: 'https://wa.me/message/3AXNNBK5CECNO1',
    whatsappDisplay: '+52 55 4502 1633',
    email: 'smilestudioexperts@outlook.com',
    horario: '12:00–18:00',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.4452483689947!2d-99.2041844!3d19.4363609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2021b854c170f%3A0x1b2db9d3c21f177a!2sAv.%20Homero%201425%2C%20Polanco%2C%20Polanco%20II%20Secc%2C%20Miguel%20Hidalgo%2C%2011530%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1777939435249!5m2!1ses-419!2smx'
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

    const particles = [
      { bx: 0.08, by: 0.12, xA: 12, yA: 20, xD: 3.5, yD: 2.5, s: 10 },
      { bx: 0.12, by: 0.7, xA: -12, yA: 34, xD: 3.9, yD: 3.1, s: 7 },
      { bx: 0.9, by: 0.18, xA: 12, yA: 41, xD: 3.7, yD: 3.7, s: 12 },
      { bx: 0.92, by: 0.8, xA: -12, yA: 55, xD: 4.1, yD: 4.3, s: 8 },
      { bx: 0.04, by: 0.42, xA: 12, yA: 62, xD: 3.8, yD: 4.9, s: 12 },
      { bx: 0.95, by: 0.55, xA: -12, yA: 69, xD: 3.9, yD: 5.5, s: 10 },
      { bx: 0.18, by: 0.32, xA: 12, yA: 76, xD: 4.3, yD: 6.1, s: 8 },
      { bx: 0.8, by: 0.88, xA: -12, yA: 83, xD: 3.5, yD: 6.7, s: 8 }
    ]

    const draw = () => {
      t += 0.016
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Orbs
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

      // Sweeping lines
      ;[
        { top: 0.28, color: 'rgba(201,170,101,0.18)', h: 2, d: 5 },
        { top: 0.65, color: 'rgba(201,170,101,0.14)', h: 1, d: 6.5 },
        { top: 0.45, color: 'rgba(255,255,255,0.10)', h: 1, d: 8 }
      ].forEach((lc, i) => {
        const prog = (t / lc.d + i * 0.4) % 1
        const lx = (prog * 2.2 - 0.1) * w
        const g = ctx.createLinearGradient(lx - w * 0.3, 0, lx + w * 0.3, 0)
        g.addColorStop(0, 'transparent')
        g.addColorStop(0.5, lc.color)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.fillRect(lx - w * 0.3, lc.top * h, w * 0.6, lc.h)
      })

      // Particles — ONLY drawn in left/right margins, never over the card area
      const cardLeft = 0.17 // approx left edge of cards (fraction of width)
      const cardRight = 0.83 // approx right edge of cards
      particles.forEach((p, i) => {
        const px = p.bx * w + Math.sin(t / p.xD + i) * p.xA
        const py = p.by * h + Math.sin(t / p.yD + i * 0.5) * p.yA
        // Skip drawing if particle is inside the card zone
        if (px > cardLeft * w && px < cardRight * w) return
        const alpha =
          0.3 + 0.4 * Math.abs(Math.sin(t / (1.8 + i * 0.3) + i * 0.7))
        ctx.save()
        ctx.translate(px, py)
        ctx.rotate(Math.PI / 4)
        ctx.fillStyle = `rgba(201,170,101,${alpha})`
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s)
        ctx.restore()
      })

      // Glints
      ;[
        { bx: 0.22, by: 0.1, s: 24, d: 5.2, ph: 2 },
        { bx: 0.82, by: 0.55, s: 18, d: 6.7, ph: 6.4 },
        { bx: 0.3, by: 0.85, s: 16, d: 5.8, ph: 11 }
      ].forEach(g => {
        const alpha = Math.max(0, Math.sin(t / g.d + g.ph)) * 0.7
        if (alpha < 0.01) return
        const gx = g.bx * w,
          gy = g.by * h,
          hs = g.s / 2
        ctx.save()
        ctx.globalAlpha = alpha
        const vg = ctx.createLinearGradient(gx, gy - hs, gx, gy + hs)
        vg.addColorStop(0, 'transparent')
        vg.addColorStop(0.5, '#c9aa65')
        vg.addColorStop(1, 'transparent')
        ctx.fillStyle = vg
        ctx.fillRect(gx - 1, gy - hs, 2, g.s)
        const hg = ctx.createLinearGradient(gx - hs, gy, gx + hs, gy)
        hg.addColorStop(0, 'transparent')
        hg.addColorStop(0.5, '#c9aa65')
        hg.addColorStop(1, 'transparent')
        ctx.fillStyle = hg
        ctx.fillRect(gx - hs, gy - 1, g.s, 2)
        ctx.restore()
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
        zIndex: -1, // negativo respecto al stacking context de la section
        display: 'block'
      }}
    />
  )
}

const LocationCard = ({ loc }: { loc: (typeof LOCATIONS)[number] }) => (
  <div className="rounded-2xl overflow-hidden border border-white/15 hover:border-gold/40 transition-colors duration-300 bg-white/6">
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 p-5">
        <div className="flex flex-col flex-1 min-w-0 gap-2">
          <p className="text-white/70 text-sm leading-relaxed">{loc.address}</p>
          <div className="flex flex-col mt-1">
            {[
              { label: 'WhatsApp', value: loc.whatsappDisplay },
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
          href={loc.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="shrink-0 w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#1fc45e] hover:scale-110 transition-all duration-300"
        >
          <WhatsAppIcon />
        </a>
      </div>
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
          title={`${loc.munucipality}, ${loc.state}`}
        />
      </div>
    </div>
  </div>
)

const LocationLabel = ({
  munucipality,
  state
}: {
  munucipality: string
  state: string
}) => (
  <div className="display-md tracking-[0.05em] uppercase mb-2 block">
    <span className="text-gold">{munucipality}</span>
    <span className="text-white">, {state}</span>
  </div>
)

const MobileCarousel = () => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const total = LOCATIONS.length
  const goTo = (n: number) => setCurrent(((n % total) + total) % total)

  return (
    <div className="lg:hidden">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={e => {
            startXRef.current = e.touches[0].clientX
          }}
          onTouchEnd={e => {
            const diff = startXRef.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
          }}
        >
          {LOCATIONS.map(loc => (
            <div key={loc.munucipality} className="min-w-full">
              <LocationLabel
                munucipality={loc.munucipality}
                state={loc.state}
              />
              <LocationCard loc={loc} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-4">
        {LOCATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a sucursal ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === current ? 'bg-gold' : 'bg-white/20'}`}
          />
        ))}
      </div>
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
      // isolation:isolate crea un stacking context propio.
      // El canvas con z-index:-1 queda dentro de ese contexto → NUNCA puede
      // salir por encima del contenido que está en z-index:auto (0) dentro
      // del mismo stacking context.
      style={{ isolation: 'isolate', position: 'relative', overflow: 'hidden' }}
      className="py-24 md:py-32 bg-green"
    >
      <AmbientCanvas containerRef={sectionRef} />

      {/* Sin z-index → z-index:auto → pintado después del canvas → siempre encima */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
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
          <h2 data-gsap="fade-up" className="display-title text-white">
            Agenda tu cita <span className="text-gold">hoy</span>
          </h2>
        </div>

        <MobileCarousel />

        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {LOCATIONS.map(loc => (
            <div key={loc.munucipality} data-gsap="fade-up">
              <LocationLabel
                munucipality={loc.munucipality}
                state={loc.state}
              />
              <LocationCard loc={loc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
