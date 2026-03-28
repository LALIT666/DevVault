import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "My Bookmarks",
  description: "View and manage your saved bookmarks",
};

export default async function BookmarksPage() {
  const session = await auth();

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: session!.user!.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Bookmarks
          </h2>
          <p className="text-gray-600">
            Total bookmarks:{" "}
            <span className="font-semibold">{bookmarks.length}</span>
          </p>
        </div>
        <a href="/bookmarks/new" className="btn btn-pink">
          + Add New Bookmark
        </a>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-gray-600 mb-6">
            No bookmarks yet. Add your first bookmark!
          </p>
          <a href="/bookmarks/new" className="btn btn-primary inline-block">
            Create Bookmark
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="card hover:shadow-xl transition-shadow"
            >
              <Link href={`/bookmarks/${bookmark.id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-500 transition-colors">
                  {bookmark.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {bookmark.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {bookmark.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{bookmark.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <span>•</span>
                  <span>
                    Created: {bookmark.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
