import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

async function UserGreeting() {
  const session = await auth();
  return (
    <p className="text-xl text-gray-700">
      Welcome back,{" "}
      <span className="font-semibold text-gray-900">
        {session!.user!.name || session!.user!.email}
      </span>
      !
    </p>
  );
}

async function RecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const session = await auth();
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session!.user!.id },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Bookmarks
      </h3>
      <ul className="space-y-2">
        {bookmarks.map((b) => (
          <li key={b.id} className="text-gray-700">
            • {b.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <UserGreeting />

      <p className="text-gray-600">
        This is the main dashboard content (default slot)
      </p>

      <Suspense
        fallback={
          <div className="text-sm text-gray-500 animate-pulse py-4">
            Loading recent activity...
          </div>
        }
      >
        <RecentActivity />
      </Suspense>
    </div>
  );
}
