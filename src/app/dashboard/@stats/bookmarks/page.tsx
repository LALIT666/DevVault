// 📌 CONCEPT: Nested route in parallel slot

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function BookmarkStatsPage() {
  const session = await auth();

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session!.user!.id },
    select: { tags: true, isPublic: true },
  });

  const publicCount = bookmarks.filter((b) => b.isPublic).length;
  const privateCount = bookmarks.length - publicCount;

  // Count tags
  const tagMap: Record<string, number> = {};
  bookmarks.forEach((b) => {
    b.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div>
      <p>NESTED PARALLEL ROUTE: @stats/bookmarks</p>

      <h4>Bookmark Analytics</h4>

      <div>
        <p>Public: {publicCount}</p>
        <p>Private: {privateCount}</p>
      </div>

      <h5>Top Tags:</h5>
      <ul>
        {topTags.map(([tag, count]) => (
          <li key={tag}>
            {tag}: {count}
          </li>
        ))}
      </ul>

      <p>
        <a href="/dashboard">← Back to dashboard</a>
      </p>
    </div>
  );
}
