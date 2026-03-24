import { Suspense } from "react";
import { auth } from "@/lib/auth";
import FastComponent from "./components/FastComponent";
import SlowComponent from "./components/SlowComponent";

export default async function HomePage() {
  // 📌 Optional: Get session (but don't redirect)
  const session = await auth();

  return (
    <div>
      <h2>Welcome to DevVault</h2>
      <p>Your personal bookmark and code snippet manager</p>

      {session ? (
        <div>
          <p>Welcome back, {session.user?.name || session.user?.email}!</p>
          <p>
            <a href="/dashboard">Go to Dashboard</a>
          </p>
        </div>
      ) : (
        <div>
          <p>Organize your development resources in one place</p>
          <p>
            <a href="/login">Login</a> | <a href="/signup">Sign up</a>
          </p>
        </div>
      )}

      <h3>Features:</h3>
      <ul>
        <li>Save bookmarks with tags</li>
        <li>Store code snippets</li>
        <li>Organize in collections</li>
        <li>Share publicly</li>
      </ul>

      <FastComponent />

      <Suspense fallback={<p>Loading slow data...</p>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
