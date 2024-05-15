import React from "react";
import Link from "next/link";
import PrimaryButton from "../atoms/PrimaryButton";

export default function Navbar() {
  return (
    <nav
      className="flex items-center justify-between p-6 lg:px-8 z-50"
      aria-label="Global"
    >
      <div className="flex items-start">
        <Link href="/" className="-m-1.5 p-1.5 font-bold text-xl">
          Izy Content
        </Link>
      </div>
      <div className="flex  gap-10">
        <button className="text-primary-600 hover:text-primary-800">
          Sign in
        </button>
        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </nav>
  );
}
