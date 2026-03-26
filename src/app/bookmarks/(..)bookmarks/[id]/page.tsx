// 📌 CONCEPT: Intercepting Route for Modal

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
      {/* 📌 This renders IN A MODAL */}
      <div>
        <h2>Quick View (Modal)</h2>
        <p>INTERCEPTING ROUTE: (..)bookmarks/[id]</p>

        <h3>{bookmark.title}</h3>
        <p>
          <a href={bookmark.url} target="_blank">
            {bookmark.url}
          </a>
        </p>

        {bookmark.description && <p>{bookmark.description}</p>}

        <div>
          <strong>Tags:</strong> {bookmark.tags.join(", ")}
        </div>

        <p>
          <small>Created: {bookmark.createdAt.toLocaleDateString()}</small>
        </p>

        {/* 📌 Link to full page */}
        <p>
          <a href={`/bookmarks/${id}`}>View full details</a>
        </p>
      </div>
    </Modal>
  );
}
