import React from 'react'

function CourseQuizzes({ course }) {
    return (
        <div className='bg-white dark:bg-black rounded-lg p-8 border border-zinc-200 dark:border-zinc-800 space-y-4'>
            <h1 className='text-xl font-bold text-black dark:text-white'>Course Quizzes</h1>
            {course.quizzes?.length > 0 ?
                course?.quizzes?.map((quiz: any) => (
                    <React.Fragment key={quiz?.title}>
                        <div className='border-t border-zinc-300 dark:border-zinc-800' />
                        <p className='text-zinc-800 dark:text-zinc-300 font-semibold text-lg'>{quiz?.title}</p>
                    </React.Fragment>)) : <p>There are no quizzes associated with this course.</p>}
        </div>
    )
}



export default CourseQuizzes