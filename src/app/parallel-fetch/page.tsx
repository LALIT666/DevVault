import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// 📌 CONCEPT: Parallel Data Fetching
export default async function ParallelFetchPage() {
  const session = await auth();

  // ❌ SEQUENTIAL (SLOW)
  // const bookmarks = await prisma.bookmark.count({ where: { userId: session!.user!.id }})
  // const snippets = await prisma.snippet.count({ where: { userId: session!.user!.id }})
  // const collections = await prisma.collection.count({ where: { userId: session!.user!.id }})

  // ✅ PARALLEL (FAST)
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

  return (
    <div>
      <h2>Parallel Data Fetching</h2>
      <p>All three queries ran simultaneously!</p>

      <div>
        <p>Bookmarks: {bookmarkCount}</p>
        <p>Snippets: {snippetCount}</p>
        <p>Collections: {collectionCount}</p>
      </div>
    </div>
  );
}
