// 📌 CONCEPT: Navigation Component with next/link

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  // 📌 CONCEPT: usePathname - Get current route
  const pathname = usePathname();

  // 📌 Helper to check active link
  const isActive = (path: string) => pathname === path;

  return (
    <nav>
      <Link
        href="/"
        // 📌 CONCEPT: Conditional styling (active link)
        style={{
          fontWeight: isActive("/") ? "bold" : "normal",
          textDecoration: isActive("/") ? "underline" : "none",
        }}
      >
        Home
      </Link>
      {" | "}

      <Link
        href="/bookmarks"
        style={{
          fontWeight: isActive("/bookmarks") ? "bold" : "normal",
          textDecoration: isActive("/bookmarks") ? "underline" : "none",
        }}
      >
        Bookmarks
      </Link>
      {" | "}

      <Link
        href="/snippets"
        style={{
          fontWeight: isActive("/snippets") ? "bold" : "normal",
          textDecoration: isActive("/snippets") ? "underline" : "none",
        }}
      >
        Snippets
      </Link>
      {" | "}

      <Link
        href="/dashboard"
        style={{
          fontWeight: isActive("/dashboard") ? "bold" : "normal",
          textDecoration: isActive("/dashboard") ? "underline" : "none",
        }}
      >
        Dashboard
      </Link>
    </nav>
  );
}
