import { Suspense } from "react";

// 📌 STRATEGY 1: Fetch at page level (blocking)
async function Strategy1() {
  const data = await fetch("https://api.example.com/data");
  // Page waits for this before rendering
}

// 📌 STRATEGY 2: Parallel fetching
async function Strategy2() {
  const [data1, data2] = await Promise.all([
    fetch("https://api.example.com/data1"),
    fetch("https://api.example.com/data2"),
  ]);
  // Both fetch simultaneously
}

// 📌 STRATEGY 3: Streaming with Suspense
function Strategy3() {
  return (
    <Suspense fallback={<Loading />}>
      <AsyncComponent />
    </Suspense>
  );
  // Page renders, component streams in
}

// 📌 STRATEGY 4: Prefetch in parent, pass to children
async function Strategy4() {
  const data = await fetchData();

  return (
    <>
      <ComponentA data={data} />
      <ComponentB data={data} />
    </>
  );
  // Fetch once, share with multiple components
}

export default function StrategiesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Data Fetching Strategies
        </h2>
        <p className="text-gray-600">Choose based on your needs:</p>
      </div>

      <div className="grid gap-6">
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🔴</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Strategy 1: Blocking Fetch
              </h3>
              <p className="text-gray-700 mb-3">
                Simple, blocking (for critical data)
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono">
                {`async function Strategy1() {
  const data = await fetch("https://api.example.com/data");
  // Page waits for this before rendering
}`}
              </pre>
              <p className="text-xs text-red-600 mt-3">
                ⚠️ Use when: Data is required before showing anything
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🔵</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Strategy 2: Parallel Fetching
              </h3>
              <p className="text-gray-700 mb-3">
                Parallel (when data is independent)
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono">
                {`async function Strategy2() {
  const [data1, data2] = await Promise.all([
    fetch("https://api.example.com/data1"),
    fetch("https://api.example.com/data2"),
  ]);
  // Both fetch simultaneously
}`}
              </pre>
              <p className="text-xs text-blue-600 mt-3">
                ⚡ Use when: Multiple independent data sources
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🟢</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Strategy 3: Streaming with Suspense
              </h3>
              <p className="text-gray-700 mb-3">
                Streaming (for non-critical data)
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono">
                {`function Strategy3() {
  return (
    <Suspense fallback={<Loading />}>
      <AsyncComponent />
    </Suspense>
  );
  // Page renders, component streams in
}`}
              </pre>
              <p className="text-xs text-green-600 mt-3">
                🚀 Use when: Show page fast, load data progressively
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🟣</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Strategy 4: Prefetch & Share
              </h3>
              <p className="text-gray-700 mb-3">
                Prefetch and share (avoid duplicate calls)
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-gumroad overflow-x-auto text-sm font-mono">
                {`async function Strategy4() {
  const data = await fetchData();

  return (
    <>
      <ComponentA data={data} />
      <ComponentB data={data} />
    </>
  );
  // Fetch once, share with multiple components
}`}
              </pre>
              <p className="text-xs text-purple-600 mt-3">
                💡 Use when: Same data needed by multiple children
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📌 CONCEPT EXPLANATION: Ye page different data fetching strategies demonstrate karta hai
          1. Strategy 1 (Blocking): Page tab tak render nahi hota jab tak data fetch nahi ho jata. Critical data ke liye use karo.
          2. Strategy 2 (Parallel): Multiple independent fetches simultaneously hote hain. Time save hota hai.
          3. Strategy 3 (Streaming): Page pehle render hota hai, data baad mein stream hota hai. Better UX.
          4. Strategy 4 (Prefetch & Share): Parent mein data fetch karke children ko pass karo. Duplicate calls avoid.
          
          Choose wisely based on your use case! 
      */}
    </div>
  );
}
