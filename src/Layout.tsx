import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import Home from './pages/Home'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const About = lazy(() => import('./pages/About'))
const Education = lazy(() => import('./pages/Education'))
const Skills = lazy(() => import('./pages/Skills'))
const Contact = lazy(() => import('./pages/Contact'))

function LazySection({ children }: { children: React.ReactNode }) {
  const [shouldRender, setShouldRender] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // load 200px sebelum masuk viewport
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{shouldRender? children : <div className="h-screen" />}</div>
}

export default function Layout() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <Header />
      <main>
        <Home />
        <Suspense fallback={<div className="h-screen" />}>
          <LazySection><About /></LazySection>
          <LazySection><Education /></LazySection>
          <LazySection><Skills /></LazySection>
          <LazySection><Contact /></LazySection>
        </Suspense>
      </main>
      <Footer/>
    </div>
  )
}