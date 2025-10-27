"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IDictionary } from "@/types/locale/dictionary.type";

interface OrderStatusFilterProps {
  dict: IDictionary;
  activeStatus: string;
  onStatusChange: (status: string) => void;
}

export function OrderStatusFilter({
  dict,
  activeStatus,
  onStatusChange,
}: OrderStatusFilterProps) {
  return (
    <Tabs value={activeStatus} onValueChange={onStatusChange} className="mb-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all">{dict.orders.tabs.tab1}</TabsTrigger>
        <TabsTrigger value="processing">{dict.orders.tabs.tab2}</TabsTrigger>
        <TabsTrigger value="on-hold">{dict.orders.tabs.tab3}</TabsTrigger>
        <TabsTrigger value="completed">{dict.orders.tabs.tab4}</TabsTrigger>
        <TabsTrigger value="canceled">{dict.orders.tabs.tab45}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
