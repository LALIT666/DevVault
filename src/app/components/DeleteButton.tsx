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
    <button type="submit" onClick={handleClick} disabled={pending}>
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
