"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoadingIndicator() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-primary-500 z-50 animate-pulse">
      <div className="h-full bg-primary-600 w-1/3 animate-pulse"></div>
    </div>
  );
}
