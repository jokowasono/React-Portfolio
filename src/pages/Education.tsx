import EducationList from '../components/ui/EducationList'

const Education = () => {
  return (
    <section id="education" className="relative z-10 overflow-x-clip bg-white dark:bg-slate-950">
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2'>
            Education
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full" />
        </div>
        <EducationList />
      </div>
    </section>
  )
}

export default Education
