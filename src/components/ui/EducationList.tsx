import { motion, useScroll } from "framer-motion"; // ✅ FIX 1: ganti dari 'motion/react'
import { useRef } from "react";
import { GraduationCap, School, BookOpen, Pencil } from "lucide-react";

interface Education {
  period: string;
  school: string;
  degree?: string;
  address: string;
  icon: React.ReactNode;
}

const educationData: Education[] = [
  {
    period: "2018 — 2022",
    school: "STIMIK-AKI SEMARANG",
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
];

const EducationList = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  });

  return (
    <div className="max-w-3xl mx-auto py-8 px-6" ref={ref}>
      <div className="relative ml-3">
        {/* ✅ FIX 2: w- jadi w-1 biar garis timeline keliatan */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-green-600 origin-top"
        />

        {educationData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
            className="mb-7 ml-8 relative"
          >
            {/* ✅ FIX 3: -left- jadi -left-12 + shadow + bg class */}
            <motion.span
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.4 }}
              className="absolute -left-12 top-1.5 w-8 h-8 rounded-full
                         bg-light dark:bg-dark
                         border-2 border-orange-400 dark:border-green-600
                         flex items-center justify-center text-orange-500 dark:text-green-400
                         shadow-[0_0_15px_rgba(251,146,60,0.4)] dark:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              {item.icon}
            </motion.span>

            <motion.div
              whileHover={{
                y: -8,
                rotateX: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative p-6 rounded-2xl
                         bg-light dark:bg-dark
                         border border-black/10 dark:border-white/10
                         hover:border-green-600 dark:hover:border-green-300
                         shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-400 to-green-600 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <h3 className="text-xl font-bold text-green-600 dark:text-[#34675c] mt-2">
                {item.school}
              </h3>
              <h3 className="text-sm font-bold text-green-600 dark:text-[#34675c] mt-2">
                {item.address}
              </h3>
              {item.degree && (
                <p className="text-yellow-600 dark:text-green-700 mt-2">
                  {item.degree}
                </p>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationList;