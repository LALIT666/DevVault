import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

// 📌 Fast: User greeting (no DB call)
async function UserGreeting() {
  const session = await auth();
  return <p>Welcome back, {session!.user!.name || session!.user!.email}!</p>;
}

// 📌 Slow: Recent activity
async function RecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await auth();
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session!.user!.id },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h3>Recent Bookmarks</h3>
      <ul>
        {bookmarks.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div>
      {/* 📌 Fast part - shows immediately */}
      <UserGreeting />

      <p>This is the main dashboard content (default slot)</p>

      {/* 📌 Slow part - streams in later */}
      <Suspense fallback={<div>Loading recent activity...</div>}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
