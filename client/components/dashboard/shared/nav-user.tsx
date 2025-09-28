"use client";

import {
  ChevronsUpDown,
  LogOut,
  ShieldCheck,
  Star,
  ShoppingBag,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IUser } from "@/types/user-type";

interface INavBarProps {
  user: IUser | null;
  logout: () => void;
}

const demoUser: IUser = {
  _id: "1",
  role: "seller",
  phone: "1234567890",
  fullName: "admin",
  email: "admin@example.com",
  avatar: "/default-avatar.png",
  sellerInfo: {
    shopName: "Demo Store",
    shopAddress: "Dhaka",
    isVerified: false,
    rating: 0,
    totalSales: 0,
  },
};

export function NavUser({ user, logout }: INavBarProps) {
  const { isMobile } = useSidebar();
  const currentUser = user ?? demoUser;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex items-center gap-3 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Avatar */}
              <Avatar className="h-5 w-5 rounded-lg shrink-0">
                <AvatarImage
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                />
                <AvatarFallback className="uppercase">
                  {currentUser.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* User info */}
              <div className="flex flex-col text-left min-w-0">
                <span className="font-medium text-xs">
                  {currentUser.fullName}
                </span>
                <span className="text-xs text-muted-foreground text-wrap break-all">
                  {currentUser.email}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4 shrink-0" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-lg"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={4}
          >
            {/* User Info */}
            <DropdownMenuLabel className="p-3 font-normal">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                  />
                  <AvatarFallback className="uppercase">
                    {currentUser.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid text-sm">
                  <span className="font-medium">{currentUser.fullName}</span>
                  <span className="text-xs text-muted-foreground break-all">
                    {currentUser.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Seller Info */}
            {currentUser.role === "seller" && (
              <>
                <DropdownMenuGroup className="px-4 py-2 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Shop Name
                      </p>
                      <p className="text-sm font-medium capitalize">
                        {currentUser.sellerInfo?.shopName || "No Shop Name"}
                      </p>

                      <p className="mt-1 text-xs font-medium text-muted-foreground">
                        Address
                      </p>
                      <p className="text-sm capitalize">
                        {currentUser.sellerInfo?.shopAddress || "No Address"}
                      </p>
                    </div>

                    {/* Seller Verification */}
                    <div className="flex flex-col items-end">
                      {currentUser.sellerInfo?.isVerified ? (
                        <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                          <ShieldCheck className="h-4 w-4" />
                          Verified
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
                          <ShieldCheck className="h-4 w-4" />
                          Not Verified
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {currentUser.sellerInfo?.rating ?? 0} ★
                    </div>
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4 text-blue-500" />
                      {currentUser.sellerInfo?.totalSales ?? 0} Sales
                    </div>
                  </div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
              </>
            )}

            {/* Logout */}
            <DropdownMenuItem
              onClick={logout}
              className="text-red-600 focus:text-red-700 font-medium"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
