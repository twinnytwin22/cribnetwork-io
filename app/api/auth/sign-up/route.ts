import { Database } from "@/types/Database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("error: Method Not Allowed", { status: 405 });
  }
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
    return NextResponse.redirect(`${requestUrl.origin}/register?error`, {
      status: 301,
    });
  }
  if (data) {
    return NextResponse.redirect(`${requestUrl.origin}/register?confirm`, {
      status: 301,
    });
  }

  // Provide a default response if neither error nor data is returned
  return new Response("Internal Server Error", { status: 500 });
}
