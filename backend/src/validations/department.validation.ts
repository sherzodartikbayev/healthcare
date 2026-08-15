import z from "zod";

export const createDepartmentSchema = z.object({
    name: z.string().min(2).max(150),
    description: z.string().min(5),
});

export const updateDepartmentSchema = createDepartmentSchema.optional();

export type createDepartmentInput = z.infer<typeof createDepartmentSchema>;

export type updateDepartmentInput = z.infer<typeof updateDepartmentSchema>;