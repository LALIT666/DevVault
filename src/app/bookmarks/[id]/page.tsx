import { deleteBookmark } from "@/app/actions/bookmark.actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeleteButton from "@/app/components/DeleteButton";

type PageProps = {
  params: { id: string };
};

export default async function BookmarkDetailPage({ params }: PageProps) {
  const { id } = params;

  const bookmark = await prisma.bookmark.findUnique({
    where: { id },
    include: {
      user: true,
      collection: true,
    },
  });

  if (!bookmark) {
    notFound();
  }

  const deleteBookmarkWithId = deleteBookmark.bind(null, id);

  return (
    <div>
      <h2>Bookmark Detail</h2>

      <h3>{bookmark.title}</h3>
      <p>
        URL:{" "}
        <a href={bookmark.url} target="_blank">
          {bookmark.url}
        </a>
      </p>
      {bookmark.description && <p>Description: {bookmark.description}</p>}

      <div>
        <strong>Tags: </strong>
        {bookmark.tags.length > 0 ? (
          bookmark.tags.map((tag: string) => <span key={tag}>{tag}, </span>)
        ) : (
          <span>No tags</span>
        )}
      </div>

      <p>Created: {bookmark.createdAt.toLocaleString()}</p>

      <p>Updated: {bookmark.updatedAt.toLocaleString()}</p>
      <p>Public: {bookmark.isPublic ? "Yes" : "No"}</p>

      {bookmark.user && (
        <p>Created by: {bookmark.user.name || bookmark.user.email}</p>
      )}

      {bookmark.collection && <p>Collection: {bookmark.collection.name}</p>}

      <hr />
      <a href={`/bookmarks/${id}/edit`}>Edit</a>
      <br />
      <form action={deleteBookmarkWithId}>
        <DeleteButton itemName={bookmark.title} />
      </form>
      <a href={`/bookmarks`}>˿ Back</a>
    </div>
  );
}

export async function generateStaticParams() {
  const bookmarks = await prisma.bookmark.findMany({
    select: { id: true },
  });

  return bookmarks.map((bookmark) => ({
    id: bookmark.id,
  }));
}
