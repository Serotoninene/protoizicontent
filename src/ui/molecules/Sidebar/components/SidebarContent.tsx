"use client";

import Link from "next/link";
import {
  CalendarIcon,
  SparklesIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";

import Logo from "@/ui/atoms/Logo";
import SidebarLink from "./SidebarLink";
import { UserButton } from "@clerk/nextjs";
import { useIsExtendedContext } from "@/context/isExtendedContext";

// type Props = {};

export function SidebarHeader() {
  const { setIsExtended } = useIsExtendedContext();

  const handleExtend = () => {
    // todo : only set is extended at the end of a FLIP animation
    // setIsExtended(true);
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
        className="w-7 h-7 flex justify-center items-center border border-primary-900 rounded-md"
      >
        <SparklesIcon className="w-4 h-4" />
      </Link>
      <div className="h-[0.5px] w-full bg-primary-200" />

      <SidebarLink href="/dashboard" icon={Squares2X2Icon}>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/dashboard" icon={CalendarIcon}>
        Calendar
      </SidebarLink>
    </div>
  );
}

export function SidebarFooter() {
  return (
    <div className="mx-auto">
      <UserButton />
    </div>
  );
}
