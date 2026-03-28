import { deleteBookmark } from "@/app/actions/bookmark.actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeleteButton from "@/app/components/DeleteButton";
import { Metadata } from "next";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = params;

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

    openGraph: {
      title: bookmark.title,
      description:
        bookmark.description || `Check out this resource: ${bookmark.title}`,
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

    twitter: {
      card: "summary",
      title: bookmark.title,
      description: bookmark.description || bookmark.url,
    },

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
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-sm font-semibold text-gray-500 mb-2">
          Bookmark Detail
        </h2>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          {bookmark.title}
        </h3>
      </div>

      <div className="card space-y-6">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">URL:</p>
          <a
            href={bookmark.url}
            target="_blank"
            className="text-primary-500 hover:text-primary-600 break-all transition-colors"
          >
            {bookmark.url}
          </a>
        </div>

        {bookmark.description && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Description:
            </p>
            <p className="text-gray-700 leading-relaxed">
              {bookmark.description}
            </p>
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {bookmark.tags.length > 0 ? (
              bookmark.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No tags</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500">Created</p>
            <p className="text-sm font-medium text-gray-900">
              {bookmark.createdAt.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Updated</p>
            <p className="text-sm font-medium text-gray-900">
              {bookmark.updatedAt.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500">Visibility</p>
            <p className="text-sm font-medium text-gray-900">
              {bookmark.isPublic ? "Public" : "Private"}
            </p>
          </div>

          {bookmark.user && (
            <div>
              <p className="text-xs text-gray-500">Created by</p>
              <p className="text-sm font-medium text-gray-900">
                {bookmark.user.name || bookmark.user.email}
              </p>
            </div>
          )}

          {bookmark.collection && (
            <div>
              <p className="text-xs text-gray-500">Collection</p>
              <p className="text-sm font-medium text-gray-900">
                {bookmark.collection.name}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <a href={`/bookmarks/${id}/edit`} className="btn btn-secondary">
          Edit
        </a>
        <form action={deleteBookmarkWithId}>
          <DeleteButton itemName={bookmark.title} />
        </form>
        <a href="/bookmarks" className="btn btn-secondary ml-auto">
          ← Back
        </a>
      </div>
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
