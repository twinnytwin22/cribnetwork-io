import { Kafka } from "@upstash/kafka";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  let cookie = req.cookies.getAll();
  //console.log(cookie)
  const { pathname } = req.nextUrl;
  const res = NextResponse.redirect(new URL("/", req.url));
  const nonce = uuid();

  const requestOrigin = req.headers.get("origin");
  const allowedOrigins = [
    "https://cribnetwork.io",
    "http://localhost:3000",
    "https://cribmusic.xyz",
  ];
  // Check if the request's origin is in the allowed origins list
  if (requestOrigin) {
    // If the origin is allowed, set the appropriate CORS headers
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Authorization",
    );
  }
  //console.log(nonce);


  //console.log(session);

  const cspHeaderValue =
    `default-src 'self'; ` +
    `script-src 'self' 'nonce-${nonce}' cdnjs.cloudflare.com https://checkout.stripe.com; ` +
    `style-src 'self' 'nonce-${nonce}' cdnjs.cloudflare.com; ` +
    `img-src 'self' data: https://*.stripe.com; ` +
    `font-src 'self' cdnjs.cloudflare.com; ` +
    `connect-src 'self' https://checkout.stripe.com; ` +
    `frame-src 'self' https://checkout.stripe.com; ` +
    `object-src 'none'`;

  const kafka = new Kafka({
    url: "https://real-goldfish-14081-us1-rest-kafka.upstash.io",
    username: "bWFpbi1yb2RlbnQtNjQwMiQCjmMiRKifErskI3jv8SDO0JyQUDnVuti-_wMZFjo",
    password: "ZTUzZTg5MWQtNzkyOS00NjlmLTg1MzgtNTA3OTEzMmMxYWQ3",
  });
  const message = {
    country: req.geo?.country,
    city: req.geo?.city,
    region: req.geo?.region,
    url: req.url,
    ip: req.headers.get("x-real-ip"),
    mobile: req.headers.get("sec-ch-ua-mobile"),
    platform: req.headers.get("sec-ch-ua-platform"),
    useragent: req.headers.get("user-agent"),
  };

  //
  res.cookies.set("Set-Cookie", "SameSite=None; Secure");

  const p = kafka.producer();
  const topic = "words";

  if (pathname === "/") {
    // await p.produce(topic, JSON.stringify(message));
    return NextResponse.next();
  }

  //return await updateSession(req)


  // if (pathname.startsWith("/login") && session) {
  //   return NextResponse.redirect(new URL("/portal", req.url));
  // }

  // if (pathname.startsWith("/portal") && !session) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (session) {
  //   return user;
  // } else {
  //   return res;
  //  }
}

//export const config = {
//  matcher: ["/portal/:path*"],
//};
