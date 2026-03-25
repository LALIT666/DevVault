import { headers, cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 📌 METHOD 1: Read headers from request
  const userAgent = request.headers.get("user-agent");
  const authorization = request.headers.get("authorization");

  // 📌 METHOD 2: Using next/headers (Server Component way)
  //! headers() jo ki next/headers se aatae hai unka kya hai ki na wo server component me use kas sakate hai and routes handlers me bhi use kar sakate hai -- a) More flexible b)Consistent API across Next.js

  const headersList = headers();
  const referer = headersList.get("referer"); //* matlab user kaha se aaya hai matlab ki kis website humari website par aaya hai

  // 📌 METHOD 3: Read cookies
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  // 📌 Create response with custom headers
  const response = NextResponse.json({
    message: "Headers and cookies example",
    userAgent,
    referer,
    theme: theme?.value || "default",
  });

  // 📌 Set custom headers in response
  response.headers.set("X-Custom-Header", "DevVault-API");

  response.headers.set("X-Response-Time", Date.now().toString());

  // 📌 Set cookies in response

  response.cookies.set("last-visit", new Date().toISOString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export async function POST(request: NextRequest) {
  //Reading request body this is how you parse body
  const body = await request.json();

  //Set cookie
  const response = NextResponse.json({
    success: true,
    message: "Cookie set",
    data: body,
  });

  response.cookies.set("preference", JSON.stringify(body), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, //30 days carefull this is not in millisecond like express server
  });

  return response;
}
