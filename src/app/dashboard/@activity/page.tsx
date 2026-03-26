// 📌 CONCEPT: Activity slot

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function getRecentActivity() {
  // 📌 Simulate delay
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
    <div>
      <p>PARALLEL ROUTE: @activity slot</p>

      <h4>Recent Bookmarks</h4>
      {activity.recentBookmarks.length === 0 ? (
        <p>No recent bookmarks</p>
      ) : (
        <ul>
          {activity.recentBookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <a href={`/bookmarks/${bookmark.id}`}>{bookmark.title}</a>
              <br />
              <small>{new Date(bookmark.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}

      <h4>Recent Snippets</h4>
      {activity.recentSnippets.length === 0 ? (
        <p>No recent snippets</p>
      ) : (
        <ul>
          {activity.recentSnippets.map((snippet) => (
            <li key={snippet.id}>
              <a href={`/snippets/${snippet.id}`}>{snippet.title}</a>
              <br />
              <small>{new Date(snippet.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
