import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logoNegro from '../../assets/logo_negro.svg'
import logoBlanco from '../../assets/logo_blanco.svg'

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Redes Sociales', href: '#redes' }
]

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -200, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power1.out' }
    )
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Movil
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const barColor = scrolled ? 'bg-black' : 'bg-white'

  return (
    <header
      ref={navRef}
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ' +
        (scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border py-3'
          : 'py-5')
      }
    >
      {/* Menu */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-6">
        <a href="/" className="flex items-center shrink-0">
          <img
            src={scrolled ? logoNegro : logoBlanco}
            alt="Smile Studio Experts"
            className="h-16 md:h-20 w-auto object-contain transition-all duration-500"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </a>

        <nav className="hidden md:flex items-center gap-7 ml-auto">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`text-black/90 text-sm font-medium  transition-colors duration-200 relative group
                ${scrolled ? 'text-black/90 hover:text-green-mid' : 'text-white/90'}`}
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-flex ml-4 px-5 py-2.5 rounded-full bg-green text-white text-xs font-semibold tracking-widest uppercase hover:bg-green-mid transition-colors duration-300"
        >
          Agendar cita
        </a>

        <button
          type="button"
          className="md:hidden ml-auto flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-md"
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <span
            className={
              barColor +
              ' block w-6 h-0.5 rounded transition-all duration-300' +
              (open ? ' rotate-45 translate-y-2' : '')
            }
          />
          <span
            className={
              barColor +
              ' block w-6 h-0.5 rounded transition-all duration-300' +
              (open ? ' opacity-0 scale-x-0' : '')
            }
          />
          <span
            className={
              barColor +
              ' block w-6 h-0.5 rounded transition-all duration-300' +
              (open ? ' -rotate-45 -translate-y-2' : '')
            }
          />
        </button>
      </div>

      {/* Menu movil */}
      <div
        className={
          'md:hidden overflow-hidden transition-all duration-500 bg-white ' +
          (open ? 'max-h-80 border-t border-border' : 'max-h-0')
        }
      >
        <nav className="flex flex-col px-6 py-3">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-border last:border-0 text-black font-medium hover:text-green transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-4 mb-2 text-center py-3 rounded-full bg-green text-white text-xs font-semibold tracking-widest uppercase"
          >
            Agendar cita
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
