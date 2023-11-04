import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;

//export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  const { updates, artistId } = await request.json();
  const { id } = updates;
  try {
    if (request.method === "POST") {
      const { data: artist, error } = await supabaseAdmin
        .from("artists")
        .update(updates)
        .eq("id", id || artistId)
        .select()
        .single();
      //.eq('student_id', userId)
      // .limit(5)
      console.log(artist);

      if (error) {
        throw error;
      }
      const response = {
        artist,
      };
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    console.error("Error adding artist:", error);
    return NextResponse.json("Error: adding artist", { status: 400 });
  }

  return NextResponse.json("Error: Method not found", { status: 400 });
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}
