import { ReactNode } from "react";

export default function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-md bg-secondary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
    >
      {children}
    </button>
  );
}
