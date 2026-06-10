import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import DualOrbit from '../components/ui/DualOrbit'
import ShinyText2 from '../components/ui/ShinyText2'

const Skills = () => {
  const { theme } = useTheme() // ganti dari next-themes
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shinyColors = !mounted
    ? ["#4d4d4d", "#B63E96", "#4d4d4d"]
    : theme === 'dark'
      ? ["#000000", "#ffab00", "#000000"] // emas untuk dark mode
      : ["#18848e", "#19e5e6", "#18848e"] // cyan untuk light mode

  return (
    <section id="skills" className="pb-8 overflow-y-auto">
      <div className='relative w-full py-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        <section className="flex flex-col items-center justify-center px-4">
          {/* Heading */}
          <ShinyText2
            text="Skills"
            className="text-5xl md:text-6xl font-bold mb-6"
            colors={shinyColors}
            speed={3}
          />

          {/* ── Engaging Description ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center text-base md:text-lg leading-relaxed
                     text-black/70 dark:text-white/60 px-6 mb-10"
          >
            I craft visually stunning and professionally polished web experiences by harnessing the power of modern technologies — from semantic{" "}
            <span className="font-semibold text-black dark:text-white">HTML</span> and
            utility-first{" "}
            <span className="font-semibold text-cyan-500">Tailwind CSS</span>, to the
            reactive power of{" "}
            <span className="font-semibold text-sky-400">React</span> and{" "}
            <span className="font-semibold text-green-700 dark:text-white">Next.js</span>,
            hardened with{" "}
            <span className="font-semibold text-blue-500">TypeScript</span> for
            bulletproof reliability. Layer in{" "}
            <span className="font-semibold text-yellow-400">Framer Motion</span>, and
            I craft websites that don&apos;t just{" "}
            <em>function</em> — they{" "}
            <span className="font-bold text-black dark:text-white">captivate</span>.
          </motion.p>

          {/* The Visual Orbit */}
          <div className="w-full max-w-6xl md:-mt-20 lg:-mt-20">
            <DualOrbit />
          </div>

          <div className="py-10 md:-mt-20 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Each technology used in building this website represents a tool I use to transform ideas into
              <span className="font-medium text-cyan-600 dark:text-cyan-400"> fast, accessible, and visually captivating</span> web applications.
            </p>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Skills