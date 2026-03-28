import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/app/components/SnippetEditForm";

type PageProps = {
  params: { id: string };
};

export default async function EditSnippetPage({ params }: PageProps) {
  const { id } = params;

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Snippet</h2>
        <p className="text-gray-600">
          Editing: <span className="font-semibold">{snippet.title}</span>
        </p>
      </div>

      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
