import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        {/* Auth Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-600">Authentication</h2>
        </div>

        {/* Auth Content */}
        <div className="card">{children}</div>
      </div>
    </div>
  );
}
