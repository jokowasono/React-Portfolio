import CircularText2 from '../ui/CircularText2'
import Link from 'next/link'

const HireMe = () => {
  return (
    <div className='flex items-center justify-center overflow-hidden'>
      <div className='w-40 h-auto flex items-center justify-center relative'>
        {/* <CircularText className={"fill-dark animate-spin-slow"}/> */}
        <CircularText2/>       
        

        <Link href="mailto:wasonoj@gmail.com" className='flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-light shadow-md border border-solid border-dark size-15 rounded-full font-semibold hover:bg-light hover:text-dark text-xs'>
            Hire Me
        </Link>
      </div>
    </div>
  )
}

export default HireMe
