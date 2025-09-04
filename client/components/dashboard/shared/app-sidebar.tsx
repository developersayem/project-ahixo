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
import { NavUser } from "./nav-user";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

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
        <NavUser user={user} logout={logout} />
      </SidebarFooter>
    </Sidebar>
  );
}
