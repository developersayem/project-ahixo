"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // If not authenticated or not admin → redirect
    if (!isAuthenticated || user?.role !== "admin") {
      router.replace("/dashboard"); // or "/login/admin" if you want
    }
  }, [isAuthenticated, isLoading, user?.role, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") return null;

  return <>{children}</>;
}
