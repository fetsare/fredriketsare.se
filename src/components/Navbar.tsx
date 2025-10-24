"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import FadeInSection from "./FadeInSection";

const links: { href: string; label: string }[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/blog",
    label: "Blog",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const getActiveLinkClassName = (path: string): string => {
    if (path === "/") {
      return pathname === "/" ? "text-blue-400" : "";
    }
    return pathname.startsWith(path) ? "text-blue-400" : "";
  };

  return (
    <nav className="flex">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <FadeInSection direction="up" delay={(index + 1) * 100}>
            <Link href={link.href}>
              <span
                className={`hover:text-blue-400 text-xl transition-colors duration-200 ${getActiveLinkClassName(
                  link.href
                )}`}
              >
                {link.label}
              </span>
            </Link>
          </FadeInSection>
          <FadeInSection direction="up" delay={(index + 1) * 150}>
            {index !== links.length - 1 && (
              <span className="text-xl mx-2">•</span>
            )}
          </FadeInSection>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Navbar;
