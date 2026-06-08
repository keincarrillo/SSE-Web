import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer/Footer'

import blanqueamiento1 from '../assets/services/blanqueamiento1.webp'
import blanqueamiento2 from '../assets/services/blanqueamiento2.webp'
import blanqueamiento3 from '../assets/services/blanqueamiento3.webp'
import brackets from '../assets/services/brackets.webp'
import carillas1 from '../assets/services/carillas1.webp'
import carillas2 from '../assets/services/carillas2.webp'
import carillas3 from '../assets/services/carillas3.webp'
import limpieza from '../assets/services/limpieza.webp'
import protesis1 from '../assets/services/protesis1.webp'
import protesis2 from '../assets/services/protesis2.webp'
import protesis3 from '../assets/services/protesis3.webp'

gsap.registerPlugin(ScrollTrigger)

const usePageLenis = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncToNative: false
    } as any)

    ;(window as any).__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add(time => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      ;(window as any).__lenis = null
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
}

type BgVariant = 'white' | 'green'

const SERVICES: {
  id: string
  title: string
  subtitle: string
  description: string
  images: string[]
  bg: BgVariant
  highlights: { label: string; detail: string }[]
}[] = [
  {
    id: 'protesis',
    title: 'Prótesis',
    subtitle: 'Restaura tu sonrisa con naturalidad',
    description:
      'Tratamientos que permiten reemplazar o restaurar piezas dentales perdidas o dañadas, devolviendo función, estética y seguridad al sonreír. Utilizamos materiales de alta calidad que imitan perfectamente la apariencia y resistencia de tus dientes naturales.',
    images: [protesis1, protesis2, protesis3],
    bg: 'white',
    highlights: [
      {
        label: 'Materiales premium',
        detail:
          'Porcelana y zirconio de última generación para resultados que duran años.'
      },
      {
        label: 'Adaptación personalizada',
        detail:
          'Cada prótesis se diseña a medida según la anatomía y tono dental del paciente.'
      },
      {
        label: 'Función y estética',
        detail:
          'Recupera la capacidad de morder, masticar y hablar con total confianza.'
      }
    ]
  },
  {
    id: 'ortodoncia',
    title: 'Ortodoncia',
    subtitle: 'Alinea tu mordida, transforma tu vida',
    description:
      'Procedimientos enfocados en corregir la posición de los dientes y la mordida, mejorando tanto la estética como la funcionalidad de la sonrisa. Contamos con opciones de brackets metálicos, cerámicos y alineadores transparentes.',
    images: [brackets],
    bg: 'green',
    highlights: [
      {
        label: 'Brackets y alineadores',
        detail:
          'Opciones para cada estilo de vida: metálicos, cerámicos o invisibles.'
      },
      {
        label: 'Seguimiento continuo',
        detail:
          'Citas de control periódicas para ajustar el tratamiento según tu evolución.'
      },
      {
        label: 'Resultados duraderos',
        detail:
          'Retenedores y plan post-tratamiento para mantener tu nueva sonrisa.'
      }
    ]
  },
  {
    id: 'diseno-sonrisa',
    title: 'Diseño de sonrisa',
    subtitle: 'Tu sonrisa ideal, diseñada para ti',
    description:
      'El diseño de sonrisa es un proceso estético y personalizado en el que analizamos tu rostro, tus dientes y tu personalidad para crear una sonrisa armónica y natural que realmente te represente.',
    images: [carillas1, carillas2, carillas3],
    bg: 'white',
    highlights: [
      {
        label: 'Diagnóstico digital',
        detail:
          'Simulación previa en pantalla para que veas tu resultado antes de comenzar.'
      },
      {
        label: 'Tratamiento integral',
        detail:
          'Combinamos carillas, contorneado y blanqueamiento según lo que necesites.'
      },
      {
        label: 'Armonía facial',
        detail:
          'Diseñamos tu sonrisa considerando tu rostro, labios y personalidad.'
      }
    ]
  },
  {
    id: 'blanqueamiento',
    title: 'Blanqueamiento dental',
    subtitle: 'Brillo seguro y resultados visibles',
    description:
      'Tratamiento que aclara el tono de los dientes y devuelve luminosidad a la sonrisa de forma segura y controlada. Utilizamos agentes blanqueadores de uso profesional que garantizan resultados notables en pocas sesiones.',
    images: [blanqueamiento1, blanqueamiento2, blanqueamiento3],
    bg: 'green',
    highlights: [
      {
        label: 'Hasta 8 tonos más claro',
        detail:
          'Resultados visibles desde la primera sesión con mínima sensibilidad.'
      },
      {
        label: 'Procedimiento supervisado',
        detail:
          'Siempre bajo control profesional para proteger tu esmalte y encías.'
      },
      {
        label: 'Mantenimiento sencillo',
        detail:
          'Te orientamos con hábitos y cuidados para prolongar el efecto del blanqueamiento.'
      }
    ]
  },
  {
    id: 'valoracion-limpieza',
    title: 'Valoración y limpieza dental',
    subtitle: 'La base de una salud bucal perfecta',
    description:
      'Evaluación completa de tu salud bucal para detectar problemas a tiempo y recomendar el tratamiento ideal, seguida de una limpieza profesional que elimina placa, sarro y manchas para mantener dientes más sanos y encías fuertes.',
    images: [limpieza],
    bg: 'white',
    highlights: [
      {
        label: 'Revisión completa',
        detail:
          'Exploración de dientes, encías, oclusión y tejidos blandos con registro fotográfico.'
      },
      {
        label: 'Limpieza profesional',
        detail:
          'Eliminamos placa, sarro y manchas de forma segura para mantener tus dientes y encías sanos.'
      },
      {
        label: 'Plan preventivo',
        detail:
          'Salimos de la consulta con un plan claro para mantener tu salud bucal a largo plazo.'
      }
    ]
  }
]

const useServiceReveal = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      const trigger = {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%'
        }
      }

      const fadeUps = ref.current?.querySelectorAll('[data-gsap="fade-up"]')
      const fadeLefts = ref.current?.querySelectorAll('[data-gsap="fade-left"]')
      const fadeRights = ref.current?.querySelectorAll(
        '[data-gsap="fade-right"]'
      )

      if (fadeUps?.length)
        gsap.fromTo(
          fadeUps,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            ...trigger
          }
        )

      if (fadeLefts?.length)
        gsap.fromTo(
          fadeLefts,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            ...trigger
          }
        )

      if (fadeRights?.length)
        gsap.fromTo(
          fadeRights,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            ...trigger
          }
        )
    }, ref)

    return () => ctx.revert()
  }, [ref])
}

const Check = ({ dark }: { dark?: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={dark ? 'text-green' : 'text-gold'}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const ServiceVisual = ({
  images,
  title,
  bg
}: {
  images: string[]
  title: string
  bg: BgVariant
}) => {
  const isGreen = bg === 'green'
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasMultiple = images.length > 1

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % images.length)
    }, 4000)
  }

  useEffect(() => {
    if (!hasMultiple) return
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [hasMultiple, images.length])

  const goTo = (i: number) => {
    setCurrent(i)
    startTimer()
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border h-[480px] md:h-[520px] ${
        isGreen ? 'border-white/10' : 'border-green/10'
      }`}
      onMouseEnter={() => {
        if (!hasMultiple) return
        if (timerRef.current) clearInterval(timerRef.current)
      }}
      onMouseLeave={() => {
        if (!hasMultiple) return
        startTimer()
      }}
    >
      <div
        style={{
          display: 'flex',
          width: `${images.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(current * 100) / images.length}%)`,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              width: `${100 / images.length}%`,
              flexShrink: 0,
              height: '100%'
            }}
          >
            <img
              src={img}
              alt={`${title} ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '64px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
            pointerEvents: 'none'
          }}
        />
      )}

      {hasMultiple && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            zIndex: 10
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Imagen ${i + 1}`}
              style={{
                width: i === current ? '20px' : '7px',
                height: '7px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                backgroundColor:
                  i === current ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                transition: 'width 0.3s ease, background-color 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const ServiceSection = ({
  service,
  index
}: {
  service: (typeof SERVICES)[0]
  index: number
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  useServiceReveal(sectionRef as React.RefObject<HTMLElement>)

  const isGreen = service.bg === 'green'
  const isEven = index % 2 === 0

  return (
    <section
      ref={sectionRef}
      id={service.id}
      className={`relative py-20 md:py-28 border-b ${
        isGreen ? 'bg-green border-white/[0.07]' : 'bg-white border-green/10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <div
          className={`flex flex-col gap-10 lg:gap-20 items-center ${
            isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          <div
            className="w-full lg:w-5/12 shrink-0"
            data-gsap={isEven ? 'fade-right' : 'fade-left'}
          >
            <ServiceVisual
              images={service.images}
              title={service.title}
              bg={service.bg}
            />
          </div>

          <div className="w-full lg:w-7/12 flex flex-col">
            <span
              className={`text-[5rem] font-bold leading-none select-none mb-1 ${
                isGreen ? 'text-gold/30' : 'text-green/30'
              }`}
              data-gsap="fade-up"
            >
              0{index + 1}
            </span>

            <div
              data-gsap="fade-up"
              className={`inline-flex self-start items-center gap-2 px-3 py-1 rounded-full border mb-3 ${
                isGreen
                  ? 'border-gold/30 bg-gold/10'
                  : 'border-gold/35 bg-gold/10'
              }`}
            >
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold">
                {service.subtitle}
              </span>
            </div>

            <h2
              data-gsap="fade-up"
              className={`display-name text-3xl md:text-4xl mb-4 leading-tight ${
                isGreen ? 'text-white' : 'text-green'
              }`}
            >
              {service.title}
            </h2>

            <p
              data-gsap="fade-up"
              className={` leading-[1.7] mb-8 ${
                isGreen ? 'text-white/55' : 'text-green/60'
              }`}
            >
              {service.description}
            </p>

            <div className="flex flex-col gap-4">
              {service.highlights.map((h, i) => (
                <div
                  key={i}
                  data-gsap="fade-up"
                  className="flex items-start gap-4"
                >
                  <div
                    className={`mt-1 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${
                      isGreen
                        ? 'bg-gold/20 border-gold/50'
                        : 'bg-gold/15 border-gold/40'
                    }`}
                  >
                    <Check dark={isGreen} />
                  </div>
                  <div>
                    <p
                      className={`font-semibold text-md mb-0.5 ${
                        isGreen ? 'text-white' : 'text-green'
                      }`}
                    >
                      {h.label}
                    </p>
                    <p
                      className={`text-md leading-[1.6] ${
                        isGreen ? 'text-white/50' : 'text-green/55'
                      }`}
                    >
                      {h.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PageHeader = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll('[data-gsap="fade-up"]')
      if (els?.length)
        gsap.fromTo(
          els,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.15
          }
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="relative pt-28 pb-20 md:pt-40 md:pb-28 text-center px-4 bg-green overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 55%), radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 55%)'
        }}
      />

      <div
        data-gsap="fade-up"
        className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/50 bg-gold/15 mb-6"
      >
        <span className="text-gold text-md font-semibold tracking-[0.2em] uppercase">
          Lo que ofrecemos
        </span>
      </div>

      <h1
        data-gsap="fade-up"
        className="relative display-lg text-white"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
      >
        Nuestros <span className="text-gold">Servicios</span>
      </h1>

      <p
        data-gsap="fade-up"
        className="relative mt-4 text-white/55 text-md lg:text-lg leading-[1.7] max-w-2xl mx-auto"
      >
        Conoce en detalle cada uno de los tratamientos que ofrecemos. Cada
        servicio está diseñado para cuidar tu salud bucal y transformar tu
        sonrisa.
      </p>

      <div
        data-gsap="fade-up"
        className="relative flex flex-wrap justify-center gap-2 mt-8"
      >
        {SERVICES.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-4 py-1.5 rounded-full border border-white/20 text-white/60 text-sm hover:bg-white hover:text-green hover:border-white transition-all duration-200"
          >
            {s.title}
          </a>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12"
        >
          <path
            d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
  )
}

const CtaSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll('[data-gsap="fade-up"]')
      if (els?.length)
        gsap.fromTo(
          els,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%' }
          }
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="relative py-20 text-center px-4 bg-green border-t border-white/10"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #C9A84C 0%, transparent 55%), radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 55%)'
        }}
      />

      <h2
        data-gsap="fade-up"
        className="relative display-name text-2xl md:text-3xl text-white mb-3"
      >
        ¿Listo para transformar tu sonrisa?
      </h2>
      <p
        data-gsap="fade-up"
        className="relative text-white/55 text-md mb-8 max-w-md mx-auto"
      >
        Agenda una valoración sin costo y descubre qué tratamiento es ideal para
        ti.
      </p>
      <button
        data-gsap="fade-up"
        onClick={() => {
          navigate('/')
          setTimeout(
            () =>
              document
                .getElementById('contacto')
                ?.scrollIntoView({ behavior: 'smooth' }),
            400
          )
        }}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-green font-semibold text-md tracking-[0.05em] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      >
        <span className="relative z-10">Agendar hoy</span>
        <span className="relative z-10 w-7 h-7 rounded-full bg-green/10 border border-green/30 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-green/5 to-transparent" />
      </button>
    </div>
  )
}

const ServicesPage = () => {
  usePageLenis()
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timeout = setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
      return () => clearTimeout(timeout)
    } else {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      const lenis = (window as any).__lenis
      if (lenis) lenis.scrollTo(0, { immediate: true })
    }
  }, [hash])

  return (
    <div className="bg-white min-h-screen">
      <PageHeader />
      <main>
        {SERVICES.map((s, i) => (
          <ServiceSection key={s.id} service={s} index={i} />
        ))}
      </main>
      <CtaSection />
      <Footer />
    </div>
  )
}

export default ServicesPage
