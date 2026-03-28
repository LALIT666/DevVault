// 📌 CONCEPT: Tagged fetch requests

// Fetch with tags
export async function getBookmarks(userId: string) {
  const res = await fetch(
    `https://api.example.com/bookmarks?userId=${userId}`,
    {
      next: {
        revalidate: 3600,
        tags: ["bookmarks", `user-${userId}`], // 📌 Tag this request
      },
    },
  );

  return res.json();
}

export async function getBookmark(id: string) {
  const res = await fetch(`https://api.example.com/bookmarks/${id}`, {
    next: {
      tags: ["bookmarks", `bookmark-${id}`], // 📌 Multiple tags
    },
  });

  return res.json();
}
