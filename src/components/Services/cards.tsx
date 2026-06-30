import { useNavigate } from 'react-router-dom'
import type { RefObject } from 'react'

export const ServiceCardLeft = ({
  title, description, icon, href, gsap
}: {
  title: string; description: string; size: 'sm' | 'lg'; icon: string; gsap: string; href: string
}) => {
  const navigate = useNavigate()
  return (
    <div
      data-gsap={gsap}
      className="service-card-clickable relative rounded-2xl border border-white/[0.07] bg-green p-[28px_26px] pl-16 xl:pl-20 min-h-72 lg:min-h-72"
      style={{ height: '100%' }}
      onClick={() => navigate(href)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(href)}
      aria-label={`Ver servicio: ${title}`}
    >
      <div className="icon-pulse-gold absolute left-0 top-1/2 z-20 w-24 h-24 xl:w-32 xl:h-32 rounded-full bg-gold/25 border-2 border-gold/60 flex items-center justify-center"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <img src={icon} alt="" className="w-14 h-14 xl:w-20 xl:h-20 object-contain" />
      </div>
      <h3 className="display-name text-xl tracking-[0.02em] text-white mb-2">{title}</h3>
      <p className="text-lg lg:text-xl leading-[1.3] text-white">{description}</p>
    </div>
  )
}

export const ServiceCardRight = ({
  title, description, icon, href, gsap
}: {
  title: string; description: string; size: 'sm' | 'lg'; icon: string; gsap: string; href: string
}) => {
  const navigate = useNavigate()
  return (
    <div
      data-gsap={gsap}
      className="service-card-clickable relative rounded-2xl border border-white/[0.07] bg-green p-[28px_26px] pr-16 xl:pr-20 min-h-72 lg:min-h-72"
      style={{ height: '100%' }}
      onClick={() => navigate(href)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(href)}
      aria-label={`Ver servicio: ${title}`}
    >
      <div className="icon-pulse-gold absolute right-0 top-1/2 z-20 w-24 h-24 xl:w-32 xl:h-32 rounded-full bg-gold/25 border-2 border-gold/60 flex items-center justify-center"
        style={{ transform: 'translate(50%, -50%)' }}
      >
        <img src={icon} alt="" className="w-14 h-14 xl:w-20 xl:h-20 object-contain" />
      </div>
      <h3 className="display-name text-xl tracking-[0.02em] text-white mb-2">{title}</h3>
      <p className="text-lg lg:text-xl leading-[1.3] text-white">{description}</p>
    </div>
  )
}

export const ServiceCard = ({
  title, description, icon, href
}: {
  title: string; description: string; size: 'sm' | 'lg'; icon: string; gsap: string; href: string
}) => {
  const navigate = useNavigate()
  return (
    <div
      data-gsap="fade-up"
      className="service-card-clickable rounded-2xl border border-white/[0.07] bg-green p-5 sm:p-6"
      onClick={() => navigate(href)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(href)}
      aria-label={`Ver servicio: ${title}`}
    >
      <div className="flex justify-center mb-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/25 border-2 border-gold/60 flex items-center justify-center">
          <img src={icon} alt="" className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
        </div>
      </div>
      <h3 className="display-name text-lg sm:text-xl tracking-[0.02em] text-white mb-1.5 text-center">{title}</h3>
      <p className="text-md sm:text-lg leading-[1.3] text-white text-center">{description}</p>
    </div>
  )
}

export const FeaturedCard = ({
  title, description, icon, cardRef, href
}: {
  title: string; description: string; icon?: string; cardRef?: RefObject<HTMLDivElement | null>; href: string
}) => {
  const navigate = useNavigate()
  return (
    <div
      ref={cardRef}
      data-gsap="fade-up"
      className="service-card-clickable relative rounded-2xl border border-gold/40 bg-gold w-full p-5 sm:p-6 lg:p-[75px_26px_28px] min-h-0 lg:min-h-105"
      onClick={() => navigate(href)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(href)}
      aria-label={`Ver servicio: ${title}`}
    >
      {icon && (
        <>
          <div className="icon-pulse-green hidden lg:flex absolute top-0 left-1/2 z-20 w-32 h-32 rounded-full bg-green/20 border-2 border-green/50 items-center justify-center"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <img src={icon} alt="" className="w-20 h-20 object-contain" />
          </div>
          <div className="lg:hidden flex justify-center mb-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green/20 border-2 border-green/50 flex items-center justify-center">
              <img src={icon} alt="" className="w-10 h-10 object-contain" />
            </div>
          </div>
        </>
      )}
      <h3 className="display-name text-lg sm:text-xl tracking-[0.02em] text-green mb-1.5 text-center">{title}</h3>
      <p className="text-lg lg:text-xl leading-[1.3] text-green text-center">{description}</p>
    </div>
  )
}
