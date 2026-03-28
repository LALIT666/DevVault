import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Suspense } from "react";

// 📌 CONCEPT: Break into smaller streaming components

// Component 1: Bookmark Count (fast)
async function BookmarkCount() {
  const session = await auth();

  const count = await prisma.bookmark.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div>
      <strong>Bookmarks:</strong> {count}
    </div>
  );
}

// Component 2: Snippet Count (fast)
async function SnippetCount() {
  const session = await auth();

  const count = await prisma.snippet.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div>
      <strong>Snippets:</strong> {count}
    </div>
  );
}

// Component 3: Collection Count (fast)
async function CollectionCount() {
  const session = await auth();

  const count = await prisma.collection.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div>
      <strong>Collections:</strong> {count}
    </div>
  );
}

// 📌 CONCEPT: Parent orchestrates streaming
export default function StatsSlot() {
  return (
    <div>
      <p>PARALLEL ROUTE: @stats with streaming</p>

      {/* 📌 Each stat streams independently */}
      <Suspense fallback={<div>Loading bookmarks...</div>}>
        <BookmarkCount />
      </Suspense>

      <Suspense fallback={<div>Loading snippets...</div>}>
        <SnippetCount />
      </Suspense>

      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionCount />
      </Suspense>
    </div>
  );
}
