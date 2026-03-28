import { ReactNode } from "react";
import UserInfo from "./components/UserInfo";
import Navigation from "./components/Navigation";
import { Metadata } from "next";
import SearchBar from "./components/SearchBar";
import LoadingIndicator from "./components/LoadingIndicator";

export const metadata: Metadata = {
  title: {
    default: "DevVault - Your Dev Resource Manager",
    template: "%s | DevVault",
  },
  description:
    "Save, organize and share your development bookmarks, code snippets and resources. Built with Next.js 14.",
  keywords: [
    "bookmarks",
    "code snippets",
    "developer tools",
    "nextjs",
    "programming",
  ],
  authors: [{ name: "DevVault Team" }],
  creator: "DevVault",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devvault.app",
    siteName: "DevVault",
    title: "DevVault - Your Dev Resource Manager",
    description: "Save and organize your development resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevVault - Your Dev Resource Manager",
    description: "Save and organize your development resources",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <LoadingIndicator />
          <h1>DevVault</h1>

          {/* 📌 Use Link-based Navigation */}
          <Navigation />

          <SearchBar />

          <UserInfo />
        </header>

        <main>{children}</main>

        <footer>
          <p>© 2024 DevVault</p>
        </footer>
      </body>
    </html>
  );
}
