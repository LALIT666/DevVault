// 📌 CONCEPT: All useRouter methods

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function NavigationDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div>
      <h3>Navigation Demo</h3>

      <p>Current pathname: {pathname}</p>
      <p>Current query: {searchParams.toString()}</p>

      <div>
        {/* 📌 router.push() - Navigate with history */}
        <button onClick={() => router.push("/bookmarks")}>
          Push to Bookmarks
        </button>

        {/* 📌 router.replace() - Navigate without history */}
        <button onClick={() => router.replace("/snippets")}>
          Replace with Snippets
        </button>

        {/* 📌 router.back() - Go back */}
        <button onClick={() => router.back()}>Go Back</button>

        {/* 📌 router.forward() - Go forward */}
        <button onClick={() => router.forward()}>Go Forward</button>

        {/* 📌 router.refresh() - Refresh current route */}
        <button onClick={() => router.refresh()}>Refresh Page</button>

        {/* 📌 router.prefetch() - Manual prefetch */}
        <button onClick={() => router.prefetch("/dashboard")}>
          Prefetch Dashboard
        </button>
      </div>
    </div>
  );
}
