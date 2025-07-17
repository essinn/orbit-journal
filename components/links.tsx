"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navbarLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "New Entry",
    href: "/new",
  },
  {
    name: "Calender",
    href: "/calender",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export const Links = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      {navbarLinks.map(link => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            `${
              pathname === link.href
                ? "text-black"
                : "text-muted-foreground hover:text-black transition-all duration-300"
            } w-full md:w-auto justify-start text-start font-medium`
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};
