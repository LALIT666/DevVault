// 📌 CONCEPT: Show loading during navigation

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoadingIndicator() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // 📌 CONCEPT: Detect route changes
  useEffect(() => {
    setLoading(true);

    // Simulate loading indicator
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "blue",
        zIndex: 9999,
      }}
    >
      Loading...
    </div>
  );
}
