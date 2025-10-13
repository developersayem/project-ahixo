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
import { IDictionary } from "@/types/locale/dictionary.type";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function UserNav({ dict }: { dict: IDictionary }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Extract current locale from URL (e.g. /en/products)
  const locale = pathname.split("/")[1] || "en";

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
                <Link href={`/${locale}/orders`}>
                  {dict.middle_navbar.user_nav.orders}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/${locale}/wishlist`}>
                  {dict.middle_navbar.user_nav.wishlist}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/dashboard">
                  {dict.middle_navbar.user_nav.dashboard}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            {dict.middle_navbar.user_nav.login_out}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
