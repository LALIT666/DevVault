export default function SnippetsLoading() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Code Snippets</h2>
        <p className="text-gray-500">Loading snippets...</p>
      </div>

      <div className="space-y-4 animate-pulse">
        <div className="card">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="card">
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="card">
          <div className="h-6 bg-gray-200 rounded w-4/5 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
