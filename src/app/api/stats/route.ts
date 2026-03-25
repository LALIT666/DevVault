// 📌 CONCEPT: Aggregation API

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 📌 CONCEPT: Parallel queries with Promise.all
    const [
      bookmarkCount,
      snippetCount,
      collectionCount,
      publicBookmarkCount,
      publicSnippetCount,
      recentBookmarks,
      recentSnippets,
      tagCounts,
    ] = await Promise.all([
      // Total counts
      prisma.bookmark.count({
        where: { userId: session.user.id },
      }),
      prisma.snippet.count({
        where: { userId: session.user.id },
      }),
      prisma.collection.count({
        where: { userId: session.user.id },
      }),

      // Public counts
      prisma.bookmark.count({
        where: {
          userId: session.user.id,
          isPublic: true,
        },
      }),
      prisma.snippet.count({
        where: {
          userId: session.user.id,
          isPublic: true,
        },
      }),

      // Recent items
      prisma.bookmark.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          url: true,
          createdAt: true,
        },
      }),
      prisma.snippet.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          language: true,
          createdAt: true,
        },
      }),

      // 📌 CONCEPT: Get all tags and count them
      prisma.bookmark.findMany({
        where: { userId: session.user.id },
        select: { tags: true },
      }),
    ]);

    // 📌 Process tag counts
    const tagMap: Record<string, number> = {};
    tagCounts.forEach((bookmark) => {
      bookmark.tags.forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });

    const topTags = Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          bookmarks: bookmarkCount,
          snippets: snippetCount,
          collections: collectionCount,
          publicBookmarks: publicBookmarkCount,
          publicSnippets: publicSnippetCount,
        },
        recent: {
          bookmarks: recentBookmarks,
          snippets: recentSnippets,
        },
        topTags,
      },
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
