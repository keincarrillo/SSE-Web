// Team.tsx
import type { RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import profesional1 from '../../assets/profesional1.svg'
import profesional2 from '../../assets/profesional2.svg'
import profesional3 from '../../assets/profesional3.svg'
import profesional4 from '../../assets/profesional4.svg'
import banner1 from '../../assets/banner1.svg'
import banner2 from '../../assets/banner2.svg'

const TEAM = [
  {
    id: 1,
    name: 'Dr. [Nombre]',
    specialty: 'Director & Implantólogo',
    img: profesional1
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

        {/* ── Tarjeta principal — MÓVIL: card normal, SM+: layout especial ── */}

        {/* Card estilo normal — solo móvil */}
        <div
          data-gsap="fade-up"
          className="sm:hidden relative rounded-2xl border border-white/20 overflow-hidden flex flex-col mb-4"
          style={{ minHeight: 'clamp(110px, 30vw, 320px)' }}
        >
          {/* Contenedor de IMAGEN */}
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
            {/* Fondo de puntos */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(212,175,55,0.7) 1.5px, transparent 1.5px)',
                backgroundSize: '8px 8px',
                opacity: 0.5
              }}
            />
            {/* Línea dorada inferior */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10"
              style={{
                height: '2px',
                background:
                  'linear-gradient(to right, transparent, rgba(212,175,55,0.6) 40%, rgba(212,175,55,0.6) 60%, transparent)'
              }}
            />
            <img
              src={profesional1}
              alt={TEAM[0].name}
              className="relative w-full h-full object-cover object-top"
            />
          </div>
          {/* Texto */}
          <div className="px-3 py-2">
            <span
              className="block text-gold uppercase font-semibold mb-1 tracking-widest"
              style={{ fontSize: 'clamp(7px, 1.8vw, 10px)' }}
            >
              {TEAM[0].specialty}
            </span>
            <h3
              className="text-white font-bold leading-tight"
              style={{ fontSize: 'clamp(11px, 2.5vw, 17px)' }}
            >
              {TEAM[0].name}
            </h3>
          </div>
        </div>

        {/* Layout especial — sm+ (tablet y desktop) */}
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

            {/* Doctor TABLET — dentro de la card */}
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

        {/* ── Grid de doctores — 1 col móvil, 3 cols tablet/desktop ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEAM.slice(1).map(m => (
            <div
              key={m.id}
              data-gsap="fade-up"
              className="relative rounded-2xl border border-white/20 overflow-hidden flex flex-col"
              style={{ minHeight: 'clamp(110px, 30vw, 320px)' }}
            >
              {/* Contenedor de IMAGEN */}
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
                {/* Fondo de puntos */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(212,175,55,0.7) 1.5px, transparent 1.5px)',
                    backgroundSize: '8px 8px',
                    opacity: 0.5
                  }}
                />
                {/* Línea dorada inferior */}
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

              {/* Contenedor de TEXTO */}
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
