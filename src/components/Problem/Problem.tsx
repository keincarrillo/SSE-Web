import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const questionRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.6 })
        .fromTo(
          questionRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
        )
        .fromTo(
          bodyRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          arrowRef.current,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.1'
        )

      const orbs = sectionRef.current!.querySelectorAll<HTMLElement>('.amb-orb')
      orbs.forEach((orb, i) => {
        const xAmp = [60, -50, 35, -40][i] ?? 40
        const yAmp = [-40, 50, -30, 45][i] ?? 30
        const xDur = [10, 13, 8, 11][i] ?? 10
        const yDur = [7, 9, 12, 8][i] ?? 8
        gsap.to(orb, {
          x: xAmp,
          duration: xDur,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.8
        })
        gsap.to(orb, {
          y: yAmp,
          duration: yDur,
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
          { opacity: 1, scale: 1, duration: 0.6, delay: 1 + i * 0.2 }
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
            scale: 2.2,
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

      const bg = sectionRef.current!.querySelector<HTMLElement>('.amb-bg')
      if (bg) {
        gsap.to(bg, {
          opacity: 0.7,
          duration: 5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToHero = () => {
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo('#inicio', { offset: 0, duration: 1.8 })
    } else {
      document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative bg-green overflow-hidden flex flex-col items-center justify-center px-6 pt-36 pb-6 md:pt-40 md:pb-8"
    >
      <div className="amb-bg absolute inset-0 bg-linear-to-b from-green-dark/60 via-green-dark/20 to-transparent" />

      {/* Orbes */}
      <div
        className="amb-orb absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,170,101,0.22) 0%, rgba(201,170,101,0.06) 45%, transparent 70%)'
        }}
      />
      <div
        className="amb-orb absolute bottom-5 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,170,101,0.18) 0%, rgba(201,170,101,0.05) 45%, transparent 70%)'
        }}
      />
      <div
        className="amb-orb absolute top-1/6 right-[15%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,170,101,0.28) 0%, transparent 65%)'
        }}
      />
      <div
        className="amb-orb absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,170,101,0.24) 0%, transparent 65%)'
        }}
      />

      {/* Líneas diagonales */}
      <div
        className="amb-line absolute pointer-events-none w-full"
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(201,170,101,0.18) 50%, transparent 70%)',
          height: '2px',
          top: '28%'
        }}
      />
      <div
        className="amb-line absolute pointer-events-none w-full"
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(201,170,101,0.14) 50%, transparent 70%)',
          height: '1px',
          top: '65%'
        }}
      />
      <div
        className="amb-line absolute pointer-events-none w-full"
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)',
          height: '1px',
          top: '45%'
        }}
      />

      {/* Partículas — diamantes */}
      <div
        className="amb-particle absolute top-[22%] left-[8%] pointer-events-none"
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
        className="amb-particle absolute top-[70%] left-[12%] pointer-events-none"
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
        className="amb-particle absolute top-[18%] right-[10%] pointer-events-none"
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
        className="amb-particle absolute top-[75%] right-[8%] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          background: '#c9aa65',
          opacity: 0.55,
          transform: 'rotate(45deg)',
          borderRadius: 1
        }}
      />
      {/* Partículas — círculos */}
      <div
        className="amb-particle absolute top-[42%] left-[5%] w-3 h-3 rounded-full pointer-events-none"
        style={{ background: '#c9aa65', opacity: 0.45 }}
      />
      <div
        className="amb-particle absolute top-[55%] right-[6%] w-2.5 h-2.5 rounded-full pointer-events-none"
        style={{ background: '#dcc48a', opacity: 0.4 }}
      />
      <div
        className="amb-particle absolute top-[32%] left-[18%] w-2 h-2 rounded-full pointer-events-none"
        style={{ background: '#c9aa65', opacity: 0.5 }}
      />
      <div
        className="amb-particle absolute top-[80%] right-[20%] w-2 h-2 rounded-full pointer-events-none"
        style={{ background: '#c9aa65', opacity: 0.45 }}
      />

      {/* Ripple rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
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

      {/* Glints / destellos */}
      <div
        className="amb-glint absolute top-[15%] left-[22%] pointer-events-none"
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
        className="amb-glint absolute top-[60%] right-[18%] pointer-events-none"
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
        className="amb-glint absolute top-[80%] left-[30%] pointer-events-none"
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

      {/* Contenido */}
      <div className="relative z-10 max-w-3xl w-full text-center">
        <h2
          ref={questionRef}
          className="display-title text-white mb-6 max-w-3xl"
        >
          ¿Hace cuánto no vas
          <span className="text-gold"> al dentista?</span>
        </h2>

        <div ref={bodyRef} className="max-w-3xl mx-auto mb-10">
          <p className="text-white/70 text-base leading-loose text-justify md:text-center md:text-lg">
            El miedo y las malas experiencias hacen que muchas personas lo
            eviten por mucho tiempo.
            <br />
            Pero eso no tiene por qué seguir así.
          </p>
        </div>

        <div ref={arrowRef} className="flex justify-center">
          <button onClick={scrollToHero}>
            <span className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gold text-black text-md font-semibold tracking-wide hover:bg-gold-light transition-colors duration-300">
              Hay una solución →
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Problem
