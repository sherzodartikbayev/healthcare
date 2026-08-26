import {useQuery} from "@tanstack/react-query";
import {getDashboardData} from "../api/admin.api.ts";

export function useDashboardData() {
  return useQuery({
      queryKey: ['dashboard'],
      queryFn: getDashboardData,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    }
  )
}
