import { motion } from 'framer-motion'
import DualOrbit from '../components/ui/DualOrbit'

const Skills = () => {
  return (
    <section className="overflow-x-clip py-16 md:py-20">
      <div className='relative w-full container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex flex-col items-center justify-center px-4">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-2"
          >
            Skills
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 bg-cyan-500 rounded-full mb-8 origin-center"
          />

          {/* PERBAIKAN: mb-12 → mb-6 md:mb-4 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl mx-auto text-center text-base md:text-lg leading-relaxed
                     text-slate-600 dark:text-slate-400 px-6 mb-6 md:mb-4"
          >
            I craft performant web applications using modern technologies — from semantic{" "}
            <span className="font-semibold text-cyan-500">HTML</span> and utility-first{" "}
            <span className="font-semibold text-cyan-500">Tailwind CSS</span>, to the
            reactive power of{" "}
            <span className="font-semibold text-cyan-500">React</span> and{" "}
            <span className="font-semibold text-cyan-500">Next.js</span>, hardened with{" "}
            <span className="font-semibold text-cyan-500">TypeScript</span> for
            type safety. With{" "}
            <span className="font-semibold text-cyan-500">Framer Motion</span>, I build
            interfaces that are not just functional — they're{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">memorable</span>.
          </motion.p>

          <div className="w-full max-w-6xl mt-8 mb-25 md:mb-10">
            <DualOrbit />
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-500 max-w-xl mx-auto">
              Each technology represents a tool I use to build
              <span className="font-medium text-cyan-600 dark:text-cyan-400"> fast, accessible, and scalable</span> applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills