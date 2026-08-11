import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email().toLowerCase().trim(),
    password: z.string().min(1)
});

export const registerSchema = z.object({
    name: z.string().min(2).max(255),
    email: z.email().min(2).toLowerCase().trim(),
    password: z.string().min(1).trim(),
    role: z.enum(["ADMIN", "DOCTOR"]).default("ADMIN"),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE")
});