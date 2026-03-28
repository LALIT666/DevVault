export default function SnippetNotFound() {
  return (
    <div className="text-center py-16 space-y-6">
      <div className="text-6xl">💻</div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          404 - Snippet Not Found
        </h2>
        <p className="text-gray-600">This code snippet doesn&#39;t exist.</p>
      </div>
      <a href="/snippets" className="btn btn-primary inline-block">
        ← Back to Snippets
      </a>
    </div>
  );
}
