import { useQuery } from "@tanstack/react-query";
import { getDoctors} from "../api/doctor.api.ts";

export function useDoctors() {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  })
}
