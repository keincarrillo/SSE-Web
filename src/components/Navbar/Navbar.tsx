import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import logoNegro from '../../assets/brand/logo_negro.svg'
import logoBlanco from '../../assets/brand/logo_blanco.svg'
import { LINKS } from './data'

const Navbar = ({ darkHero = true }: { darkHero?: boolean }) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [openState, setOpenState] = useState({ path: '', val: false })
  const navigate = useNavigate()
  const location = useLocation()

  const open = openState.path === location.pathname ? openState.val : false
  const setOpen = (val: boolean) => setOpenState({ path: location.pathname, val })

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setOpen(false)

    const scrollToSection = () => {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    if (location.pathname === '/') {
      scrollToSection()
    } else {
      navigate('/')
      setTimeout(scrollToSection, 400)
    }
  }

  useEffect(() => {
    gsap.killTweensOf(innerRef.current)
    window.scrollTo({ top: 0 })
    gsap.fromTo(innerRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out' })
  }, [location.pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const barColor = scrolled ? 'bg-black' : darkHero ? 'bg-white' : 'bg-green'
  const linkClass = scrolled
    ? 'text-black/90 hover:text-green-mid'
    : darkHero
      ? 'text-white/90 hover:text-white'
      : 'text-green/90 hover:text-green'
  const btnClass = scrolled
    ? 'bg-green text-white hover:bg-green-mid'
    : darkHero
      ? 'bg-gold text-black hover:bg-gold-light'
      : 'bg-green text-white hover:bg-green-mid'

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={'absolute inset-0 transition-all duration-500 ' + (scrolled ? 'bg-white/95 backdrop-blur-md border-b border-border' : 'bg-transparent')} aria-hidden="true" />

      <div ref={innerRef} className={'relative transition-all duration-500 ' + (scrolled ? 'py-3' : 'py-5')}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-6">
          <a href="/" className="flex items-center shrink-0">
            <img src={scrolled ? logoNegro : darkHero ? logoBlanco : logoNegro}
              alt="Smile Studio Experts" className="h-16 md:h-16 w-auto object-contain transition-all duration-500"
              loading="eager" fetchPriority="high" decoding="async" />
          </a>

          <nav className="hidden md:flex items-center gap-7 ml-auto">
            {LINKS.map(l => (
              <a key={l.href} href={`#${l.href}`} onClick={e => handleNavClick(e, l.href)}
                className={`text-lg font-medium transition-colors duration-200 relative group ${linkClass}`}>
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a href="#contacto" onClick={e => handleNavClick(e, 'contacto')}
            className={'hidden md:inline-flex ml-4 px-5 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase transition-colors duration-300 ' + btnClass}>
            Agendar cita
          </a>

          <button type="button" className="md:hidden ml-auto flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-md"
            onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menu' : 'Abrir menu'} aria-expanded={open}>
            <span className={barColor + ' block w-6 h-0.5 rounded transition-all duration-300' + (open ? ' rotate-45 translate-y-2' : '')} />
            <span className={barColor + ' block w-6 h-0.5 rounded transition-all duration-300' + (open ? ' opacity-0 scale-x-0' : '')} />
            <span className={barColor + ' block w-6 h-0.5 rounded transition-all duration-300' + (open ? ' -rotate-45 -translate-y-2' : '')} />
          </button>
        </div>

        <div className={'md:hidden overflow-hidden transition-all duration-500 bg-white ' + (open ? 'max-h-80 border-t border-border' : 'max-h-0')}>
          <nav className="flex flex-col px-6 py-3">
            {LINKS.map(l => (
              <a key={l.href} href={`#${l.href}`} onClick={e => handleNavClick(e, l.href)}
                className="py-3 border-b border-border last:border-0 text-black font-medium hover:text-green transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contacto" onClick={e => handleNavClick(e, 'contacto')}
              className="mt-4 mb-2 text-center py-3 rounded-full bg-green text-white text-xs font-semibold tracking-widest uppercase">
              Agendar cita
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
