import { NextRequest, NextResponse } from "next/server";
import { supabaseRouteHandler } from "@/lib/providers/supabase/supabase-server";
export const revalidate = 0

export async function GET(req: NextRequest) {
  const supabase = supabaseRouteHandler()
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
