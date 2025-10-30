"use client";

import React, { useState } from "react";
// import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ISeller } from "@/types/seller-buyers.type";

interface SellersTableProps {
  sellers: ISeller[];
}

export const SellersTable: React.FC<SellersTableProps> = ({ sellers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter sellers based on search term
  const filteredSellers = searchTerm
    ? sellers.filter((seller) =>
        seller.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sellers;

  return (
    <div className="w-full p-4 bg-white border rounded-lg overflow-x-auto">
      {/* Search Bar */}
      <div className="mb-4 max-w-xs">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Shop Name</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Joined At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredSellers.length > 0 ? (
            filteredSellers.map((seller) => (
              <TableRow
                key={seller._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  {/* <Link
                    href={`/admin/sellers/${seller._id}`}
                    className="text-blue-600 hover:underline"
                  > */}
                  {seller.fullName}
                  {/* </Link> */}
                </TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>{seller.phone}</TableCell>
                <TableCell className="capitalize">{seller.role}</TableCell>
                <TableCell>{seller.sellerInfo?.shopName || "-"}</TableCell>
                <TableCell>
                  {seller.sellerInfo?.isVerified ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  {seller.createdAt
                    ? new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(seller.createdAt))
                    : "-"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No sellers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer */}
      <div className="mt-4 text-gray-600 text-sm">
        Showing {filteredSellers.length} of {sellers.length} sellers
      </div>
    </div>
  );
};
