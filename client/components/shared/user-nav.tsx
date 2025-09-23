"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export function UserNav() {
  const { user, logout } = useAuth();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9 border border-sidebar-foreground">
              <AvatarImage
                src={user?.avatar || "/default-avatar.png"}
                alt={user?.fullName || "User"}
              />
              <AvatarFallback className="">
                {user?.fullName
                  ? user.fullName.split(" ")[0].charAt(0).toUpperCase()
                  : "U"}
                {user?.fullName
                  ? user.fullName.split(" ")[1]?.charAt(0).toUpperCase()
                  : "A"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-5" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none capitalize">
                {user?.fullName || "Guest"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email || "guest@example.com"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user?.role === "buyer" ? (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/wishlist">My Wishlist</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
