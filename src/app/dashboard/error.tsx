"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="card bg-red-50 border-red-200 text-center space-y-4">
      <div className="text-5xl">⚠️</div>
      <h2 className="text-2xl font-bold text-red-900">Something went wrong!</h2>
      <p className="text-sm text-red-700">{error.message}</p>
      <button onClick={reset} className="btn btn-primary">
        Try Again
      </button>
    </div>
  );
}
