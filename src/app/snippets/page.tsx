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
    <div>
      <h2>Code Snippets</h2>
      <p>Total snippets: {snippets.length}</p>

      <p>
        <a href="/snippets/new">+ Add New Snippet</a>
      </p>

      {snippets.length === 0 ? (
        <p>No snippets yet. Add your first snippet!</p>
      ) : (
        <ul>
          {snippets.map((snippet) => (
            <li key={snippet.id}>
              <a href={`/snippets/${snippet.id}`}>
                {snippet.title} ({snippet.language})
              </a>
              <br />
              <small>Created: {snippet.createdAt.toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
