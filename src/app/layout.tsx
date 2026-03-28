import { ReactNode } from "react";
import { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import UserInfo from "./components/UserInfo";

export const metadata: Metadata = {
  title: {
    default: "DevVault - Your Dev Resource Manager",
    template: "%s | DevVault",
  },
  description:
    "Save, organize and share your development bookmarks and code snippets.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <a
                  href="/"
                  className="text-2xl font-bold text-gray-900 hover:text-primary-500 transition-colors duration-200"
                >
                  DevVault
                </a>
              </div>

              {/* Navigation */}
              <Navigation />

              {/* User Info */}
              <UserInfo />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2024 DevVault. Built with Next.js 14.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
