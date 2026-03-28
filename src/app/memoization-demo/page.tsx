// 📌 CONCEPT: Request Memoization Demo

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// 📌 Component 1: Fetches bookmark count
async function BookmarkCounter() {
  const session = await auth();

  console.log("🔍 Component 1: Fetching bookmark count");

  const count = await prisma.bookmark.count({
    where: { userId: session!.user!.id },
  });

  return <div>Bookmarks: {count}</div>;
}

// 📌 Component 2: SAME query (should be memoized)
async function BookmarkCounterDuplicate() {
  const session = await auth();

  console.log("🔍 Component 2: Fetching bookmark count (duplicate)");

  const count = await prisma.bookmark.count({
    where: { userId: session!.user!.id },
  });

  return <div>Total Bookmarks: {count}</div>;
}

// 📌 Component 3: Different query (NOT memoized)
async function SnippetCounter() {
  const session = await auth();

  console.log("🔍 Component 3: Fetching snippet count");

  const count = await prisma.snippet.count({
    where: { userId: session!.user!.id },
  });

  return <div>Snippets: {count}</div>;
}

export default function MemoizationDemoPage() {
  return (
    <div>
      <h2>Request Memoization Demo</h2>
      <p>Check server console for fetch logs</p>

      {/* 📌 Both components fetch same data */}
      <BookmarkCounter />
      <BookmarkCounterDuplicate />

      {/* 📌 Different query */}
      <SnippetCounter />

      <hr />
      <div>
        <h3>What happened in server console?</h3>
        <ul>
          <li>Component 1: Fetched bookmark count</li>
          <li>Component 2: Used memoized result (no DB call!)</li>
          <li>Component 3: Fetched snippet count (different query)</li>
        </ul>
      </div>
    </div>
  );
}
