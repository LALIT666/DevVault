// 📌 CONCEPT: Server Component (no "use client")

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import BookmarkCard from "./BookmarkCard"; // Client Component

export default async function BookmarkList() {
  const session = await auth();

  // 📌 Server Component - Direct database access
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session!.user!.id },
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p>SERVER COMPONENT: Fetched {bookmarks.length} bookmarks</p>

      {/* 📌 CONCEPT: Server Component can render Client Components */}
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
