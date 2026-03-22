"use client";

import Link from "next/link";
import { useState } from "react";

export default function BookmarkSearch() {
  const [search, setSearch] = useState("");

  const allBookmarks = [
    {
      id: 1,
      title: "Next.js Docs",
      url: "https://nextjs.org",
      tags: ["nextjs", "react"],
    },
    {
      id: 2,
      title: "TypeScript Handbook",
      url: "https://typescriptlang.org",
      tags: ["typescript"],
    },
    {
      id: 3,
      title: "Prisma Docs",
      url: "https://prisma.io",
      tags: ["prisma", "database"],
    },
  ];

  // 📌 CONCEPT: Client-side filtering
  const filteredBookmarks = allBookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
      bookmark.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <div>
      <p>CLIENT COMPONENT: Search (interactive)</p>

      {/* 📌 CONCEPT: Controlled input */}
      <input
        type="text"
        placeholder="Search bookmarks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>Found: {filteredBookmarks.length} bookmarks</p>

      {filteredBookmarks.map((bookmark) => (
        <div key={bookmark.id}>
          <h3>{bookmark.title}</h3>
          <Link href={bookmark.url} target="_blank">
            {bookmark.url}
          </Link>
          <div>
            {bookmark.tags.map((tag) => (
              <span key={tag}>{tag} </span>
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
