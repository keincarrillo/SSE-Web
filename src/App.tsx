import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Team from './components/Team/Team'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Social from './components/Social/Social'

const App = () => {
  useLenis()

  return (
    <>
      <Navbar />
      <main>
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

export default App
