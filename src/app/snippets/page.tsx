import { prisma } from "@/lib/prisma";

export default async function SnippetsPage() {
  const snippets = await prisma.snippet.findMany({
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
      <p>SERVER COMPONENT: Fetching from database</p>
      <p>Total snippets: {snippets.length}</p>

      <p>
        <a href="/snippets/new">Add new Snippet</a>
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
