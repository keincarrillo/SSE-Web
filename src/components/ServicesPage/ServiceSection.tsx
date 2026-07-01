import { useScrollReveal } from '../../hooks/useScrollReveal'
import { type ServiceData } from '../../data/services'
import ServiceVisual, { Check } from './ServiceVisual'

const ServiceSection = ({
  service,
  index
}: {
  service: ServiceData
  index: number
}) => {
  const sectionRef = useScrollReveal()

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
            className="w-full lg:w-6/12 shrink-0"
            data-gsap={isEven ? 'fade-right' : 'fade-left'}
          >
            <ServiceVisual
              images={service.images}
              title={service.title}
              bg={service.bg}
            />
          </div>

          <div className="w-full lg:w-6/12 flex flex-col">
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
              className={`leading-[1.7] mb-8 ${
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
                    className={`mt-1 shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${
                      isGreen
                        ? 'bg-gold/20 border-gold/50'
                        : 'bg-gold/15 border-gold/40'
                    }`}
                  >
                    <Check className={isGreen ? 'text-green' : 'text-gold'} size={16} strokeWidth={3} />
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

export default ServiceSection
