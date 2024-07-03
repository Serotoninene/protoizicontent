"use client";

import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/solid";

import Logo from "@/ui/atoms/Logo";
import SidebarLink from "./SidebarLink";
import { useIsExtendedContext } from "@/context/isExtendedContext";

// type Props = {};

export default function SidebarContent() {
  const { setIsExtended } = useIsExtendedContext();

  const handleExtend = () => {
    // todo : only set is extended at the end of a FLIP animation
    setIsExtended(true);
  };

  const handleContract = () => {
    // todo : only set is extended at the end of a FLIP animation
    setIsExtended(false);
  };

  return (
    <div
      className="flex flex-col gap-5 items-center"
      onMouseEnter={handleExtend}
      onMouseLeave={handleContract}
    >
      <Logo />
      <Link
        href="/generate"
        className="w-8 h-8 flex justify-center items-center border border-primary-900 rounded-md"
      >
        <SparklesIcon className="w-5 h-5" />
      </Link>
      <div className="h-[0.5px] w-full bg-primary-200" />

      <SidebarLink href="/dashboard">Dashboard</SidebarLink>
    </div>
  );
}
