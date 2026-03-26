// 📌 CONCEPT: Modal Component (Client Component)

"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type ModalProps = {
  children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  // 📌 CONCEPT: Close modal on Escape key
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
    <div>
      {/* 📌 Backdrop */}
      <div
        onClick={() => router.back()}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
        }}
      />

      {/* 📌 Modal content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
          zIndex: 1000,
        }}
      >
        {/* 📌 Close button */}
        <button
          onClick={() => router.back()}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
