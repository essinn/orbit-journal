"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { PanelRightClose } from "lucide-react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Links } from "./links";

export const Navbar = ({ user }: { user: any }) => {
  return (
    <nav className="sticky flex justify-between items-center mx-4 py-2 bg-transparent backdrop-blur-md">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold">
          Orbit
        </Link>
        <div className="hidden md:flex items-center">
          <Links />
        </div>
      </div>
      <div className="hidden md:flex items-center">
        {!user && (
          <Button asChild>
            <LoginLink>Sign In</LoginLink>
          </Button>
        )}
      </div>
      <div className="md:hidden flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <PanelRightClose className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold">Orbit</SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                A Journal App
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4 px-4">
              <Links />
            </div>
            {!user && (
              <SheetFooter>
                <Button asChild className="w-full">
                  <LoginLink>Sign In</LoginLink>
                </Button>
              </SheetFooter>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
