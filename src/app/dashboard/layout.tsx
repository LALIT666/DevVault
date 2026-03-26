// 📌 CONCEPT: Layout with Parallel Route Slots

import { auth } from "@/lib/auth";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode; // 📌 Default slot (page.tsx)
  stats: ReactNode; // 📌 @stats slot
  activity: ReactNode; // 📌 @activity slot
  recommendations: ReactNode; // 📌 @recommendations slot
};

export default async function DashboardLayout({
  children,
  stats,
  activity,
  recommendations,
}: DashboardLayoutProps) {
  const session = await auth();

  const showRecommendations = true;
  return (
    <div>
      <h2>Dashboard</h2>

      {/* 📌 Default content (page.tsx) */}
      <div>{children}</div>

      {/* 📌 CONCEPT: Grid layout with slots */}
      <div>
        {/* Left column - Stats */}
        <div>
          <h3>Statistics</h3>
          {stats} {/* 📌 @stats/page.tsx renders here */}
        </div>

        {/* Middle column - Activity */}
        <div>
          <h3>Recent Activity</h3>
          {activity} {/* 📌 @activity/page.tsx renders here */}
        </div>

        {/* Right column - Recommendations */}
        {showRecommendations && (
          <div>
            <h3>Recommended</h3>
            {recommendations} {/* 📌 @recommendations/page.tsx renders here */}
          </div>
        )}
      </div>
    </div>
  );
}
