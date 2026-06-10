import { Header } from './components/Header'
import Home from './pages/Home' // ← ganti dari Hero
import About from './pages/About'
import Education from './pages/Education'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import { Footer } from './components/Footer'

export default function Layout() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <Header />
      <main>
        <Home />
        <About />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer/>
    </div>
  )
}