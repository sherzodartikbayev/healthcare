import { useQuery } from "@tanstack/react-query";
import {getDoctor, getDoctors} from "../api/doctor.api.ts";

export function useDoctors() {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  })
}

export function useDoctor(id: string) {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => getDoctor(id),
  })
}