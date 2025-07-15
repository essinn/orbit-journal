"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { PanelRightClose } from "lucide-react";

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

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="sticky flex justify-between items-center mx-4 py-2 bg-transparent backdrop-blur-md border-b">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          Orbit
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-2">
        {navbarLinks.map(link => (
          <Button
            variant={pathname === link.href ? "secondary" : "ghost"}
            key={link.name}
            asChild
          >
            <Link href={link.href}>{link.name}</Link>
          </Button>
        ))}
      </div>
      <div className="md:hidden flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <PanelRightClose className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-4">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold">Orbit</SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                A Journal App
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4">
              {navbarLinks.map(link => (
                <Button
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  key={link.name}
                  asChild
                  className="w-full justify-start text-start"
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
