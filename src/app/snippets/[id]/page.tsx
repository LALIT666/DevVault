import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { deleteSnippet } from "@/app/actions/snippet.actions";
import DeleteButton from "@/app/components/DeleteButton";
import { Metadata } from "next";

type PageProps = {
  params: { id: string };
};

// 📌 Dynamic Metadata for Snippet
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = params;

  const snippet = await prisma.snippet.findUnique({
    where: { id },
    select: {
      title: true,
      description: true,
      language: true,
      code: true,
      isPublic: true,
    },
  });

  if (!snippet) {
    return {
      title: "Snippet Not Found",
    };
  }

  return {
    title: `${snippet.title} - ${snippet.language}`,
    description:
      snippet.description ||
      `Code snippet in ${snippet.language}: ${snippet.title}`,
    keywords: [snippet.language, "code", "snippet", "programming"],

    openGraph: {
      title: snippet.title,
      description: snippet.description || `${snippet.language} code snippet`,
      url: `https://devvault.app/snippets/${id}`,
      type: "article",
    },

    twitter: {
      card: "summary",
      title: snippet.title,
      description: snippet.description || `${snippet.language} snippet`,
    },

    robots: {
      index: snippet.isPublic,
      follow: snippet.isPublic,
    },
  };
}

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

      <h4>Code:</h4>
      <pre>{snippet.code}</pre>

      <p>Created: {snippet.createdAt.toLocaleString()}</p>
      <p>Public: {snippet.isPublic ? "Yes" : "No"}</p>

      {snippet.user && (
        <p>Created by: {snippet.user.name || snippet.user.email}</p>
      )}

      {snippet.collection && <p>Collection: {snippet.collection.name}</p>}

      <hr />

      <a href={`/snippets/${id}/edit`}>Edit</a>

      <form action={deleteSnippetWithId}>
        <DeleteButton itemName={snippet.title} />
      </form>

      <a href="/snippets">← Back</a>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await prisma.snippet.findMany({
    select: { id: true },
  });

  return snippets.map((snippet) => ({
    id: snippet.id,
  }));
}
