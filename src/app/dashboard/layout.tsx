import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <aside className="w-64 shrink-0">
        <div className="card-gumroad sticky top-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Dashboard Menu
          </h3>

          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold bg-[#ff90e8] border-2 border-black hover:translate-x-1 transition-transform"
              >
                <span>🏠</span>
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/stats"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all hover:translate-x-1"
              >
                <span>📈</span>
                Statistics
              </Link>
            </li>
            <li>
              <Link
                href="/bookmarks"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all hover:translate-x-1"
              >
                <span>🔖</span>
                Bookmarks
              </Link>
            </li>
            <li>
              <Link
                href="/snippets"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all hover:translate-x-1"
              >
                <span>💻</span>
                Snippets
              </Link>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <div className="bg-[#ffc900] p-4 rounded-lg border-2 border-black">
              <p className="font-bold text-sm">🚀 Pro Tip</p>
              <p className="text-xs mt-1">
                Use keyboard shortcuts for faster navigation!
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
