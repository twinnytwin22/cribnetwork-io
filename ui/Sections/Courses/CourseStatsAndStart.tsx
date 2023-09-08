import React from 'react'
import { BiMicrochip } from 'react-icons/bi'
import { BsStopwatch } from 'react-icons/bs'
import { FaRegBookmark } from 'react-icons/fa'
import { FaSchoolCircleCheck } from 'react-icons/fa6'

function CourseStatsAndStart({course}) {
  return (
    <div className='bg-white dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 w-full justify-center  space-y-8'>
    <div className='mt-4'>
    <h1 className='text-xl font-bold text-black dark:text-white text-center'>Get Started</h1>
      <ul className='text-black dark:text-white justify-center mx-auto w-max  min-w-[165px] lg:min-w-[210px] text-sm'>
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
    <div className='space-x-2 flex justify-center w-fit mx-auto'>
      <button className=' w-max min-w-[125px] lg:min-w-[170px] text-black font-semibold bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-100 rounded-md text-sm px-5 py-2.5 text-center mx-auto justify-center flex'>
        Enroll
      </button>
      <button className='min-w-[40px] w-fit text-black font-semibold bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-100 rounded-md text-sm px-2.5 py-2.5 text-center mx-auto justify-center flex'>
        <FaRegBookmark className='fill-black stroke-black accent-black black' />
      </button>
    </div>
  </div>  )
}

export default CourseStatsAndStart