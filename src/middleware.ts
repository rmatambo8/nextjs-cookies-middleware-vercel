import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get("nextjs");
  console.log("cookie", cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log("all cookies", allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  console.log("has: ", request.cookies.has("nextjs")); // => true
  console.log("delete entry:", request.cookies.delete("nextjs"));
  console.log("has: ", request.cookies.has("nextjs")); // => false

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  const existingCookies = response.cookies.getAll();
  console.log("existing cookies: ", existingCookies); // => undefined
  if (!request.cookies.has("vercel")) {
    console.log("setting cookie");
    response.cookies.set("vercel", "fast");
    // additional line to test deletion
    response.cookies.delete("nextjs");
    response.cookies.set({
      name: "vercel",
      value: "fast",
      path: "/",
    });

    cookie = response.cookies.get("vercel");
    console.log("outgoing cookie: ", cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
    // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.
  }
  const allOutgoingCookies = response.cookies.getAll();
  console.log("all outgoing cookies", allOutgoingCookies); // => [{ name: 'vercel', value: 'fast', path: '/' }]
  return response;
}

export const config = {
  matcher: "/demo",
};
