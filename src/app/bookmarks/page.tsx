import { prisma } from "@/lib/prisma";

export default async function BookmarksPage() {
  const bookmarks = await prisma.bookmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      <h2>Your Bookmarks</h2>
      <p>Total bookmarks: {bookmarks.length}</p>

      <p>
        <a href="/bookmarks/new">+ Add new bookmark</a>
      </p>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet. Add your first bookmark!</p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <a href={`/bookmarks/${bookmark.id}`}>{bookmark.title}</a>
              <br />
              <small>
                {" "}
                {bookmark.tags.join(",")}|Created:{" "}
                {bookmark.createdAt.toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
