import { motion } from 'framer-motion'
import { SiHtml5, SiTailwindcss, SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si'
import { useEffect, useState } from 'react'

const MotionLogo = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M10 80L27 35H42L25 80H10Z" fill="currentColor" />
    <path d="M31 80L48 35H63L46 80H31Z" fill="currentColor" />
    <path d="M52 80L69 35H84L67 80H52Z" fill="currentColor" />
    <circle cx="88" cy="42" r="8" fill="currentColor" />
  </svg>
)

const StaticOrbit = () => (
  <div className="w-full max-w-md mx-auto px-4 py-8">
    <div className="relative flex items-center justify-center">
      <div className="absolute w-64 h-48 border border-slate-300 dark:border-slate-700 rounded-[50%]" />
      <div className="absolute w-44 h-32 border border-slate-300 dark:border-slate-700 rounded-[50%]" />

      <div className="relative z-10 w-16 h-14 bg-cyan-600 dark:bg-cyan-500 rounded-full flex items-center justify-center shadow-md">
        <span className="text-white font-black text-[7px] tracking-wider text-center leading-tight">
          TECH<br/>STACK
        </span>
      </div>

      {[
        { Icon: SiHtml5, label: "HTML", pos: "-top-2 left-1/2 -translate-x-1/2" },
        { Icon: SiTailwindcss, label: "Tailwind", pos: "top-1/2 -left-2 -translate-y-1/2" },
        { Icon: SiNextdotjs, label: "Next.js", pos: "-bottom-2 left-1/2 -translate-x-1/2" },
        { Icon: SiReact, label: "React", pos: "top-1/2 -right-2 -translate-y-1/2" },
        { Icon: SiTypescript, label: "TS", pos: "top-6 right-6" },
        { Icon: MotionLogo, label: "Motion", pos: "bottom-6 left-6" },
      ].map((item, i) => (
        <div key={i} className={`absolute ${item.pos} flex flex-col items-center gap-1 group`}>
          <div className="w-12 h-9 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 group-hover:border-cyan-500 transition-all">
            <item.Icon size={16} className="text-slate-700 dark:text-slate-300 group-hover:text-cyan-500 transition-colors" />
          </div>
          <span className="text-[8px] text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
)

const DualOrbit = () => {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  if (!isDesktop) return <StaticOrbit />

  const scale = 1.2
  const radius1X = 226 * scale
  const radius1Y = 162 * scale
  const radius2X = 120 * scale
  const radius2Y = 76 * scale

  const orbit1Icons = [
    { Icon: SiHtml5, label: "HTML" },
    { Icon: SiTailwindcss, label: "Tailwind CSS" },
    { Icon: SiNextdotjs, label: "Next.js" },
  ]

  const orbit2Icons = [
    { Icon: SiReact, label: "React" },
    { Icon: SiTypescript, label: "TypeScript" },
    { Icon: MotionLogo, label: "Motion" },
  ]

  const maxRadiusY = Math.max(radius1Y, radius2Y)

  return (
    <div
      className="relative flex items-center justify-center w-full overflow-visible select-none"
      style={{ minHeight: (maxRadiusY + 100) * 2 }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: (radius1X + 100) * 2,
          height: (maxRadiusY + 100) * 2
        }}
      >
        {/* LINTASAN ORBIT */}
        <div
          className="absolute border border-slate-400 dark:border-slate-800 rounded-[50%] pointer-events-none"
          style={{ width: radius1X * 2, height: radius1Y * 2 }}
        />
        <div
          className="absolute border border-slate-400 dark:border-slate-800 rounded-[50%] pointer-events-none"
          style={{ width: radius2X * 2, height: radius2Y * 2 }}
        />

        {/* CENTER: Kontras warna ditingkatkan untuk standar US */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative z-10 flex items-center justify-center bg-cyan-600 dark:bg-cyan-500 shadow-xl"
          style={{ width: 110, height: 85, borderRadius: "50%" }}
        >
          <span className="text-white font-black text-center tracking-widest leading-tight text-[11px]">
            TECH<br />STACK
          </span>
        </motion.div>

        {[...orbit1Icons, ...orbit2Icons].map((item, index) => {
          const isOrbit1 = index < 3
          const rX = isOrbit1 ? radius1X : radius2X
          const rY = isOrbit1 ? radius1Y : radius2Y
          const duration = isOrbit1 ? 25 : 18 // Dibuat sedikit lebih lambat agar nyaman dipandang rekruter
          const direction = isOrbit1 ? 1 : -1
          const startAngle = ((index % 3) / 3) * (2 * Math.PI)

          return (
            <motion.div
              key={index}
              className="absolute flex flex-col items-center gap-2 group z-20 will-change-transform"
              animate={{
                x: Array.from({ length: 40 }, (_, i) => 
                  Math.cos(startAngle + direction * (i / 39) * 2 * Math.PI) * rX
                ),
                y: Array.from({ length: 40 }, (_, i) => 
                  Math.sin(startAngle + direction * (i / 39) * 2 * Math.PI) * rY
                ),
              }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              {/* IKON: Desain Presisi Tinggi */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:border-cyan-500 shadow-sm group-hover:shadow-cyan-500/10 flex items-center justify-center transition-all duration-300"
                   style={{ width: 64, height: 48, borderRadius: "50%" }}>
                <item.Icon size={22} className="text-slate-600 dark:text-slate-400 group-hover:text-cyan-500 transition-colors duration-300" />
              </div>

              {/* LABEL: Modifikasi Agar Teks Tetap Stabil / Tegak */}
              <div className="bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md flex items-center justify-center px-3 py-0.5 shadow-sm rounded-full group-hover:border-cyan-500/30 transition-colors duration-300">
                <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 font-semibold whitespace-nowrap text-[10px] tracking-wide transition-colors">
                  {item.label}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default DualOrbit