import { useEffect, useState } from "react";
import profilePic from "../assets/images/profile/sedakep-nobg2.png";
import { motion } from "framer-motion";
import { Typewriter2 } from "@/components/ui/Typewriter2"
import { SimpleMagicButton } from "../components/ui/SimpleMagicButton";
import GlobeBackground from "@/components/ui/WorldGlobe";
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="bg-white dark:bg-slate-900"
    >
      {/* Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vh] lg:w-[70vw] lg:h-[70vh] opacity-20 dark:opacity-30">
          <GlobeBackground />
        </div>
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 xs:gap-8 lg:gap-12">

          {/* FOTO */}
          <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md lg:w-2/5 relative flex justify-center items-center order-1 lg:order-1">
            <div className="absolute bottom-0 w-[85%] xs:w-[90%] lg:w-full h-[65%] xs:h-[70%] rounded-2xl xs:rounded-3xl border-2 border-solid border-dark bg-gray-200 dark:bg-gray-900 overflow-visible">
              <div className="absolute top-0 -right-2 xs:-right-3 -z-10 w-[102%] h-[103%] rounded-2xl xs:rounded-3xl bg-dark dark:bg-neutral-800" />
            </div>

            <motion.div
              className="relative z-10 w-[80%] xs:w-[85%] lg:w-full"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={profilePic}
                alt="Joko Wasono"
                className="w-full h-auto transform scale-100 xs:scale-105 lg:scale-110 origin-bottom"
                loading="eager"
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
              />
            </motion.div>
          </div>

          {/* TEKS */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-2 px-2">

            <motion.p
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-4xl font-bold text-orange-500 dark:text-yellow-500 break-words leading-tight"
            >
              Hi, I'm Joko Wasono,
            </motion.p>

            <motion.p
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-dark/70 dark:text-neutral-300 mt-1 xs:mt-2 break-words"
            >
              a frontend developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, rotateX: 85, y: 10, transformPerspective: 1200 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: "bottom", backfaceVisibility: "hidden" }}
              className="my-4 lg:mb-10 xs:my-6 text-sm xs:text-base sm:text-lg text-dark/70 dark:text-neutral-400 max-w-xs xs:max-w-sm sm:max-w-xl break-words leading-relaxed"
            >
              A dedicated Frontend Developer focused on transforming creative ideas into high-performance, innovative web applications.
            </motion.p>

            <div className="flex items-center justify-center lg:justify-start gap-1 xs:gap-2 mb-6 xs:mb-8 h-6 xs:h-8 w-full">
              <Typewriter2
                text="With Modern Tech Stack"
                speed={100}
                pause={2500}
                delay={1200}
                highlightWords={["Modern", "Tech"]}
                highlightClass="text-green-600 dark:text-green-500 font-extrabold italic"
                className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold font-inter text-cyan-600 dark:text-cyan-500 break-words"
              />
            </div>

            <div className="flex items-center justify-center lg:justify-start">
              <a href="/CV_Joko_Wasono_Frontend_Remote.pdf" target="_blank" download={true} className="group">
                <SimpleMagicButton />
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
              <motion.a
                href="https://github.com/username"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-white/10 dark:bg-slate-800/50 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all"
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/username"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-white/10 dark:bg-slate-800/50 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}