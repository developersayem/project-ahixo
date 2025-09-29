"use client";

import React from "react";
import useSWR from "swr";
import { IApplication } from "@/types/application.type";
import { fetcher } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton"; // Optional: for loading state
import { ApplicationsTable } from "@/components/dashboard/application/applications-table";

export default function ApplicationPage() {
  const {
    data: applicationsRes,
    error,
    isLoading,
    mutate,
  } = useSWR(
    "/api/v1/admin/application/", // backend endpoint
    fetcher
  );

  const applications: IApplication[] = applicationsRes?.data || [];
  console.log(applications);

  if (error) return <p className="text-red-600">Failed to load applications</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Seller Applications
        </h2>
        <p className="text-muted-foreground">
          View all seller applications submitted to the Ahixo marketplace.
        </p>
      </div>

      {isLoading ? (
        <Skeleton className="h-10 w-full" /> // simple loading state
      ) : (
        <ApplicationsTable applications={applications} mutate={mutate} />
      )}
    </div>
  );
}
