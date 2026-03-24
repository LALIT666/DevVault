import Link from "next/link";
import { ReactNode } from "react";
import UserInfo from "./components/UserInfo";

export const metadata = {
  title: "DevVault - Bookmark & Snippet Manager",
  description: "Save your dev resources",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>DevVault</h1>
          <nav>
            <Link href="/">Home</Link> |<a href="/bookmarks">Bookmarks</a> |
            <Link href="/snippets">Snippets</Link> |
            <Link href="/dashboard">Dashboard</Link> |
            <Link href="/login">Login</Link>
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
