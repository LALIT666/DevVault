// 📌 CONCEPT: Edit form with existing data

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BookmarkEditForm from "@/app/components/BookmarkEditForm";

type PageProps = {
  params: { id: string };
};

export default async function EditBookmarkPage({ params }: PageProps) {
  const { id } = params;

  const bookmark = await prisma.bookmark.findUnique({
    where: { id },
  });

  if (!bookmark) {
    notFound();
  }

  return (
    <div>
      <h2>Edit Bookmark</h2>
      <p>SERVER COMPONENET: FETCHING BOOKMARK DATA</p>
      <p>Editing: {bookmark.title}</p>

      <BookmarkEditForm bookmark={bookmark} />
    </div>
  );
}
