
import { queryCourseId } from '@/lib/providers/sanity/sanity'
import CourseHeader from '@/ui/Headers/CoursesHeader/CoursesHeader'
import React from 'react'
import { BsStopwatch } from 'react-icons/bs'
import { BiMicrochip} from 'react-icons/bi'
import {FaSchoolCircleCheck} from 'react-icons/fa6'
import { FaRegBookmark } from 'react-icons/fa'
export const dynamic = 'force-dynamic'

export default async function Page ({ params }: { params: { id: string } }) {
  const { id } = params

  const course = await queryCourseId(id)
  console.log(course)

  return (
    course && (
      <section className='w-full h-full mx-auto relative max-w-screen'>
        <CourseHeader course={course} />
        <div className='w-full mx-auto px-10 my-8 overflow-x-auto'>
          <div className='flex space-x-8  mb-24'>
            <div className='w-2/3 lg:w-3/4 space-y-8'>
              <div className='bg-white dark:bg-black rounded-lg p-8 border border-zinc-200 dark:border-zinc-800'>
                <h1 className='text-xl font-bold text-black dark:text-white'>Course Details</h1>
                <p className='text-zinc-800 dark:text-zinc-300'>{course.description}</p>
              </div>
              <div className='bg-white dark:bg-black rounded-lg p-8 border border-zinc-200 dark:border-zinc-800 space-y-4'>
                <h1 className='text-xl font-bold text-black dark:text-white'>Course Lessons</h1>
                {course?.lessons.map((lesson: any) => (
                  <React.Fragment key={lesson?.title}>
                                  <div className='border-t border-zinc-300 dark:border-zinc-800'/>

                <p className='text-zinc-800 dark:text-zinc-300 font-semibold text-lg'>{lesson?.title}</p>
                </React.Fragment>))}
              </div>
              
            </div>
            <div className='w-1/3 lg:w-1/4 flex  justify-center content-center'>
              <div className='bg-white dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 w-full justify-center  space-y-8'>
                <div className='mt-8'>
                  <ul className='text-black dark:text-white justify-center mx-auto w-max  min-w-[165px] lg:min-w-[210px] text-sm'>
                    <li className='flex items-center space-x-3'>
                      <BsStopwatch/>
                      <p className='text-zinc-800 dark:text-zinc-300'>
                    Course Duration
                    </p>
                    </li>
                    <li className='flex items-center space-x-3'>
                      <BiMicrochip/>
                      <p className='text-zinc-800 dark:text-zinc-300'>
                   Modules
                   </p>
                    </li>
                    <li className='flex items-center space-x-3'>
                      <FaSchoolCircleCheck/>
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
                 <FaRegBookmark className='fill-black stroke-black accent-black black'/>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  )
}
