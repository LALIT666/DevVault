"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="card max-w-sm mx-auto text-center">
      <p className="text-sm text-gray-500 mb-4">CLIENT COMPONENT: Counter</p>
      <p className="text-4xl font-bold text-gray-900 mb-6">{count}</p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="btn btn-primary"
        >
          +
        </button>
        <button
          onClick={() => setCount((c) => c - 1)}
          className="btn btn-secondary"
        >
          -
        </button>
      </div>
    </div>
  );
}
