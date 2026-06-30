import { useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { AnimatedMainCard, DesktopDoctorGrid, MobileCarousel } from './components'
import { useInView } from './hooks'
import { injectStyles } from './styles'

export default function Team() {
  const ref = useScrollReveal({ stagger: 0.12 })
  const { ref: titleRef, inView: titleInView } = useInView(0.05)

  useEffect(() => {
    injectStyles()
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="equipo"
      className="py-16 md:py-28 bg-green"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-10">
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
            className={`mt-4 text-white/60 text-md leading-[1.7] max-w-4xl mx-auto text-center ${titleInView ? 'team-slide-from-left' : 'team-hidden'}`}
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

        <MobileCarousel inView={titleInView} />
        <AnimatedMainCard />
        <DesktopDoctorGrid />
      </div>
    </section>
  )
}
