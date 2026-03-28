type PageProps = {
  params: {
    slug?: string[];
  };
};

export default function DocsPage({ params }: PageProps) {
  const { slug = [] } = params;

  const isRoot = slug.length === 0;

  if (isRoot) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Documentation Home
          </h2>
          <p className="text-gray-600">Welcome to DevVault documentation!</p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Browse sections:
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/docs/getting-started"
                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-gumroad border border-gray-200 transition-colors group"
              >
                <span className="text-2xl">🚀</span>
                <span className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  Getting Started
                </span>
                <span className="ml-auto text-gray-400 group-hover:text-gray-600">
                  →
                </span>
              </a>
            </li>
            <li>
              <a
                href="/docs/api"
                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-gumroad border border-gray-200 transition-colors group"
              >
                <span className="text-2xl">📡</span>
                <span className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  API Reference
                </span>
                <span className="ml-auto text-gray-400 group-hover:text-gray-600">
                  →
                </span>
              </a>
            </li>
            <li>
              <a
                href="/docs/guides"
                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-gumroad border border-gray-200 transition-colors group"
              >
                <span className="text-2xl">📚</span>
                <span className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  Guides
                </span>
                <span className="ml-auto text-gray-400 group-hover:text-gray-600">
                  →
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Documentation</h2>
        <div className="bg-gray-50 p-4 rounded-gumroad border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Current Path:</p>
          <p className="text-lg font-mono text-primary-500">
            /{slug.join("/")}
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Segments:</h3>
        <ul className="space-y-2">
          {slug.map((segment, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-gumroad"
            >
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
                Level {index + 1}
              </span>
              <span className="font-mono text-gray-900">{segment}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <a href="/docs" className="btn btn-secondary">
          ← Back to Docs Home
        </a>
      </div>
    </div>
  );
}
