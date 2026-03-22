export default function StatsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Detailed Statistics</h2>
        <p className="text-gray-600">Track your usage over time</p>
      </div>

      {/* This Week Stats */}
      <div className="card-gumroad">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📅</span>
          <h3 className="text-xl font-bold">This Week</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#ff90e8] p-6 rounded-xl border-2 border-black">
            <p className="text-sm font-bold text-gray-700 mb-1">
              Bookmarks added
            </p>
            <p className="text-4xl font-bold">5</p>
            <p className="text-sm text-gray-600 mt-2">↑ 25% from last week</p>
          </div>

          <div className="bg-[#90a8ed] p-6 rounded-xl border-2 border-black">
            <p className="text-sm font-bold text-gray-700 mb-1">
              Snippets added
            </p>
            <p className="text-4xl font-bold">3</p>
            <p className="text-sm text-gray-600 mt-2">↑ 50% from last week</p>
          </div>

          <div className="bg-[#ffc900] p-6 rounded-xl border-2 border-black">
            <p className="text-sm font-bold text-gray-700 mb-1">
              Most used tag
            </p>
            <p className="text-4xl font-bold">react</p>
            <p className="text-sm text-gray-600 mt-2">Used 12 times</p>
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="card-gumroad">
        <h3 className="text-xl font-bold mb-6">Popular Tags</h3>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[#ff90e8] rounded-full font-bold border-2 border-black">
            react (12)
          </span>
          <span className="px-4 py-2 bg-[#90a8ed] rounded-full font-bold border-2 border-black">
            nextjs (8)
          </span>
          <span className="px-4 py-2 bg-[#ffc900] rounded-full font-bold border-2 border-black">
            javascript (7)
          </span>
          <span className="px-4 py-2 bg-[#23a094] text-white rounded-full font-bold border-2 border-black">
            typescript (5)
          </span>
          <span className="px-4 py-2 bg-gray-200 rounded-full font-bold border-2 border-black">
            css (4)
          </span>
        </div>
      </div>

      {/* Activity Graph Placeholder */}
      <div className="card-gumroad">
        <h3 className="text-xl font-bold mb-6">Activity Overview</h3>
        <div className="h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
          <p className="text-gray-500 font-semibold">
            📊 Activity graph coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
