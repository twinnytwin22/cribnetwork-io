import { NextResponse } from "next/server";

export const revalidate = 0;
//export const dynamic = 'force-dynamic'
import { supabaseApi } from "@/lib/providers/supabase/routerHandler";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  try {
    if (userId) {
      const { data: enrollments, error } = await supabaseApi
        .from("student_enrollments")
        .select("*, courses(*)")
        .eq("student_id", userId)
        .limit(5);
      //console.log(enrollments)

      if (error) {
        throw new Error("Error fetching drops");
      }
      const response = {
        courses: enrollments,
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json("Error: fetching metadata");
  }

  return NextResponse.json("Error: No userId found");
}
