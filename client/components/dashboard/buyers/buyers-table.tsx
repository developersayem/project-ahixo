"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { IBuyer } from "@/types/seller-buyers.type";

interface BuyersTableProps {
  buyers: IBuyer[];
}

export const BuyersTable: React.FC<BuyersTableProps> = ({ buyers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter buyers by fullName
  const filteredBuyers = searchTerm
    ? buyers.filter((buyer) =>
        buyer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : buyers;

  return (
    <div className="w-full p-4 bg-white border rounded-lg overflow-x-auto">
      {/* Search Input */}
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
            <TableHead>Joined At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredBuyers.length > 0 ? (
            filteredBuyers.map((buyer) => (
              <TableRow
                key={buyer._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  <Link
                    href={`/admin/buyers/${buyer._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {buyer.fullName}
                  </Link>
                </TableCell>
                <TableCell>{buyer.email}</TableCell>
                <TableCell>{buyer.phone}</TableCell>
                <TableCell className="capitalize">{buyer.role}</TableCell>
                <TableCell>
                  {buyer.createdAt
                    ? new Date(buyer.createdAt).toLocaleDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No buyers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Footer */}
      <div className="mt-4 text-gray-600 text-sm">
        Showing {filteredBuyers.length} of {buyers.length} buyers
      </div>
    </div>
  );
};
