"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";

  const updateFilter = (newType: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", newType);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="card bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">
          Query: <span className="font-semibold text-gray-900">{query}</span>
        </p>
        <p className="text-sm text-gray-600">
          Type: <span className="font-semibold text-gray-900">{type}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => updateFilter("all")}
          className={type === "all" ? "btn btn-primary" : "btn btn-secondary"}
        >
          All
        </button>
        <button
          onClick={() => updateFilter("bookmarks")}
          className={
            type === "bookmarks" ? "btn btn-primary" : "btn btn-secondary"
          }
        >
          Bookmarks
        </button>
        <button
          onClick={() => updateFilter("snippets")}
          className={
            type === "snippets" ? "btn btn-primary" : "btn btn-secondary"
          }
        >
          Snippets
        </button>
      </div>
    </div>
  );
}
