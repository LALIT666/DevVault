"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type ModalProps = {
  children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => router.back()}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal content */}
      <div className="relative bg-white rounded-gumroad shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto p-8">
        {/* Close button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-2xl font-bold transition-colors"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
