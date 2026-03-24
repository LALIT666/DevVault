import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
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

  //getting the recent activity

  const recentBookmarks = await prisma.bookmark.findMany({
    where: { userId: session!.user!.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentSnippets = await prisma.snippet.findMany({
    where: { userId: session!.user!.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome back, {session!.user!.name || session!.user!.email}!</p>

      <h3>Your Stats</h3>
      <div>
        <div>
          <h4>Total Bookmarks</h4>
          <p>{bookmarkCount}</p>
        </div>
        <div>
          <h4>Total Snippets</h4>
          <p>{snippetCount}</p>
        </div>
        <div>
          <h4>Collections</h4>
          <p>{collectionCount}</p>
        </div>
      </div>

      <h3>Recent Bookmarks</h3>
      {recentBookmarks.length === 0 ? (
        <p>No bookmarks yet</p>
      ) : (
        <ul>
          {recentBookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <a href={`/bookmarks/${bookmark.id}`}>{bookmark.title}</a>
            </li>
          ))}
        </ul>
      )}

      <h3>Recent Snippets</h3>
      {recentSnippets.length === 0 ? (
        <p>No snippets yes</p>
      ) : (
        <ul>
          {recentSnippets.map((snippet) => (
            <li key={snippet.id}>
              <a href={`/snippets/${snippet.id}`}>{snippet.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
