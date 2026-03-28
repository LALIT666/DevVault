// 📌 CONCEPT: useRouter for programmatic navigation

"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  // 📌 CONCEPT: useRouter hook (client-side navigation)
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    // 📌 CONCEPT: router.push() - Navigate programmatically
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search bookmarks & snippets..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
