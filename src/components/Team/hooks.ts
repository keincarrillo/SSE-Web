import { useRef, useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: `top ${Math.round((1 - threshold) * 100)}%`,
      onEnter: () => setInView(true),
      once: true
    })
    return () => trigger.kill()
  }, [threshold])

  return { ref, inView }
}
