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
    <div>
      <h2>Edit Snippet</h2>
      <p>Editing: {snippet.title}</p>

      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
