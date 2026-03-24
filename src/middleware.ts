import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log("🔒 Middleware running on:", nextUrl.pathname);
  console.log("👤 User logged in:", isLoggedIn);

  // 📌 Route categories
  const isAuthRoute =
    nextUrl.pathname === "/login" || nextUrl.pathname === "/signup";

  const isProtectedRoute =
    nextUrl.pathname.startsWith("/bookmarks") ||
    nextUrl.pathname.startsWith("/snippets") ||
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/collections");

  const isApiRoute = nextUrl.pathname.startsWith("/api");

  const isPublicRoute =
    nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/docs");

  // 📌 CONCEPT: Custom headers (optional - for debugging)
  const headers = new Headers(req.headers);
  headers.set("x-current-path", nextUrl.pathname);
  headers.set("x-user-authenticated", isLoggedIn.toString());

  // 📌 LOGIC: Auth route redirect
  if (isAuthRoute && isLoggedIn) {
    console.log("✅ Already logged in, redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // 📌 LOGIC: Protected route check
  if (isProtectedRoute && !isLoggedIn) {
    console.log("❌ Not logged in, redirecting to login");
    // 📌 CONCEPT: Preserve intended destination
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 📌 LOGIC: API routes - separate handling
  if (isApiRoute && !isLoggedIn && !nextUrl.pathname.startsWith("/api/auth")) {
    console.log("❌ Unauthorized API access");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 📌 LOGIC: Public routes
  if (isPublicRoute) {
    console.log("✅ Public route, allowing access");
    return NextResponse.next({ headers });
  }

  // 📌 Default: Continue
  console.log("✅ Proceeding to route");
  return NextResponse.next({ headers });
});

// 📌 CONCEPT: Optimized matcher
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bookmarks/:path*",
    "/snippets/:path*",
    "/collections/:path*",
  ],
};
