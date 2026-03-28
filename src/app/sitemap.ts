// 📌 CONCEPT: Dynamic sitemap generation
import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://devvault.app";

  // 📌 Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 📌 Dynamic pages - Public bookmarks only
  const publicBookmarks = await prisma.bookmark.findMany({
    where: {
      isPublic: true,
    },
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const bookmarkPages: MetadataRoute.Sitemap = publicBookmarks.map(
    (bookmark) => ({
      url: `${baseUrl}/bookmarks/${bookmark.id}`,
      lastModified: bookmark.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  // 📌 Dynamic pages - Public snippets
  const publicSnippets = await prisma.snippet.findMany({
    where: {
      isPublic: true,
    },
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const snippetPages: MetadataRoute.Sitemap = publicSnippets.map((snippet) => ({
    url: `${baseUrl}/snippets/${snippet.id}`,
    lastModified: snippet.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...bookmarkPages, ...snippetPages];
}
