import { Routes, Route, Outlet } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar/Navbar'
import Problem from './components/Problem/Problem'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Team from './components/Team/Team'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Social from './components/Social/Social'
import ServicesPage from './pages/ServicesPage'

// Layout compartido: Navbar se monta una sola vez para todas las rutas
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)

const Home = () => {
  useLenis()
  return (
    <>
      <main>
        <Problem />
        <Hero />
        <Services />
        <Team />
        <Testimonials />
        <Social />
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
