"use client";

import { useState } from "react";
import Logo from "../atoms/Logo";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const [isExtended, setIsExtended] = useState(false);
  return (
    <div className="flex flex-col justify-between rounded-lg px-6 py-7 border border-red-400">
      <div className="flex flex-col gap-5 items-center">
        <Logo isExtended={isExtended} />
        <Link
          href="/generate"
          className="w-8 h-8 flex justify-center items-center border border-primary-900 rounded-md"
        >
          <SparklesIcon className="w-5 h-5" />
        </Link>

        <div className="h-[0.5px] w-full bg-primary-200 " />
      </div>
    </div>
  );
}
