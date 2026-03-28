import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function getRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const session = await auth();

  const [recentBookmarks, recentSnippets] = await Promise.all([
    prisma.bookmark.findMany({
      where: { userId: session!.user!.id },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),
    prisma.snippet.findMany({
      where: { userId: session!.user!.id },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),
  ]);

  return { recentBookmarks, recentSnippets };
}

export default async function ActivitySlot() {
  const activity = await getRecentActivity();

  return (
    <div className="card space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Bookmarks
        </h4>
        {activity.recentBookmarks.length === 0 ? (
          <p className="text-sm text-gray-500">No recent bookmarks</p>
        ) : (
          <ul className="space-y-3">
            {activity.recentBookmarks.map((bookmark) => (
              <li key={bookmark.id} className="group">
                <a
                  href={`/bookmarks/${bookmark.id}`}
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-gumroad transition-colors"
                >
                  <p className="font-medium text-gray-900 group-hover:text-primary-500 transition-colors">
                    {bookmark.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Snippets
        </h4>
        {activity.recentSnippets.length === 0 ? (
          <p className="text-sm text-gray-500">No recent snippets</p>
        ) : (
          <ul className="space-y-3">
            {activity.recentSnippets.map((snippet) => (
              <li key={snippet.id} className="group">
                <a
                  href={`/snippets/${snippet.id}`}
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-gumroad transition-colors"
                >
                  <p className="font-medium text-gray-900 group-hover:text-primary-500 transition-colors">
                    {snippet.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(snippet.createdAt).toLocaleDateString()}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
