import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteMedicalRecord, getMedicalRecord} from "../api/medical-records.api.ts";

export function useMedicalRecords(patientId: string) {
  return useQuery({
    queryKey: ['medicalRecords', patientId],
    queryFn: () => getMedicalRecord(patientId)
  })
}

export function useDeletedMedicalRecord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMedicalRecord,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["medicalRecords"]})
  })
}
