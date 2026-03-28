// 📌 CONCEPT: Client Component for interactivity

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
  // 📌 Client Component - Can use hooks
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "0.5rem",
      }}
    >
      <p>CLIENT COMPONENT: Interactive card</p>

      <h4>
        <Link href={`/bookmarks/${bookmark.id}`}>{bookmark.title}</Link>
      </h4>

      {/* 📌 Client Component - Interactive toggle */}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide" : "Show"} Details
      </button>

      {expanded && (
        <div>
          <p>
            URL:{" "}
            <a href={bookmark.url} target="_blank">
              {bookmark.url}
            </a>
          </p>
          <p>Tags: {bookmark.tags.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
