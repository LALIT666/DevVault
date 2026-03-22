"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label?: string;
  loadingLabel?: string;
};

export default function SubmitButton({
  label = "Submit",
  loadingLabel = "Submitting...",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? loadingLabel : label}
    </button>
  );
}
