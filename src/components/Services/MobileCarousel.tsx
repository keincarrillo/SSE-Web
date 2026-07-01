import { useState, useRef } from 'react'
import { SERVICES } from '../../data/services'
import tooth from '../../assets/tooth.webp'
import { ServiceCard, FeaturedCard } from './cards'

const toCardData = (s: (typeof SERVICES)[number]) => ({
  title: s.title,
  description: s.summary,
  size: s.size as 'sm' | 'lg',
  icon: s.icon,
  href: s.href
})

const LEFT = SERVICES.slice(0, 2).map(toCardData)
const FEATURED = { title: SERVICES[2].title, description: SERVICES[2].summary, icon: SERVICES[2].icon, href: SERVICES[2].href }
const RIGHT = SERVICES.slice(3).map(toCardData)

const ALL_MOBILE = [
  { ...FEATURED, isFeatured: true as const },
  ...LEFT.map(s => ({ ...s, isFeatured: false as const })),
  ...RIGHT.map(s => ({ ...s, isFeatured: false as const }))
]

import { ChevronLeft, ChevronRight } from 'lucide-react'

export { LEFT, FEATURED, RIGHT }

const MobileCarousel = () => {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(0)
  const total = ALL_MOBILE.length

  const goTo = (n: number) => setCurrent(((n % total) + total) % total)

  return (
    <div className="lg:hidden">
      <div className="flex justify-center mb-6">
        <img src={tooth} alt="Diente" className="w-24 h-24 sm:w-40 sm:h-40 object-contain drop-shadow-2xl" />
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={e => { startXRef.current = e.touches[0].clientX }}
          onTouchMove={() => {}}
          onTouchEnd={e => {
            const diff = startXRef.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
          }}
        >
          {ALL_MOBILE.map((s, i) => (
            <div key={i} className="min-w-full px-4">
              {s.isFeatured ? (
                <FeaturedCard title={s.title} description={s.description} icon={s.icon} href={s.href} />
              ) : (
                <ServiceCard title={s.title} description={s.description} size={s.size} icon={s.icon} href={s.href} gsap="fade-up" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 mt-4">
        <button onClick={() => goTo(current - 1)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-green/20 flex items-center justify-center text-green hover:bg-green/5 transition-colors"
          aria-label="Anterior"><ChevronLeft /></button>
        <span className="text-green/45 text-sm font-medium">{current + 1} / {total}</span>
        <button onClick={() => goTo(current + 1)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-green/20 flex items-center justify-center text-green hover:bg-green/5 transition-colors"
          aria-label="Siguiente"><ChevronRight /></button>
      </div>

      <div className="flex justify-center gap-1.5 mt-5">
        {ALL_MOBILE.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Ir a servicio ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === current ? 'bg-green' : 'bg-green/20'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileCarousel
