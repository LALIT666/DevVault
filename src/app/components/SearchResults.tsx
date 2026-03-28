// 📌 CONCEPT: useSearchParams in Client Component

"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SearchResults() {
  // 📌 CONCEPT: useSearchParams - Read query params in client
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";

  const updateFilter = (newType: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", newType);

    // 📌 CONCEPT: router.push with query params
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div>
      <p>CLIENT COMPONENT: Reading search params</p>
      <p>Query: {query}</p>
      <p>Type: {type}</p>

      <div>
        <button
          onClick={() => updateFilter("all")}
          style={{ fontWeight: type === "all" ? "bold" : "normal" }}
        >
          All
        </button>
        <button
          onClick={() => updateFilter("bookmarks")}
          style={{ fontWeight: type === "bookmarks" ? "bold" : "normal" }}
        >
          Bookmarks
        </button>
        <button
          onClick={() => updateFilter("snippets")}
          style={{ fontWeight: type === "snippets" ? "bold" : "normal" }}
        >
          Snippets
        </button>
      </div>
    </div>
  );
}
