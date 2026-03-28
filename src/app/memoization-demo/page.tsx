// 📌 CONCEPT: Request Memoization Demo

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// 📌 Component 1: Fetches bookmark count
async function BookmarkCounter() {
  const session = await auth();

  console.log("🔍 Component 1: Fetching bookmark count");

  const count = await prisma.bookmark.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div className="bg-blue-50 p-4 rounded-gumroad border border-blue-200">
      <p className="text-sm text-blue-600 font-semibold mb-1">Component 1</p>
      <p className="text-2xl font-bold text-blue-900">Bookmarks: {count}</p>
    </div>
  );
}

// 📌 Component 2: SAME query (should be memoized)
async function BookmarkCounterDuplicate() {
  const session = await auth();

  console.log("🔍 Component 2: Fetching bookmark count (duplicate)");

  const count = await prisma.bookmark.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div className="bg-green-50 p-4 rounded-gumroad border border-green-200">
      <p className="text-sm text-green-600 font-semibold mb-1">
        Component 2 (Memoized)
      </p>
      <p className="text-2xl font-bold text-green-900">
        Total Bookmarks: {count}
      </p>
    </div>
  );
}

// 📌 Component 3: Different query (NOT memoized)
async function SnippetCounter() {
  const session = await auth();

  console.log("🔍 Component 3: Fetching snippet count");

  const count = await prisma.snippet.count({
    where: { userId: session!.user!.id },
  });

  return (
    <div className="bg-orange-50 p-4 rounded-gumroad border border-orange-200">
      <p className="text-sm text-orange-600 font-semibold mb-1">Component 3</p>
      <p className="text-2xl font-bold text-orange-900">Snippets: {count}</p>
    </div>
  );
}

export default function MemoizationDemoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Request Memoization Demo
        </h2>
        <p className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-gumroad">
          💡 Check server console for fetch logs
        </p>
      </div>

      {/* 📌 Both components fetch same data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BookmarkCounter />
        <BookmarkCounterDuplicate />
        {/* 📌 Different query */}
        <SnippetCounter />
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What happened in server console?
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-500 font-bold">1.</span>
            <div>
              <p className="font-semibold text-gray-900">
                Component 1: Fetched bookmark count
              </p>
              <p className="text-sm text-gray-600">
                Initial database query executed
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold">2.</span>
            <div>
              <p className="font-semibold text-gray-900">
                Component 2: Used memoized result
              </p>
              <p className="text-sm text-gray-600">
                No DB call! Same query was cached
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-orange-500 font-bold">3.</span>
            <div>
              <p className="font-semibold text-gray-900">
                Component 3: Fetched snippet count
              </p>
              <p className="text-sm text-gray-600">
                Different query, new database call
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
