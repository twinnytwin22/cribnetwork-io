'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function Course({ course, image }) {
  const [activeLesson, setActiveLesson] = useState<any>(null);

  const handleLessonClick = (lesson) => {
    console.log('active lesson clicked')
    setActiveLesson(lesson);
  };

  return (
    <section className='w-full h-full mx-auto relative max-w-screen flex pt-16 max-h-screen min-h-screen bg-zinc-100 dark:bg-zinc-950'>
      <aside className=' w-72 min-w-[288px] max-w-full bg-zinc-100 dark:bg-zinc-950 border-r border-zinc-300 dark:border-zinc-800 overflow-y-scroll relative z-20'>
        <Image
          className='relative bg-cover z-0 bg-center bg-no-repeat rounded-md overflow-hidden'
          width={300}
          height={200}
          src={image}
          alt='bg-image'
          style={{ objectFit: 'cover' }}
        />
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black w-full bg-opacity-50 overflow-hidden'></div>
        {course && (
          <div className='absolute left-2 top-4'>
            <Link href={`/portal/learning/course/${course?._id}`}>
              <div className='flex relative items-center space-x-2 text-zinc-300'>
                <FaLongArrowAltLeft />
                <p>Back</p>
              </div>
            </Link>
          </div>
        )}

        <div className='absolute z-30 left-2 right-0 top-28 text-zinc-300'>
          {course?.title}
        </div>
        <div className='p-4 relative space-y-4'>
          {course?.lessons.map((lesson) => (
            <React.Fragment key={lesson?.title}>
              <div
                className='border-t border-zinc-300 dark:border-zinc-800 flex'
                onClick={() => handleLessonClick(lesson)}
                style={{ cursor: 'pointer' }}
              >
              <p
                className={` font-semibold text-base ${
                  activeLesson?.title === lesson?.title ? 'text-red-300' : 'text-zinc-800 dark:text-zinc-300'
                }`}
              >
                {lesson?.title}
              </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </aside>
      <div className='p-8'>
        {activeLesson ? (
          <div>
            <h2>{activeLesson.title}</h2>
            <p>{activeLesson.content}</p> {/* Replace with actual lesson content */}
            <p>{JSON.stringify(activeLesson)}</p>
          </div>
        ) : (
          <p>Click on a lesson to view its content.</p>
        )}
      </div>
    </section>
  );
}

export default Course;
