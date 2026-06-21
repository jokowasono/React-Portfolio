import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react'
import Home from './pages/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const About = lazy(() => import('./pages/About'))
const Education = lazy(() => import('./pages/Education'))
const Skills = lazy(() => import('./pages/Skills'))
const Contact = lazy(() => import('./pages/Contact'))

// Preload semua komponen di luar component agar dimulai secepat mungkin
const preloadAbout = import('./pages/About')
const preloadEducation = import('./pages/Education')
const preloadSkills = import('./pages/Skills')
const preloadContact = import('./pages/Contact')

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [id, forceLoad])

  // Tunggu sampai konten ASLI muncul (bukan Suspense fallback)
  useEffect(() => {
    if (!shouldRender || !ref.current || !onReady) return

    let resolved = false

    const checkReady = () => {
      if (resolved) return true
      const hasContent = ref.current?.querySelector('section')
      if (hasContent) {
        resolved = true
        requestAnimationFrame(() => onReady(id))
        return true
      }
      return false
    }

    // Cek langsung (kalau sudah cached, langsung ready)
    if (checkReady()) return

    // Kalau belum, observe DOM sampai konten muncul
    const observer = new MutationObserver(() => {
      if (checkReady()) observer.disconnect()
    })

    observer.observe(ref.current, { childList: true, subtree: true })

    const timeout = setTimeout(() => {
      observer.disconnect()
      // Fallback: tetap scroll walau konten belum terdeteksi
      if (!resolved) {
        resolved = true
        onReady(id)
      }
    }, 3000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [shouldRender, id, onReady])

  return (
    <div ref={ref} id={id} className="w-full">
      {shouldRender ? (
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center" style={{ minHeight: '100vh' }}>
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
        <div className="w-full flex items-center justify-center" style={{ minHeight: '50vh' }}>
          <div className="animate-pulse p-8 container mx-auto w-full">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
            </div>
          </div>
        </div>
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
      // Tunggu 1 frame agar layout stabil
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

      // Cek apakah sudah ready (sudah pernah di-load sebelumnya)
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el?.querySelector('section')) {
          pendingScrollRef.current = null
          performScroll(hash)
        }
        // Kalau belum, handleSectionReady yang akan handle
      }, 50)
    }

    window.addEventListener('hashchange', handleHashChange)

    if (window.location.hash) {
      const hash = window.location.hash.slice(1)
      pendingScrollRef.current = hash
      setForceLoad(true)
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el?.querySelector('section')) {
          pendingScrollRef.current = null
          performScroll(hash)
        }
      }, 300)
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