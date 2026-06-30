import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const ORBS = [
  { style: '-top-32 -left-32', size: 'w-[500px] h-[500px]', bg: 'radial-gradient(circle, rgba(201,170,101,0.22) 0%, rgba(201,170,101,0.06) 45%, transparent 70%)' },
  { style: 'bottom-0 -right-32', size: 'w-[400px] h-[400px]', bg: 'radial-gradient(circle, rgba(201,170,101,0.18) 0%, rgba(201,170,101,0.05) 45%, transparent 70%)' },
  { style: 'top-1/4 right-[12%]', size: 'w-40 h-40', bg: 'radial-gradient(circle, rgba(201,170,101,0.28) 0%, transparent 65%)' },
  { style: 'bottom-1/3 left-[8%]', size: 'w-28 h-28', bg: 'radial-gradient(circle, rgba(201,170,101,0.24) 0%, transparent 65%)' }
]

const LINES = [
  { style: { top: '28%', height: '2px' }, bg: 'linear-gradient(105deg, transparent 30%, rgba(201,170,101,0.18) 50%, transparent 70%)' },
  { style: { top: '65%', height: '1px' }, bg: 'linear-gradient(105deg, transparent 30%, rgba(201,170,101,0.14) 50%, transparent 70%)' },
  { style: { top: '45%', height: '1px' }, bg: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)' }
]

const PARTICLES: ({ style: React.CSSProperties; round?: boolean })[] = [
  { style: { top: '22%', left: '8%', width: 10, height: 10, background: 'var(--color-gold-light)', opacity: 0.7, transform: 'rotate(45deg)', borderRadius: 2 } },
  { style: { top: '70%', left: '10%', width: 7, height: 7, background: 'var(--color-gold-light)', opacity: 0.5, transform: 'rotate(45deg)', borderRadius: 1 } },
  { style: { top: '18%', right: '10%', width: 12, height: 12, background: 'var(--color-gold-light)', opacity: 0.6, transform: 'rotate(45deg)', borderRadius: 2 } },
  { style: { top: '75%', right: '8%', width: 8, height: 8, background: 'var(--color-gold-light)', opacity: 0.55, transform: 'rotate(45deg)', borderRadius: 1 } },
  { style: { top: '42%', left: '5%', width: 12, height: 12, background: 'var(--color-gold-light)', opacity: 0.45, borderRadius: '50%' }, round: true },
  { style: { top: '55%', right: '6%', width: 10, height: 10, background: '#dcc48a', opacity: 0.4, borderRadius: '50%' }, round: true },
  { style: { top: '32%', left: '18%', width: 8, height: 8, background: 'var(--color-gold-light)', opacity: 0.5, borderRadius: '50%' }, round: true },
  { style: { top: '80%', right: '20%', width: 8, height: 8, background: 'var(--color-gold-light)', opacity: 0.45, borderRadius: '50%' }, round: true }
]

const GLINTS = [
  { top: '15%', left: '22%', right: undefined as string | undefined, w: 3, h: 24, cw: 24, ch: 3, mt: -13, ml: -10, color: 'var(--color-gold-light)' },
  { top: '60%', left: undefined as string | undefined, right: '18%', w: 2, h: 18, cw: 18, ch: 2, mt: -10, ml: -8, color: '#dcc48a' },
  { top: '80%', left: '30%', right: undefined as string | undefined, w: 2, h: 16, cw: 16, ch: 2, mt: -9, ml: -7, color: 'var(--color-gold-light)' }
]

export const AmbientEffects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const orbs = section.querySelectorAll<HTMLElement>('.amb-orb')
      orbs.forEach((orb, i) => {
        const xAmp = [60, -50, 35, -40][i] ?? 40
        const yAmp = [-40, 50, -30, 45][i] ?? 30
        gsap.to(orb, { x: xAmp, duration: [10, 13, 8, 11][i] ?? 10, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.8 })
        gsap.to(orb, { y: yAmp, duration: [7, 9, 12, 8][i] ?? 8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.4 })
      })

      const lines = section.querySelectorAll<HTMLElement>('.amb-line')
      lines.forEach((line, i) => {
        gsap.fromTo(line, { x: '-110%', opacity: 0.55 }, { x: '110%', opacity: 0.55, duration: 5 + i * 1.5, ease: 'none', repeat: -1, delay: i * 2.5, repeatDelay: 3 + i * 1.5 })
      })

      const particles = section.querySelectorAll<HTMLElement>('.amb-particle')
      particles.forEach((p, i) => {
        gsap.fromTo(p, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.8 + i * 0.2 })
        gsap.to(p, { y: -(20 + i * 7), duration: 2.5 + i * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.5 })
        gsap.to(p, { x: i % 2 === 0 ? 12 : -12, duration: 3.5 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.3 })
        gsap.to(p, { opacity: 0.3, duration: 1.8 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.7 })
      })

      const glints = section.querySelectorAll<HTMLElement>('.amb-glint')
      glints.forEach((g, i) => {
        gsap.fromTo(g, { opacity: 0, scale: 0.4, rotation: 0 }, { opacity: 0.7, scale: 1, rotation: 45, duration: 1.2, ease: 'back.out(2)', yoyo: true, repeat: -1, repeatDelay: 3 + i * 1.5, delay: 2 + i * 2.2 })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-linear-to-b from-green-dark/60 via-green-dark/20 to-transparent" />

      {ORBS.map((orb, i) => (
        <div key={i} className={`amb-orb absolute ${orb.style} ${orb.size} rounded-full`}
          style={{ background: orb.bg }}
        />
      ))}

      {LINES.map((line, i) => (
        <div key={i} className="amb-line absolute w-full"
          style={{ ...line.style, background: line.bg }}
        />
      ))}

      {PARTICLES.map((p, i) => (
        <div key={i} className={`amb-particle absolute ${p.round ? 'rounded-full' : ''}`} style={p.style} />
      ))}

      {GLINTS.map((g, i) => (
        <div key={i} className="amb-glint absolute" style={{ top: g.top, left: g.left, right: g.right, opacity: 0 }}>
          <div style={{ width: g.w, height: g.h, background: `linear-gradient(to bottom, transparent, ${g.color}, transparent)`, borderRadius: 2 }} />
          <div style={{ width: g.cw, height: g.ch, background: `linear-gradient(to right, transparent, ${g.color}, transparent)`, borderRadius: 2, marginTop: g.mt, marginLeft: g.ml }} />
        </div>
      ))}
    </div>
  )
}
