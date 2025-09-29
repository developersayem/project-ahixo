"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { IApplication } from "@/types/application.type";
import { ApplicationDetailsModal } from "./application-details-modal";
import { KeyedMutator } from "swr";

interface ApplicationsTableProps {
  applications: IApplication[];
  mutate?: KeyedMutator<{ data: IApplication[] }>;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  mutate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState<IApplication | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredApplications = searchTerm
    ? applications.filter((app) =>
        app.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : applications;

  const handleRowClick = (app: IApplication) => {
    setSelectedApp(app);
    setModalOpen(true);
  };

  return (
    <div className="w-full p-4 bg-white border rounded-lg overflow-x-auto">
      <div className="mb-4 max-w-xs">
        <Input
          placeholder="Search by business name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Seller Name</TableHead>
            <TableHead>Business Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <TableRow
                key={app._id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(app)}
              >
                <TableCell>{app.user.fullName}</TableCell>
                <TableCell>{app.businessType}</TableCell>
                <TableCell>{app.user.phone}</TableCell>
                <TableCell>{app.user.email}</TableCell>
                <TableCell className="capitalize">{app.status}</TableCell>
                <TableCell>
                  {app.createdAt
                    ? new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(app.createdAt))
                    : "-"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 text-gray-600 text-sm">
        Showing {filteredApplications.length} of {applications.length}{" "}
        applications
      </div>

      {/* Details Modal */}
      <ApplicationDetailsModal
        application={selectedApp}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mutate={mutate}
      />
    </div>
  );
};
