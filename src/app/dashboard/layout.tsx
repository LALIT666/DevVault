import { auth } from "@/lib/auth";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  stats: ReactNode;
  activity: ReactNode;
  recommendations: ReactNode;
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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
      </div>

      <div className="card">{children}</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Statistics
          </h3>
          {stats}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          {activity}
        </div>

        {showRecommendations && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Recommended
            </h3>
            {recommendations}
          </div>
        )}
      </div>
    </div>
  );
}
