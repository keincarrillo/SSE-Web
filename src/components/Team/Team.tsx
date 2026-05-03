import { useState, useRef, type RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import profesional1 from '../../assets/profesional1.webp'
import profesional2 from '../../assets/profesional2.webp'
import profesional3 from '../../assets/profesional3.webp'
import profesional4 from '../../assets/profesional4.webp'
import banner1 from '../../assets/banner1.webp'
import banner2 from '../../assets/banner2.webp'
import profesional1green from '../../assets/profesional1green.webp'

const TEAM = [
  {
    id: 1,
    name: 'Dr. [Nombre]',
    specialty: 'Director & Implantólogo',
    img: profesional1,
    mobileImg: profesional1green
  },
  {
    id: 2,
    name: 'Dra. [Nombre A]',
    specialty: 'Ortodoncista',
    img: profesional2
  },
  {
    id: 3,
    name: 'Dra. [Nombre B]',
    specialty: 'Endodoncista',
    img: profesional3
  },
  {
    id: 4,
    name: 'Dr. [Nombre C]',
    specialty: 'Odontología General',
    img: profesional4
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

/* ─── Tarjeta individual reutilizable ─── */
const DoctorCard = ({ member }: { member: (typeof TEAM)[number] }) => (
  <div
    className="relative rounded-2xl border border-white/20 overflow-hidden flex flex-col"
    style={{ minHeight: 'clamp(260px, 70vw, 400px)' }}
  >
    <div
      className="relative flex-1 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.5) 0%, transparent 55%),
          radial-gradient(ellipse at 90% 5%,  rgba(212,175,55,0.25) 0%, transparent 45%),
          linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%)
        `
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(212,175,55,0.7) 1.5px, transparent 1.5px)',
          backgroundSize: '8px 8px',
          opacity: 0.5
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: '2px',
          background:
            'linear-gradient(to right, transparent, rgba(212,175,55,0.6) 40%, rgba(212,175,55,0.6) 60%, transparent)'
        }}
      />

      {/* Imagen móvil */}
      {member.mobileImg && (
        <img
          src={member.mobileImg}
          alt={member.name}
          className="relative w-full h-full object-cover object-top sm:hidden"
        />
      )}
      {/* Imagen normal */}
      <img
        src={member.img}
        alt={member.name}
        className={`relative w-full h-full object-cover object-top ${member.mobileImg ? 'hidden sm:block' : ''}`}
      />
    </div>

    <div className="px-3 py-2">
      <span
        className="block text-gold uppercase font-semibold mb-1 tracking-widest"
        style={{ fontSize: 'clamp(7px, 1.8vw, 10px)' }}
      >
        {member.specialty}
      </span>
      <h3
        className="text-white font-bold leading-tight"
        style={{ fontSize: 'clamp(11px, 2.5vw, 17px)' }}
      >
        {member.name}
      </h3>
    </div>
  </div>
)

/* ─── Carrusel móvil ─── */
const MobileCarousel = () => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const total = TEAM.length

  const goTo = (n: number) => setCurrent(((n % total) + total) % total)

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
  }

  return (
    <div className="sm:hidden">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {TEAM.map(member => (
            <div key={member.id} className="min-w-full">
              <DoctorCard member={member} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {TEAM.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a doctor ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === current ? 'bg-gold' : 'bg-white/20'
            }`}
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

/* ─── Sección principal ─── */
export default function Team() {
  const ref = useScrollReveal({ stagger: 0.12 })

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      id="equipo"
      className="py-16 md:py-28 bg-green"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        {/* Título */}
        <div className="mb-10 md:mb-14" data-gsap="fade-up">
          <div className="text-white display-title text-center">
            <h2>
              Nuestro equipo
              <br />
              <span className="text-gold">expertos</span>
            </h2>
          </div>
        </div>

        {/* ── MÓVIL: carrusel con los 4 doctores ── */}
        <MobileCarousel />

        {/* ── SM+: tarjeta principal grande ── */}
        <div
          data-gsap="fade-up"
          className="hidden sm:block relative mb-10 lg:mt-10 overflow-visible"
        >
          <div
            className="relative rounded-2xl border border-white/25 overflow-hidden"
            style={{ minHeight: 'clamp(350px, 65vw, 700px)' }}
          >
            {/* Fondos tablet (sm a lg) */}
            <div className="hidden sm:grid lg:hidden absolute inset-0 grid-cols-2 grid-rows-2">
              <div className="row-span-2 overflow-hidden">
                <img
                  src={banner2}
                  alt=""
                  className="w-full h-full object-cover opacity-60"
                  style={{ objectPosition: '80% center' }}
                />
              </div>
              <div className="relative border-l-2 border-l-green overflow-hidden">
                <div className="absolute bottom-4 right-4 flex flex-col items-end z-10">
                  <span className="block text-gold text-[9px] tracking-[0.18em] uppercase font-semibold mb-1">
                    {TEAM[0].specialty}
                  </span>
                  <h3 className="text-white text-sm font-bold leading-tight text-right">
                    {TEAM[0].name}
                  </h3>
                </div>
              </div>
              <div className="relative border border-white/25 rounded-br-2xl border-l-2 border-l-green overflow-hidden">
                <img
                  src={banner1}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  style={{ objectPosition: 'center 60%' }}
                />
              </div>
            </div>

            {/* Fondos desktop lg+ */}
            <div className="hidden lg:grid absolute inset-0 grid-cols-2 grid-rows-2">
              <div className="row-span-2 overflow-hidden">
                <img
                  src={banner2}
                  alt=""
                  className="w-full h-full object-cover opacity-60"
                  style={{ objectPosition: '80% center' }}
                />
              </div>
              <div className="overflow-hidden border-l-2 border-l-green">
                <img
                  src={banner1}
                  alt=""
                  className="w-full h-full object-cover opacity-60"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
              <div className="relative border border-white/25 rounded-br-2xl border-l-2 border-l-green">
                <div className="absolute bottom-4 right-4 flex flex-col items-end">
                  <span className="block text-gold text-[9px] tracking-[0.18em] uppercase font-semibold mb-1">
                    {TEAM[0].specialty}
                  </span>
                  <h3 className="text-white text-sm font-bold leading-tight text-right">
                    {TEAM[0].name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Doctor TABLET */}
            <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-4/5 sm:w-2/3 h-full">
              <img
                src={profesional1}
                alt="Dr. principal"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Doctor DESKTOP — sobresale hacia arriba */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none z-20"
            style={{ height: 'clamp(700px, 90vw, 1200px)' }}
          >
            <img
              src={profesional1}
              alt="Dr. principal"
              className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
            />
          </div>
        </div>

        {/* ── SM+: grid de 3 doctores restantes ── */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-4">
          {TEAM.slice(1).map(m => (
            <div
              key={m.id}
              data-gsap="fade-up"
              className="relative rounded-2xl border border-white/20 overflow-hidden flex flex-col"
              style={{ minHeight: 'clamp(110px, 30vw, 320px)' }}
            >
              <div
                className="relative flex-1 overflow-hidden"
                style={{
                  background: `
                    radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.5) 0%, transparent 55%),
                    radial-gradient(ellipse at 90% 5%,  rgba(212,175,55,0.25) 0%, transparent 45%),
                    linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%)
                  `
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(212,175,55,0.7) 1.5px, transparent 1.5px)',
                    backgroundSize: '8px 8px',
                    opacity: 0.5
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: '2px',
                    background:
                      'linear-gradient(to right, transparent, rgba(212,175,55,0.6) 40%, rgba(212,175,55,0.6) 60%, transparent)'
                  }}
                />
                <img
                  src={m.img}
                  alt={m.name}
                  className="relative w-full h-full object-cover object-top"
                />
              </div>
              <div className="px-3 py-2 sm:px-4 sm:py-3">
                <span
                  className="block text-gold uppercase font-semibold mb-1 tracking-widest"
                  style={{ fontSize: 'clamp(7px, 1.8vw, 10px)' }}
                >
                  {m.specialty}
                </span>
                <h3
                  className="text-white font-bold leading-tight"
                  style={{ fontSize: 'clamp(11px, 2.5vw, 17px)' }}
                >
                  {m.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
