import { useAuthProvider } from '@/app/context/auth'
import EnrollmentButton from '@/ui/Buttons/EnrollmentButton/EnrollmentButton'
import React from 'react'
import { BiMicrochip } from 'react-icons/bi'
import { BsStopwatch } from 'react-icons/bs'
import { FaRegBookmark } from 'react-icons/fa'
import { FaSchoolCircleCheck } from 'react-icons/fa6'

function CourseStatsAndStart({course}) {
  return (
    <div className='bg-white dark:bg-black rounded-lg p-4 pb-10 lg:pb-auto border border-zinc-200 dark:border-zinc-800 w-full justify-center mx-auto space-y-8'>
    <div className='mt-4'>
    <h1 className='text-xl font-bold text-black dark:text-white text-center'>Get Started</h1>
      <ul className='text-black dark:text-white justify-center mx-auto w-max  md:min-w-[165px] lg:min-w-[210px] text-sm'>
        <li className='flex items-center space-x-3'>
          <BsStopwatch />
          <p className='text-zinc-800 dark:text-zinc-300'>
            Course Duration
          </p>
        </li>
        <li className='flex items-center space-x-3'>
          <BiMicrochip />
          <p className='text-zinc-800 dark:text-zinc-300'>
            Modules
          </p>
        </li>
        <li className='flex items-center space-x-3'>
          <FaSchoolCircleCheck />
          <p className='text-zinc-800 dark:text-zinc-300'>
            Enrolled
          </p>
        </li>
      </ul>
    </div>
 <EnrollmentButton course={course}/>
  </div>  )
}

export default CourseStatsAndStart