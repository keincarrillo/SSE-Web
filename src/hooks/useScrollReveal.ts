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
        scrollTrigger: {
          trigger: ref.current,
          start: options.start ?? 'top 82%'
        }
      }

      const fadeUps = ref.current?.querySelectorAll('[data-gsap="fade-up"]')
      const fadeIns = ref.current?.querySelectorAll('[data-gsap="fade-in"]')
      const fadeLefts = ref.current?.querySelectorAll('[data-gsap="fade-left"]')
      const fadeRights = ref.current?.querySelectorAll(
        '[data-gsap="fade-right"]'
      )
      const lines = ref.current?.querySelectorAll('[data-gsap="line"]')
      const scales = ref.current?.querySelectorAll('[data-gsap="scale"]')

      if (fadeUps?.length)
        gsap.to(fadeUps, { opacity: 1, y: 0, ease: 'power3.out', ...base })
      if (fadeIns?.length)
        gsap.to(fadeIns, { opacity: 1, ease: 'power2.out', ...base })
      if (fadeLefts?.length)
        gsap.to(fadeLefts, { opacity: 1, x: 0, ease: 'power3.out', ...base })
      if (fadeRights?.length)
        gsap.to(fadeRights, { opacity: 1, x: 0, ease: 'power3.out', ...base })
      if (scales?.length)
        gsap.to(scales, {
          opacity: 1,
          scale: 1,
          ease: 'back.out(1.4)',
          ...base
        })
      if (lines?.length)
        gsap.to(lines, {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 85%' }
        })
    }, ref)

    return () => ctx.revert()
  }, [options.duration, options.stagger, options.start, options.delay])

  return ref
}
