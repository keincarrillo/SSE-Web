// TEAM
import type { RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// Keys únicas usando índice en el nombre para evitar duplicados
const TEAM = [
  { id: 1, name: 'Dr. [Nombre]', specialty: 'Director & Implantólogo' },
  { id: 2, name: 'Dra. [Nombre A]', specialty: 'Ortodoncista' },
  { id: 3, name: 'Dra. [Nombre B]', specialty: 'Endodoncista' },
  { id: 4, name: 'Dr. [Nombre C]', specialty: 'Odontología General' }
]

export default function Team() {
  const ref = useScrollReveal({ stagger: 0.12 })

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      id="equipo"
      className="py-24 md:py-32 bg-green"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <span
            data-gsap="fade-up"
            className="block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3"
          >
            Nuestro equipo
          </span>
          <h2 data-gsap="fade-up" className="display-lg text-white">
            Expertos a tu servicio
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card principal */}
          <div
            data-gsap="fade-right"
            className="relative rounded-3xl overflow-hidden bg-green-mid border border-gold/20 aspect-[4/3] flex flex-col justify-end p-6"
          >
            {/* TODO: <img src="/images/equipo-1.jpg" className="absolute inset-0 w-full h-full object-cover" /> */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative z-10">
              <span className="text-gold text-xs tracking-widest uppercase">
                {TEAM[0].specialty}
              </span>
              <h3 className="display-sm text-white mt-1">{TEAM[0].name}</h3>
            </div>
          </div>

          {/* Cards secundarias — key por id único */}
          <div className="grid grid-cols-2 gap-4">
            {TEAM.slice(1).map(m => (
              <div
                key={m.id}
                data-gsap="fade-left"
                className="relative rounded-2xl overflow-hidden bg-green-mid border border-gold/15 aspect-square flex flex-col justify-end p-4"
              >
                {/* TODO: <img src={m.img} className="absolute inset-0 w-full h-full object-cover" /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="relative z-10">
                  <span className="text-gold text-[10px] tracking-widest uppercase">
                    {m.specialty}
                  </span>
                  <h3 className="display-name text-white text-sm mt-0.5 leading-tight">
                    {m.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
