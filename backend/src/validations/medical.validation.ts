import { z } from "zod";

export const medicalRecordIdSchema = z.object({
    id: z.uuid("Invalid medical record ID"),
});

export const createMedicalRecordSchema = z.object({
    patientId: z.uuid("Invalid patient ID"),
    doctorId: z.uuid("Invalid doctor ID"),
    treatmentDate: z.string().date("Invalid treatment date"),
    diseaseType: z
        .string()
        .trim()
        .min(2, "Disease type is required")
        .max(255, "Disease type is too long"),
    diagnosis: z
        .string()
        .trim()
        .max(5000, "Diagnosis is too long")
        .nullable()
        .optional(),
});

export const updateMedicalRecordSchema = z.object({
    patientId: z.uuid("Invalid patient ID").optional(),
    doctorId: z.uuid("Invalid doctor ID").optional(),
    treatmentDate: z.string().date("Invalid treatment date").optional(),
    diseaseType: z
        .string()
        .trim()
        .min(2, "Disease type is required")
        .max(255, "Disease type is too long")
        .optional(),
    diagnosis: z
        .string()
        .trim()
        .max(5000, "Diagnosis is too long")
        .nullable()
        .optional(),
});

export type CreateMedicalRecordInput = z.infer<typeof createMedicalRecordSchema>;

export type UpdateMedicalRecordInput = z.infer<typeof updateMedicalRecordSchema>;