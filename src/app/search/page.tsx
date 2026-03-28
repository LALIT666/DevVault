// 📌 CONCEPT: Server Component with searchParams prop

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type SearchPageProps = {
  searchParams: { q?: string }; // 📌 URL query parameters
};

// 📌 Dynamic metadata based on search query
export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || "";

  return {
    title: query ? `Search: ${query}` : "Search",
    description: `Search results for "${query}"`,
    robots: {
      index: false, // 📌 Don't index search pages
      follow: false,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const query = searchParams.q || "";

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16 space-y-6">
        <div className="text-6xl">🔍</div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Search</h2>
          <p className="text-gray-600">
            Enter a search query to find bookmarks and snippets
          </p>
        </div>
      </div>
    );
  }

  // 📌 Search bookmarks
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: session.user.id,
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          url: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  // 📌 Search snippets
  const snippets = await prisma.snippet.findMany({
    where: {
      userId: session.user.id,
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          code: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalResults = bookmarks.length + snippets.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Search Results
        </h2>
        <div className="bg-gray-50 p-4 rounded-gumroad border border-gray-200">
          <p className="text-sm text-gray-500">Query:</p>
          <p className="text-xl font-semibold text-gray-900 mb-2">{query}</p>
          <p className="text-sm text-gray-600">
            Found{" "}
            <span className="font-bold text-gray-900">{totalResults}</span>{" "}
            results
          </p>
        </div>
      </div>

      {/* 📌 Bookmarks Results */}
      {bookmarks.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Bookmarks ({bookmarks.length})
          </h3>
          <ul className="space-y-3">
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id} className="group">
                <Link
                  href={`/bookmarks/${bookmark.id}`}
                  className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-gumroad border border-gray-200 transition-colors"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors mb-1">
                    {bookmark.title}
                  </p>
                  <p className="text-sm text-gray-500 break-all">
                    {bookmark.url}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 📌 Snippets Results */}
      {snippets.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Snippets ({snippets.length})
          </h3>
          <ul className="space-y-3">
            {snippets.map((snippet) => (
              <li key={snippet.id} className="group">
                <Link
                  href={`/snippets/${snippet.id}`}
                  className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-gumroad border border-gray-200 transition-colors"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors mb-1">
                    {snippet.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-200 rounded-full">
                      {snippet.language}
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {totalResults === 0 && (
        <div className="text-center py-16 card bg-gray-50">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-600">
            No results found for{" "}
            <span className="font-semibold text-gray-900">
              &quot;{query}&quot;
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
