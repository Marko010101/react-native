import { getWarehouses } from "@/service/warehouses";
import { useQuery } from "@tanstack/react-query";

export const useWarehouses = () => {
  return useQuery({
    queryKey: ["warehouses"],
    queryFn: getWarehouses,
    select: (data) => data.value ?? data,
  });
};
