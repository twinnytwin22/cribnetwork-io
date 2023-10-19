import { validateRequest } from "@/lib/hooks/validateRequest";
import { getAllCourses } from "@/lib/providers/sanity/sanity";
import { supabaseApi } from "@/lib/providers/supabase/routerHandler";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("error: Method Not Allowed", { status: 405 });
  }
  try {
    if (req.method === "POST") {
      const validationResponse = await validateRequest(req);

      if (validationResponse) {
        return validationResponse;
      }

      // Fetch course data from Sanity CMS
      const sanityCourses = await getAllCourses();

      // Fetch existing course IDs from Supabase
      const { data: supabaseCourses, error: supabaseError } = await supabaseApi
        .from("courses")
        .select("id");

      if (supabaseError) {
        console.error(
          "Error fetching course IDs from Supabase:",
          supabaseError,
        );
      }

      // Upsert all courses into Supabase
      const upsertPromises = sanityCourses.map(async (sanityCourse: any) => {
        const { _id, title, categories, lessons } = sanityCourse;

        // Extract titles from lessons and categories arrays
        const lessonTitles = lessons
          ?.map((lesson: any) => lesson?.title)
          .filter(Boolean);
        const categoryTitles = categories
          ?.map((category: any) => category?.title)
          .filter(Boolean);

        const courseData = {
          id: _id, // Use the _id from Sanity as the id in Supabase
          title,
          lessons: lessonTitles || [],
          categories: categoryTitles || [],
        };

        const { data, error } = await supabaseApi
          .from("courses")
          .upsert([courseData], { onConflict: "id" }) // Specify the conflict resolution strategy here
          .select();
        console.log(data);
        if (error) {
          console.error("Error syncing data to Supabase:", error);
        }
      });

      // Find courses in Supabase that don't exist in Sanity and mark them for deletion
      const coursesToDelete = supabaseCourses?.filter((supabaseCourse: any) => {
        return !sanityCourses.some(
          (sanityCourse: any) => sanityCourse._id === supabaseCourse.id,
        );
      });

      // Delete courses from Supabase
      if (coursesToDelete && coursesToDelete.length > 0) {
        const { error: deleteError } = await supabaseApi
          .from("courses")
          .delete()
          .in(
            "id",
            coursesToDelete.map((course: any) => course.id),
          );

        if (deleteError) {
          console.error("Error deleting courses from Supabase:", deleteError);
        }
      }

      // Wait for all upserts and deletions to finish
      await Promise.all(upsertPromises);

      return NextResponse.json({
        success: "Course data synced to Supabase successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({
        error: "Method not allowed, or working, please update and try again",
        status: 405,
      });
    }
  } catch (error) {
    // Handle any unexpected errors here
    console.error("Error in webhook processing:", error);
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}
