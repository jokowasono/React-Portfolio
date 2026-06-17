import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const words = ['Vision', 'Ideas', 'Products', 'Solutions']

const FlipText = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2500) // Ganti tiap 2.5 detik
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="relative inline-grid items-center justify-center overflow-hidden align-middle ml-3
                 bg-slate-900 dark:bg-slate-950
                 rounded-lg px-5 py-1.5
                 border border-cyan-500/30"
    >
      {/* Placeholder biar lebar kotak konsisten */}
      <span className="invisible opacity-0 pointer-events-none select-none font-bold tracking-wider text-4xl sm:text-5xl lg:text-6xl px-2">
        Solutions
      </span>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-cyan-500 font-bold tracking-wider whitespace-nowrap"
            style={{
              textShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </span>
  )
}

export default FlipText
