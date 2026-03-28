// 📌 CONCEPT: Data Cache with fetch()

// 📌 CACHE 1: Default (cached indefinitely)
async function getDefaultCache() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js", {
    // Default: cache: 'force-cache'
  });

  return res.json();
}

// 📌 CACHE 2: Time-based revalidation
async function getTimeBasedCache() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js", {
    next: { revalidate: 60 }, // 📌 Revalidate every 60 seconds
  });

  return res.json();
}

// 📌 CACHE 3: No cache
async function getNoCacheData() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js", {
    cache: "no-store", // 📌 Always fresh, never cached
  });

  return res.json();
}

// 📌 CACHE 4: Revalidate on every request (ISR)
async function getISRData() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js", {
    next: { revalidate: 0 }, // 📌 Revalidate on every request
  });

  return res.json();
}

export default async function DataCacheDemoPage() {
  const defaultData = await getDefaultCache();
  const timeBasedData = await getTimeBasedCache();
  const noCacheData = await getNoCacheData();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Data Cache Demo
        </h2>
        <p className="text-gray-600">
          Different caching strategies with fetch()
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-green-50 border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            1. Default Cache (forever)
          </h3>
          <p className="text-3xl font-bold text-green-600 mb-2">
            {defaultData.stargazers_count.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Stars</p>
          <p className="text-xs text-gray-500 mt-4">
            Cached until manual revalidation
          </p>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            2. Time-based (60s)
          </h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">
            {timeBasedData.stargazers_count.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Stars</p>
          <p className="text-xs text-gray-500 mt-4">
            Revalidates every 60 seconds
          </p>
        </div>

        <div className="card bg-orange-50 border-orange-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            3. No Cache
          </h3>
          <p className="text-3xl font-bold text-orange-600 mb-2">
            {noCacheData.stargazers_count.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Stars</p>
          <p className="text-xs text-gray-500 mt-4">
            Always fresh (fetch on every request)
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Cache Options:
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono border-2 border-gray-800">
          {`// Default (cached forever)
fetch(url)

// Time-based revalidation
fetch(url, { next: { revalidate: 60 } })

// No cache
fetch(url, { cache: 'no-store' })

// Force cache
fetch(url, { cache: 'force-cache' })`}
        </pre>
      </div>
    </div>
  );
}
