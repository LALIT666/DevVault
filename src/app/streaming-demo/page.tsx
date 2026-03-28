// 📌 CONCEPT: Streaming Demo Page

import { Suspense } from "react";

// 📌 Fast Component - 1 second
async function FastData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
      <h3>⚡ Fast Data (1s)</h3>
      <p>This loaded quickly!</p>
    </div>
  );
}

// 📌 Medium Component - 3 seconds
async function MediumData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div>
      <h3>🚀 Medium Data (3s)</h3>
      <p>This took a bit longer</p>
    </div>
  );
}

// 📌 Slow Component - 5 seconds
async function SlowData() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div>
      <h3>🐢 Slow Data (5s)</h3>
      <p>This was the slowest</p>
    </div>
  );
}

export default function StreamingDemoPage() {
  return (
    <div>
      <h2>Streaming Demo</h2>
      <p>Watch how different parts load at different speeds!</p>

      {/* 📌 CONCEPT: Nested Suspense boundaries */}

      {/* Fast - Shows in 1 second */}
      <Suspense fallback={<div>⏳ Loading fast data...</div>}>
        <FastData />
      </Suspense>

      {/* Medium - Shows in 3 seconds */}
      <Suspense fallback={<div>⏳ Loading medium data...</div>}>
        <MediumData />
      </Suspense>

      {/* Slow - Shows in 5 seconds */}
      <Suspense fallback={<div>⏳ Loading slow data...</div>}>
        <SlowData />
      </Suspense>

      <hr />

      <div>
        <h3>What happened?</h3>
        <ul>
          <li>Fast data appeared after 1 second</li>
          <li>Medium data appeared after 3 seconds</li>
          <li>Slow data appeared after 5 seconds</li>
          <li>Each had its own loading state</li>
          <li>Page didn&apos;t block - you could scroll!</li>
        </ul>
      </div>
    </div>
  );
}
