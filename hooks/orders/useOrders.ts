// hooks/orders/useOrders.ts
import { fetchOrders } from "@/service/ordersApi";
import { useQuery } from "@tanstack/react-query";

export function useOrders(query: string) {
  return useQuery({
    queryKey: ["orders", query],
    queryFn: () => fetchOrders(query),
  });
}
