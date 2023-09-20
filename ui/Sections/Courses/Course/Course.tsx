'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import PortableText from '@/ui/Components/PortableText/PortableText';
import  useCourseStore from '../courseStore';

function getYoutubeVideoId(url) {
  const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\/(\w+)\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/|\/d\/)([^#\&\?]*).*/);
  return (videoIdMatch && videoIdMatch[2]) || '';
}

function Course({ course, image }) {
 // const [activeLesson, setActiveLesson] = useState<any>(null);
 const {
  activeLessonIndex,
  activeModuleIndex,
  finishedScreen,
  setActiveLessonIndex,
  setActiveModuleIndex,
  setFinishedScreen,
} = useCourseStore();
  const courseHeaderStyle = 'text-black dark:text-zinc-100 font-bold text-3xl'
  const courseBodyStyle = 'text-black dark:text-zinc-100  text-lg'

  function countModulesInCourse(course: { lessons: { modules: string | any[]; }[]; }) {
    let totalModules = 0;

    if (course && course?.lessons) {
      course?.lessons?.forEach((lesson: { modules: string | any[]; }) => {
        if (lesson.modules && Array.isArray(lesson?.modules)) {
          totalModules += lesson?.modules.length;
        }
      });
    }

    return totalModules;
  }

  const handleLessonClick = (lesson: any) => {
    const lessonIndex = course?.lessons.findIndex((l: any) => l._id === lesson._id);
    // Set the active lesson and module indexes
    setActiveLessonIndex(lessonIndex);
    setActiveModuleIndex(null); // Reset the active module index
  };

  const handleModuleClick = (lesson: any, mod: any) => {
    const lessonIndex = course?.lessons.findIndex((l: any) => l._id === lesson._id);
    const moduleIndex = lesson.modules.findIndex((m: any) => m._id === mod._id);

    // Set the active lesson and module indexes
    setActiveLessonIndex(lessonIndex);
    setActiveModuleIndex(moduleIndex);
  };

  const lessons = course?.lessons || [];
  const modules = lessons[activeLessonIndex]?.modules || [];
  const totalLessons = lessons.length;

  const moduleAndLessonCount = countModulesInCourse(course) + lessons.length; 
  let progressPercentage = 0;

  if (totalLessons > 0) {
    if (activeLessonIndex > 0) {
      // If the active lesson is not the last lesson, calculate progress normally
      progressPercentage = ((activeLessonIndex + 1) * 100) / totalLessons;
    } else if (activeLessonIndex === totalLessons - 1 && !finishedScreen) {
      // If the active lesson is the last lesson and not in the finished screen,
      // set progress to 99.99% to avoid reaching 100% prematurely
      progressPercentage = 99.99;
    } else {
      // If the active lesson is the last lesson and in the finished screen,
      // set progress to 100%
      progressPercentage = 90;
    }
  }

  // Use a state variable to store and update the progress
  const [progress, setProgress] = useState(progressPercentage);

  // Update the progress whenever the active lesson changes
  useEffect(() => {
    const newProgress =
     totalLessons > 0 ? ((activeLessonIndex + 1) * 100) / totalLessons : 0;
    setProgress(newProgress);
  }, [activeLessonIndex]);

  // This totals the modules and lessons count

console.log(moduleAndLessonCount)
  const handleNextClick = () => {
    if (activeModuleIndex === null) {
      // No module is active, try to go to the first module in the current lesson
      if (modules.length > 0) {
        setActiveModuleIndex(0);
        setFinishedScreen(false); // You can use a state variable to track the finished screen

      } else {
        // No modules in the current lesson, move to the next lesson
        const nextLessonIndex = (activeLessonIndex + 1) % lessons.length;
        if (nextLessonIndex === 0) {
          // It's the last lesson, navigate to the finished screen
          setActiveLessonIndex(null);
          setActiveModuleIndex(null);
          setFinishedScreen(true); // You can use a state variable to track the finished screen
        } else {
          setActiveLessonIndex(nextLessonIndex);
          setActiveModuleIndex(null);
          setFinishedScreen(false); // You can use a state variable to track the finished screen

        }
      }
    } else if (activeModuleIndex < modules.length - 1) {
      // If a module is active and there are more modules, move to the next module
      const nextModuleIndex = activeModuleIndex + 1;
      setActiveModuleIndex(nextModuleIndex);
      setFinishedScreen(false); // You can use a state variable to track the finished screen

    } else if (activeModuleIndex === modules.length - 1) {
      // If the last module is active, move to the next lesson
      const nextLessonIndex = (activeLessonIndex + 1) % lessons.length;
      if (nextLessonIndex === 0) {
        // It's the last lesson, navigate to the finished screen
        setActiveLessonIndex(null);
        setActiveModuleIndex(null);
        setFinishedScreen(true); // You can use a state variable to track the finished screen
      } else {
        setActiveLessonIndex(nextLessonIndex);
        setActiveModuleIndex(null);
        setFinishedScreen(false); // You can use a state variable to track the finished screen

      }
    }
  };
  
  

  const renderProgressBar = () => {
    return (
      <div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full">
              Lesson Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-red-3">
              {progress.toFixed(2)}%
            </span>
          </div>
        </div>
        <div 
                    style={{ width: `${progress.toFixed(2)}%` }}

        className="flex h-2 mb-4 overflow-hidden text-xs bg-red-300 rounded">
          <div
            style={{ width: `100%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center border-zinc-800"
          ></div>
        </div>
      </div>
      {/* ... (other UI components) */}
    </div>
    )
  }

  return (
    <section className='w-full h-full mx-auto relative max-w-screen flex  max-h-screen min-h-screen bg-zinc-100 dark:bg-zinc-950'>
      <aside className='w-72 min-w-[288px] bg-zinc-100 dark:bg-zinc-950 border-r border-zinc-300 dark:border-zinc-800 overflow-hidden relative z-20 h-screen'>
        <div className='fixed overflow-y-scroll w-72 h-screen'>
        <div className='w-full relative'>
          <Image
            className='relative bg-cover z-0 bg-center bg-no-repeat rounded-md overflow-hidden'
            width={300}
            height={200}
            src={image}
            alt='bg-image'
            style={{ objectFit: 'cover' }}
          />
          <div className='absolute top-0 left-0 right-0 bottom-0 bg-black w-full bg-opacity-25 overflow-hidden'></div>
        </div>
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

        <div className='absolute z-30 left-2 right-0 top-28 text-zinc-300 select-none font-semibold'>
          {course?.title}
        </div>
        <div className='p-4 relative space-y-4'>
          {course?.lessons.map((lesson: any) => (
            <React.Fragment key={lesson?._id || lesson?.title}>
              <div
                className={`border-t border-zinc-300 dark:border-zinc-800 flex ${lessons[activeLessonIndex]?.title  === lesson?.title ? 'border-red-300' : ''
                  }`}
                onClick={() => handleLessonClick(lesson)}
                style={{ cursor: 'pointer' }}
              >
                <p
                  className={`font-semibold text-base ${lessons[activeLessonIndex]?.title === lesson?.title
                    ? 'text-red-300'
                    : 'text-zinc-800 dark:text-zinc-300'
                    }`}
                >
                  {lesson?.title}
                </p>
              </div>
              {/* Render modules for the active lesson */}
              {lesson?.modules && (
                <div className='pl-2'>
                  {lesson?.modules?.map((mod: any) => (
                    <div
                      key={mod?._id || mod.title}
                      className={`cursor-pointer ${modules[activeModuleIndex]?.title === mod?.title ? 'text-red-400 dark:text-red-200' : 'text-zinc-800 dark:text-zinc-300'
                        }`}
                      onClick={() => handleModuleClick(lesson, mod)}
                    >
                      <p className='font text-base'>{mod.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        </div>
      </aside>
      <div className='p-8 place-items-center max-w-screen w-full min-h-[100vh] h-full text-black dark:text-white '>
        {!finishedScreen && activeModuleIndex !== null ? (
          <div className='space-y-8 '>
            {renderProgressBar()}
          <h1 className={courseHeaderStyle}
            >{modules[activeModuleIndex]?.title}</h1>
            <p className='hidden'>{JSON.stringify(modules[activeModuleIndex].content)}</p>
            {modules[activeModuleIndex]?.videoUrl && (
              <iframe
              className='mx-auto rounded border border-zinc-200 dark:border-zinc-800 aspect-video max-w-4xl w-full'
                title="Lesson Video"
                //width="560"
              //  height="315"
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(modules[activeModuleIndex]?.videoUrl)}`}
                allowFullScreen
              ></iframe>
            )}
                        {!finishedScreen &&

            <PortableText content={modules[activeModuleIndex]?.content} />}

          </div>
        ) : activeLessonIndex < lessons.length ? (
          <div className='space-y-8'>
            {renderProgressBar()}

            <h1 className={courseHeaderStyle}
            >{lessons[activeLessonIndex]?.title}</h1>
             {/* Replace with actual lesson content */}
            <p className='hidden'>{JSON.stringify(lessons[activeLessonIndex])}</p>
            {lessons[activeLessonIndex]?.videoUrl && (
              <iframe
              className='mx-auto rounded border border-zinc-200 dark:border-zinc-800 aspect-video max-w-4xl w-full'
              title="Lesson Video"
              //  width="560"
               // height="315"
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(lessons[activeLessonIndex]?.videoUrl)}`}
                allowFullScreen
              ></iframe>
            )}
            {!finishedScreen &&
            <PortableText content={lessons[activeLessonIndex]?.content || lessons[activeLessonIndex]?.overview || ''} />}
          </div>
        ) : (
          <p>No more lessons or modules to show.</p>
        )}
        {finishedScreen &&
          <div className='p-8 place-items-center w-full min-h-[80vh] h-full'>

            <h1 className={courseHeaderStyle + 'text-center'}>

              FINISHED</h1>
          </div>}
        {!finishedScreen ? <button onClick={handleNextClick} className='bg-red-300 text-black p-2 mt-4 rounded font-bold px-6'>
          Next
        </button>
          : <Link href={`/portal/learning/course/${course?._id}`} className='bg-red-300 text-black font-bold p-2 mt-4 rounded px-6'>
            Exit
          </Link>
        }
       <div className='mb-24'/>
      </div>
    </section>
  );
}

export default Course;


const VideoComponent = (url: string) => {
  return (
  <iframe
  className='mx-auto rounded border border-zinc-200 dark:border-zinc-800'
  title="Lesson Video"
  width="560"
  height="315"
  src={`https://www.youtube.com/embed/${getYoutubeVideoId(url)}`}
  allowFullScreen
></iframe>
  )
}