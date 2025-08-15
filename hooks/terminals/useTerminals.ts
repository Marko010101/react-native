import { useQuery } from "@tanstack/react-query";
import { getTerminals } from "../../service/terminals";

export const useTerminals = () => {
  return useQuery({
    queryKey: ["terminals"],
    queryFn: getTerminals,
    select: (data) => data.value ?? data,
  });
};
