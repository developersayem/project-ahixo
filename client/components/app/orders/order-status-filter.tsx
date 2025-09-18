"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderStatusFilterProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
}

export function OrderStatusFilter({
  activeStatus,
  onStatusChange,
}: OrderStatusFilterProps) {
  return (
    <Tabs value={activeStatus} onValueChange={onStatusChange} className="mb-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all">All Orders</TabsTrigger>
        <TabsTrigger value="processing">Processing</TabsTrigger>
        <TabsTrigger value="on-hold">On-Hold</TabsTrigger>
        <TabsTrigger value="delivered">Delivered</TabsTrigger>
        <TabsTrigger value="canceled">Cancelled</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
