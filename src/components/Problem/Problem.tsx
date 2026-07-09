import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import problem from '../../assets/problem.webp'
import { AmbientEffects } from './ambient'

const DISMISSED_KEY = 'problem_dismissed'

const Problem = () => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(
    () => sessionStorage.getItem(DISMISSED_KEY) !== 'true'
  )

  useEffect(() => {
    if (!visible) return

    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
      gsap.fromTo(cardRef.current, { y: 50, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.75, delay: 0.2, ease: 'power3.out' })

      gsap.timeline({ delay: 0.55 })
        .fromTo(questionRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
        .fromTo(bodyRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo(arrowRef.current, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2')
    })

    return () => ctx.revert()
  }, [visible])

  const handleDismiss = () => {
    gsap.to(cardRef.current, { y: 30, opacity: 0, scale: 0.97, duration: 0.35, ease: 'power2.in' })
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.5, delay: 0.15, ease: 'power2.in',
      onComplete: () => {
        sessionStorage.setItem(DISMISSED_KEY, 'true')
        setVisible(false)
        const lenis = window.__lenis
        if (lenis) lenis.scrollTo('#inicio', { offset: 0, duration: 1.8 })
        else document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 modal-overlay"
      style={{ opacity: 0 }}
    >
      <div
        ref={cardRef}
        className="relative z-10 overflow-hidden rounded-3xl modal-card"
        style={{
          opacity: 0,
          width: 'min(96vw, 1000px)',
        }}
      >
        <AmbientEffects />

        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-200"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-0">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left px-10 py-14 sm:px-14 sm:py-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-8">
              <span className="text-gold font-semibold tracking-[0.2em] uppercase" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)' }}>
                Smile Studio Experts
              </span>
            </div>

            <h2
              ref={questionRef}
              className="display-md font-semibold text-white mb-8"
              style={{ opacity: 0, fontSize: 'clamp(1.6rem, 3.5vw, 3.8rem)' }}
            >
              <span className="block">¿Hace cuánto no visitas</span>
              <span className="text-gold block">al dentista?</span>
            </h2>

            <div ref={bodyRef} style={{ opacity: 0 }} className="mb-12">
              <p className="text-white/70 leading-relaxed md:leading-loose" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}>
                El miedo y las malas experiencias hacen que muchas personas lo eviten por mucho tiempo.
                <br />
                <span className="block mt-3 uppercase font-semibold text-white/90">Pero eso no tiene por qué seguir así.</span>
              </p>
            </div>

            <div ref={arrowRef} style={{ opacity: 0 }} className="w-full flex justify-center md:justify-start">
              <button
                onClick={handleDismiss}
                className="inline-flex items-center justify-center rounded-full bg-gold text-black font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', padding: '1rem 2.5rem', lineHeight: 1, whiteSpace: 'nowrap' }}
              >
                ¡Hay una solución!
              </button>
            </div>
          </div>

          <div className="hidden md:block shrink-0 w-[42%] relative overflow-hidden rounded-r-3xl">
            <img
              src={problem}
              alt="Consulta dental"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: '30% center' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Problem
