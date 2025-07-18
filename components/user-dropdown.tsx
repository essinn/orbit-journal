import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

interface UserProps {
  email: string;
  name: string;
  userImage: string | undefined;
}

export const UserDropdown = ({ email, name, userImage }: UserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-10 rounded-full">
          <Avatar className="size-9">
            <AvatarImage src={userImage} alt="user image" />
            <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-2">
          <p className="text-sm font-medium leading-none">{name}</p>
          <span className="text-xs leading-none text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col space-y-1">
          <DropdownMenuItem className="text-xs leading-none">
            <Link href="/settings" className="font-base">
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs leading-none">
            <LogoutLink>
              <span className="font-base">Log Out</span>
            </LogoutLink>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
