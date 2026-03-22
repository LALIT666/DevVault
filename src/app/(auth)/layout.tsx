import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Auth Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🔐</span>
          <h2 className="text-2xl font-bold text-gray-600">Authentication</h2>
        </div>

        {/* Auth Content */}
        <div className="card-gumroad">{children}</div>
      </div>
    </div>
  );
}
