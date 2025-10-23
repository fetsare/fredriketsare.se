"use client";
import Link from "next/link";
import { capitalize } from "@/lib/utils";
import React from "react";
import { usePathname } from "next/navigation";
const links: string[] = ["home", "projects", "blog"];

const Navbar = () => {
  const getActiveLinkClassName = (path: string): string => {
    const pathname = usePathname();
    return pathname.startsWith(path) ? "text-blue-400" : "";
  };
  return (
    <nav className="flex">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <Link href={link}>
            <span className="hover:text-blue-400 text-xl transition-colors duration-200">{capitalize(link)}</span>
          </Link>
          {index !== links.length - 1 && <span className="text-xl mx-2">✦</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Navbar;
