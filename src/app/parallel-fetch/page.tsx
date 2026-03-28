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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Parallel Data Fetching
        </h2>
        <p className="text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-gumroad">
          ⚡ All three queries ran simultaneously!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-primary-50 border-primary-200">
          <p className="text-sm text-primary-600 font-semibold mb-2">
            Bookmarks
          </p>
          <p className="text-4xl font-bold text-primary-900">{bookmarkCount}</p>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-600 font-semibold mb-2">Snippets</p>
          <p className="text-4xl font-bold text-blue-900">{snippetCount}</p>
        </div>

        <div className="card bg-green-50 border-green-200">
          <p className="text-sm text-green-600 font-semibold mb-2">
            Collections
          </p>
          <p className="text-4xl font-bold text-green-900">{collectionCount}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance Comparison
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-gumroad">
            <p className="text-sm font-bold text-red-600 mb-2">
              ❌ Sequential (SLOW)
            </p>
            <pre className="text-xs font-mono text-red-700 overflow-x-auto">
              {`const bookmarks = await prisma.bookmark.count(...)
const snippets = await prisma.snippet.count(...)
const collections = await prisma.collection.count(...)`}
            </pre>
            <p className="text-xs text-red-600 mt-2">
              Total time: Query 1 + Query 2 + Query 3
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-gumroad">
            <p className="text-sm font-bold text-green-600 mb-2">
              ✅ Parallel (FAST)
            </p>
            <pre className="text-xs font-mono text-green-700 overflow-x-auto">
              {`const [bookmarks, snippets, collections] = await Promise.all([
  prisma.bookmark.count(...),
  prisma.snippet.count(...),
  prisma.collection.count(...)
])`}
            </pre>
            <p className="text-xs text-green-600 mt-2">
              Total time: Max(Query 1, Query 2, Query 3)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
