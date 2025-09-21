"use client";

import { ApplicationForm } from "@/components/dashboard/application/application-form";
import { ApplicationStatus } from "@/components/dashboard/application/application-status";
import { useAuth } from "@/contexts/auth-context";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function ApplicationPage() {
  const { user } = useAuth();
  const {
    data,
    // error,
    mutate,
  } = useSWR(`/api/v1/${user?.role}/applications/status`, fetcher);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Seller Application
        </h2>
        <p className="text-muted-foreground">
          Apply to become a verified seller on the Ahixo marketplace.
        </p>
      </div>
      {data?.data === "pending" && <ApplicationStatus status={data?.data} />}
      {data?.data === null && <ApplicationForm mutate={mutate} />}
    </div>
  );
}
