// services/ordersApi.ts
import { api } from "@/lib/axios";

// Adjust this type to your real OData response shape
type ODataResponse<T> = { "@odata.count"?: number; value: T[] };

export async function fetchOrders(query: string) {
  const { data } = await api.get<ODataResponse<any>>(`/odata/Orders${query}`);
  return data;
}
