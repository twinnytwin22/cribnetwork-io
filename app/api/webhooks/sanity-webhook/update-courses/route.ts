import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/hooks/validateRequest";
import { getAllCourses, imageBuilder } from "@/lib/providers/sanity/sanity";
import { supabaseApi } from "@/lib/providers/supabase/routerHandler";

export const revalidate = 0;

interface CourseData {
  id: string; // Make sure to include the 'id' property
  title: string;
  lessons: string[];
  categories: string[];
  image: string | null;
  total_lessons: number;
  total_modules: number | undefined;
}
export async function POST(req: Request) {
  try {
    if (req.method === "POST") {
      const validationResponse = await validateRequest(req);

      if (validationResponse) {
        return validationResponse;
      }

      // Fetch course data from Sanity CMS
      const sanityCourses = await getAllCourses();

      // Transform and upsert all courses into Supabase
      const upsertPromises = sanityCourses.map(async (sanityCourse: any) => {
        const { _id, title, categories, lessons, image: images } = sanityCourse;

        // Extract titles from lessons and categories arrays
        const lessonTitles = lessons
          ?.map((lesson: any) => lesson?.title)
          .filter(Boolean);
        const categoryTitles = categories
          ?.map((category: any) => category?.title)
          .filter(Boolean);
        const image: string | null =
          images?.length > 0 ? imageBuilder(images[0]) : null; // Assuming you want the first image
        const moduleCount: number = lessons?.reduce(
          (acc: number, lesson: any) => acc + (lesson.modules?.length || 0),
          0,
        );

        const courseData: CourseData = {
          id: _id, // Use the _id from Sanity as the id in Supabase
          title: title || "",
          lessons: lessonTitles || [],
          categories: categoryTitles || [],
          image,
          total_lessons: lessonTitles.length || 0,
          total_modules: moduleCount, // Sum of lesson titles
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

      // Wait for all upserts to finish
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
