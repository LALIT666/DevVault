"use client";

import { useFormStatus } from "react-dom";

type DeleteButtonProps = {
  itemName: string;
};

export default function DeleteButton({ itemName }: DeleteButtonProps) {
  const { pending } = useFormStatus();

  const handleClick = (e: React.MouseEvent) => {
    if (!confirm(`Are you sure you want to delete "${itemName}"`)) {
      e.preventDefault();
    }
  };

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={pending}
      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-gumroad hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
