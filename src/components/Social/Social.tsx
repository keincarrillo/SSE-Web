import { useInView } from './hooks'
import { MobileView, TabletView, DesktopView } from './components'

export default function Social() {
  const { ref, v } = useInView()

  return (
    <section ref={ref} className="py-20 mb-10 bg-white overflow-hidden" id="redes">
      <div className="max-w-8xl mx-auto px-6">
        <MobileView inView={v} />
        <TabletView inView={v} />
        <DesktopView />
      </div>
    </section>
  )
}
