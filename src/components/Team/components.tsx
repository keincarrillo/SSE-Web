import { useState, useRef } from 'react'
import { TEAM, banner1, banner2, profesional1 } from './data'
import { ChevronLeft, ChevronRight, ChevronDown, InfoIcon } from './icons'
import { useInView } from './hooks'

const DescriptionToggle = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const handleToggle = () => {
    if (!open) setHasOpened(true)
    setOpen(v => !v)
  }

  return (
    <div className="px-3 py-2 sm:px-4 sm:pt-3 sm:pb-4">
      <button
        onClick={handleToggle}
        className="toggle-btn w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border border-gold/30 bg-gold/8 text-gold cursor-pointer"
        aria-expanded={open}
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
          <InfoIcon />
          {open ? 'Ocultar' : 'Conocer más'}
        </span>
        <ChevronDown
          className={open ? 'chevron-open' : hasOpened ? 'chevron-close' : ''}
        />
      </button>
      {hasOpened && (
        <div className={open ? 'desc-open' : 'desc-close'}>
          <p
            className="mt-3 text-white/70 leading-relaxed text-lg"
            style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}
          >
            {text}
          </p>
        </div>
      )}
    </div>
  )
}

const DoctorCard = ({ member }: { member: (typeof TEAM)[number] }) => (
  <div className="relative rounded-2xl border border-white/20 overflow-hidden flex flex-col">
    <div className="relative flex-shrink-0 overflow-hidden" style={{ height: '360px' }}>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.5) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 5%,  rgba(212,175,55,0.25) 0%, transparent 45%),
            linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%)
          `
        }}
      />
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
        className="absolute inset-0 w-full h-full object-cover object-center"
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
    {member.description && <DescriptionToggle text={member.description} />}
  </div>
)

const AnimatedDoctorCard = ({
  member,
  delay,
  isOpen,
  onToggle
}: {
  member: (typeof TEAM)[number]
  delay: string
  isOpen?: boolean
  onToggle?: () => void
}) => {
  const { ref, inView } = useInView(0.05)
  const [localOpen, setLocalOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(isOpen ?? false)

  const open = onToggle !== undefined ? (isOpen ?? false) : localOpen

  const handleToggle = () => {
    if (!open) setHasOpened(true)
    if (onToggle) onToggle()
    else setLocalOpen(v => !v)
  }

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

      <div className="px-3 py-2 sm:px-4 sm:pt-3 sm:pb-2">
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

      {member.description && (
        <div className="px-3 pb-3 sm:px-4 sm:pb-4 mt-2">
          <button
            onClick={handleToggle}
            className="toggle-btn w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border border-gold/30 bg-gold/8 text-gold cursor-pointer"
            aria-expanded={open}
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
              <InfoIcon />
              {open ? 'Ocultar' : 'Conocer más'}
            </span>
            <ChevronDown
              className={
                open ? 'chevron-open' : hasOpened ? 'chevron-close' : ''
              }
            />
          </button>

          {hasOpened && (
            <div className={open ? 'desc-open' : 'desc-close'}>
              <p
                className="mt-3 text-white/70 leading-relaxed text-lg"
                style={{ fontSize: 'clamp(15px, 1.8vw, 18px)' }}
              >
                {member.description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const DesktopDoctorGrid = () => {
  const [openId, setOpenId] = useState<number | null>(null)

  const handleToggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <div className="hidden sm:grid sm:grid-cols-3 gap-4">
      {TEAM.slice(1).map((m, i) => (
        <AnimatedDoctorCard
          key={m.id}
          member={m}
          delay={`${i * 0.08}s`}
          isOpen={openId === m.id}
          onToggle={() => handleToggle(m.id)}
        />
      ))}
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

        <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-4/5 sm:w-2/3 h-full">
          <img
            src={profesional1}
            alt="Dr. principal"
            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>

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

export {
  DoctorCard,
  AnimatedDoctorCard,
  DesktopDoctorGrid,
  AnimatedMainCard,
  MobileCarousel
}
