import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/", req.url));
  const user = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Set headers for your website
  const headers = {
    "Content-Security-Policy": "your-content-security-policy",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    // "Referrer-Policy": "your-referrer-policy",
    //"Permissions-Policy": "your-permissions-policy",
  };

  // Set headers in the response
  for (const [header, value] of Object.entries(headers)) {
    res.headers.set(header, value);
  }

  if (session) {
    return user;
  } else {
    return res;
  }
}

export const config = {
  matcher: ["/portal/:path*"],
};
