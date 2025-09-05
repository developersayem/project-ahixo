"use client";

import { fetcher } from "@/lib/fetcher";
import { OrderList } from "./order-list";
import { OrderStats } from "./order-stats";
import useSWR from "swr";

const OrdersCom = () => {
  const {
    data,
    error,
    mutate: ordersStatsMutate,
  } = useSWR("/api/v1/seller/orders/stats", fetcher);

  return (
    <>
      <OrderStats data={data} error={error} mutate={ordersStatsMutate} />
      <OrderList ordersStatsMutate={ordersStatsMutate} />
    </>
  );
};

export default OrdersCom;
