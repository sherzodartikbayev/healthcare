import {useQuery} from "@tanstack/react-query";
import {getDepartment, getDepartments} from "../api/department.api.ts";

export function useDepartments() {
  return useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  })
}

export function useDepartment(id: string) {
  return useQuery({
    queryKey: ['department', id],
    queryFn: () => getDepartment(id),
  })
}
