import { useScrollReveal } from '../../hooks/useScrollReveal'
import { AmbientCanvas } from './ambient'
import { SocialColumn, LocationCard, MobileLayout } from './components'
import { LOCATIONS } from './data'

const Contact = () => {
  const ref = useScrollReveal({ stagger: 0.1 })

  return (
    <section ref={ref} id="contacto"
      style={{ isolation: 'isolate', position: 'relative', overflow: 'hidden' }}
      className="py-24 md:py-32 bg-green scroll-mt-24">
      <AmbientCanvas containerRef={ref} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6">
            <span data-gsap="fade-up" className="text-gold text-md font-semibold tracking-[0.2em] uppercase">Contáctanos</span>
          </div>
          <h2 data-gsap="fade-up" className="display-title text-white">
            Agenda tu cita <span className="text-gold">hoy</span>
          </h2>
        </div>

        <MobileLayout />

        <div className="hidden lg:grid lg:grid-cols-2 gap-0 items-start relative">
          <div data-gsap="fade-up" className="pr-10"><SocialColumn /></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px pointer-events-none" />
          <div data-gsap="fade-up" className="flex flex-col gap-6 pl-10">
            {LOCATIONS.map(loc => <LocationCard key={loc.munucipality} loc={loc} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
