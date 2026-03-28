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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">
          Snippet Detail
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {snippet.title}
        </h2>
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
          {snippet.language}
        </div>
      </div>

      <div className="card space-y-6">
        {snippet.description && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Description:
            </p>
            <p className="text-gray-700 leading-relaxed">
              {snippet.description}
            </p>
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Code:</p>
          <pre className="bg-gray-900 text-green-400 p-6 rounded-gumroad overflow-x-auto border-2 border-gray-800 font-mono text-sm">
            {snippet.code}
          </pre>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500">Created</p>
            <p className="text-sm font-medium text-gray-900">
              {snippet.createdAt.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Visibility</p>
            <p className="text-sm font-medium text-gray-900">
              {snippet.isPublic ? "Public" : "Private"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          {snippet.user && (
            <div>
              <p className="text-xs text-gray-500">Created by</p>
              <p className="text-sm font-medium text-gray-900">
                {snippet.user.name || snippet.user.email}
              </p>
            </div>
          )}

          {snippet.collection && (
            <div>
              <p className="text-xs text-gray-500">Collection</p>
              <p className="text-sm font-medium text-gray-900">
                {snippet.collection.name}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <a href={`/snippets/${id}/edit`} className="btn btn-secondary">
          Edit
        </a>
        <form action={deleteSnippetWithId}>
          <DeleteButton itemName={snippet.title} />
        </form>
        <a href="/snippets" className="btn btn-secondary ml-auto">
          ← Back
        </a>
      </div>
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
