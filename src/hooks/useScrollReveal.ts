import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Options {
  stagger?: number
  duration?: number
  start?: string
  delay?: number
}

export function useScrollReveal(options: Options = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const base = {
        duration: options.duration ?? 0.9,
        stagger: options.stagger ?? 0.1,
        delay: options.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options.start ?? 'top 82%'
        }
      }

      const from = { opacity: 0, y: 30 }
      const fromX = (x: number) => ({ opacity: 0, x })

      const fadeUps = ref.current?.querySelectorAll('[data-gsap="fade-up"]')
      const fadeIns = ref.current?.querySelectorAll('[data-gsap="fade-in"]')
      const fadeLefts = ref.current?.querySelectorAll('[data-gsap="fade-left"]')
      const fadeRights = ref.current?.querySelectorAll(
        '[data-gsap="fade-right"]'
      )
      const lines = ref.current?.querySelectorAll('[data-gsap="line"]')
      const scales = ref.current?.querySelectorAll('[data-gsap="scale"]')

      // fromTo en vez de to: fuerza el estado inicial en cada montaje,
      // ignorando lo que quedó en el DOM de la sesión anterior
      if (fadeUps?.length)
        gsap.fromTo(fadeUps, from, { opacity: 1, y: 0, ...base })
      if (fadeIns?.length)
        gsap.fromTo(fadeIns, { opacity: 0 }, { opacity: 1, ...base })
      if (fadeLefts?.length)
        gsap.fromTo(fadeLefts, fromX(-40), { opacity: 1, x: 0, ...base })
      if (fadeRights?.length)
        gsap.fromTo(fadeRights, fromX(40), { opacity: 1, x: 0, ...base })
      if (scales?.length)
        gsap.fromTo(
          scales,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, ...base, ease: 'back.out(1.4)' }
        )
      if (lines?.length)
        gsap.fromTo(
          lines,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 85%' }
          }
        )
    }, ref)

    // Refrescar ScrollTrigger después de montar para recalcular posiciones
    ScrollTrigger.refresh()

    return () => ctx.revert()
  }, [options.duration, options.stagger, options.start, options.delay])

  return ref
}
