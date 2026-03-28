import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function getRecommendations() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await auth();

  const publicBookmarks = await prisma.bookmark.findMany({
    where: {
      isPublic: true,
      userId: {
        not: session!.user!.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    select: {
      id: true,
      title: true,
      url: true,
      tags: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return publicBookmarks;
}

export default async function RecommendationsSlot() {
  const recommendations = await getRecommendations();

  return (
    <div className="card space-y-4">
      {recommendations.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">
          No public bookmarks available
        </p>
      ) : (
        <ul className="space-y-4">
          {recommendations.map((bookmark) => (
            <li
              key={bookmark.id}
              className="p-4 bg-gray-50 rounded-gumroad border border-gray-200"
            >
              <p className="font-semibold text-gray-900 mb-2">
                {bookmark.title}
              </p>
              <a
                href={bookmark.url}
                target="_blank"
                className="text-sm text-primary-500 hover:text-primary-600 break-all transition-colors"
              >
                {bookmark.url}
              </a>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span>By: {bookmark.user.name || bookmark.user.email}</span>
                <span>•</span>
                <div className="flex flex-wrap gap-1">
                  {bookmark.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
