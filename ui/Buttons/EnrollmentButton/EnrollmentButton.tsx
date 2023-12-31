"use client";
import { useAuthProvider } from "@/app/context/auth";
import { supabase } from "@/lib/site/constants";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { toast } from "react-toastify";
function EnrollmentButton({ course }) {
  const [enrolled, setEnrolled] = useState(false);

  const { user } = useAuthProvider();
  const router = useRouter();
  // console.log(course)
  //console.log(user, course)
  const getEnrollmentStatus = async ({ user }) => {
    if (user && course) {
      const { data: bookMarkStatus, error } = await supabase
        .from("bookmarked_courses")
        .select()
        .match({
          student_id: user?.id,
          course_id: course?._id,
          //    enrollment_status: 'enrolled'
        })
        .maybeSingle();

      try {
        let { data } = await supabase
          .from("student_enrollments")
          .select()
          .match({
            student_id: user?.id,
            course_id: course._id,
          })
          .maybeSingle();

        if (!data) {
          return { enrollment: "not_enrolled" };
        } else {
          return {
            enrollment: data.enrollment_status,
            bookMarkStatus: bookMarkStatus || "false",
          };
        }
      } catch (error) {
        // Handle the error here or simply do nothing to suppress it
      }
    }
  };

  const handleButtonAction = async () => {
    //const data = await getEnrollmentStatus({user})

    try {
      if (enrollmentStatus === "not_enrolled") {
        const { data, error } = await supabase
          .from("student_enrollments")
          .insert({
            student_id: user?.id,
            course_id: course?._id,
            enrollment_status: "enrolled",
          })
          .select()
          .single();
        // .select()
        if (error) {
          throw new Error("Error inserting user");
        } else {
          setEnrolled(true);
        }
      }

      if (enrollmentStatus === "enrolled") {
        const { data, error } = await supabase
          .from("student_enrollments")
          .update({ enrollment_status: "in_progress" })
          .match({
            student_id: user?.id,
            course_id: course?._id,
          });

        // .select()
        console.log("Pop Course Window");
        router.push(`/portal/learning/course/${course?._id}/started`);
      }

      if (enrollmentStatus === "in_progress") {
        router.push(`/portal/learning/course/${course?._id}/started`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookMarkAction = async () => {
    //const data = await getEnrollmentStatus({user})
    try {
      if (bookMarkedStatus === "false") {
        const { data, error } = await supabase
          .from("bookmarked_courses")
          .insert({
            student_id: user?.id,
            course_id: course?._id,
            //    enrollment_status: 'enrolled'
          })
          .select()
          .single();
        if (data) {
          toast.info("You have bookmarked this course!");
        }
        // .select()
      } else {
        await supabase
          .from("bookmarked_courses")
          .delete()
          .match({
            student_id: user?.id,
            course_id: course?._id,
            //    enrollment_status: 'enrolled'
          });
        // .select()
        toast.info("This course has been removed from your bookmarks.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "enrollment",
      "bookMarkedStatus",
      user,
      enrolled,
      router,
      handleBookMarkAction,
    ],
    queryFn: ({ queryKey }) => getEnrollmentStatus({ user: queryKey[2] }),
    enabled: !!user,
    refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // retryOnMount: false
  });

  const enrollmentStatus = data?.enrollment;
  const bookMarkedStatus = data?.bookMarkStatus;
  console.log(bookMarkedStatus);
  return (
    user && (
      <div className="space-x-2 flex justify-center w-fit mx-auto">
        <button
          onClick={handleButtonAction}
          className=" w-max min-w-[95px] md:min-w-[105px] xl:min-w-[160px] text-black font-medium bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-100 rounded-md text-sm px-5 py-2.5 text-center mx-auto justify-center flex"
        >
          {enrollmentStatus === "not_enrolled" && "Enroll"}
          {enrollmentStatus === "enrolled" && "Start Course"}
          {enrollmentStatus === "in_progress" && "Resume"}
        </button>
        <button
          onClick={handleBookMarkAction}
          className={`min-w-[40px] lg:min-w-[40px] w-fit text-black font-medium bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-100 rounded-md text-sm px-2.5 py-2.5 text-center mx-auto justify-center flex`}
        >
          {bookMarkedStatus !== "false" ? (
            <FaBookmark className="text-black" />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>
    )
  );
}

export default EnrollmentButton;
