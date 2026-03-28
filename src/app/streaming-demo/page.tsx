// 📌 CONCEPT: Streaming Demo Page

import { Suspense } from "react";

// 📌 Fast Component - 1 second
async function FastData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="card bg-green-50 border-green-200">
      <h3 className="text-xl font-bold text-green-900 mb-2">
        ⚡ Fast Data (1s)
      </h3>
      <p className="text-green-700">This loaded quickly!</p>
    </div>
  );
}

// 📌 Medium Component - 3 seconds
async function MediumData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="card bg-blue-50 border-blue-200">
      <h3 className="text-xl font-bold text-blue-900 mb-2">
        🚀 Medium Data (3s)
      </h3>
      <p className="text-blue-700">This took a bit longer</p>
    </div>
  );
}

// 📌 Slow Component - 5 seconds
async function SlowData() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="card bg-orange-50 border-orange-200">
      <h3 className="text-xl font-bold text-orange-900 mb-2">
        🐢 Slow Data (5s)
      </h3>
      <p className="text-orange-700">This was the slowest</p>
    </div>
  );
}

export default function StreamingDemoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Streaming Demo
        </h2>
        <p className="text-gray-600">
          Watch how different parts load at different speeds!
        </p>
      </div>

      {/* 📌 CONCEPT: Nested Suspense boundaries */}
      <div className="grid gap-6">
        {/* Fast - Shows in 1 second */}
        <Suspense
          fallback={
            <div className="card animate-pulse bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <span className="text-xl">⏳</span>
                <p className="text-green-700 font-semibold">
                  Loading fast data...
                </p>
              </div>
            </div>
          }
        >
          <FastData />
        </Suspense>

        {/* Medium - Shows in 3 seconds */}
        <Suspense
          fallback={
            <div className="card animate-pulse bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3">
                <span className="text-xl">⏳</span>
                <p className="text-blue-700 font-semibold">
                  Loading medium data...
                </p>
              </div>
            </div>
          }
        >
          <MediumData />
        </Suspense>

        {/* Slow - Shows in 5 seconds */}
        <Suspense
          fallback={
            <div className="card animate-pulse bg-orange-50 border-orange-200">
              <div className="flex items-center gap-3">
                <span className="text-xl">⏳</span>
                <p className="text-orange-700 font-semibold">
                  Loading slow data...
                </p>
              </div>
            </div>
          }
        >
          <SlowData />
        </Suspense>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What happened?
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
              1s
            </span>
            <span className="text-gray-700">
              Fast data appeared after 1 second
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              3s
            </span>
            <span className="text-gray-700">
              Medium data appeared after 3 seconds
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
              5s
            </span>
            <span className="text-gray-700">
              Slow data appeared after 5 seconds
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
              ✓
            </span>
            <span className="text-gray-700">
              Each had its own loading state
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
              🎉
            </span>
            <span className="text-gray-700">
              Page didn&apos;t block - you could scroll!
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
