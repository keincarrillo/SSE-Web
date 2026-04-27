import type { RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const TESTIMONIALS = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at lorem lacinia ipsum sollicitudin eleifend. ',
    author: '[Nombre]',
    treatment: 'Ortodoncia'
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at lorem lacinia ipsum sollicitudin eleifend. ',
    author: '[Nombre]',
    treatment: 'Implantes'
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at lorem lacinia ipsum sollicitudin eleifend. ',
    author: '[Nombre]',
    treatment: 'Limpieza dental'
  }
]

const Testimonials = () => {
  const ref = useScrollReveal({ stagger: 0.15 })

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      id="testimonios"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span
            data-gsap="fade-up"
            className="block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3"
          >
            Testimonios
          </span>
          <h2 data-gsap="fade-up" className="display-lg text-green">
            Lo que dicen nuestros pacientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              data-gsap="fade-up"
              className="rounded-3xl overflow-hidden border border-border bg-gray hover:border-gold/40 transition-colors duration-300"
            >
              {/* Foto paciente — TODO: reemplazar */}
              <div className="relative h-48 bg-gray-mid flex items-center justify-center">
                <span className="text-muted/30 text-xs tracking-widest uppercase">
                  paciente
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-black/75 text-sm leading-relaxed mb-5">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <span className="text-black text-sm font-semibold">
                    {t.author}
                  </span>
                  <span className="text-gold text-xs">·</span>
                  <span className="text-gold text-xs tracking-wide">
                    {t.treatment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
