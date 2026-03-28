export default function RecommendationsLoading() {
  return (
    <div className="card animate-pulse">
      <p className="text-sm font-semibold text-gray-400 mb-2">
        Loading recommendations...
      </p>
      <p className="text-xs text-gray-400 mb-4">
        Finding great resources for you...
      </p>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}
