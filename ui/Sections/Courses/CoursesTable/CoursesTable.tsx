"use client";
import Link from "next/link";
function CourseTable({ courses }) {
  //console.log(courses.courses)
  return (
    courses && (
      <table className="min-w-full w-full mx-auto px-10">
        <thead className="bg-zinc-50 dark:bg-zinc-950">
          <tr>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-zinc-800 dark:text-zinc-300 uppercase tracking-wider">
              Course Title
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-zinc-800 dark:text-zinc-300 uppercase tracking-wider">
              Enrollment Status
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-zinc-800 dark:text-zinc-300 uppercase tracking-wider">
              Completed Lessons
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-zinc-800 dark:text-zinc-300 uppercase tracking-wider">
              Course Link
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200">
          {courses?.map((course: any) => (
            <tr key={course.id} className="text-black dark:text-white">
              <td className="px-6 py-4 whitespace-no-wrap">
                {course.courses.title}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {course.enrollment_status === "in_progress" && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                    In Progress
                  </span>
                )}{" "}
                {course.enrollment_status !== "in_progress" &&
                  course?.enrollment_status}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {course.completed_lessons}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link href={`/portal/learning/course/${course.courses.id}`}>
                  <button className="bg-red-300 text-black rounded-full font-bold text-xs p-1 px-3 hover:scale-105 duration-300 ease-in-out">
                    {course.completed_lessons > 0 ? "Resume" : "Begin"}
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}

export default CourseTable;
