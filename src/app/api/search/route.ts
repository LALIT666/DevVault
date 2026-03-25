// 📌 CONCEPT: Search API with query parameters

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 📌 Get search query
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const type = searchParams.get("type"); // 'bookmark' | 'snippet' | 'all'

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 },
      );
    }

    const results: any = {
      query,
      bookmarks: [],
      snippets: [],
    };

    // 📌 Search bookmarks
    if (type === "bookmark" || type === "all" || !type) {
      results.bookmarks = await prisma.bookmark.findMany({
        where: {
          userId: session.user.id,
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive", // 📌 Case-insensitive search
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
        select: {
          id: true,
          title: true,
          url: true,
          description: true,
          tags: true,
          createdAt: true,
        },
      });
    }

    // 📌 Search snippets
    if (type === "snippet" || type === "all" || !type) {
      results.snippets = await prisma.snippet.findMany({
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
        select: {
          id: true,
          title: true,
          language: true,
          description: true,
          createdAt: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: results,
      counts: {
        bookmarks: results.bookmarks.length,
        snippets: results.snippets.length,
        total: results.bookmarks.length + results.snippets.length,
      },
    });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
