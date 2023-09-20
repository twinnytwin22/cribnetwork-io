
import React from 'react';

function CourseQuizzes({ course }) {
    console.log(course);

    // Initialize a variable to track whether any quizzes were found
    let quizzesFound = false;

    return (
        <div className='bg-white dark:bg-black rounded-lg p-8 border border-zinc-200 dark:border-zinc-800 space-y-4'>
            <h1 className='text-xl font-bold text-black dark:text-white'>Course Quizzes</h1>
            {course.lessons.map((lesson: any) => (
                <React.Fragment key={lesson._id}>
                    {lesson.quizzes?.length > 0 ? (
                        lesson.quizzes.map((quiz: any) => {
                            quizzesFound = true; // Mark that quizzes were found
                            return (
                                <div key={quiz._id} className='border-t border-zinc-300 dark:border-zinc-800 flex justify-between items-center'>
                                    <p className='text-zinc-800 dark:text-zinc-300 font-semibold text-lg my-4'>{quiz.title}</p>
                                    <button className='text-black bg-red-300 px-2.5 p-1 h-fit rounded-lg font-bold'>Take Quiz</button>
                                </div>
                            );
                        })
                    ) : null /* Don't render anything if there are no quizzes for this lesson */}
                </React.Fragment>
            ))}
            {/* Conditionally render the message if no quizzes were found */}
            {!quizzesFound && <p>There are no quizzes associated with this course</p>}
        </div>
    );
}

export default CourseQuizzes;
