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
      <div>
        <h2>Documentation Home</h2>
        <p>Welcome to DevVault documentation!</p>

        <h3>Browse sections:</h3>
        <ul>
          <li>
            <a href="/docs/getting-started">Getting Started</a>
          </li>
          <li>
            <a href="/docs/api">API Reference</a>
          </li>
          <li>
            <a href="/docs/guides">Guides</a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>Documentation</h2>
      <p>Path: /{slug.join("/")}</p>

      <h3>Segments:</h3>
      <ul>
        {slug.map((segment, index) => (
          <li key={index}>
            Level {index + 1}: {segment}
          </li>
        ))}
      </ul>

      <hr />
      <a href="/docs">← Back to Docs Home</a>
    </div>
  );
}
