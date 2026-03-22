"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>ERROR: Something went wrong!</h2>
      <p>Error: {error.message}</p>

      <button onClick={reset}>Try Again</button>
    </div>
  );
}
