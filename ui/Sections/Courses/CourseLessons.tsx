import React from 'react'

function CourseLessons({ course }) {
    return (
        <div className='bg-white dark:bg-black rounded-lg p-8 border border-zinc-200 dark:border-zinc-800 space-y-4'>
            <h1 className='text-xl font-bold text-black dark:text-white'>Course Lessons</h1>
            {course?.lessons.map((lesson: any) => (
                <React.Fragment key={lesson?.title}>
                    <div className='border-t border-zinc-300 dark:border-zinc-800' />
                    <p className='text-zinc-800 dark:text-zinc-300 font-semibold text-lg'>{lesson?.title}</p>
                </React.Fragment>))}
        </div>)
}

export default CourseLessons