"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Code2, LayoutDashboard, Computer } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const links = [
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { href: "/snippets", label: "Snippets", icon: Code2 },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <div className="flex items-center gap-4">
      {/* 🛠 Main Nav Links */}
      <nav className="hidden md:flex items-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {links.map((link, index) => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-tight transition-all
                ${index !== links.length - 1 ? "border-r-2 border-black" : ""}
                ${
                  active
                    ? "bg-[#ff90e8] text-black" // Gumroad Pink
                    : "bg-white text-black hover:bg-yellow-300" // Gumroad Yellow on hover
                }
              `}
            >
              <Icon className="w-4 h-4 stroke-[3px]" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* 🐙 GitHub Button (Gumroad Style) */}
      <a
        href="https://github.com/LALIT666/DevVault"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 bg-black text-white border-2 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(255,144,232,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      >
        <Computer className="w-4 h-4" />
        <span className="hidden sm:inline">Star on GitHub</span>
      </a>
    </div>
  );
}
