import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react'
import Home from './pages/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const About = lazy(() => import('./pages/About'))
const Education = lazy(() => import('./pages/Education'))
const Skills = lazy(() => import('./pages/Skills'))
const Contact = lazy(() => import('./pages/Contact'))

function LazySection({
  children,
  id,
  forceLoad,
  onReady
}: {
  children: React.ReactNode
  id: string
  forceLoad: boolean
  onReady?: (id: string) => void
}) {
  const [shouldRender, setShouldRender] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (forceLoad) {
      setShouldRender(true)
      return
    }

    if (window.location.hash === `#${id}`) {
      setShouldRender(true)
      return
    }

    // Menggunakan rootMargin 600px agar konten di-load sedikit lebih awal sebelum terlihat
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [id, forceLoad])

  // Dipanggil langsung saat component mulai di-render untuk mengizinkan smooth-scroll berjalan lancar
  useEffect(() => {
    if (shouldRender && onReady) {
      const timeout = setTimeout(() => {
        onReady(id)
      }, 100) // Berikan jeda singkat untuk transisi layout awal
      return () => clearTimeout(timeout)
    }
  }, [shouldRender, id, onReady])

  return (
    <div ref={ref} id={id} className="w-full min-h-[40vh]">
      {shouldRender ? (
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center min-h-[40vh]">
              <div className="animate-pulse p-8 container mx-auto w-full">
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
      ) : (
        <div className="w-full" />
      )}
    </div>
  )
}

export default function Layout() {
  const [forceLoad, setForceLoad] = useState(false)
  const pendingScrollRef = useRef<string | null>(null)

  const performScroll = useCallback((hash: string) => {
    const el = document.getElementById(hash)
    if (!el) return

    const header = document.querySelector('header')
    const headerHeight = header ? header.offsetHeight : 0
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }, [])

  const handleSectionReady = useCallback((id: string) => {
    if (pendingScrollRef.current === id) {
      pendingScrollRef.current = null
      requestAnimationFrame(() => {
        performScroll(id)
      })
    }
  }, [performScroll])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return

      pendingScrollRef.current = hash
      setForceLoad(true)
      performScroll(hash)
    }

    window.addEventListener('hashchange', handleHashChange)

    if (window.location.hash) {
      const hash = window.location.hash.slice(1)
      pendingScrollRef.current = hash
      setForceLoad(true)
      setTimeout(() => performScroll(hash), 100)
    }

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [performScroll])

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <Header />
      <main>
        <Home />
        <LazySection id="about" forceLoad={forceLoad} onReady={handleSectionReady}>
          <About />
        </LazySection>
        <LazySection id="education" forceLoad={forceLoad} onReady={handleSectionReady}>
          <Education />
        </LazySection>
        <LazySection id="skills" forceLoad={forceLoad} onReady={handleSectionReady}>
          <Skills />
        </LazySection>
        <LazySection id="contact" forceLoad={forceLoad} onReady={handleSectionReady}>
          <Contact />
        </LazySection>
      </main>
      <Footer />
    </div>
  )
}