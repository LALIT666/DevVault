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
    <div>
      <h2>Data Cache Demo</h2>

      <div>
        <h3>1. Default Cache (forever)</h3>
        <p>Stars: {defaultData.stargazers_count}</p>
        <p>Cached until manual revalidation</p>
      </div>

      <div>
        <h3>2. Time-based (60s)</h3>
        <p>Stars: {timeBasedData.stargazers_count}</p>
        <p>Revalidates every 60 seconds</p>
      </div>

      <div>
        <h3>3. No Cache</h3>
        <p>Stars: {noCacheData.stargazers_count}</p>
        <p>Always fresh (fetch on every request)</p>
      </div>

      <hr />

      <div>
        <h3>Cache Options:</h3>
        <pre>{`
// Default (cached forever)
fetch(url)

// Time-based revalidation
fetch(url, { next: { revalidate: 60 } })

// No cache
fetch(url, { cache: 'no-store' })

// Force cache
fetch(url, { cache: 'force-cache' })
        `}</pre>
      </div>
    </div>
  );
}
