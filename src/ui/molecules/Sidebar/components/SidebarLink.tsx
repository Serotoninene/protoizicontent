"use client";

import Link from "next/link";
import type { ElementType } from "react";
import { usePathname } from "next/navigation";

import { useIsExtendedContext } from "@/context/isExtendedContext";

type Props = {
  children: React.ReactNode;
  icon: ElementType;
  href: string;
};

export default function SidebarLink({ icon: Icon, children, href }: Props) {
  const route = usePathname();
  const { isExtended } = useIsExtendedContext();
  const isActive = route === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded ${isActive ? "opacity-100" : "opacity-70"} hover:opacity-100 transition-opacity`}
    >
      <Icon className="w-5 h-5" />
      {isExtended && <p>{children}</p>}
    </Link>
  );
}
