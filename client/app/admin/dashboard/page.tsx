"use client";

import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { Suspense } from "react";

export default function OverviewPage() {
  return (
    <main className="flex-1 p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardOverview />
      </Suspense>
    </main>
  );
}
