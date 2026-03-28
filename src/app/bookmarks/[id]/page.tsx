import { deleteBookmark } from "@/app/actions/bookmark.actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeleteButton from "@/app/components/DeleteButton";
import { Metadata } from "next";

type PageProps = {
  params: { id: string };
};

// 📌 CONCEPT: Dynamic Metadata Generation
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = params;

  //Fetch data for metadata
  const bookmark = await prisma.bookmark.findUnique({
    where: { id },
    select: {
      title: true,
      description: true,
      url: true,
      tags: true,
      isPublic: true,
    },
  });

  if (!bookmark) {
    return {
      title: "Bookmark Not Found",
    };
  }

  return {
    title: bookmark.title,
    description: bookmark.description || `Bookmark: ${bookmark.title}`,
    keywords: bookmark.tags,

    //Open graph for sharing
    openGraph: {
      title: bookmark.title,
      description:
        bookmark.description || `Check out this resource: ${bookmark.title} $`,
      url: `https://devvault.app/bookmarks/${id}`,
      type: "article",
      images: bookmark.isPublic
        ? [
            {
              url: "/og-bookmark.png",
              width: 1200,
              height: 630,
              alt: bookmark.title,
            },
          ]
        : [],
    },

    //twitter Card
    twitter: {
      card: "summary",
      title: bookmark.title,
      description: bookmark.description || bookmark.url,
    },

    //Robots (don't index private bookmarks)
    robots: {
      index: bookmark.isPublic,
      follow: bookmark.isPublic,
    },
  };
}

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
