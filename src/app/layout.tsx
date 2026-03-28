import { ReactNode } from "react";
import UserInfo from "./components/UserInfo";
import { Metadata } from "next";

// 📌 CONCEPT: Root Metadata - Base for all pages
export const metadata: Metadata = {
  // 📌 Basic metadata
  title: {
    default: "DevVault - Your Dev Resource Manager",
    template: "%s | DevVault", // 📌 Template for child pages
  },
  description:
    "Save, organize and share your development bookmarks, code snippets and resources. Built with Next.js 14.",

  // 📌 Keywords for SEO
  keywords: [
    "bookmarks",
    "code snippets",
    "developer tools",
    "nextjs",
    "programming",
  ],

  // 📌 Authors
  authors: [{ name: "DevVault Team" }],

  // 📌 Creator
  creator: "DevVault",

  // 📌 Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devvault.app",
    siteName: "DevVault",
    title: "DevVault - Your Dev Resource Manager",
    description: "Save and organize your development resources",
    images: [
      {
        url: "/og-image.png", // Create this image later
        width: 1200,
        height: 630,
        alt: "DevVault Preview",
      },
    ],
  },

  // 📌 Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DevVault - Your Dev Resource Manager",
    description: "Save and organize your development resources",
    creator: "@devvault",
    images: ["/twitter-image.png"],
  },

  // 📌 Robots (search engine crawling)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 📌 Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // 📌 Manifest (PWA)
  manifest: "/manifest.json",

  // 📌 Verification (Google Search Console, etc.)
  verification: {
    google: "google-verification-code",
    // yandex: 'yandex-verification-code',
    // yahoo: 'yahoo-verification-code'
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>DevVault</h1>
          <nav>
            <a href="/">Home</a> |<a href="/bookmarks">Bookmarks</a> |
            <a href="/snippets">Snippets</a> |<a href="/dashboard">Dashboard</a>
          </nav>

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
