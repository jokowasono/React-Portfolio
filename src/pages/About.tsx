import { useEffect, useRef } from 'react'
import profilePic from '../assets/images/profile/joko_gedung2.jpg'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import FlipText from '../components/ui/FlipText'
import { AboutBadge } from '../components/ui/AboutBadge'

const AnimatedNumbers = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const isInView = useInView(ref, { once: false })
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let controls: any

    const startAnimation = () => {
      motionValue.jump(0)
      if (ref.current) ref.current.textContent = '0'

      controls = animate(motionValue, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toString()
          }
        },
        onComplete: () => {
          timeoutRef.current = setTimeout(() => {
            if (isInView) startAnimation()
          }, 7000)
        }
      })
    }

    if (isInView) {
      startAnimation()
    }

    return () => {
      if (controls) controls.stop()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isInView, value, motionValue])

  return (
    <motion.span ref={ref} className="inline-block">
      0
    </motion.span>
  )
}

const About = () => {
  return (
    <section
      id="about"
      className="bg-white dark:bg-slate-950"
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10'>

        {/* HEADING */}
        <div className='mb-16 md:mb-20 flex flex-col items-center justify-center text-center
          text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          font-bold w-full text-slate-900 dark:text-slate-100 px-2'>

          <div className="flex flex-wrap items-center justify-center gap-2 xs:gap-3">
            <span className="leading-tight">Realize the</span>
            <FlipText />
          </div>
        </div>

        <div className='grid w-full grid-cols-1 md:grid-cols-8 gap-8 xs:gap-10 md:gap-16 relative'>

          {/* 📝 TEXT CONTENT */}
          <div className='col-span-full md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left px-2 md:px-0'>
            <AboutBadge text="About Me" className='mt-8' />

            <motion.p
              className='font-medium mb-3 xs:mb-4 text-sm xs:text-base leading-relaxed cursor-pointer mt-2 xs:mt-4 text-slate-700 dark:text-slate-300'
              initial={{ rotateX: 45, opacity: 0.8 }}
              whileHover={{ rotateX: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{ transformOrigin: "bottom", transformStyle: "preserve-3d" }}
            >
              Hello, my name is Joko Wasono, I graduated from STMIK AKI Semarang, Central Java, Indonesia, with a degree in Information Technology. I have a strong passion for programming and enjoy turning ideas into useful applications that can help people solve real-world problems.
            </motion.p>

            <motion.p
              className='font-medium mb-3 xs:mb-4 text-sm xs:text-base leading-relaxed cursor-pointer text-slate-700 dark:text-slate-300'
              initial={{ rotateX: 45, opacity: 0.8 }}
              whileHover={{ rotateX: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{ transformOrigin: "bottom", transformStyle: "preserve-3d" }}
            >
              I believe that design is about more than just making things look pretty – it's about solving problems and
              creating intuitive, enjoyable experiences for users.
            </motion.p>

            <motion.p
              className='font-medium text-sm xs:text-base leading-relaxed cursor-pointer text-slate-700 dark:text-slate-300'
              initial={{ rotateX: 45, opacity: 0.8 }}
              whileHover={{ rotateX: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{ transformOrigin: "bottom", transformStyle: "preserve-3d" }}
            >
              I bring my commitment to design excellence and user-centered thinking to
              every project I work on. I look forward to the opportunity to bring my skills and passion to your next project.
            </motion.p>
          </div>

          {/* 🖼 IMAGE */}
          <div className='col-span-full md:col-span-3 relative h-max rounded-2xl border-2 border-solid border-slate-900 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-2 xs:p-3 md:p-4 mx-auto md:mx-0 w-full md:w-[80%] lg:w-[90%]'>

            <div className="absolute inset-0 overflow-visible">
              <div className='absolute top-0 -right-2 xs:-right-3 -z-10 w-[102%] h-[103%] rounded-2xl xs:rounded-3xl bg-slate-900 dark:bg-slate-700' />
            </div>

            <motion.div
              initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
              whileInView={{ rotate: 360, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="w-full relative z-10"
            >
              <img
                src={profilePic}
                alt='Joko Wasono'
                className='w-full h-auto rounded-2xl'
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* 📊 STATS */}
          <div className='col-span-full md:col-span-2 flex flex-col items-center md:items-end justify-center md:justify-between py-4 md:py-0'>
            <div className='flex flex-col items-center md:items-end w-full'>
              <span className='inline-block text-3xl xs:text-4xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2'>
                <AnimatedNumbers value={100} />%
              </span>
              <h2 className='text-base xs:text-lg md:text-xl font-medium capitalize text-orange-500 dark:text-lime-400 text-center md:text-right leading-tight'>
                Focused on<br className="md:hidden" /> Customer Happiness
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About