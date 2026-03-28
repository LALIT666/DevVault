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

  const filteredBookmarks = allBookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
      bookmark.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search bookmarks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      <p className="text-sm text-gray-600">
        Found:{" "}
        <span className="font-semibold text-gray-900">
          {filteredBookmarks.length}
        </span>{" "}
        bookmarks
      </p>

      <div className="space-y-4">
        {filteredBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {bookmark.title}
            </h3>
            <Link
              href={bookmark.url}
              target="_blank"
              className="text-primary-500 hover:text-primary-600 text-sm break-all"
            >
              {bookmark.url}
            </Link>
            <div className="flex flex-wrap gap-2 mt-3">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
