"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const links = [
    { href: "/bookmarks", label: "Bookmarks" },
    { href: "/snippets", label: "Snippets" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            text-sm font-semibold transition-colors duration-200
            ${
              isActive(link.href)
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }
          `}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
