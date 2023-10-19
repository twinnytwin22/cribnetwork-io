import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
export const revalidate = 0;
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  //  const { searchParams } = new URL(request.url);
  //  const userId = searchParams.get("userId");
  try {
    if (request.method === "GET") {
      const { data: artists, error } = await supabaseAdmin
        .from("artists")
        .select();
      //.eq('student_id', userId)
      // .limit(5)
      console.log(artists);

      if (error) {
        throw new Error("Error fetching drops");
      }
      const response = {
        artists,
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json("Error: fetching metadata");
  }

  return NextResponse.json("Error: Method not found");
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}
