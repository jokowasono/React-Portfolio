// Layout.tsx
import { lazy, Suspense } from 'react'
import Home from './pages/Home' // Home jangan di-lazy biar FCP cepet
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const About = lazy(() => import('./pages/About'))
const Education = lazy(() => import('./pages/Education'))
const Skills = lazy(() => import('./pages/Skills'))
const Contact = lazy(() => import('./pages/Contact'))

export default function Layout() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <Header />
      <main>
        <Home />
        <Suspense fallback={<div className="h-screen" />}>
          <About />
          <Education />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Footer/>
    </div>
  )
}
