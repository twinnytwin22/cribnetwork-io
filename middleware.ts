import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.redirect(new URL("/", req.url));
  const nonce = uuid();
  //console.log(nonce);

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  // console.log(session);
  const cspHeaderValue =
    `default-src 'self'; ` +
    `script-src 'self' 'nonce-${nonce}' cdnjs.cloudflare.com; ` +
    `style-src 'self' 'nonce-${nonce}' cdnjs.cloudflare.com; ` +
    `img-src 'self' data:; font-src 'self' cdnjs.cloudflare.com; ` +
    `connect-src 'self'; ` +
    `frame-src 'self'; ` +
    `object-src 'none'`;

  // res.headers.set("Content-Security-Policy", cspHeaderValue);
  if (pathname.startsWith("/login") && session) {
    // Redirect to /portal
    return NextResponse.redirect(new URL("/portal", req.url));
    // console.log(pathname, "PATH_NAME");
  }

  if (pathname.startsWith("/portal") && !session) {
    // Redirect to /portal
    return NextResponse.redirect(new URL("/login", req.url));
    // console.log(pathname, "PATH_NAME");
  }

  // if (session) {
  //   return user;
  // } else {
  //   return res;
  //  }
}

//export const config = {
//  matcher: ["/portal/:path*"],
//};
