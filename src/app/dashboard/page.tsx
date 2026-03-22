async function getDashboardData() {
  // 📌 Simulating random error
  const shouldError = Math.random() > 0.5;
  console.log(shouldError);

  if (shouldError) {
    throw new Error("Failed to fetch dashboard data!");
  }

  return {
    bookmarks: 12,
    snippets: 8,
    collections: 3,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <p>SERVER COMPONENT: Fetching stats</p>

      <div>
        <div>
          <h3>Total Bookmarks</h3>
          <p>{data.bookmarks}</p>
        </div>
        <div>
          <h3>Total Snippets</h3>
          <p>{data.snippets}</p>
        </div>
        <div>
          <h3>Collections</h3>
          <p>{data.collections}</p>
        </div>
      </div>
    </div>
  );
}
