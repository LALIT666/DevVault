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
    <div>
      <h2>Data Fetching Strategies</h2>
      <p>Choose based on your needs:</p>

      <ul>
        <li>
          <strong>Strategy 1:</strong> Simple, blocking (for critical data)
        </li>
        <li>
          <strong>Strategy 2:</strong> Parallel (when data independent)
        </li>
        <li>
          <strong>Strategy 3:</strong> Streaming (for non-critical data)
        </li>
        <li>
          <strong>Strategy 4:</strong> Prefetch and share (avoid duplicate
          calls)
        </li>
      </ul>
    </div>
  );
}
