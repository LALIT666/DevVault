import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Metadata } from "next";

// 📌 Static metadata for bookmarks list
export const metadata: Metadata = {
  title: "My Bookmarks",
  description: "View and manage your saved bookmarks",
};

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
              <Link href={`/bookmarks/${bookmark.id}`}>{bookmark.title}</Link>
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

// {/* 📌 CONCEPT: Link component for client-side navigation */}
// {/* This will trigger the intercepting route (modal) */}
// <Link href={`/bookmarks/${bookmark.id}`}>
//   {bookmark.title}
// </Link>

// {/* 📌 Or regular <a> for full page load */}
// {/* <a href={`/bookmarks/${bookmark.id}`}>{bookmark.title}</a>
