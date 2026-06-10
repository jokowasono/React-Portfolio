import ScrollProgressBar from './ScrollProgressBar'
import { useTheme } from 'next-themes'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrollingProgrammatically = useRef(false) // TAMBAH: flag

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ]

  const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  const header = document.querySelector('header')
  if (el && header) {
    isScrollingProgrammatically.current = true
    setActiveSection(id)

    const headerHeight = header.offsetHeight
    const elementPosition = el.getBoundingClientRect().top + window.scrollY - headerHeight

    window.scrollTo({
      top: Math.max(0, elementPosition), // cegah minus
      behavior: 'smooth'
    })
    setIsMenuOpen(false)

    setTimeout(() => {
      isScrollingProgrammatically.current = false
    }, 800)
  }
}


  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return // SKIP: kalo lagi scroll manual

      const footer = document.getElementById('footer')
      const footerHeight = footer? footer.offsetHeight : 200

      if (footer && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - footerHeight + 50) {
        setActiveSection('')
        return
      }

      const sections = menuItems.map(item => document.getElementById(item.id))
      const header = document.querySelector('header')
      const headerHeight = header? header.offsetHeight : 80
      const scrollPosition = window.scrollY + headerHeight + 20 // offset dikit dari header

      // GANTI: cek range, bukan cuma offsetTop
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(menuItems[i].id)
            break
          }
        }
      }

      // FALLBACK: kalo di paling atas banget
      if (window.scrollY < 100) {
        setActiveSection('home')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <ScrollProgressBar />
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
          <div className="flex-1" />

          <nav className="flex gap-2 items-center">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition font-medium px-4 py-2 rounded-lg ${
                  activeSection === item.id
                   ? 'text-blue-600 dark:text-cyan-400 bg-slate-100 dark:bg-slate-800'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
              >
                {item.label}
              </button>
            ))}

            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2" />
            <button
              onClick={() => setTheme(theme === 'dark'? 'light' : 'dark')}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark'? '☀' : '🌙'}
            </button>
          </nav>

          <div className="flex-1" />
        </div>
      </header>

      {/* Mobile: Floating Hamburger Only */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              animate={isMenuOpen? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-slate-900 dark:bg-white block origin-center"
            />
            <motion.span
              animate={isMenuOpen? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-slate-900 dark:bg-white block"
            />
            <motion.span
              animate={isMenuOpen? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-slate-900 dark:bg-white block origin-center"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed right-0 top-20 w-64 bg-white dark:bg-slate-900 border-l border-t border-b border-slate-200 dark:border-slate-800 shadow-2xl z-40 rounded-l-2xl"
            >
              <div className="p-4 pt-4 h-full flex flex-col">
                <nav className="flex flex-col gap-1 flex-1">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left py-2 px-3 rounded-lg transition font-medium text-sm ${activeSection === item.id
                       ? 'bg-gray-500 dark:bg-slate-600 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setTheme(theme === 'dark'? 'light' : 'dark')}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition mt-3 w-full text-sm"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {theme === 'dark'? 'Light Mode' : 'Dark Mode'}
                  </span>
                  <span className="text-2xl">{theme === 'dark'? '☀' : '🌙'}</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
