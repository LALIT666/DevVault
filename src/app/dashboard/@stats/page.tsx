import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Suspense } from "react";

async function BookmarkCount() {
  const session = await auth();

  const count = await prisma.bookmark.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div className="bg-primary-50 p-4 rounded-gumroad border border-primary-200">
      <p className="text-xs text-primary-600 font-semibold mb-1">Bookmarks</p>
      <p className="text-3xl font-bold text-primary-900">{count}</p>
    </div>
  );
}

async function SnippetCount() {
  const session = await auth();

  const count = await prisma.snippet.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div className="bg-blue-50 p-4 rounded-gumroad border border-blue-200">
      <p className="text-xs text-blue-600 font-semibold mb-1">Snippets</p>
      <p className="text-3xl font-bold text-blue-900">{count}</p>
    </div>
  );
}

async function CollectionCount() {
  const session = await auth();

  const count = await prisma.collection.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div className="bg-green-50 p-4 rounded-gumroad border border-green-200">
      <p className="text-xs text-green-600 font-semibold mb-1">Collections</p>
      <p className="text-3xl font-bold text-green-900">{count}</p>
    </div>
  );
}

export default function StatsSlot() {
  return (
    <div className="card space-y-4">
      <Suspense
        fallback={
          <div className="bg-gray-50 p-4 rounded-gumroad animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-12"></div>
          </div>
        }
      >
        <BookmarkCount />
      </Suspense>

      <Suspense
        fallback={
          <div className="bg-gray-50 p-4 rounded-gumroad animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-12"></div>
          </div>
        }
      >
        <SnippetCount />
      </Suspense>

      <Suspense
        fallback={
          <div className="bg-gray-50 p-4 rounded-gumroad animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-12"></div>
          </div>
        }
      >
        <CollectionCount />
      </Suspense>
    </div>
  );
}
