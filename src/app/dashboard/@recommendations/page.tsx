// 📌 CONCEPT: Recommendations slot

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function getRecommendations() {
  // 📌 Slowest query
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await auth();

  // 📌 Get public bookmarks from other users
  const publicBookmarks = await prisma.bookmark.findMany({
    where: {
      isPublic: true,
      userId: {
        not: session!.user!.id, // 📌 Exclude own bookmarks
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
    <div>
      <p>PARALLEL ROUTE: @recommendations slot</p>

      {recommendations.length === 0 ? (
        <p>No public bookmarks available</p>
      ) : (
        <ul>
          {recommendations.map((bookmark) => (
            <li key={bookmark.id}>
              <strong>{bookmark.title}</strong>
              <br />
              <a href={bookmark.url} target="_blank">
                {bookmark.url}
              </a>
              <br />
              <small>
                By: {bookmark.user.name || bookmark.user.email} | Tags:{" "}
                {bookmark.tags.join(", ")}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
