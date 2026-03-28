"use client";

import { useState } from "react";
import Link from "next/link";

type BookmarkCardProps = {
  bookmark: {
    id: string;
    title: string;
    url: string;
    tags: string[];
  };
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card">
      <h4 className="text-lg font-semibold mb-2">
        <Link
          href={`/bookmarks/${bookmark.id}`}
          className="text-gray-900 hover:text-primary-500 transition-colors"
        >
          {bookmark.title}
        </Link>
      </h4>

      <button
        onClick={() => setExpanded(!expanded)}
        className="btn btn-secondary text-sm mb-3"
      >
        {expanded ? "Hide" : "Show"} Details
      </button>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
          <p className="text-sm text-gray-600">
            URL:{" "}
            <a
              href={bookmark.url}
              target="_blank"
              className="text-primary-500 hover:text-primary-600 underline"
            >
              {bookmark.url}
            </a>
          </p>
          <p className="text-sm text-gray-600">
            Tags: {bookmark.tags.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
