
import { imageBuilder, queryCourseId } from '@/lib/providers/sanity/sanity'
import CourseHeader from '@/ui/Headers/CoursesHeader'
import React from 'react'
import CourseDetails from '@/ui/Sections/Courses/CourseDetails'
import CourseLessons from '@/ui/Sections/Courses/CourseLessons'
import CourseStatsAndStart from '@/ui/Sections/Courses/CourseStatsAndStart'
import Course from '@/ui/Sections/Courses/Course'
import CourseQuizzes from '@/ui/Sections/Courses/CourseQuizzes/CourseQuizzes'
export const revalidate = 0
//export const dynamicParams = true

export default async function Page({ params }: { params: { courseId: string } }) {
  const { courseId = [] } = params
  const course = await queryCourseId(courseId[0])

  //console.log(courseId[1], "PARAMS")
 //console.log(course, "COURSE!!!!!")

 if (courseId.length > 1 && courseId[1] === 'started' ) {
  const image = imageBuilder(course?.image)
  
  return course && (
    <section className='w-full h-full mx-auto relative max-w-screen right-0'>

    <Course course={course} image={image}/>
    </section>)
 }

  return (
    course && (
      <section className='w-full h-full mx-auto relative max-w-screen'>
        <CourseHeader course={course} />
        <div className='w-full mx-auto px-10 my-8 overflow-x-auto'>
          <div className='block md:flex md:space-x-8  mb-24 '>
            <div className='w-full md:w-2/3 lg:w-3/4 -mt-8 space-y-8'>
              <div className='block md:hidden'>
            <CourseStatsAndStart course={course}/>
             </div>
           <CourseDetails course={course}/>
              <CourseLessons course={course}/>
              <CourseQuizzes course={course}/>
            </div>
            <div className='hidden w-full md:w-1/3 lg:w-1/4 md:flex  justify-center content-center'>
             <CourseStatsAndStart course={course}/>
            </div>
          </div>
        </div>
      </section>
    )
  )
}
