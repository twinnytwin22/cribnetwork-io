import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/hooks/validateRequest';
import { getAllCourses } from '@/lib/providers/sanity/sanity';
import { supabaseApi } from '@/lib/providers/supabase/routerHandler';

export async function POST(req: Request) {
    let dataReturn: any = null

  try {
    if (req.method === 'POST') {
      const validationResponse = await validateRequest(req);

      if (validationResponse) {
        return validationResponse;
      }

      // Fetch course data from Sanity CMS
      const sanityCourses = await getAllCourses();

      // Upsert each course into Supabase
      for (const sanityCourse of sanityCourses) {
        const { _id, title, categories, lessons } = sanityCourse;

            if (sanityCourse && lessons && categories) {
          // Extract titles from lessons and categories arrays
          const lessonTitles = lessons?.map((lesson: any) => lesson.title).filter(Boolean);
          const categoryTitles = categories?.map((category: any) => category.title).filter(Boolean);
  

        const courseData = {
          id: _id, // Use the _id from Sanity as the id in Supabase
          title,
          categories: categoryTitles && categoryTitles || [],
          lessons: lessonTitles && lessonTitles || [],
        };

        let { data, error } = await supabaseApi
          .from('courses')
          .upsert([courseData])
          .select();

        if (data) {
        console.log(data)
        dataReturn = data
         }
        if (error) {
          console.error('Error syncing data to Supabase:', error);
        }
      }

      return NextResponse.json({
        success: 'Course data synced to Supabase successfully',
        status: 200,
        dataReturn
      });
    }
    } else {
      return NextResponse.json({
        error: 'Method not allowed, or working, please update and try again',
        status: 405
      });
    }
  } catch (error) {
    // Handle any unexpected errors here
    console.error('Error in webhook processing:', error);
    return NextResponse.json({
      error: 'Internal server error',
      status: 500
    });
  }
}
