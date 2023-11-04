import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
//export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  const { updates } = await request.json();

  const { id } = updates; //as UploadSongTypes
  try {
    if (request.method === "POST") {
      const { data: song, error } = await supabaseAdmin
        .from("songs")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      //.eq('student_id', userId)
      // .limit(5)

      if (error) {
        throw new Error("Error editing song:" + JSON.stringify(error));
      }
      const response = {
        song,
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(response, { headers, status: 200 });
    }
  } catch (error) {
    console.error("Error editing song:", error);
    return NextResponse.json("Error: editing song", { headers, status: 400 });
  }

  return NextResponse.json("Error: Method not found", { headers, status: 403 });
}
