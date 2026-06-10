import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail, MdKeyboardArrowUp } from 'react-icons/md'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/username', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/username', label: 'LinkedIn' },
    { icon: MdEmail, href: 'mailto:email@example.com', label: 'Email' }
  ]

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const isMobile = window.innerWidth < 768
      const headerOffset = isMobile? 16 : 80
      const elementPosition = el.offsetTop - headerOffset + 1
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Joko Wasono
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Frontend Developer passionate about creating beautiful and functional web experiences.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(social => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2 py-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} Joko Wasono. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition group"
          >
            Back to top
            <MdKeyboardArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}