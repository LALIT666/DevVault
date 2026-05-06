import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import FastComponent from "./components/FastComponent";
import SlowComponent from "./components/SlowComponent";

export const metadata: Metadata = {
  title: "DevVault - Your Personal Code & Bookmark Vault",
  description:
    "Organize your development bookmarks, store code snippets, and manage resources in a beautiful Gumroad-style layout.",
  openGraph: {
    title: "DevVault - Home",
    description: "Welcome to DevVault",
    url: "https://devvault.app",
  },
};

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-black font-sans selection:bg-[#FF90E8] pb-20">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center border-b-[3px] border-black">
        <span className="inline-block bg-[#FFC700] text-xs font-black uppercase tracking-widest px-3 py-1.5 border-2 border-black rounded-full mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          🚀 Stop Losing Your Code Links
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
          Your personal{" "}
          <span className="bg-[#FF90E8] px-2 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-1">
            development
          </span>{" "}
          vault.
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-800 max-w-3xl mx-auto mb-8 leading-relaxed">
          Organize browser tabs, store reusable snippets, and build your custom
          collections in one rock-solid place.
        </p>

        {/* Dynamic CTA Box based on Session */}
        <div className="max-w-md mx-auto mb-4">
          {session ? (
            <div className="bg-[#FFF] border-[3px] border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-lg font-black mb-4">
                👋 Welcome back,{" "}
                <span className="underline decoration-[#FF90E8] decoration-4">
                  {session.user?.name || session.user?.email}
                </span>
              </p>
              <a
                href="/dashboard"
                className="inline-block w-full bg-black text-white font-black text-lg py-4 px-6 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#FF90E8] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#FF90E8] text-center"
              >
                Go to Dashboard →
              </a>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/login"
                className="w-full sm:w-auto bg-white text-black font-black text-lg py-4 px-8 border-[3px] border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center"
              >
                Login
              </a>
              <a
                href="/signup"
                className="w-full sm:w-auto bg-[#FF90E8] text-black font-black text-lg py-4 px-8 border-[3px] border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center"
              >
                Sign up for free
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Features Bento-style Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-black mb-10 inline-block bg-white px-4 py-2 border-2 border-black transform rotate-1">
          What's inside the vault? 👇
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#A3E635] border-[3px] border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl mb-3">🔖</div>
            <h4 className="text-xl font-black mb-2">Smart Bookmarks</h4>
            <p className="font-bold text-sm text-gray-900">
              Save any link with custom tags. No more losing stack-overflow
              answers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#38BDF8] border-[3px] border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl mb-3">💻</div>
            <h4 className="text-xl font-black mb-2">Code Snippets</h4>
            <p className="font-bold text-sm text-gray-900">
              Store boilerplate codes, styles, or logic functions. Copy with one
              click.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FB923C] border-[3px] border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl mb-3">📂</div>
            <h4 className="text-xl font-black mb-2">Collections</h4>
            <p className="font-bold text-sm text-gray-900">
              Group bookmarks and snippets together project-wise or tech-wise.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#F472B6] border-[3px] border-black p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-3xl mb-3">🌐</div>
            <h4 className="text-xl font-black mb-2">Public Sharing</h4>
            <p className="font-bold text-sm text-gray-900">
              Keep them private or share your cool collections with the
              developer world.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Components Workspace Section */}
      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        <div className="bg-white border-[3px] border-black p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-2 border-gray-200 pb-4 mb-4">
            <span className="bg-black text-white text-xs font-black px-2.5 py-1 uppercase rounded">
              Live Preview Workspace
            </span>
          </div>

          <div className="space-y-6">
            {/* Fast Component */}
            <div className="p-2 border-2 border-dashed border-black rounded-xl bg-[#F8FAFCE6]">
              <FastComponent />
            </div>

            {/* Slow Component wrapped in Custom Styled Suspense */}
            <div className="p-2 border-2 border-dashed border-black rounded-xl bg-[#F8FAFCE6]">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-12 gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-black border-t-transparent"></div>
                    <p className="font-black text-lg animate-pulse">
                      Fetching slow server metrics...
                    </p>
                  </div>
                }
              >
                <SlowComponent />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
