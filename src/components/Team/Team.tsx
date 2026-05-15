import { useState, useRef, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import profesional1 from '../../assets/profesional1.webp'
import profesional2 from '../../assets/profesional2.webp'
import profesional3 from '../../assets/profesional3.webp'
import profesional4 from '../../assets/profesional4.webp'
import banner1 from '../../assets/banner1.webp'
import banner2 from '../../assets/banner2.webp'

const ANIM_STYLES = `
  @keyframes teamFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes teamFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes teamSlideLeft {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes teamSlideRight {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes teamScaleIn {
    from { opacity: 0; transform: scale(0.92) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes teamSlideFromLeft {
    from { opacity: 0; transform: translateX(-48px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .team-fade-up        { animation: teamFadeUp        0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .team-fade-in        { animation: teamFadeIn        0.55s ease both; }
  .team-slide-left     { animation: teamSlideLeft     0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .team-slide-right    { animation: teamSlideRight    0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .team-scale-in       { animation: teamScaleIn       0.7s  cubic-bezier(0.22, 1, 0.36, 1) both; }
  .team-slide-from-left{ animation: teamSlideFromLeft 0.75s cubic-bezier(0.22, 1, 0.36, 1) both; }

  .team-hidden {
    opacity: 0;
    transform: translateX(-48px);
  }

  @keyframes lineGrow {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  .team-line-grow {
    animation: lineGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
    transform-origin: left center;
  }

  .doctor-card-sm {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .doctor-card-sm:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(212,175,55,0.18);
  }
`

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById('team-anim-styles')) return
  const el = document.createElement('style')
  el.id = 'team-anim-styles'
  el.textContent = ANIM_STYLES
  document.head.appendChild(el)
}

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    injectStyles()
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

const TEAM = [
  {
    id: 1,
    name: 'Dr. Jesus Ruiz',
    specialty: 'Cirujano Dentista',
    img: profesional1,
    phrase: 'Si sonríes, el mundo es mejor'
  },
  {
    id: 2,
    name: 'Dra. Jocelyn Reynoso',
    specialty: 'Cirujano Dentista',
    img: profesional2
  },
  {
    id: 3,
    name: 'Dra. Fernanda Gil',
    specialty: 'Cirujano Dentista',
    img: profesional3
  },
  {
    id: 4,
    name: 'Dr. Enrique Vazquez',
    specialty: 'Cirujano Dentista',
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

const DoctorCard = ({ member }: { member: (typeof TEAM)[number] }) => (
  <div className="relative rounded-2xl border border-white/20 overflow-hidden flex flex-col min-h-110">
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
      <img
        src={member.img}
        alt={member.name}
        className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom"
      />
    </div>
    <div className="px-3 py-2">
      <span
        className="block text-gold uppercase font-semibold mb-1 tracking-widest"
        style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}
      >
        {member.specialty}
      </span>
      <h3
        className="text-white font-bold leading-tight"
        style={{ fontSize: 'clamp(14px, 3.5vw, 20px)' }}
      >
        {member.name}
      </h3>
    </div>
  </div>
)

const MobileCarousel = ({ inView }: { inView: boolean }) => {
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
    <div
      className={`sm:hidden ${inView ? 'team-slide-from-left' : 'team-hidden'}`}
      style={{ animationDelay: '0.1s' }}
    >
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

      <div className="flex justify-center gap-1.5 mt-4">
        {TEAM.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a doctor ${i + 1}`}
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

const AnimatedDoctorCard = ({
  member,
  delay
}: {
  member: (typeof TEAM)[number]
  delay: string
}) => {
  const { ref, inView } = useInView(0.05)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`doctor-card-sm relative rounded-2xl border border-white/20 overflow-hidden flex flex-col ${inView ? 'team-slide-from-left' : 'team-hidden'}`}
      style={{ minHeight: 'clamp(110px, 30vw, 320px)', animationDelay: delay }}
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
          src={member.img}
          alt={member.name}
          className="relative w-full h-full object-cover object-top"
        />
      </div>
      <div className="px-3 py-2 sm:px-4 sm:py-3">
        <span
          className="block text-gold uppercase font-semibold mb-1 tracking-widest"
          style={{ fontSize: 'clamp(10px, 2.2vw, 14px)' }}
        >
          {member.specialty}
        </span>
        <h3
          className="text-white font-bold leading-tight"
          style={{ fontSize: 'clamp(14px, 3vw, 20px)' }}
        >
          {member.name}
        </h3>
      </div>
    </div>
  )
}

const AnimatedMainCard = () => {
  const { ref, inView } = useInView(0.05)
  const mainDoctor = TEAM[0]

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`hidden sm:block relative mb-10 lg:mt-10 overflow-visible ${inView ? 'team-slide-from-left' : 'team-hidden'}`}
      style={{ animationDelay: '0s' }}
    >
      <div
        className="relative rounded-2xl border border-white/25 overflow-hidden"
        style={{ minHeight: 'clamp(350px, 65vw, 700px)' }}
      >
        {/* Fondos tablet */}
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
            <div className="absolute top-6 right-6 flex flex-col items-end z-10 max-w-70">
              {mainDoctor.phrase && (
                <p className="text-gold/90 text-right mb-2 font-bold leading-tight display-lg">
                  "Si sonries,
                  <br />
                  <span className="text-white">el mundo</span>
                  <br /> es mejor"
                </p>
              )}
              <span className="block text-gold text-base tracking-[0.25em] uppercase font-semibold mb-1">
                {mainDoctor.specialty}
              </span>
              <h3 className="text-white text-2xl font-bold leading-tight text-right">
                {mainDoctor.name}
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

        {/* Fondos desktop */}
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
            <div className="absolute top-8 right-8 flex flex-col items-end max-w-[320px] gap-16">
              <div>
                {mainDoctor.phrase && (
                  <p className="text-gold/90 text-right mb-2 font-bold leading-tight display-lg">
                    "Si sonries,
                    <br />
                    <span className="text-white">el mundo</span>
                    <br /> es mejor"
                  </p>
                )}
              </div>
              <div>
                <span className="block text-gold text-base tracking-[0.25em] uppercase font-semibold mb-1">
                  {mainDoctor.specialty}
                </span>
                <h3 className="text-white text-2xl font-bold leading-tight text-right">
                  {mainDoctor.name}
                </h3>
              </div>
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

      {/* Doctor DESKTOP */}
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
  )
}

export default function Team() {
  const ref = useScrollReveal({ stagger: 0.12 })
  const { ref: titleRef, inView: titleInView } = useInView(0.05)

  const setRef = (el: HTMLElement | null) => {
    ;(ref as React.MutableRefObject<HTMLElement | null>).current = el
  }

  return (
    <section ref={setRef} id="equipo" className="py-16 md:py-28 bg-green">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        {/* ── Título ── */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className="mb-10 md:mb-14"
        >
          <div
            className={`flex justify-center mb-6 ${titleInView ? 'team-slide-from-left' : 'team-hidden'}`}
            style={{ animationDelay: '0s' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10">
              <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
                Nuestro equipo
              </span>
            </div>
          </div>

          <div
            className={`text-white display-title text-center ${titleInView ? 'team-slide-from-left' : 'team-hidden'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <h2>
              Expertos en <span className="text-gold">sonrisas</span>
            </h2>
          </div>

          <p
            className={`mt-4 text-white/60 text-md lg:text-lg leading-[1.7] max-w-4xl mx-auto text-center ${titleInView ? 'team-slide-from-left' : 'team-hidden'}`}
            style={{ animationDelay: '0.2s' }}
          >
            Somos un equipo enfocado en crear sonrisas armónicas y naturales,
            cuidando cada detalle para lograr resultados que realmente se
            adapten a ti.
          </p>

          <div className="flex justify-center mt-4">
            <div
              className={`h-px w-24 bg-linear-to-r from-transparent via-gold to-transparent ${titleInView ? 'team-line-grow' : 'opacity-0'}`}
            />
          </div>
        </div>

        {/* ── MÓVIL: carrusel ── */}
        <MobileCarousel inView={titleInView} />

        {/* ── SM+: tarjeta principal ── */}
        <AnimatedMainCard />

        {/* ── SM+: grid 3 doctores ── */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-4">
          {TEAM.slice(1).map((m, i) => (
            <AnimatedDoctorCard key={m.id} member={m} delay={`${i * 0.08}s`} />
          ))}
        </div>
      </div>
    </section>
  )
}
