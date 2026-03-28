import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Modal from "@/app/components/Modal";

type PageProps = {
  params: { id: string };
};

export default async function BookmarkModalPage({ params }: PageProps) {
  const { id } = params;

  const bookmark = await prisma.bookmark.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!bookmark) {
    notFound();
  }

  return (
    <Modal>
      <div className="space-y-6">
        <div className="pb-4 border-b border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Quick View (Modal)</p>
          <h2 className="text-2xl font-bold text-gray-900">{bookmark.title}</h2>
        </div>

        <div>
          <a
            href={bookmark.url}
            target="_blank"
            className="text-primary-500 hover:text-primary-600 break-all transition-colors"
          >
            {bookmark.url}
          </a>
        </div>

        {bookmark.description && (
          <p className="text-gray-700 leading-relaxed">
            {bookmark.description}
          </p>
        )}

        <div className="bg-gray-50 p-4 rounded-gumroad border border-gray-200">
          <strong className="text-sm font-semibold text-gray-900">Tags:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {bookmark.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Created: {bookmark.createdAt.toLocaleDateString()}
        </p>

        <div className="pt-4 border-t border-gray-200">
          <a
            href={`/bookmarks/${id}`}
            className="btn btn-primary w-full text-center"
          >
            View full details
          </a>
        </div>
      </div>
    </Modal>
  );
}
