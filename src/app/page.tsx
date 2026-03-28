import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import FastComponent from "./components/FastComponent";
import SlowComponent from "./components/SlowComponent";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to DevVault - organize your development bookmarks and code snippets in one place",
  openGraph: {
    title: "DevVault - Home",
    description: "Welcome to DevVault",
    url: "https://devvault.app",
  },
};

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to DevVault
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personal bookmark and code snippet manager
        </p>
      </div>

      {session ? (
        <div className="card text-center max-w-md mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            Welcome back, {session.user?.name || session.user?.email}!
          </p>
          <p>
            <a href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </a>
          </p>
        </div>
      ) : (
        <div className="card text-center max-w-md mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Organize your development resources in one place
          </p>
          <p className="flex items-center justify-center gap-4">
            <a href="/login" className="btn btn-primary">
              Login
            </a>
            <a href="/signup" className="btn btn-pink">
              Sign up
            </a>
          </p>
        </div>
      )}

      {/* Features Section */}
      <div className="card max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Features:</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-700">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Save bookmarks with tags
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Store code snippets
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Organize in collections
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Share publicly
          </li>
        </ul>
      </div>

      {/* Components */}
      <div className="space-y-6">
        <FastComponent />

        <Suspense
          fallback={
            <p className="text-center text-gray-500 py-8">
              Loading slow data...
            </p>
          }
        >
          <SlowComponent />
        </Suspense>
      </div>
    </div>
  );
}
