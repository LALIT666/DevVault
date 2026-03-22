// 📌 CONCEPT: Server Component (no "use client")
import { Suspense } from "react";
import Counter from "./components/Counter";
import FastComponent from "./components/FastComponent";
import SlowComponent from "./components/SlowComponent";

export default function HomePage() {
  return (
    <div>
      <h2>Welcome to DevVault</h2>
      <p>SERVER COMPONENT: Main page</p>

      <FastComponent />
      <Counter />

      <Suspense fallback={<p>Loading slow data...</p>}>
        <SlowComponent />
      </Suspense>

      <div>
        <ul>
          <li>Fast Component loads immediately</li>
          <li>Counter loads immediately</li>
          <li>Slow Component shows fallback, then streams in</li>
        </ul>
      </div>
    </div>
  );
}
