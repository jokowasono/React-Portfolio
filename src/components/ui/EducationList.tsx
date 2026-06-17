import { motion, useScroll } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, School, BookOpen, Pencil } from "lucide-react"

interface Education {
  period: string
  school: string
  degree?: string
  address: string
  icon: React.ReactNode
}

const educationData: Education[] = [
  {
    period: "2018 — 2022",
    school: "STMIK AKI Semarang",
    degree: "Bachelor of Computer Science",
    address: "Central Java, Indonesia",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    period: "2015 — 2018",
    school: "SMA Negeri 1 Brebes",
    degree: "Science Major",
    address: "Central Java, Indonesia",
    icon: <School className="w-4 h-4" />,
  },
  {
    period: "2012 — 2015",
    school: "SMP Negeri Banjaratma",
    degree: "Junior High School",
    address: "Brebes, Central Java, Indonesia",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    period: "2006 — 2012",
    school: "SDN Tanjungsari 1",
    degree: "Elementary School",
    address: "Brebes, Central Java, Indonesia",
    icon: <Pencil className="w-4 h-4" />,
  },
]

const EducationList = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  })

  return (
    <div className="max-w-3xl mx-auto py-4 px-6" ref={ref}>
      <div className="relative ml-3">
        {/* TIMELINE: 1 warna cyan aja */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-0 top-0 w-1 h-full bg-cyan-500 origin-top rounded-full"
        />

        {educationData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-8 ml-8 relative"
          >
            {/* ICON: Hapus rotate 360, cukup scale */}
            <motion.span
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.2 }}
              className="absolute -left-12 top-1.5 w-8 h-8 rounded-full
                         bg-white dark:bg-slate-900
                         border-2 border-cyan-500
                         flex items-center justify-center text-cyan-600 dark:text-cyan-400
                         shadow-lg"
            >
              {item.icon}
            </motion.span>

            {/* CARD: Hapus rotateX, cukup y doang */}
            <motion.div
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 400 }
              }}
              className="group relative p-6 rounded-2xl
                         bg-slate-50 dark:bg-slate-900
                         border border-slate-200 dark:border-slate-800
                         hover:border-cyan-500 dark:hover:border-cyan-400
                         shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-cyan-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* TEKS: 1 warna cyan + slate */}
              <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                {item.period}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {item.school}
              </h3>
              {item.degree && (
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {item.degree}
                </p>
              )}
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                {item.address}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default EducationList
