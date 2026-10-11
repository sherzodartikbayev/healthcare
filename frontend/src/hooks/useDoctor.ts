import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createDoctor, deleteDoctor, getDoctor, getDoctors, updateDoctor} from "../api/doctor.api.ts";
import type {CreateDoctorInput, UpdateDoctorInput} from "../types/doctor.type.ts";

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

export function useCreateDoctor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (doctor: CreateDoctorInput) => createDoctor(doctor),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['doctors']})
    })
}

export function useUpdateDoctor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, doctor}: { id: string, doctor: UpdateDoctorInput }) => updateDoctor(id, doctor),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ['doctors']});
            queryClient.invalidateQueries({queryKey: ['doctor', variables.id]});
        }
    })
}

export function useDeleteDoctor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDoctor,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['doctors']}),
    })
}