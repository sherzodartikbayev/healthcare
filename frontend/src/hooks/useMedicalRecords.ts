import {useMutation, useQuery, useQueryClient,} from "@tanstack/react-query";
import type {MedicalRecordInput, UpdateMedicalRecordInput} from "../types/medical-record.type.ts";
import {
  createMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecord, getMedicalRecords,
  updateMedicalRecord
} from "../api/medical-records.api.ts";

export const useMedicalRecords = (patientId: string) => {
  return useQuery({
    queryKey: ["medical-records", patientId],
    queryFn: () => getMedicalRecords(patientId!),
  });
}

export const useMedicalRecord = (id?: string) => {
  return useQuery({
    queryKey: ["medical-record", id],
    queryFn: () => getMedicalRecord(id!),
    enabled: Boolean(id),
  });
};

export const useCreateMedicalRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (record: MedicalRecordInput) =>
      createMedicalRecord(record),
    onSuccess: (_, record) => {
      queryClient.invalidateQueries({
        queryKey: ["medical-records", record.patientId],
      });
    },
  });
};

export const useUpdateMedicalRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, record}: { id: string; record: UpdateMedicalRecordInput }) => updateMedicalRecord(id, record),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["medical-record", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["medical-records"],
      });
    },
  });
};

export const useDeleteMedicalRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMedicalRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical-records"] });
    },
  });
};
