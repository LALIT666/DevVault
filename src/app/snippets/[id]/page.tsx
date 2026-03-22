import { deleteSnippet } from "@/app/actions/snippet-actions";
import DeleteButton from "@/app/components/DeleteButton";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default async function SnippetDetailPage({ params }: PageProps) {
  const { id } = params;

  const snippet = await prisma.snippet.findUnique({
    where: { id },
    include: {
      user: true,
      collection: true,
    },
  });

  if (!snippet) {
    notFound();
  }

  const deleteSnippetWithId = deleteSnippet.bind(null, id);

  return (
    <div>
      <h2>Snippet Detail</h2>
      <h3>{snippet.title}</h3>
      <p>Language: {snippet.language}</p>
      {snippet.description && <p>Description: {snippet.description}</p>}

      <h4>Code: </h4>
      <pre>{snippet.code}</pre>

      <p>Created: {snippet.createdAt.toLocaleString()}</p>
      <p>Public: {snippet.isPublic ? "Yes" : "No"}</p>

      <hr />

      <a href={`/snippets/${id}/edit`}>Edit</a>

      <form action={deleteSnippetWithId}>
        <DeleteButton itemName={snippet.title} />
      </form>

      {snippet.user && (
        <p>Created by: {snippet.user.name || snippet.user.email}</p>
      )}

      {snippet.collection && <p>Collection: {snippet.collection.name}</p>}

      <hr />
      <a href="/snippets">Back</a>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await prisma.snippet.findMany({
    select: { id: true },
  });

  return snippets.map((snippet) => {
    id: snippet.id;
  });
}
