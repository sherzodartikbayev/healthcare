import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    createDepartment,
    deleteDepartment,
    getDepartment,
    getDepartments,
    updateDepartment
} from "../api/department.api.ts";
import type {CreateDepartmentInput, UpdateDepartmentInput} from "../types/department.type.ts";

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

export function useCreateDepartment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (department: CreateDepartmentInput) => createDepartment(department),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['departments']}),
    })
}

export function useUpdateDepartment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, department}: {
            id: string,
            department: UpdateDepartmentInput
        }) => updateDepartment(id, department),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['departments']}),
    })
}

export function useDeleteDepartment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDepartment,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['departments']}),
    })
}