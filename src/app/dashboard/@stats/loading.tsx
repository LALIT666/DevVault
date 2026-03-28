export default function StatsLoading() {
  return (
    <div className="card animate-pulse">
      <p className="text-sm font-semibold text-gray-400 mb-4">
        Loading stats...
      </p>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Bookmarks:</span>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Snippets:</span>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Collections:</span>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}
