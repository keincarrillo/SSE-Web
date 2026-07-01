import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import tooth from '../../assets/tooth.webp'
import MobileCarousel, { LEFT, FEATURED, RIGHT } from './MobileCarousel'
import { ServiceCardLeft, ServiceCardRight, FeaturedCard } from './cards'

const Services = () => {
  const ref = useScrollReveal({ stagger: 0.08 })
  const cardRef = useRef<HTMLDivElement>(null)
  const toothRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const updateToothPosition = () => {
      if (!cardRef.current || !toothRef.current || !ref.current) return
      const cardRect = cardRef.current.getBoundingClientRect()
      const sectionRect = ref.current.getBoundingClientRect()
      const centerX = cardRect.left - sectionRect.left + cardRect.width / 2
      const bottom = cardRect.bottom - sectionRect.top
      toothRef.current.style.left = `${centerX}px`
      toothRef.current.style.top = `${bottom - 110}px`
      toothRef.current.style.transform = 'translateX(-50%)'
    }
    updateToothPosition()
    window.addEventListener('resize', updateToothPosition)
    window.addEventListener('scroll', updateToothPosition)
    return () => {
      window.removeEventListener('resize', updateToothPosition)
      window.removeEventListener('scroll', updateToothPosition)
    }
  }, [ref])

  return (
    <section ref={ref} id="servicios" className="bg-white py-10 md:py-16 lg:py-24 relative overflow-x-hidden">
      <div ref={toothRef} className="tooth-float hidden lg:block pointer-events-none z-20"
        style={{ position: 'absolute', width: '300px', height: '300px', top: 0, left: 0 }}>
        <img src={tooth} alt="Diente" className="object-contain drop-shadow-2xl w-full h-full" />
      </div>

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, var(--color-gold) 0%, transparent 60%), radial-gradient(circle at 70% 50%, var(--color-gold) 0%, transparent 60%)', zIndex: 1 }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-12 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-6">
            <span data-gsap="fade-up" className="text-gold text-md font-semibold tracking-[0.2em] uppercase">Lo que ofrecemos</span>
          </div>
          <h2 data-gsap="fade-up" className="display-title text-green" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            Nuestros <span className="text-gold">Servicios</span>
          </h2>
          <p data-gsap="fade-up" className="mt-4 text-green/60 text-md leading-[1.7] max-w-4xl mx-auto">
            Cada sonrisa es única, por eso ofrecemos tratamientos personalizados que combinan estética y funcionalidad para lograr resultados naturales que se adapten a ti.
          </p>
        </div>

        <MobileCarousel />

        <div className="hidden lg:grid items-start mt-22"
          style={{ gridTemplateColumns: '1fr 360px 1fr', gap: '0 28px', overflow: 'visible' }}>
          <div className="flex flex-col gap-10 items-stretch" style={{ overflow: 'visible' }}>
            {LEFT.map(s => <ServiceCardLeft key={s.title} {...s} gsap="fade-right" />)}
          </div>
          <div className="flex flex-col items-center" style={{ overflow: 'visible' }}>
            <FeaturedCard {...FEATURED} cardRef={cardRef} />
            <div className="h-60" />
            <p className="text-green/70 text-md tracking-[0.25em] uppercase whitespace-nowrap">resultados naturales que se adaptan a ti</p>
          </div>
          <div className="flex flex-col gap-10 items-stretch" style={{ overflow: 'visible' }}>
            {RIGHT.map(s => <ServiceCardRight key={s.title} {...s} gsap="fade-left" />)}
          </div>
        </div>

        <div className="flex justify-center mt-10 md:mt-10">
          <button
            onClick={() => navigate('/servicios')}
            className="btn-shimmer group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green text-white font-semibold text-md tracking-[0.05em] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(var(--color-green-rgb),0.35)]"
          >
            <span className="relative z-10">Ver todos los servicios</span>
            <span className="relative z-10 w-7 h-7 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3" />
            </span>
            <span className="shimmer-inner absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services
