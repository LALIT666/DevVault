import BookmarkForm from "@/app/components/BookmarkForm";

export default function NewBookmarkPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Add New Bookmark</h2>
      </div>

      <BookmarkForm />
    </div>
  );
}
