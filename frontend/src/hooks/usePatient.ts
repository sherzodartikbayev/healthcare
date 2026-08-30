import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deletePatient, getPatients, updatePatient} from "../api/patient.api.ts";
import type {UpdatePatientInput} from "../types/patient.type.ts";

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  })
}

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, data,}: { id: string; data: UpdatePatientInput }) => updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["patients"]});
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["patients"]});
    },
  });
};
