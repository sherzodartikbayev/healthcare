import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createPatient, deletePatient, getPatient, getPatients, updatePatient} from "../api/patient.api.ts";
import type {CreatePatientType, UpdatePatientInput} from "../types/patient.type.ts";

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  })
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => getPatient(id)
  })
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patient: CreatePatientType) => createPatient(patient),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["patients"]})
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, patient}: { id: string; patient: UpdatePatientInput }) => updatePatient(id, patient),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ["patients"]});
      queryClient.invalidateQueries({queryKey: ["patient", variables.id]});
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePatient,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["patients"]})
  });
}
