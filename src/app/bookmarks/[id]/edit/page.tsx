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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Bookmark</h2>
        <p className="text-gray-600">
          Editing: <span className="font-semibold">{bookmark.title}</span>
        </p>
      </div>

      <BookmarkEditForm bookmark={bookmark} />
    </div>
  );
}
