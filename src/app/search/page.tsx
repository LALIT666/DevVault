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
      <div>
        <h2>Search</h2>
        <p>Enter a search query to find bookmarks and snippets</p>
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
    <div>
      <h2>Search Results</h2>
      <p>
        Query: <strong>{query}</strong>
      </p>
      <p>Found {totalResults} results</p>

      {/* 📌 Bookmarks Results */}
      {bookmarks.length > 0 && (
        <div>
          <h3>Bookmarks ({bookmarks.length})</h3>
          <ul>
            {bookmarks.map((bookmark) => (
              <li key={bookmark.id}>
                <Link href={`/bookmarks/${bookmark.id}`}>{bookmark.title}</Link>
                <br />
                <small>{bookmark.url}</small>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 📌 Snippets Results */}
      {snippets.length > 0 && (
        <div>
          <h3>Snippets ({snippets.length})</h3>
          <ul>
            {snippets.map((snippet) => (
              <li key={snippet.id}>
                <Link href={`/snippets/${snippet.id}`}>{snippet.title}</Link>
                <br />
                <small>{snippet.language}</small>
              </li>
            ))}
          </ul>
        </div>
      )}

      {totalResults === 0 && <p>No results found for &quot;{query}&quot;</p>}
    </div>
  );
}
