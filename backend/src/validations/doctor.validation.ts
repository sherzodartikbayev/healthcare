import { z } from "zod";

const doctorSpecializations = [
    "CARDIOLOGY",
    "NEUROLOGY",
    "PEDIATRICS",
    "SURGERY",
    "DERMATOLOGY",
    "OPHTHALMOLOGY",
    "DENTISTRY",
    "GYNECOLOGY",
    "UROLOGY",
    "ORTHOPEDICS",
    "RADIOLOGY",
    "ANESTHESIOLOGY",
    "PSYCHIATRY",
    "ONCOLOGY",
    "GENERAL_PRACTICE",
] as const;

const workScheduleTypes = [
    "FULL-TIME",
    "PART-TIME",
] as const;

export const createDoctorSchema = z.object({
    departmentId: z.uuid("Invalid department ID"),
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(100, "First name is too long")
        .trim(),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(100, "Last name is too long")
        .trim(),
    middleName: z
        .string()
        .max(100, "Middle name is too long")
        .trim(),
    avatarUrl: z.url("Invalid avatar URL").optional(),
    specialization: z.enum(doctorSpecializations, "Invalid doctor specialization",),
    birthDate: z.string().date("Invalid birth date").optional(),
    birthPlace: z.string().max(255, "Birth place is too long").trim().optional(),
    address: z.string().max(1000, "Address is too long").trim().optional(),
    maritalStatus: z.boolean().default(false),
    education: z.string().max(2000, "Education information is too long").trim().optional(),
    phone: z.string().min(7, "Invalid phone number").max(30, "Phone number is too long").trim().optional(),
    emergencyPhone: z
        .string()
        .min(7, "Invalid emergency phone number")
        .max(30, "Emergency phone number is too long")
        .trim()
        .optional(),
    hireDate: z.string().date("Invalid hire date").optional(),
    employmentType: z.string().max(50, "Employment type is too long").trim().optional(),
    workSchedule: z.enum(workScheduleTypes, "Invalid work schedule",).default("FULL-TIME"),
});

export const updateDoctorSchema = createDoctorSchema.partial();

export const doctorIdSchema = z.object({
    id: z.uuid("Invalid doctor ID"),
});
