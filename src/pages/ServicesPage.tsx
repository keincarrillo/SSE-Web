import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../hooks/useLenis'
import { SERVICES } from '../data/services'
import PageHeader from '../components/ServicesPage/PageHeader'
import ServiceSection from '../components/ServicesPage/ServiceSection'
import CtaSection from '../components/ServicesPage/CtaSection'
import Footer from '../components/Footer/Footer'

const ServicesPage = () => {
  useLenis()
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timeout = setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
      return () => clearTimeout(timeout)
    } else {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      const lenis = window.__lenis
      if (lenis) lenis.scrollTo(0, { immediate: true })
    }
  }, [hash])

  return (
    <div className="bg-white min-h-screen">
      <PageHeader />
      <main>
        {SERVICES.map((s, i) => (
          <ServiceSection key={s.id} service={s} index={i} />
        ))}
      </main>
      <CtaSection />
      <Footer />
    </div>
  )
}

export default ServicesPage
