import EducationList from '../components/ui/EducationList'
import ScrambleText2 from '../components/ui/ScrambleText2';

const Education = () => {
  return (
    <section id="education" className=" relative z-10 flex items-center overflow-x-hidden ">
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center py-10'>
          <ScrambleText2
            text='Education'
            repeatDelay={3000}
            className='text-4xl font-bold dark:text-[#20948b] text-orange-600 mb-5'
          />
          <EducationList />
        </div>
      </div>
    </section>
  )
}

export default Education