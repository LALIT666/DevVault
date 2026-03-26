// 📌 CONCEPT: Parallel Route Slot - Stats

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function getStats() {
  // 📌 Simulate slow query
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const session = await auth();

  const [bookmarkCount, snippetCount, collectionCount] = await Promise.all([
    prisma.bookmark.count({
      where: { userId: session!.user!.id },
    }),
    prisma.snippet.count({
      where: { userId: session!.user!.id },
    }),
    prisma.collection.count({
      where: { userId: session!.user!.id },
    }),
  ]);

  return { bookmarkCount, snippetCount, collectionCount };
}

export default async function StatsSlot() {
  const stats = await getStats();

  return (
    <div>
      <p>PARALLEL ROUTE: @stats slot</p>

      <div>
        <div>
          <strong>Bookmarks:</strong> {stats.bookmarkCount}
        </div>
        <div>
          <strong>Snippets:</strong> {stats.snippetCount}
        </div>
        <div>
          <strong>Collections:</strong> {stats.collectionCount}
        </div>
      </div>
    </div>
  );
}
