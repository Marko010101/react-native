import { api } from "@/lib/axios";

export async function getWarehouses() {
  const { data } = await api.get(`/odata/Warehouses`);
  return data;
}
