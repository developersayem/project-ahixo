"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { IUser } from "@/types/user-type";
import { Button } from "@/components/ui/button";

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

export function UserCard({ user, logout }: INavBarProps) {
  const currentUser = user ?? demoUser;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="bg-sidebar-accent/50 rounded-lg p-4 space-y-3">
          {/* User Header */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage
                src={currentUser.avatar}
                alt={currentUser.fullName}
              />
              <AvatarFallback className="uppercase text-sm font-semibold">
                {currentUser.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left min-w-0">
              <span className="font-semibold text-sm">
                {currentUser.fullName}
              </span>
              <span className="text-xs text-muted-foreground break-all">
                {currentUser.email}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={logout}
            variant="destructive"
            size="sm"
            className="w-full mt-3"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
