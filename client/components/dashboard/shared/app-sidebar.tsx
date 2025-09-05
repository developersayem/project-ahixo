"use client";

import * as React from "react";
import { Blocks, Layers, LayoutDashboard } from "lucide-react";

import { NavMain } from "@/components/dashboard/shared/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const mainRoute = "/dashboard";
const role = "seller";

const data = {
  navMain: [
    ...(role === "seller"
      ? [
          {
            title: "Application",
            url: `${mainRoute}/application`,
            icon: LayoutDashboard,
            isActive: false,
            items: [],
          },
        ]
      : []),
    {
      title: "Dashboard",
      url: `${mainRoute}`,
      icon: LayoutDashboard,
      isActive: false,
      items: [],
    },
    {
      title: "Orders",
      url: `${mainRoute}/orders`,
      icon: Layers,
      isActive: false,
      items: [],
    },
    {
      title: "Products",
      url: "#",
      icon: Blocks,
      isActive: true,
      items: [
        {
          title: "Add Products",
          url: `${mainRoute}/products/add`,
        },
        {
          title: "Products",
          url: `${mainRoute}/products`,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/* Logo */}
              <Link href="/">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="text-xl font-bold">
                      <Image
                        src="/logos/ahixo-logo.webp"
                        alt="AHIXO"
                        width={150}
                        height={50}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.avatar} alt={user?.fullName} />
            <AvatarFallback className="uppercase">
              {user?.fullName
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.fullName}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </div>
        <div>
          <Button variant="destructive" className="w-full" onClick={logout}>
            Log out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
