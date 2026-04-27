import type { RefObject } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const WHATSAPP_NUMBER = 'XXXXXXXXXX'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me gustaría agendar una cita.'
)

const LOCATIONS = [
  {
    label: 'Sucursal 1',
    address: '[Dirección sucursal 1]',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.885824363715!2d-98.98411995776843!3d19.402947118852673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e33713944d9f%3A0x3252260afa632afc!2sSmile%20Studio%20Experts!5e0!3m2!1ses-419!2smx!4v1777084851360!5m2!1ses-419!2smx'
  },
  {
    label: 'Sucursal 2',
    address: '[Dirección sucursal 2]',
    embedUrl: 'https://www.google.com/maps/embed?pb=XXXXXXXXXXXXXXX'
  }
]

const Contact = () => {
  const ref = useScrollReveal({ stagger: 0.1 })

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      id="contacto"
      className="py-24 md:py-32 bg-green"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span
            data-gsap="fade-up"
            className="block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3"
          >
            Contáctanos
          </span>
          <h2 data-gsap="fade-up" className="display-lg text-white">
            Agenda tu cita hoy
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info + WhatsApp */}
          <div data-gsap="fade-right" className="flex flex-col gap-8">
            <p className="text-white/60 leading-relaxed text-sm">
              Estamos listos para atenderte. Escríbenos directo por WhatsApp o
              visítanos en cualquiera de nuestras sucursales.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { label: 'Teléfono', value: '+52 (xxx) xxx-xxxx' },
                { label: 'WhatsApp', value: '+52 (xxx) xxx-xxxx' },
                { label: 'Email', value: 'contacto@ssedental.com' },
                {
                  label: 'Horario',
                  value: 'Lun – Vie: 9:00–18:00 · Sáb: 9:00–14:00'
                }
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start">
                  <span className="text-gold text-xs tracking-widest uppercase mt-0.5 w-20 shrink-0">
                    {item.label}
                  </span>
                  <span className="text-white/65 text-sm">{item.value}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold tracking-wide hover:bg-[#1ebe5d] transition-colors duration-300 uppercase"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Mapas embebidos — lado a lado */}
          <div data-gsap="fade-left">
            <div className="grid grid-cols-2 gap-3">
              {LOCATIONS.map(loc => (
                <div key={loc.label}>
                  <div className="flex flex-col gap-0.5 mb-2">
                    <span className="text-gold text-xs tracking-widest uppercase">
                      {loc.label}
                    </span>
                    <span className="text-white/40 text-[10px] leading-tight">
                      {loc.address}
                    </span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gold/20 h-52">
                    <iframe
                      src={loc.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={loc.label}
                    />
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

export default Contact
