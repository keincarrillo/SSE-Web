import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const Problem = () => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!visible) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          delay: 0.2,
          ease: 'power3.out'
        }
      )

      gsap
        .timeline({ delay: 0.55 })
        .fromTo(
          questionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo(
          bodyRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          arrowRef.current,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.2'
        )

      const orbs = sectionRef.current!.querySelectorAll<HTMLElement>('.amb-orb')
      orbs.forEach((orb, i) => {
        const xAmp = [60, -50, 35, -40][i] ?? 40
        const yAmp = [-40, 50, -30, 45][i] ?? 30
        gsap.to(orb, {
          x: xAmp,
          duration: [10, 13, 8, 11][i] ?? 10,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.8
        })
        gsap.to(orb, {
          y: yAmp,
          duration: [7, 9, 12, 8][i] ?? 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.4
        })
      })

      const lines =
        sectionRef.current!.querySelectorAll<HTMLElement>('.amb-line')
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { x: '-110%', opacity: 0.55 },
          {
            x: '110%',
            opacity: 0.55,
            duration: 5 + i * 1.5,
            ease: 'none',
            repeat: -1,
            delay: i * 2.5,
            repeatDelay: 3 + i * 1.5
          }
        )
      })

      const particles =
        sectionRef.current!.querySelectorAll<HTMLElement>('.amb-particle')
      particles.forEach((p, i) => {
        gsap.fromTo(
          p,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.8 + i * 0.2 }
        )
        gsap.to(p, {
          y: -(20 + i * 7),
          duration: 2.5 + i * 0.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.5
        })
        gsap.to(p, {
          x: i % 2 === 0 ? 12 : -12,
          duration: 3.5 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.3
        })
        gsap.to(p, {
          opacity: 0.3,
          duration: 1.8 + i * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.7
        })
      })

      const rings =
        sectionRef.current!.querySelectorAll<HTMLElement>('.amb-ring')
      rings.forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { scale: 0.3, opacity: 0.6 },
          {
            scale: 2.4,
            opacity: 0,
            duration: 4,
            ease: 'power1.out',
            repeat: -1,
            delay: i * 1.33
          }
        )
      })

      const glints =
        sectionRef.current!.querySelectorAll<HTMLElement>('.amb-glint')
      glints.forEach((g, i) => {
        gsap.fromTo(
          g,
          { opacity: 0, scale: 0.4, rotation: 0 },
          {
            opacity: 0.7,
            scale: 1,
            rotation: 45,
            duration: 1.2,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: -1,
            repeatDelay: 3 + i * 1.5,
            delay: 2 + i * 2.2
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [visible])

  const handleDismiss = () => {
    gsap.to(cardRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.97,
      duration: 0.35,
      ease: 'power2.in'
    })
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setVisible(false)
        const lenis = (window as any).__lenis
        if (lenis) lenis.scrollTo('#inicio', { offset: 0, duration: 1.8 })
        else
          document
            .getElementById('inicio')
            ?.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        opacity: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      {/* Card */}
      <div
        ref={cardRef}
        className="relative z-10 overflow-hidden rounded-3xl"
        style={{
          opacity: 0,
          background: '#4e5839',
          width: 'min(96vw, 1100px)',
          boxShadow:
            '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,170,101,0.15)'
        }}
      >
        {/* Ambient effects inside the card */}
        <div
          ref={sectionRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 bg-linear-to-b from-green-dark/60 via-green-dark/20 to-transparent" />

          {/* Orbs */}
          <div
            className="amb-orb absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(201,170,101,0.22) 0%, rgba(201,170,101,0.06) 45%, transparent 70%)'
            }}
          />
          <div
            className="amb-orb absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(201,170,101,0.18) 0%, rgba(201,170,101,0.05) 45%, transparent 70%)'
            }}
          />
          <div
            className="amb-orb absolute top-1/4 right-[12%] w-40 h-40 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(201,170,101,0.28) 0%, transparent 65%)'
            }}
          />
          <div
            className="amb-orb absolute bottom-1/3 left-[8%] w-28 h-28 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(201,170,101,0.24) 0%, transparent 65%)'
            }}
          />

          {/* Sweeping lines */}
          <div
            className="amb-line absolute w-full"
            style={{
              background:
                'linear-gradient(105deg, transparent 30%, rgba(201,170,101,0.18) 50%, transparent 70%)',
              height: '2px',
              top: '28%'
            }}
          />
          <div
            className="amb-line absolute w-full"
            style={{
              background:
                'linear-gradient(105deg, transparent 30%, rgba(201,170,101,0.14) 50%, transparent 70%)',
              height: '1px',
              top: '65%'
            }}
          />
          <div
            className="amb-line absolute w-full"
            style={{
              background:
                'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)',
              height: '1px',
              top: '45%'
            }}
          />

          {/* Particles */}
          <div
            className="amb-particle absolute top-[22%] left-[8%]"
            style={{
              width: 10,
              height: 10,
              background: '#c9aa65',
              opacity: 0.7,
              transform: 'rotate(45deg)',
              borderRadius: 2
            }}
          />
          <div
            className="amb-particle absolute top-[70%] left-[10%]"
            style={{
              width: 7,
              height: 7,
              background: '#c9aa65',
              opacity: 0.5,
              transform: 'rotate(45deg)',
              borderRadius: 1
            }}
          />
          <div
            className="amb-particle absolute top-[18%] right-[10%]"
            style={{
              width: 12,
              height: 12,
              background: '#c9aa65',
              opacity: 0.6,
              transform: 'rotate(45deg)',
              borderRadius: 2
            }}
          />
          <div
            className="amb-particle absolute top-[75%] right-[8%]"
            style={{
              width: 8,
              height: 8,
              background: '#c9aa65',
              opacity: 0.55,
              transform: 'rotate(45deg)',
              borderRadius: 1
            }}
          />
          <div
            className="amb-particle absolute top-[42%] left-[5%] w-3 h-3 rounded-full"
            style={{ background: '#c9aa65', opacity: 0.45 }}
          />
          <div
            className="amb-particle absolute top-[55%] right-[6%] w-2.5 h-2.5 rounded-full"
            style={{ background: '#dcc48a', opacity: 0.4 }}
          />
          <div
            className="amb-particle absolute top-[32%] left-[18%] w-2 h-2 rounded-full"
            style={{ background: '#c9aa65', opacity: 0.5 }}
          />
          <div
            className="amb-particle absolute top-[80%] right-[20%] w-2 h-2 rounded-full"
            style={{ background: '#c9aa65', opacity: 0.45 }}
          />

          {/* Ripple rings */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="amb-ring w-32 h-32 rounded-full absolute -translate-x-1/2 -translate-y-1/2"
              style={{ border: '1.5px solid rgba(201,170,101,0.5)' }}
            />
            <div
              className="amb-ring w-32 h-32 rounded-full absolute -translate-x-1/2 -translate-y-1/2"
              style={{ border: '1.5px solid rgba(201,170,101,0.4)' }}
            />
            <div
              className="amb-ring w-32 h-32 rounded-full absolute -translate-x-1/2 -translate-y-1/2"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            />
          </div>

          {/* Glints */}
          <div
            className="amb-glint absolute top-[15%] left-[22%]"
            style={{ opacity: 0 }}
          >
            <div
              style={{
                width: 3,
                height: 24,
                background:
                  'linear-gradient(to bottom, transparent, #c9aa65, transparent)',
                borderRadius: 2
              }}
            />
            <div
              style={{
                width: 24,
                height: 3,
                background:
                  'linear-gradient(to right, transparent, #c9aa65, transparent)',
                borderRadius: 2,
                marginTop: -13,
                marginLeft: -10
              }}
            />
          </div>
          <div
            className="amb-glint absolute top-[60%] right-[18%]"
            style={{ opacity: 0 }}
          >
            <div
              style={{
                width: 2,
                height: 18,
                background:
                  'linear-gradient(to bottom, transparent, #dcc48a, transparent)',
                borderRadius: 2
              }}
            />
            <div
              style={{
                width: 18,
                height: 2,
                background:
                  'linear-gradient(to right, transparent, #dcc48a, transparent)',
                borderRadius: 2,
                marginTop: -10,
                marginLeft: -8
              }}
            />
          </div>
          <div
            className="amb-glint absolute top-[80%] left-[30%]"
            style={{ opacity: 0 }}
          >
            <div
              style={{
                width: 2,
                height: 16,
                background:
                  'linear-gradient(to bottom, transparent, #c9aa65, transparent)',
                borderRadius: 2
              }}
            />
            <div
              style={{
                width: 16,
                height: 2,
                background:
                  'linear-gradient(to right, transparent, #c9aa65, transparent)',
                borderRadius: 2,
                marginTop: -9,
                marginLeft: -7
              }}
            />
          </div>
        </div>

        {/* X close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-200"
          aria-label="Cerrar"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-10 py-14 sm:px-16 sm:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-8">
            <span
              className="text-gold font-semibold tracking-[0.2em] uppercase"
              style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)' }}
            >
              Smile Studio Experts
            </span>
          </div>

          <h2
            ref={questionRef}
            className="text-white mb-8"
            style={{
              opacity: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 4vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              fontWeight: 600
            }}
          >
            <span className="block whitespace-nowrap">
              ¿Hace cuánto no visitas
            </span>
            <span className="text-gold block whitespace-nowrap">
              al dentista?
            </span>
          </h2>

          <div ref={bodyRef} style={{ opacity: 0 }} className="mb-12">
            <p
              className="text-white/70 leading-loose"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)' }}
            >
              <span
                style={{
                  fontSize: 'clamp(1.3rem, 2.8vw, 1.75rem)',
                  whiteSpace: 'nowrap'
                }}
              >
                El miedo y las malas experiencias hacen que muchas personas lo
                eviten por mucho tiempo.
              </span>
              <br />
              <span className="uppercase font-display">
                Pero eso no tiene por qué seguir así.
              </span>
            </p>
          </div>

          <div
            ref={arrowRef}
            style={{ opacity: 0 }}
            className="flex justify-center"
          >
            <button
              onClick={handleDismiss}
              className="inline-flex items-center justify-center rounded-full bg-gold text-black font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300"
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                lineHeight: 1,
                whiteSpace: 'nowrap'
              }}
            >
              ¡Hay una solución! →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Problem
