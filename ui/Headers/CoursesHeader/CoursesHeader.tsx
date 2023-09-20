import { imageBuilder } from '@/lib/providers/sanity/sanity'
import Image from 'next/image'
import Link from 'next/link'
import {  FaLongArrowAltLeft } from 'react-icons/fa'

const CourseHeader = ({
  settings,
  course
}: {
  settings?: any
  course?: any
}) => {
  console.log(course)
  // console.log(settings)
  const image = settings
    ? imageBuilder(settings?.image)
    : imageBuilder(course?.image)
  return (
    <div>
      <div className='relative rounded-md overflow-hidden border border-zinc-300 dark:border-zinc-800 max-w-screen mx-10 '>
        <Image
          className='relative h-60 md:h-80 lg:h-96 bg-cover z-0 bg-center bg-no-repeat rounded-md overflow-hidden'
          width={2000}
          height={300}
          src={image}
          alt='bg-image'
          style={{ objectFit: 'cover' /* filter: 'blur(1.5rem)' */ }}
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black w-full bg-opacity-50 overflow-hidden'></div>
        {course && (
          <div className='absolute left-8 top-20'>
            <Link href='/portal/learning/'>
              <div className='flex relative items-center space-x-2'>
                <FaLongArrowAltLeft />
                <p>Back</p>
              </div>
            </Link>
          </div>
        )}

        <div className='absolute z-30 left-0 right-0 bottom-0'>
          <div className='flex justify-between mx-auto p-6 md:px-10 items-center'>
            <div className='space-y-2'>
              <h1 className='text-2xl lg:text-3xl font-bold text-white'>
                {settings ? 'Start Learning today!' : course.title}
                {}{' '}
              </h1>
            </div>
            {settings ? (
              <Link href={'/portal/learning/my'} prefetch>
              <button className='w-max min-w-[170px] text-black font-semibold bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-100  rounded-md text-sm px-5 py-2.5 text-center '>
                View Your Courses
              </button>
              </Link>
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseHeader
