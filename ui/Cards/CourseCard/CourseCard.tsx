'use client'
import { imageBuilder } from "@/lib/providers/sanity/sanity";
import Link from "next/link";

const myFun = (myName: string) => {
  const data = myName.toUpperCase().split(" ").slice(0,2);
  const avatarName = data.map((data) => data.charAt(0));
  return avatarName;
};

const CourseCard = ({ course }) => {
  //console.log(course)
  const image = imageBuilder(course.image)


  return (
    <div className="w-full max-w-sm">
      <div
        className="border border-zinc-300 dark:border-zinc-800 rounded-lg hover:drop-shadow-md overflow-hidden relative bg-white dark:bg-black">
        <div className="cursor-pointer h-48 overflow-hidden">
          <Link href={`/portal/learning/course/${course._id}`}>
            <img
              src={image}
              alt="Profile image for particular category"
              sizes="300px"
              className="w-full h-full hover:scale-125 delay-200 duration-300 ease-in-out"
            />
            <span className="absolute top-4 right-4 w-8 h-8 items-center bg-zinc-100 dark:bg-zinc-800 flex justify-center rounded-full text-zinc-900 dark:text-zinc-100">
              {course.title && myFun(course.title)}
            </span>
          </Link>
        </div>
        {/* card fields section  */}
        <div className="p-4 space-y-2 relative h-60 text-zinc-400 dark:text-zinc-400">
          <div>
            <p className="text-sm font-bold truncate">{course?.categories[0]?.title}</p>
          </div>
          <Link href={`/portal/learning/course/${course?._id}`}>
            <span className="text-xl font-bold text-zinc-600 dark:text-zinc-200 overflow-hidden h-12">
              {course?.title}
            </span>
          </Link>
          <div className="flex gap-2 items-center text-zinc-500 dark:text-zinc-300">
            <p className="text-sm font-normal">{course?.description.substring(0, 150)}...<Link href={`/portal/learning/course/${course._id}`}><span className="font-bold">(Read more)</span></Link></p>
          </div>
          <div className="bottom-2 absolute inset-x-0 ">
            <div className="border-t mt-2 mb-2 border-zinc-300 dark:border-zinc-800"></div>
            <span className="text-lg text-zinc-600 dark:text-zinc-200 pl-4">
              Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CourseCard;
