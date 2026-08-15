import { z } from "zod";

export const createPatientSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(100),
    lastName: z.string().min(2, "Last name must be at least 2 characters").max(100),
    middleName: z.string().max(100).optional().nullable(),
    avatarUrl: z.string().url("Invalid avatar URL").optional().nullable(),
    birthDate: z.string().optional().nullable(),
    birthPlace: z.string().max(255).optional().nullable(),
    address: z.string().optional().nullable(),
    maritalStatus: z.string().max(50).optional().nullable(),
    education: z.string().optional().nullable(),
    workplace: z.string().max(255).optional().nullable(),
    phone: z.string().max(30).optional().nullable(),
    emergencyPhone: z.string().max(30).optional().nullable(),
    bloodGroup: z.string().max(10).optional().nullable(),
    rhFactor: z.string().max(5).optional().nullable(),
    insurancePolicy: z.string().max(100).optional().nullable(),
    insuranceProvider: z.string().max(255).optional().nullable(),
    weight: z.coerce.number().positive("Weight must be positive").max(999).optional().nullable(),
    height: z.coerce.number().positive("Height must be positive").max(999).optional().nullable(),
    allergies: z.string().optional().nullable(),
});

export const updatePatientSchema = createPatientSchema.partial();

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
