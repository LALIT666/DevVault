// 📌 CONCEPT: Preload pattern (React cache + preload)

import { cache } from "react";
import { prisma } from "./prisma";

// 📌 CONCEPT: cache() - Deduplicates requests in same render
export const getBookmark = cache(async (id: string) => {
  console.log("📊 Fetching bookmark:", id);

  return await prisma.bookmark.findUnique({
    where: { id },
    include: { user: true },
  });
});

// 📌 CONCEPT: Preload function
export const preloadBookmark = (id: string) => {
  void getBookmark(id); // 📌 Starts fetch, doesn't wait
};
