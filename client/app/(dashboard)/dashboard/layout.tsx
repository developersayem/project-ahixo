"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useRouter } from "next/navigation";
import { generateBreadcrumbs } from "@/utils/breadcrumb";
import { AppSidebar } from "@/components/dashboard/shared/app-sidebar";
import { useAuth } from "@/contexts/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  // Redirect logic
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      // Redirect by role
      if (pathname.startsWith("/dashboard/admin")) {
        router.push("/login/admin");
      } else if (pathname.startsWith("/dashboard/seller")) {
        router.push("/login/seller");
      } else {
        router.push("/login");
      }
      return;
    }

    // Block buyers from dashboard
    if (user?.role === "buyer" && pathname.startsWith("/dashboard")) {
      router.push("/"); // send buyers back to home
      return;
    }

    // 🔒 Block unverified sellers from any dashboard page except application page
    if (
      user?.role === "seller" &&
      !user.sellerInfo?.isVerified &&
      pathname !== "/dashboard/application"
    ) {
      router.replace("/dashboard/application");
      return;
    }
  }, [isAuthenticated, isLoading, user, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (
    !isAuthenticated ||
    (user?.role === "buyer" && pathname.startsWith("/dashboard")) ||
    (user?.role === "seller" &&
      !user.sellerInfo?.isVerified &&
      pathname !== "/dashboard/application")
  ) {
    return null; // prevent flicker
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
