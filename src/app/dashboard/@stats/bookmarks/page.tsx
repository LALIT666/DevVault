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
    <div className="card space-y-6">
      <h4 className="text-xl font-semibold text-gray-900">
        Bookmark Analytics
      </h4>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-gumroad border border-green-200">
          <p className="text-xs text-green-600 font-semibold mb-1">Public</p>
          <p className="text-3xl font-bold text-green-900">{publicCount}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-gumroad border border-blue-200">
          <p className="text-xs text-blue-600 font-semibold mb-1">Private</p>
          <p className="text-3xl font-bold text-blue-900">{privateCount}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h5 className="text-sm font-semibold text-gray-900 mb-3">Top Tags:</h5>
        <ul className="space-y-2">
          {topTags.map(([tag, count]) => (
            <li
              key={tag}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span className="text-sm font-medium text-gray-700">{tag}</span>
              <span className="text-sm font-bold text-gray-900">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <a href="/dashboard" className="btn btn-secondary text-sm">
          ← Back to dashboard
        </a>
      </div>
    </div>
  );
}
