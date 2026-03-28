import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function SnippetsPage() {
  const session = await auth();

  //No redirect needed! Middleware handles it

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const snippets = await prisma.snippet.findMany({
    where: {
      userId: session!.user!.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Code Snippets
          </h2>
          <p className="text-gray-600">
            Total snippets:{" "}
            <span className="font-semibold">{snippets.length}</span>
          </p>
        </div>
        <a href="/snippets/new" className="btn btn-pink">
          + Add New Snippet
        </a>
      </div>

      {snippets.length === 0 ? (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">💻</div>
          <p className="text-gray-600 mb-6">
            No snippets yet. Add your first snippet!
          </p>
          <a href="/snippets/new" className="btn btn-primary inline-block">
            Create Snippet
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              className="card hover:shadow-xl transition-shadow"
            >
              <a href={`/snippets/${snippet.id}`} className="block">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-500 transition-colors">
                    {snippet.title}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {snippet.language}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Created: {snippet.createdAt.toLocaleDateString()}
                </p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
