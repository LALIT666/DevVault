"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function NavigationDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="card space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900">Navigation Demo</h3>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Current pathname:{" "}
          <span className="font-mono text-gray-900">{pathname}</span>
        </p>
        <p className="text-sm text-gray-600">
          Current query:{" "}
          <span className="font-mono text-gray-900">
            {searchParams.toString()}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => router.push("/bookmarks")}
          className="btn btn-primary"
        >
          Push to Bookmarks
        </button>

        <button
          onClick={() => router.replace("/snippets")}
          className="btn btn-secondary"
        >
          Replace with Snippets
        </button>

        <button onClick={() => router.back()} className="btn btn-secondary">
          Go Back
        </button>

        <button onClick={() => router.forward()} className="btn btn-secondary">
          Go Forward
        </button>

        <button onClick={() => router.refresh()} className="btn btn-secondary">
          Refresh Page
        </button>

        <button
          onClick={() => router.prefetch("/dashboard")}
          className="btn btn-secondary"
        >
          Prefetch Dashboard
        </button>
      </div>
    </div>
  );
}
