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
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? loadingLabel : label}
    </button>
  );
}
