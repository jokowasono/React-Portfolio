import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ["imagination", "passion", "vision"]

const FlipText = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span 
      className="relative inline-grid items-center justify-center overflow-hidden align-middle ml-4
                 /* MODE TERANG: Abu-abu sangat gelap agar lampu tetap terlihat */
                 bg-[#1a1a1a] 
                 /* MODE GELAP: Hitam pekat agar pendaran lampu lebih dramatis */
                 dark:bg-[#050505] 
                 rounded-xl px-6 py-2 
                 border-2 border-neutral-800 dark:border-primaryDark/30
                 shadow-2xl"
      style={{ 
        perspective: "1000px",
        // Bayangan kotak yang menyesuaikan pendaran lampu
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5), 0 0 15px rgba(0, 163, 255, 0.1)"
      }}
    >
      <span className="invisible opacity-0 pointer-events-none select-none font-bold tracking-widest text-4xl sm:text-5xl lg:text-6xl px-2">
        imagination
      </span>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="popLayout"> 
          <motion.span
            key={words[index]}
            initial={{ y: "120%", opacity: 0, rotateX: 60 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0 }}
            exit={{ y: "-120%", opacity: 0, rotateX: -60 }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            className="text-white font-bold tracking-widest whitespace-nowrap"
            style={{ 
                transformStyle: "preserve-3d",
                // EFEK LAMPU NEON:
                textShadow: `
                  0 0 7px #fff,
                  0 0 14px #fff,
                  0 0 21px #f59e0b, 
                  0 0 42px #f59e0b
                `
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* AKSEN GARIS: Memberikan kesan kotak ini memiliki bingkai kaca/plastik di mode terang */}
      <div className="absolute inset-0 border-t border-white/5 pointer-events-none rounded-xl" />
    </span>
  )
}

export default FlipText;