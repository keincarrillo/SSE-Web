import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { useLenis } from './hooks/useLenis'
import { SEO, StructuredData } from './components/SEO/SEO'
import Navbar from './components/Navbar/Navbar'
import Problem from './components/Problem/Problem'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Team from './components/Team/Team'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ServicesPage from './pages/ServicesPage'
import Promotions from './components/Promotions/Promotions'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) {
      const lenis = window.__lenis
      if (lenis) {
        lenis.stop()
        lenis.scrollTo(0, { immediate: true })
        lenis.start()
      }
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [pathname, hash])

  return null
}

const Layout = () => (
  <>
    <ScrollToTop />
    <StructuredData />
    <Navbar />
    <Outlet />
  </>
)

const Home = () => {
  useLenis()
  return (
    <>
      <SEO
        title="Smile Studio Experts | Dentista en Chimalhuacán y Polanco, CDMX"
        description="Clínica dental especializada en estética y salud bucal. Blanqueamiento, ortodoncia, diseño de sonrisa, prótesis y limpieza dental en Chimalhuacán y Polanco. Agenda tu cita hoy."
        canonical="https://smilestudioexperts.com/"
      />
      <main>
        <Problem />
        <Hero />
        <Services />
        <Promotions />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<ServicesPage />} />
    </Route>
  </Routes>
)

export default App
