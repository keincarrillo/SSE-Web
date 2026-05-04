import { useRef, useEffect, useState } from 'react'
import facebook from '../../assets/figures/facebook.webp'
import instagram from '../../assets/figures/instagram.webp'
import mouth1 from '../../assets/figures/mouth1.webp'
import mouth2 from '../../assets/figures/mouth2.webp'

const ANIM_STYLES = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.7s ease forwards; }
.hidden-init { opacity: 0; }

a.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  background: #1a3d1a;
  padding: 0 26px;
  height: 50px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.25s;
}
a.btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  a.btn {
    padding: 0 20px;
    height: 44px;
    font-size: 14px;
  }
}
`

function inject() {
  if (document.getElementById('anim')) return
  const s = document.createElement('style')
  s.id = 'anim'
  s.innerHTML = ANIM_STYLES
  document.head.appendChild(s)
}

function useInView() {
  const ref = useRef<HTMLElement | null>(null)
  const [v, setV] = useState(false)

  useEffect(() => {
    inject()
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setV(true)
        obs.disconnect()
      }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return { ref, v }
}

// Iconos del carrusel
const ChevronLeft = () => (
  <svg
    width="20"
    height="20"
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
    width="20"
    height="20"
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

// Carrusel solo para los teléfonos (Facebook e Instagram)
const PhonesCarousel = ({ inView }: { inView: boolean }) => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>(undefined) // ✅ Corregido: añadido undefined como argumento

  const phones = [
    {
      id: 1,
      name: 'Facebook',
      image: facebook,
      buttonText: 'Facebook',
      buttonLink: '#'
    },
    {
      id: 2,
      name: 'Instagram',
      image: instagram,
      buttonText: 'Instagram',
      buttonLink: '#'
    }
  ]

  const total = phones.length

  const goTo = (n: number) => {
    setCurrent(((n % total) + total) % total)
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  // Auto-play: cambiar cada 3 segundos
  useEffect(() => {
    // Limpiar intervalo anterior si existe
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    // Crear nuevo intervalo
    autoPlayRef.current = setInterval(() => {
      next()
    }, 3000)

    // Cleanup al desmontar
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [current])

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        next()
      } else {
        prev()
      }
    }
  }

  return (
    <div className={`md:hidden ${inView ? 'fade-up' : 'hidden-init'}`}>
      {/* Carrusel de teléfonos */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {phones.map(phone => (
            <div key={phone.id} className="min-w-full px-4">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-auto"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
                }}
              />
              <div className="flex justify-center mt-6">
                <a href={phone.buttonLink} className="btn">
                  {phone.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores (puntos) */}
      <div className="flex justify-center gap-2 mt-6">
        {phones.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a ${phones[i].name}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-[#C9A755]' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <div className="flex items-center justify-between mt-6 max-w-50 mx-auto">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft />
        </button>
        <span className="text-gray-500 text-sm font-medium">
          {current + 1} / {total}
        </span>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

// Versión desktop (3 elementos en fila - SIN carrusel)
const DesktopView = () => (
  <div className="hidden md:flex flex-row items-center justify-center gap-6 md:gap-4">
    {/* FACEBOOK */}
    <div className="flex-1">
      <img
        src={facebook}
        alt="Facebook"
        className="w-full h-auto"
        style={{
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
        }}
      />
      <div className="flex justify-center mt-6">
        <a href="#" className="btn">
          Facebook
        </a>
      </div>
    </div>

    {/* CARD DORADA */}
    <div className="flex-1">
      <div
        style={{
          width: '100%',
          aspectRatio: '13/16',
          position: 'relative',
          maxWidth: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#C9A755',
            borderRadius: 40
          }}
        />
        <img
          src={mouth1}
          alt=""
          style={{
            position: 'absolute',
            width: 'clamp(150px, 30%, 200px)',
            top: -80,
            left: -30
          }}
        />
        <img
          src={mouth2}
          alt=""
          style={{
            position: 'absolute',
            width: 'clamp(150px, 30%, 200px)',
            bottom: -80,
            right: -30
          }}
        />
      </div>
    </div>

    {/* INSTAGRAM */}
    <div className="flex-1">
      <img
        src={instagram}
        alt="Instagram"
        className="w-full h-auto"
        style={{
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
        }}
      />
      <div className="flex justify-center mt-6">
        <a href="#" className="btn">
          Instagram
        </a>
      </div>
    </div>
  </div>
)

// Versión móvil: Carrusel de teléfonos + card dorada fija abajo
const MobileView = ({ inView }: { inView: boolean }) => (
  <div className="md:hidden">
    {/* Carrusel de teléfonos */}
    <PhonesCarousel inView={inView} />

    {/* Card dorada fija abajo (sin carrusel) */}
    <div
      className={`mt-12 px-4 ${inView ? 'fade-up' : 'hidden-init'}`}
      style={{ animationDelay: '0.2s' }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '13/16',
          position: 'relative',
          maxWidth: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#C9A755',
            borderRadius: 40
          }}
        />
        <img
          src={mouth1}
          alt=""
          style={{
            position: 'absolute',
            width: 'clamp(80px, 25%, 150px)',
            top: -30,
            left: -30
          }}
        />
        <img
          src={mouth2}
          alt=""
          style={{
            position: 'absolute',
            width: 'clamp(80px, 25%, 150px)',
            bottom: -30,
            right: -30
          }}
        />
      </div>
    </div>
  </div>
)

export default function Social() {
  const { ref, v } = useInView()

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      {/* HEADER */}
      <div className="text-center mb-16 px-6">
        <h2
          className={`${v ? 'fade-up' : 'hidden-init'} text-4xl md:text-5xl font-bold text-green`}
        >
          Síguenos y comparte{' '}
          <span className="text-yellow-600">tu sonrisa</span>
        </h2>

        <p
          className={`${v ? 'fade-up' : 'hidden-init'} mt-4 text-gray-600 max-w-xl mx-auto`}
        >
          Mantente al tanto de nuestros casos de éxito, promociones y consejos
          para cuidar tu sonrisa.
        </p>

        <div className="flex justify-center mt-6">
          <div className="h-0.5 w-24 bg-yellow-600 rounded-full"></div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-8xl mx-auto px-6">
        {/* Versión móvil: carrusel de teléfonos + card fija */}
        <MobileView inView={v} />

        {/* Versión desktop: todo en fila sin carrusel */}
        <DesktopView />
      </div>
    </section>
  )
}
