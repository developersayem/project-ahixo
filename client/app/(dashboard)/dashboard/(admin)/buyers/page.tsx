"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher"; // your custom fetcher
import { BuyersTable } from "@/components/dashboard/buyers/buyers-table";

const BuyersPage: React.FC = () => {
  // Fetch buyers from backend
  const {
    data: buyersRes,
    error,
    isLoading,
  } = useSWR(
    "/api/v1/admin/buyers", // your backend endpoint for buyers
    fetcher
  );

  const buyers = buyersRes?.data || [];

  if (isLoading) {
    return <p className="p-4">Loading buyers...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Failed to load buyers.</p>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-2">Buyers</h1>
      <p className="text-muted-foreground mb-6">
        Manage and review all buyers on the platform.
      </p>

      {/* Pass fetched buyers to BuyersTable */}
      {buyers && <BuyersTable buyers={buyers} />}
    </div>
  );
};

export default BuyersPage;
