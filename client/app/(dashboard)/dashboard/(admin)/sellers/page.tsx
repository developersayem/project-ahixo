"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher"; // your custom fetcher
import { SellersTable } from "@/components/dashboard/sellers/seller-table";

const SellersPage: React.FC = () => {
  // Fetch sellers from backend
  const {
    data: sellersRes,
    error,
    isLoading,
  } = useSWR(
    "/api/v1/admin/sellers", // your backend endpoint
    fetcher
  );

  const sellers = sellersRes?.data || [];

  if (isLoading) {
    return <p className="p-4">Loading sellers...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Failed to load sellers.</p>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-1">Sellers</h1>
      <p className="text-muted-foreground mb-6">
        Manage and review all sellers on the platform.
      </p>

      {/* Pass fetched sellers to SellersTable */}
      {sellers && <SellersTable sellers={sellers} />}
    </div>
  );
};

export default SellersPage;
