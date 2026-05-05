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

const IconInstagram = ({ size = 40, color = '#1a3d1a' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const IconFacebook = ({ size = 40, color = '#1a3d1a' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const PhonesCarousel = ({ inView }: { inView: boolean }) => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const phones = [
    {
      id: 1,
      name: 'Facebook',
      image: facebook,
      buttonText: 'Facebook',
      buttonLink: 'https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr'
    },
    {
      id: 2,
      name: 'Instagram',
      image: instagram,
      buttonText: 'Instagram',
      buttonLink:
        'https://www.instagram.com/smilestudioexperts?igsh=Y241YjJqcTJrNm15&utm_source=qr'
    }
  ]

  const total = phones.length
  const goTo = (n: number) => setCurrent(((n % total) + total) % total)
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => next(), 3000)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [current])

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
  }

  return (
    <div className={`md:hidden ${inView ? 'fade-up' : 'hidden-init'}`}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {phones.map(phone => (
            <div key={phone.id} className="min-w-full px-1">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-auto mx-auto"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                  maxWidth: '380px'
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

      <div className="flex justify-center gap-2 mt-6">
        {phones.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a ${phones[i].name}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#C9A755]' : 'w-2 bg-gray-300'}`}
          />
        ))}
      </div>

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

const DesktopView = () => (
  <div className="hidden md:flex flex-row items-start justify-center gap-6 md:gap-4">
    {/* FACEBOOK */}
    <div className="flex-1">
      <div className="flex justify-center mb-4">
        <IconFacebook size={70} color="#1a3d1a" />
      </div>
      <img
        src={facebook}
        alt="Facebook"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
      />
      <div className="flex justify-center mt-6">
        <a
          href="https://www.facebook.com/share/17wxn6hzXU/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Facebook
        </a>
      </div>
    </div>

    {/* CARD DORADA */}
    <div className="w-1/3 shrink-0">
      <div
        style={{
          width: '100%',
          aspectRatio: '12/16',
          position: 'relative',
          maxWidth: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#C9A755',
            borderRadius: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            boxSizing: 'border-box',
            gap: '1rem',
            position: 'relative'
          }}
        >
          <div className="text-center flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green/40 bg-green/10">
              <span className="text-green text-md font-semibold tracking-[0.2em] uppercase">
                Redes sociales
              </span>
            </div>
            <div
              className="text-white display-title text-center"
              style={{ animationDelay: '0.1s' }}
            >
              <h2 className="text-green">
                <span className="text-white">INSPÍRATE EN NUESTRA</span>{' '}
                COMUNIDAD
              </h2>
            </div>
            <p
              style={{
                color: 'white',
                fontSize: 'clamp(10px, 1.1vw, 15px)',
                fontWeight: 500,
                textAlign: 'center',
                letterSpacing: '0.03em',
                lineHeight: 1.5,
                margin: 0
              }}
            >
              Conéctate con Smile Studio Experts. <br />
              Todo sobre nuestros servicios, tips de expertos y resultados
              increíbles a un solo clic.
            </p>
          </div>
        </div>

        {/* Bocas: solo visibles en xl (≥1280px) para arriba */}
        <img
          src={mouth1}
          alt=""
          className="hidden xl:block"
          style={{
            position: 'absolute',
            width: '38%',
            top: '-12%',
            left: '-14%'
          }}
        />
        <img
          src={mouth2}
          alt=""
          className="hidden xl:block"
          style={{
            position: 'absolute',
            width: '38%',
            bottom: '-14%',
            right: '-14%'
          }}
        />
      </div>
    </div>

    {/* INSTAGRAM */}
    <div className="flex-1">
      <div className="flex justify-center mb-4">
        <IconInstagram size={70} color="#1a3d1a" />
      </div>
      <img
        src={instagram}
        alt="Instagram"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
      />
      <div className="flex justify-center mt-6">
        <a
          href="https://www.instagram.com/smilestudioexperts?igsh=Y241YjJqcTJrNm15&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Instagram
        </a>
      </div>
    </div>
  </div>
)

const MobileView = ({ inView }: { inView: boolean }) => (
  <div className="md:hidden">
    <PhonesCarousel inView={inView} />

    <div
      className={`mt-12 px-2 ${inView ? 'fade-up' : 'hidden-init'}`}
      style={{ animationDelay: '0.2s' }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '11/16',
          position: 'relative',
          maxWidth: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#C9A755',
            borderRadius: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            boxSizing: 'border-box',
            gap: '1.2rem',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.1)'
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              Redes sociales
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(22px, 6vw, 34px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              textAlign: 'center',
              lineHeight: 1.1,
              margin: 0
            }}
          >
            <span style={{ color: '#1a3d1a' }}>INSPÍRATE EN NUESTRA</span>{' '}
            <span style={{ color: 'white' }}>COMUNIDAD</span>
          </h2>

          <p
            style={{
              color: 'white',
              fontSize: 'clamp(11px, 3.5vw, 15px)',
              fontWeight: 500,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              lineHeight: 1.5,
              margin: 0
            }}
          >
            Conéctate con Smile Studio Experts. Todo sobre nuestros servicios,
            tips de expertos y resultados increíbles a un solo clic.
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default function Social() {
  const { ref, v } = useInView()

  return (
    <section
      ref={ref}
      className="py-20 mb-10 bg-white overflow-hidden"
      id="redes"
    >
      <div className="max-w-8xl mx-auto px-6">
        <MobileView inView={v} />
        <DesktopView />
      </div>
    </section>
  )
}
