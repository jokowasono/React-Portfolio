import { motion } from 'framer-motion'

interface AboutBadgeProps {
  text: string
  className?: string
}

export const AboutBadge = ({ text, className = "" }: AboutBadgeProps) => {
  return (
    <div className={`relative inline-flex items-center justify-center rounded-full px-5 py-2 mb-4 ${className}`}>

      {/* GLOW 1x aja, pake cyan, ga blur brutal */}
      <motion.div
        className="absolute -inset-1 rounded-full z-0"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* BASE CARD - border cyan */}
      <div className="absolute inset-0 rounded-full z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-cyan-500/50" />

      {/* TEKS - cyan */}
      <span className="relative z-20 text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider whitespace-nowrap select-none">
        {text}
      </span>

    </div>
  )
}
