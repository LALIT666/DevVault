type PageProps = {
  params: {
    collectionId: string; // 📌 From [collectionId]
    bookmarkId: string; // 📌 From [bookmarkId]
  };
};

export default function CollectionBookmarkPage({ params }: PageProps) {
  const { collectionId, bookmarkId } = params;

  return (
    <div>
      <h2>Collection Bookmark Detail</h2>
      <p>SERVER COMPONENT: Multiple dynamic segments</p>

      <p>Collection ID: {collectionId}</p>
      <p>Bookmark ID: {bookmarkId}</p>

      <p>URL Pattern: /collections/[collectionId]/bookmarks/[bookmarkId]</p>

      <p>
        Current URL: /collections/{collectionId}/bookmarks/{bookmarkId}
      </p>

      <hr />
      <a href={`/collections/${collectionId}`}>← Back to collection</a>
    </div>
  );
}
