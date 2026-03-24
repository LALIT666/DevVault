import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BookmarksPage() {
  // 📌 Get authenticated user
  const session = await auth();

  //No redirect needed! middleware handles it

  // 📌 CONCEPT: Filter by user ID
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      // ! -> iska matlab simple sa hai ki me ts ko bol raha hu ki mere ko pakka pata hai ki ye null ya undefine nahi hoga or sahi baat hai bhai isse pahalae toh middleware chal raha hai na isliye null nahi hoga
      userId: session!.user!.id, // 📌 Only user's bookmarks
    },
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
        <a href="/bookmarks/new">+ Add New Bookmark</a>
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
                {bookmark.tags.join(", ")} | Created:{" "}
                {bookmark.createdAt.toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
