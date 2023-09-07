'use client'
import { imageBuilder } from '@/lib/providers/sanity/sanity'
import Image from 'next/image'

const CourseHeader = ({ settings }) => {
 // console.log(settings)
  const image = imageBuilder(settings?.image)
  return (
    <div>
      <div className='relative rounded-md overflow-hidden border border-zinc-300 dark:border-zinc-800 max-w-screen mx-10 '>
        <Image
          className='relative h-60 md:h-80 lg:h-96 bg-cover z-0 bg-center bg-no-repeat rounded-md overflow-hidden'
          width={2000}
          height={300}
          src={image}
          alt='bg-image'
          style={{ objectFit: 'cover', /* filter: 'blur(1.5rem)' */ }}
        />
        <div
          className='absolute top-0 left-0 right-0 bottom-0 bg-black w-full bg-opacity-50 overflow-hidden'
        ></div>
        <div className='absolute z-30 left-0 right-0 bottom-0'>
          <div className='flex justify-between mx-auto p-6 md:p-10 items-center'>
            <div className='space-y-2'>
              <h1 className='text-2xl lg:text-3xl font-bold text-white'>
                Courses Title
              </h1>
            </div>
            <button className='w-max min-w-[170px] text-black font-semibold bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-md text-sm px-5 py-2.5 text-center '>
              View Your Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseHeader
