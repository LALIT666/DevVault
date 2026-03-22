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
    <div>
      <h2>Collection: {collectionId}</h2>
      <h3>Bookmarks in this collection:</h3>

      <ul>
        {dummyBookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <a href={`/collections/${collectionId}/bookmarks/${bookmark.id}`}>
              {" "}
              {bookmark.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
