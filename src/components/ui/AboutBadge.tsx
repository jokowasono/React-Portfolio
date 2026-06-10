import { motion } from 'framer-motion' // ganti dari 'motion/react'

interface AboutBadgeProps {
  text: string
  className?: string
}

export const AboutBadge = ({ text, className = "" }: AboutBadgeProps) => {
  return (
    <div className={`relative inline-flex items-center justify-center rounded-full px-5 py-2 mb-4 ${className}`}>
      
      {/* ✨ LAYER 1: GLOW - Elliptical gradient */}
      <motion.div
        className="absolute -inset-2 rounded-full z-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(34, 197, 94, 0.85) 0%,
              rgba(16, 185, 129, 0.45) 35%,
              rgba(6, 78, 59, 0.15) 60%,
              transparent 75%
            )
          `,
          filter: 'blur(10px)',
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ✨ LAYER 2: Secondary soft glow untuk depth */}
      <motion.div
        className="absolute -inset-3 rounded-full z-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'translateZ(0)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* 📦 LAYER 3: BASE CARD */}
      <div className="absolute inset-0 rounded-full z-10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-green-400/50 shadow-[0_0_0_1px_rgba(34,197,94,0.1)]" />

      {/* 📝 LAYER 4: TEKS */}
      <span className="relative z-20 text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wider whitespace-nowrap select-none">
        {text}
      </span>
      
    </div>
  )
}