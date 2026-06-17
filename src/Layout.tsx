import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import Home from './pages/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const About = lazy(() => import('./pages/About'))
const Education = lazy(() => import('./pages/Education'))
const Skills = lazy(() => import('./pages/Skills'))
const Contact = lazy(() => import('./pages/Contact'))

function LazySection({ children, id }: { children: React.ReactNode; id: string }) {
  const [shouldRender, setShouldRender] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Kalau URL ada hash yang match sama id ini, langsung render
    if (window.location.hash === `#${id}`) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [id])

  return <div ref={ref} id={id}>{shouldRender? children : <div className="h-screen" />}</div>
}

export default function Layout() {
  // Force render semua section kalau user klik menu sebelum scroll
  const [forceLoad, setForceLoad] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      setForceLoad(true)
      // Scroll halus setelah section ke-render
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.slice(1))
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }

    window.addEventListener('hashchange', handleHashChange)
    // Handle direct link pas pertama load
    if (window.location.hash) handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <Header />
      <main>
        <Home />
        <Suspense fallback={<div className="h-screen" />}>
          <LazySection id="about"><About /></LazySection>
          <LazySection id="education"><Education /></LazySection>
          <LazySection id="skills"><Skills /></LazySection>
          <LazySection id="contact"><Contact /></LazySection>
        </Suspense>
      </main>
      <Footer/>
    </div>
  )
}
