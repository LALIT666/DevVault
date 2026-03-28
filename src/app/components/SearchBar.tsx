"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search bookmarks & snippets..."
        className="input flex-1"
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}
