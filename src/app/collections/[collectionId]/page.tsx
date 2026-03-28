type PageProps = {
  params: { collectionId: string };
};

export default function CollectionPage({ params }: PageProps) {
  const { collectionId } = params;

  const dummyBookmarks = [
    { id: "1", title: "Bookmark 1" },
    { id: "2", title: "Bookmark 2" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Collection: <span className="text-primary-500">{collectionId}</span>
        </h2>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Bookmarks in this collection:
        </h3>

        <ul className="space-y-3">
          {dummyBookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <a
                href={`/collections/${collectionId}/bookmarks/${bookmark.id}`}
                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-gumroad border border-gray-200 transition-colors group"
              >
                <span className="text-2xl">📑</span>
                <span className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {bookmark.title}
                </span>
                <span className="ml-auto text-gray-400 group-hover:text-gray-600">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
