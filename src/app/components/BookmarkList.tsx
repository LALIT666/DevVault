import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import BookmarkCard from "./BookmarkCard";

export default async function BookmarkList() {
  const session = await auth();

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session!.user!.id },
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
