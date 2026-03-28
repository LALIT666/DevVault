export default function BookmarkNotFound() {
  return (
    <div className="text-center py-16 space-y-6">
      <div className="text-6xl">📭</div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          404 - Bookmark Not Found
        </h2>
        <p className="text-gray-600">
          The bookmark you&#39;re looking for doesn&#39;t exist.
        </p>
      </div>
      <a href="/bookmarks" className="btn btn-primary inline-block">
        ← Back to Bookmarks
      </a>
    </div>
  );
}
