type PageProps = {
  params: {
    collectionId: string;
    bookmarkId: string;
  };
};

export default function CollectionBookmarkPage({ params }: PageProps) {
  const { collectionId, bookmarkId } = params;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Collection Bookmark Detail
        </h2>
        <p className="text-sm text-gray-500">
          Multiple dynamic segments demonstration
        </p>
      </div>

      <div className="card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-gumroad border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Collection ID
            </p>
            <p className="text-lg font-mono font-semibold text-gray-900">
              {collectionId}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-gumroad border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Bookmark ID
            </p>
            <p className="text-lg font-mono font-semibold text-gray-900">
              {bookmarkId}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            URL Pattern:
          </p>
          <p className="text-sm font-mono text-gray-600 bg-gray-50 px-3 py-2 rounded-gumroad">
            /collections/[collectionId]/bookmarks/[bookmarkId]
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Current URL:
          </p>
          <p className="text-sm font-mono text-primary-500 bg-primary-50 px-3 py-2 rounded-gumroad border border-primary-200">
            /collections/{collectionId}/bookmarks/{bookmarkId}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <a href={`/collections/${collectionId}`} className="btn btn-secondary">
          ← Back to collection
        </a>
      </div>
    </div>
  );
}
